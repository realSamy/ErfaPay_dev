# apps/services/serializers.py
from rest_framework import serializers
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
            'requires_manual_review', 'is_active', 'icon', 'banner'
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
    # category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Service
        fields = [
            'id',
            # 'category',
            'title_fa', 'title_en', 'description_fa', 'description_en',
            'icon', 'banner', 'commission_type', 'commission_percent', 'commission_fixed',
            'min_amount', 'max_amount', 'tax_rate', 'delivery_time_fa', 'delivery_time_en',
            'requires_manual_review', 'is_active', 'order'
        ]
        read_only_fields = ['id']

    def validate(self, attrs):
        # Only run commission/min-max checks if relevant fields are being updated
        commission_type = attrs.get('commission_type', self.instance.commission_type if self.instance else None)
        commission_percent = attrs.get('commission_percent',
                                       getattr(self.instance, 'commission_percent', None) if self.instance else None)
        commission_fixed = attrs.get('commission_fixed',
                                     getattr(self.instance, 'commission_fixed', None) if self.instance else None)
        min_amount = attrs.get('min_amount', getattr(self.instance, 'min_amount', None) if self.instance else None)
        max_amount = attrs.get('max_amount', getattr(self.instance, 'max_amount', None) if self.instance else None)

        if commission_type == 'fixed':
            if commission_fixed is not None and commission_fixed <= 0:
                raise serializers.ValidationError("commission_fixed must be positive when type is fixed")
        elif commission_type == 'percent':
            if commission_percent is not None and not (0 <= commission_percent <= 100):
                raise serializers.ValidationError("commission_percent must be between 0 and 100")

        if min_amount is not None and max_amount is not None:
            if min_amount >= max_amount:
                raise serializers.ValidationError("min_amount must be less than max_amount")

        return attrs