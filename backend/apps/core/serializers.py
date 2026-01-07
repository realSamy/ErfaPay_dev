from rest_framework import serializers
from .models import GlobalSettings

class GlobalSettingsSerializer(serializers.ModelSerializer):
    is_available_now = serializers.SerializerMethodField()
    erfapay_phones = serializers.SerializerMethodField()

    class Meta:
        model = GlobalSettings
        fields = [
            'time_from', 'time_to', 'weekday_from', 'weekday_to',
            'global_availability', 'enable_schedule', 'is_available_now',
            'erfapay_phone', 'erfapay_phone2','erfapay_email', 'erfapay_social', 'erfapay_address', 'erfapay_phones'
        ]
        optional_fields = '__all__'

    def get_is_available_now(self, obj):
        return obj.is_service_available()

    def get_erfapay_phones(self, obj):
        phone1 = obj.erfapay_phone
        phone2 = obj.erfapay_phone2
        phones = [phone for phone in [phone1, phone2] if phone]
        return ' - '.join(phones)