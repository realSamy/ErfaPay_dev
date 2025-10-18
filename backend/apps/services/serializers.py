from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceField


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name']


class ServiceFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceField
        fields = ['id', 'name', 'label', 'field_type', 'required', 'choices']


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=ServiceCategory.objects.all(), source='category', write_only=True)
    fields = ServiceFieldSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'base_price', 'pricing_type', 'is_active',
                  'category', 'category_id', 'fields', 'created_at']


