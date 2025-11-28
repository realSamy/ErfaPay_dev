# apps/notifications/urls.py
from django.urls import path
from .views import NotificationListView, NotificationMarkReadView

urlpatterns = [
    path('list/', NotificationListView.as_view(), name='list'),
    path('read/<int:pk>/', NotificationMarkReadView.as_view(), name='read-one'),
    path('read-all/', NotificationMarkReadView.as_view(), name='read-all'),
]