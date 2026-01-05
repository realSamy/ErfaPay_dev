import csv
import hashlib
import hmac
import json
from datetime import datetime
from io import StringIO

import requests
from django.conf import settings
from django.db.models import F, Sum
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
from django.http import HttpResponse, StreamingHttpResponse
from django.utils.dateparse import parse_date
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsSeniorSupportOrAbove
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.shortcuts import get_object_or_404

from config import exceptions
from .models import Charge, WalletTransaction
from .serializers import (
    WalletSerializer, WalletTransactionSerializer,
    ChargeListSerializer, ChargeCreateSerializer
)
from .utils import get_paypal_token
from apps.users.models import UserProfile


# === USER VIEWS ===
class WalletView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(WalletSerializer(request.user.wallet).data)


class WalletTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        txs = request.user.wallet.transactions.select_related('adjusted_by').all()
        return Response(WalletTransactionSerializer(txs, many=True).data)


class ChargeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        charges = request.user.charges.all()
        serializer = ChargeListSerializer(charges, many=True)
        return Response({'ok': True, 'data': serializer.data})


# === ADMIN VIEWS ===
class AdminChargeListView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        charges = Charge.objects.select_related('user').all().order_by('-created_at')
        _status = request.query_params.get('status')
        if _status:
            charges = charges.filter(status=_status)
        serializer = ChargeListSerializer(charges, many=True)
        return Response({'ok': True, 'data': serializer.data})


class AdminChargeApproveView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def post(self, request, pk):
        charge = get_object_or_404(Charge, pk=pk, status='pending')
        charge.admin_approved = True
        charge.complete()
        return Response({'ok': True, 'message': 'Charge approved and completed'})


class AdminChargeRejectView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def post(self, request, pk):
        charge = get_object_or_404(Charge, pk=pk, status='pending')
        charge.status = 'failed'
        charge.admin_approved = False
        charge.save()
        return Response({'ok': True, 'message': 'Charge rejected'})


class AdminWalletAdjustmentView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def post(self, request):
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')  # can be negative
        reason = request.data.get('reason', 'Admin adjustment')

        user = get_object_or_404(UserProfile, id=user_id)
        with transaction.atomic():
            wt = WalletTransaction.objects.create(
                wallet=user.wallet,
                amount=amount,
                transaction_type='adjustment',
                description=reason,
                adjusted_by=request.user,
                admin_approved=True
            )
            user.wallet.balance = F('balance') + amount
            user.wallet.save()
            user.wallet.refresh_from_db()
            wt.balance_after = user.wallet.balance
            wt.save()

        return Response({
            'ok': True,
            'message': 'Adjustment applied',
            'new_balance': user.wallet.balance
        })


class ChargeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChargeCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            if data['gateway'] == 'paypal':
                return self.create_paypal_order(request, data['foreign_amount'])
            elif data['gateway'] == 'crypto':
                return self.create_crypto_charge(request, data['foreign_amount'], data['currency'])
            elif data['gateway'] == 'voucher':
                return self.redeem_perfect_money_voucher(request, data['voucher_num'], data['voucher_code'])
            raise exceptions.GatewayNotSupportedException
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def create_paypal_order(self, request, amount):
        access_token = get_paypal_token()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}',
        }
        payload = {
            "intent": "CAPTURE",
            "purchase_units": [{"amount": {"currency_code": "USD", "value": str(amount)}}],
            "application_context": {
                "return_url": settings.PAYPAL_RETURN_URL,
                "cancel_url": settings.PAYPAL_CANCEL_URL,
            }
        }
        response = requests.post(f"{settings.PAYPAL_API_URL}/v2/checkout/orders", headers=headers, json=payload)
        if response.status_code == 201:
            order_data = response.json()
            charge = Charge.objects.create(
                user=request.user,
                foreign_amount=amount,
                gateway='paypal',
                gateway_reference=order_data['id']
            )
            approve_url = next(link['href'] for link in order_data['links'] if link['rel'] == 'approve')
            return Response({'approve_url': approve_url})
        return Response({'error': response.json()}, status=response.status_code)

    @transaction.atomic
    def create_crypto_charge(self, request, amount, currency):
        # Using NOWPayments API (free, reliable, supports 100+ cryptos)
        # Sign up at https://nowpayments.io/ for API key
        # Set up webhook for confirmation: https://your-site.com/api/charges/crypto/callback
        headers = {
            'x-api-key': settings.NOWPAYMENTS_API_KEY,
            'Content-Type': 'application/json'
        }
        payload = {
            'price_amount': amount,
            'price_currency': 'usd',
            'pay_currency': currency.lower(),  # e.g., 'btc', 'eth'
            'ipn_callback': settings.NOWPAYMENTS_CALLBACK_URL,
            'order_id': f'charge-{request.user.id}',  # Unique reference
            'order_description': 'Wallet top-up',
            'success_url': settings.CRYPTO_SUCCESS_URL,
            'cancel_url': settings.CRYPTO_CANCEL_URL
        }
        response = requests.post('https://api.nowpayments.io/v1/payment', headers=headers, json=payload)
        if response.status_code == 201:
            payment_data = response.json()
            charge = Charge.objects.create(
                user=request.user,
                foreign_amount=amount,
                gateway='crypto',
                gateway_reference=payment_data['payment_id'],
                currency=currency
            )
            return Response({'pay_url': payment_data['invoice_url']})
        return Response({'error': response.json()}, status=response.status_code)

    @transaction.atomic
    def redeem_perfect_money_voucher(self, request, voucher_num, voucher_code):
        # Perfect Money API for e-Voucher activation
        # Requires merchant AccountID and PassPhrase in settings
        payload = {
            'AccountID': settings.PERFECT_MONEY_ACCOUNT_ID,
            'PassPhrase': settings.PERFECT_MONEY_PASSPHRASE,
            'ev_number': voucher_num,  # 10 digits
            'ev_code': voucher_code  # 16 digits
        }
        response = requests.post('https://perfectmoney.com/acct/ev_activate.asp', data=payload)
        if response.status_code == 200:
            # Parse response (it's HTML-like, use string search or parser)
            if 'ERROR' in response.text:
                error = self._parse_pm_error(response.text)
                return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Extract amount from response if needed
                amount = self._parse_pm_amount(response.text)  # Implement parser
                charge = Charge.objects.create(
                    user=request.user,
                    foreign_amount=amount,
                    gateway='voucher',
                    gateway_reference=voucher_num
                )
                # Credit wallet here or in webhook if async
                return Response({'success': True})
        return Response({'error': 'API error'}, status=response.status_code)

    def _parse_pm_error(self, text):
        # Simple parser: find <ERROR> tag or string
        import re
        match = re.search(r'ERROR:(.+)', text)
        return match.group(1).strip() if match else 'Unknown error'

    def _parse_pm_amount(self, text):
        # Extract activated amount
        import re
        match = re.search(r'Amount: (\d+\.?\d*) USD', text)  # Adjust based on actual response
        return float(match.group(1)) if match else 0.0


class PayPalCallbackView(APIView):
    def get(self, request):
        token = request.GET.get('token')
        if not token:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        charge = Charge.objects.filter(gateway_reference=token).first()
        if not charge:
            return Response({'error': 'Charge not found'}, status=status.HTTP_400_BAD_REQUEST)

        access_token = get_paypal_token()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}',
        }
        response = requests.post(f"{settings.PAYPAL_API_URL}/v2/checkout/orders/{token}/capture", headers=headers)
        if response.status_code in [200, 201]:
            charge.complete()  # As in model
            return Response({'ok': True})
        return Response({'error': response.json()}, status=response.status_code)


@method_decorator(csrf_exempt, name='dispatch')
class CryptoIPNView(View):
    def post(self, request):
        # 1. Get signature from header
        received_sig = request.META.get('HTTP_X_NOWPAYMENTS_SIG')
        if not received_sig:
            return HttpResponse(status=400)

        # 2. Get raw body and parse JSON
        try:
            body = request.body.decode('utf-8')
            payload = json.loads(body)
        except (json.JSONDecodeError, UnicodeDecodeError):
            return HttpResponse(status=400)

        # 3. Sort payload keys recursively and stringify
        sorted_payload = json.dumps(payload, separators=(',', ':'), sort_keys=True)

        # 4. Compute HMAC-SHA512 with IPN secret
        computed_sig = hmac.new(
            settings.NOWPAYMENTS_IPN_SECRET.encode('utf-8'),
            sorted_payload.encode('utf-8'),
            hashlib.sha512
        ).hexdigest()

        # 5. Verify signature
        if not hmac.compare_digest(computed_sig, received_sig):
            return HttpResponse(status=403)

        # 6. Process only if it's a payment notification
        payment_id = payload.get('payment_id') or payload.get('payment_status')  # payment_id usually present
        payment_status = payload.get('payment_status')

        if not payment_id or not payment_status:
            return HttpResponse(status=200)  # Acknowledge but ignore

        # Recommended: only credit on 'finished' (fully confirmed)
        if payment_status == 'finished':
            with transaction.atomic():
                try:
                    charge = Charge.objects.select_for_update().get(
                        gateway='crypto',
                        gateway_reference=str(payment_id),
                        status__in=['pending', 'waiting']  # your pending states
                    )

                    # Optional: check actually_paid >= price_amount (handles overpayment)
                    actually_paid = float(payload.get('actually_paid', 0))
                    expected_usd = charge.foreign_amount
                    if actually_paid < expected_usd * 0.98:  # allow small underpayment tolerance
                        # Log or mark as partial – but don't credit full
                        charge.status = 'partial'
                        charge.save()
                        return HttpResponse(status=200)

                    # Credit wallet with foreign_amount in USD equivalent
                    wallet = charge.user.wallet
                    wallet.balance += charge.foreign_amount  # assuming balance in USD
                    wallet.save(update_fields=['balance'])

                    # Create transaction record if needed

                    charge.status = 'completed'
                    charge.save()

                except Charge.DoesNotExist:
                    pass  # Ignore unknown payment_id
                except Charge.MultipleObjectsReturned:
                    # Handle duplicate – log error
                    pass

        # Always respond 200 to acknowledge receipt
        return HttpResponse(status=200)


class AdminChartView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        mode = request.query_params.get('mode', 'daily')
        format_type = request.query_params.get('output', 'json')

        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        start_date = parse_date(start_date_str) if start_date_str else None
        end_date = parse_date(end_date_str) if end_date_str else None

        # Validate dates
        if start_date and end_date and (end_date - start_date).days > 365:
            raise exceptions.DateRangeTooLargeException

        # Truncation
        if mode == 'daily':
            trunc = TruncDay('created_at')
        elif mode == 'weekly':
            trunc = TruncWeek('created_at')
        elif mode == 'monthly':
            trunc = TruncMonth('created_at')
        else:
            raise exceptions.InvalidModeException

        # Example: Charting total charges (irt_amount sum) - replace with your metric
        qs = Charge.objects.filter(status='success').annotate(date=trunc).values('date').annotate(
            value=Sum('irt_amount')).order_by('date')

        if start_date:
            qs = qs.filter(created_at__date__gte=start_date)
        if end_date:
            qs = qs.filter(created_at__date__lte=end_date)

        current_year = datetime.now().year
        labels = []

        for item in qs:
            dt = item['date']

            if isinstance(dt, datetime):
                if mode in ('daily', 'weekly'):
                    if dt.year == current_year:
                        # 1 Aug
                        labels.append(dt.strftime('%d %b').lstrip('0'))
                    else:
                        # 2024-08-01
                        labels.append(dt.strftime('%Y-%m-%d'))
                else:  # monthly
                    labels.append(dt.strftime('%Y-%m'))
            else:
                labels.append(str(dt))

        values = [float(item['value'] or 0) for item in qs]

        if format_type == 'csv':
            return self.generate_csv(labels, values)

        return Response({'ok': True, 'data': {'labels': labels, 'values': values}})

    def generate_csv(self, labels, values):
        output = StringIO()
        writer = csv.writer(output)
        writer.writerow(['Date', 'Value'])  # Headers
        for label, value in zip(labels, values):
            writer.writerow([label, value])

        response = StreamingHttpResponse(output.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'
        return response
