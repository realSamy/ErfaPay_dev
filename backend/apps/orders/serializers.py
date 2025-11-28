from rest_framework import serializers
from apps.services.serializers import ServiceDetailSerializer
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    service = ServiceDetailSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'status', 'total_irt', 'tax_amount', 'usd_irt_rate', 'wallet_transaction', 'admin_approved']

class OrderCreateSerializer(serializers.ModelSerializer):
    custom_data = serializers.JSONField()

    class Meta:
        model = Order
        fields = ['service', 'amount_irt', 'custom_data']