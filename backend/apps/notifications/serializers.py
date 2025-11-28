# apps/notifications/serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title_fa', 'title_en', 'message_fa', 'message_en', 'notification_type', 'is_read', 'link', 'created_at']
        read_only_fields = fields