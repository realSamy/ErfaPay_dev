from django.urls import path
from .admin_views import SiteSettingsView

urlpatterns = [
    path('', SiteSettingsView.as_view(), name='site-settings'),
]