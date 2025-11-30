import requests
from django.conf import settings
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsSeniorSupportOrAbove
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.shortcuts import get_object_or_404
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
        status = request.query_params.get('status')
        if status:
            charges = charges.filter(status=status)
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
        if serializer.is_valid():
            data = serializer.validated_data
            if data['gateway'] == 'paypal':
                return self.create_paypal_order(request, data['foreign_amount'])
            # Handle crypto/voucher similarly
            return Response({'error': 'Gateway not supported'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            return Response({'success': True})
        return Response({'error': response.json()}, status=response.status_code)
