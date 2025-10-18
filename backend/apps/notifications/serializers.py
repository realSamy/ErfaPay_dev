from rest_framework import serializers
from apps.notifications.models import Notification, UserNotification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['creator', 'created_at', 'updated_at']


class UserNotificationSerializer(serializers.ModelSerializer):
    notification = NotificationSerializer(read_only=True)

    class Meta:
        model = UserNotification
        fields = ['id', 'notification', 'is_seen', 'seen_at', 'created_at']
        read_only_fields = ['created_at', 'seen_at']
