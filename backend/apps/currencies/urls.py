from django.urls import path
from .views import LatestPricesAPIView

urlpatterns = [
    path('latest/', LatestPricesAPIView.as_view(), name='latest-prices'),
]