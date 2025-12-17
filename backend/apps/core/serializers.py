from rest_framework import serializers
from .models import SiteSettings

class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = [
            'order_hours', 'order_availability',
            'site_name_fa', 'site_name_en', 'logo', 'logo_url',
            'favicon', 'favicon_url', 'support_email', 'support_phone',
            'support_telegram', 'tax_rate', 'min_charge_usd',
            'maintenance_mode', 'maintenance_message_fa', 'maintenance_message_en',
            'updated_at', 'updated_by'
        ]
        read_only_fields = ['updated_at', 'updated_by', 'logo_url', 'favicon_url']

    def get_logo_url(self, obj):
        return obj.logo.url if obj.logo else None

    def get_favicon_url(self, obj):
        return obj.favicon.url if obj.favicon else None