import requests
from django.conf import settings
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Charge
from .serializers import WalletSerializer, WalletTransactionSerializer, ChargeCreateSerializer


class WalletView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet = request.user.wallet
        return Response(WalletSerializer(wallet).data)


class WalletTransactionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = request.user.wallet.transactions.all()
        return Response(WalletTransactionSerializer(transactions, many=True).data)


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
        access_token = self.get_paypal_token()
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

    def get_paypal_token(self):
        auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_SECRET)
        data = {'grant_type': 'client_credentials'}
        response = requests.post(f"{settings.PAYPAL_API_URL}/v1/oauth2/token", auth=auth, data=data)
        return response.json()['access_token']


class PayPalCallbackView(APIView):
    def get(self, request):
        token = request.GET.get('token')
        if not token:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        charge = Charge.objects.filter(gateway_reference=token).first()
        if not charge:
            return Response({'error': 'Charge not found'}, status=status.HTTP_400_BAD_REQUEST)

        access_token = self.get_paypal_token()  # From above
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}',
        }
        response = requests.post(f"{settings.PAYPAL_API_URL}/v2/checkout/orders/{token}/capture", headers=headers)
        if response.status_code in [200, 201]:
            charge.complete()  # As in model
            return Response({'success': True})
        return Response({'error': response.json()}, status=response.status_code)