from django.db import transaction
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.notifications.models import UserNotification, Notification
from apps.notifications.serializers import UserNotificationSerializer, NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        notification = serializer.save()

        # Create UserNotification for audience AFTER commit
        def create_user_notifications():
            from django.contrib.auth import get_user_model
            User = get_user_model()

            if notification.audience_type == 'all':
                users = User.objects.all()
            elif notification.audience_type == 'role' and notification.target_role:
                users = User.objects.filter(groups__name=notification.target_role)
            elif notification.audience_type == 'user' and notification.target_user:
                users = [notification.target_user]
            else:
                users = []

            user_notifications = [
                UserNotification(user=user, notification=notification)
                for user in users
            ]
            UserNotification.objects.bulk_create(user_notifications)

        transaction.on_commit(create_user_notifications)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserNotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserNotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['is_seen', 'user']

    def get_queryset(self):
        return UserNotification.objects.all()

    @action(detail=True, methods=['post'])
    def mark_as_seen(self, request, pk=None):
        try:
            user_notif = self.get_queryset().get(pk=pk)
            user_notif.is_seen = True
            user_notif.seen_at = timezone.now()
            user_notif.save()
            return Response({'status': 'marked as seen'})
        except UserNotification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)