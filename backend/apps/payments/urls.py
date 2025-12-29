from django.urls import path
from .views import (
    WalletView, WalletTransactionsView, ChargeListView,
    ChargeCreateView, PayPalCallbackView,
    AdminChargeListView, AdminChargeApproveView, AdminChargeRejectView,
    AdminWalletAdjustmentView, CryptoIPNView, AdminChartView
)

urlpatterns = [
    # User
    path('wallet/', WalletView.as_view(), name='wallet'),
    path('wallet/transactions/', WalletTransactionsView.as_view(), name='transactions'),
    path('charges/', ChargeListView.as_view(), name='charge-list'),
    path('charges/create/', ChargeCreateView.as_view(), name='charge-create'),

    # Admin
    path('admin/charges/', AdminChargeListView.as_view(), name='admin-charge-list'),
    path('admin/charges/<int:pk>/approve/', AdminChargeApproveView.as_view(), name='admin-approve'),
    path('admin/charges/<int:pk>/reject/', AdminChargeRejectView.as_view(), name='admin-reject'),
    path('admin/adjustment/', AdminWalletAdjustmentView.as_view(), name='admin-adjust'),
    path('admin/charts/', AdminChartView.as_view(), name='admin-charges-charts'),

    # Callbacks
    path('callback/paypal/', PayPalCallbackView.as_view(), name='paypal-callback'),
    path('callback/crypto/', CryptoIPNView.as_view(), name='crypto-ipn'),
]