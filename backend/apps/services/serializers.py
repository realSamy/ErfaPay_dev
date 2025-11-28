from rest_framework import serializers
from .models import Category, Service


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_fa', 'name_en', 'slug', 'icon']


class ServiceListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    final_price = serializers.SerializerMethodField()
    price_display = serializers.CharField(source='get_price_display', read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'title_fa', 'title_en', 'description_fa', 'description_en',
            'icon', 'delivery_time_fa', 'delivery_time_en',
            'base_price_irt', 'tax_rate', 'final_price', 'price_display',
            'requires_manual_review', 'category'
        ]

    def get_final_price(self, obj):
        return int(obj.get_final_price())


class ServiceDetailSerializer(ServiceListSerializer):
    # Same as list but can include more later
    pass