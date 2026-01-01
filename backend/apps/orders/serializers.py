# apps/orders/serializers.py
from rest_framework import serializers
from apps.services.serializers import ServiceDetailSerializer
from .models import Order
from apps.users.models import UserProfile
from ..users.serializers import UserSerializer


class OrderListSerializer(serializers.ModelSerializer):
    service = ServiceDetailSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'service', 'user_amount_irt', 'commission_irt', 'tax_amount',
            'total_irt', 'status', 'created_at', 'custom_data', 'admin_notes',
        ]

class OrderCreateSerializer(serializers.Serializer):
    service_id = serializers.IntegerField()
    user_amount_irt = serializers.DecimalField(max_digits=20, decimal_places=0)
    custom_data = serializers.JSONField(default=dict)

    def validate(self, data):
        from apps.core.models import GlobalSettings
        if not GlobalSettings.get_global_settings().is_service_available():
            raise serializers.ValidationError("Services are currently unavailable")

        from apps.services.models import Service
        try:
            service = Service.objects.get(pk=data['service_id'], is_active=True)
        except Service.DoesNotExist:
            raise serializers.ValidationError("Service not found or inactive")

        cost = service.calculate_total_cost(int(data['user_amount_irt']))
        data['service'] = service
        data['total_irt'] = cost['total_payable']
        data['commission_irt'] = cost['commission']
        data['tax_amount'] = cost['tax']
        return data

    def create(self, validated_data):
        return Order.objects.create(
            user=self.context['request'].user,
            service=validated_data['service'],
            user_amount_irt=validated_data['user_amount_irt'],
            commission_irt=validated_data['commission_irt'],
            tax_amount=validated_data['tax_amount'],
            total_irt=validated_data['total_irt'],
            custom_data=validated_data.get('custom_data', {}),
        )


class OrderAdminListSerializer(serializers.ModelSerializer):
    service = ServiceDetailSerializer(read_only=True)
    user = serializers.SerializerMethodField()
    processed_by = serializers.SerializerMethodField()
    attachments = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'service', 'user_amount_irt', 'commission_irt', 'tax_amount',
            'total_irt', 'status', 'created_at', 'custom_data', 'user', 'admin_notes', 'processed_by',
            'updated_at', 'attachments'
        ]

    def get_user(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return None

    def get_processed_by(self, obj):
        if obj.processed_by:
            return UserSerializer(obj.processed_by).data
        return None

    def get_attachments(self, obj: Order):
        if obj.attachments:
            attachments = obj.attachments.all()
            return [{'filename': attachment.attachment.name.split('/')[-1], 'url': attachment.attachment.url} for attachment in attachments]
        return None
