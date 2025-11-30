# apps/services/serializers.py
from rest_framework import serializers
from .models import Category, Service

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_fa', 'name_en', 'slug', 'icon']


class ServiceListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'title_fa', 'title_en', 'description_fa', 'description_en',
            'icon', 'commission_percent', 'commission_fixed', 'commission_type',
            'min_amount', 'max_amount', 'tax_rate', 'delivery_time_fa', 'delivery_time_en',
            'requires_manual_review', 'category'
        ]


class ServiceDetailSerializer(ServiceListSerializer):
    price_example = serializers.SerializerMethodField()

    def get_price_example(self, obj):
        example = obj.calculate_total_cost(100000)  # مثال با ۱۰۰ هزار تومان
        return {
            'example_user_amount': 100000,
            'commission': example['commission'],
            'tax': example['tax'],
            'total': example['total_payable'],
            'note': f"کاربر ۱۰۰,۰۰۰ تومان وارد کند → {example['total_payable']:,} تومان پرداخت می‌کند"
        }