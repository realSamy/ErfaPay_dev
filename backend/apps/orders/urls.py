from django.urls import path
from .views import (
    OrderListView, OrderCreateView, OrderReceiptView,
    AdminOrderListView, AdminOrderUpdateView
)

urlpatterns = [
    # User
    path('', OrderListView.as_view(), name='list'),
    path('create/', OrderCreateView.as_view(), name='create'),
    path('<int:pk>/receipt/', OrderReceiptView.as_view(), name='receipt'),

    # Admin
    path('admin/', AdminOrderListView.as_view(), name='admin-list'),
    path('admin/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin-update'),
]