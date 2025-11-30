from django.urls import path
from .views import CurrencyRatesView
urlpatterns = [
    path('latest/', CurrencyRatesView.as_view())
]