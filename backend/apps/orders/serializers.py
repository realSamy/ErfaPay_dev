from rest_framework import serializers
from apps.services.models import Service
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'service', 'data', 'price', 'status', 'created_at']
        read_only_fields = ['user', 'price', 'status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        # In real use, pricing logic should be dynamic and validated properly
        validated_data['price'] = validated_data['service'].base_price
        return super().create(validated_data)
