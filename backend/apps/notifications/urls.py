from rest_framework.routers import DefaultRouter
from apps.notifications.views import NotificationViewSet, UserNotificationViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notifications')
router.register(r'user_notifications', UserNotificationViewSet, basename='user notifications')

urlpatterns = router.urls
