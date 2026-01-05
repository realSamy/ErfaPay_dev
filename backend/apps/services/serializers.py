# apps/services/serializers.py
import json

from rest_framework import serializers

from config import exceptions
from .models import Category, Service

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_fa', 'name_en', 'slug', 'icon', 'order', 'is_active']

class CategoryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_fa', 'name_en', 'slug', 'icon', 'order', 'is_active']
        read_only_fields = ['id']

class ServiceListSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'title_fa', 'title_en', 'description_fa', 'description_en',
            'icon', 'commission_percent', 'commission_fixed', 'commission_type',
            'min_amount', 'max_amount', 'tax_rate', 'delivery_time_fa', 'delivery_time_en',
            'requires_manual_review', 'is_active', 'icon', 'banner', 'required_fields', 'user_pricing'
            # 'category'
        ]


class ServiceDetailSerializer(ServiceListSerializer):
    # price_example = serializers.SerializerMethodField()

    def get_price_example(self, obj):
        example = obj.calculate_total_cost(100000)  # مثال با ۱۰۰ هزار تومان
        return {
            'example_user_amount': 100000,
            'commission': example['commission'],
            'tax': example['tax'],
            'total': example['total_payable'],
            'note': f"کاربر ۱۰۰,۰۰۰ تومان وارد کند → {example['total_payable']:,} تومان پرداخت می‌کند"
        }

class ServiceAdminSerializer(serializers.ModelSerializer):
    required_fields = serializers.JSONField(
        required=False,
        default=list
    )

    class Meta:
        model = Service
        fields = [
            'id',
            'title_fa', 'title_en', 'description_fa', 'description_en',
            'icon', 'banner', 'commission_type', 'commission_percent', 'commission_fixed',
            'min_amount', 'max_amount', 'tax_rate', 'delivery_time_fa', 'delivery_time_en',
            'requires_manual_review', 'is_active', 'order', 'required_fields', 'user_pricing'
        ]
        read_only_fields = ['id']

    def validate(self, attrs):
        commission_type = attrs.get('commission_type', getattr(self.instance, 'commission_type', None) if self.instance else None)
        commission_percent = attrs.get('commission_percent', getattr(self.instance, 'commission_percent', None) if self.instance else None)
        commission_fixed = attrs.get('commission_fixed', getattr(self.instance, 'commission_fixed', None) if self.instance else None)
        min_amount = attrs.get('min_amount', getattr(self.instance, 'min_amount', None) if self.instance else None)
        max_amount = attrs.get('max_amount', getattr(self.instance, 'max_amount', None) if self.instance else None)
        user_pricing = attrs.get('user_pricing', getattr(self.instance, 'user_pricing', None) if self.instance else None)

        if commission_type == 'fixed':
            if commission_fixed is not None and commission_fixed <= 0:
                # todo: add custom exception
                raise serializers.ValidationError("commission_fixed must be positive when type is fixed")
        elif commission_type == 'percent':
            if commission_percent is not None and not (0 <= commission_percent <= 100):
                # todo: add custom exception
                raise serializers.ValidationError("commission_percent must be between 0 and 100")

            if not user_pricing:
                # todo: add custom exception
                raise serializers.ValidationError("User pricing is required for percent commission type")

        if min_amount is not None and max_amount is not None and min_amount >= max_amount:
            # todo: add custom exception
            raise serializers.ValidationError("min_amount must be less than max_amount")

        return attrs

    def validate_required_fields(self, value):
        if not isinstance(value, list):
            # todo: add custom exception
            raise serializers.ValidationError("required_fields must be a list")

        allowed_types = {'text', 'number', 'file', 'photo', 'textarea', 'select'}
        for i, field in enumerate(value):
            if not isinstance(field, dict):
                # todo: add custom exception
                raise serializers.ValidationError(f"Item {i}: must be a dictionary")

            required_keys = ['type', 'label_fa', 'label_en']
            for key in required_keys:
                if key not in field:
                    # todo: add custom exception
                    raise serializers.ValidationError(f"Item {i}: '{key}' is required")

            if field['type'] not in allowed_types:
                # todo: add custom exception
                raise serializers.ValidationError(f"Item {i}: invalid type '{field['type']}'")

            if field['type'] == 'select':
                if 'options' not in field or not isinstance(field['options'], list):
                    # todo: add custom exception
                    raise serializers.ValidationError(f"Item {i}: 'options' must be a list for select type")

            # Optional: handle is_required
            if 'is_required' not in field:
                field['is_required'] = True  # default

        return value