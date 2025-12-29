from django.urls import path
from .views import (
    OrderListView, OrderCreateView, OrderReceiptView,
    AdminOrderListView, AdminOrderUpdateView, AdminChartView
)

urlpatterns = [
    # User
    path('', OrderListView.as_view(), name='orders-list'),
    path('create/', OrderCreateView.as_view(), name='orders-create'),
    path('<int:pk>/receipt/', OrderReceiptView.as_view(), name='orders-receipt'),

    # Admin
    path('admin/', AdminOrderListView.as_view(), name='admin-orders-list'),
    path('admin/charts/', AdminChartView.as_view(), name='admin-orders-charts'),
    path('admin/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin-orders-update'),

]