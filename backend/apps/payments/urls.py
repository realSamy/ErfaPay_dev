from django.urls import path
from .views import WalletView, WalletTransactionsView, ChargeCreateView, PayPalCallbackView

urlpatterns = [
    path('wallet/', WalletView.as_view()),
    path('wallet/transactions/', WalletTransactionsView.as_view()),
    path('charges/create/', ChargeCreateView.as_view()),
    path('paypal/callback/', PayPalCallbackView.as_view()),
]