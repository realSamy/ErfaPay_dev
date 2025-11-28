from rest_framework import serializers
from .models import Wallet, WalletTransaction, Charge

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['balance', 'created_at', 'updated_at']
        read_only_fields = fields

class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = '__all__'
        read_only_fields = fields

class ChargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charge
        fields = ['id', 'foreign_amount', 'gateway', 'status']
        read_only_fields = ['id', 'status']

class ChargeCreateSerializer(serializers.Serializer):
    foreign_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    gateway = serializers.ChoiceField(choices=Charge.GATEWAY_CHOICES)