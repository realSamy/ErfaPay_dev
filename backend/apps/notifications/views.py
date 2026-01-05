# apps/notifications/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from config import exceptions
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = request.user.notifications.all()[:50]
        unread_count = request.user.notifications.filter(is_read=False).count()
        serializer = NotificationSerializer(notifications, many=True)
        return Response({
            'ok': True,
            'unread_count': unread_count,
            'data': serializer.data
        })

class NotificationMarkReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        if pk:
            try:
                notif = request.user.notifications.get(pk=pk)
                notif.mark_as_read()
                return Response({'ok': True})
            except Notification.DoesNotExist:
                raise exceptions.NotificationNotFoundException
        else:
            request.user.notifications.filter(is_read=False).update(is_read=True)
            return Response({'ok': True, 'message': 'All marked as read'})