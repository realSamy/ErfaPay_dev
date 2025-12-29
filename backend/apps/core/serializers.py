from rest_framework import serializers
from .models import GlobalSettings

class GlobalSettingsSerializer(serializers.ModelSerializer):
    is_available_now = serializers.SerializerMethodField()

    class Meta:
        model = GlobalSettings
        fields = [
            'time_from', 'time_to', 'weekday_from', 'weekday_to',
            'global_availability', 'enable_schedule', 'is_available_now'
        ]

    def get_is_available_now(self, obj):
        return obj.is_service_available()