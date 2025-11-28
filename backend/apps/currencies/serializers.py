from rest_framework import serializers
from .models import CurrencyRate

class CurrencyRateSerializer(serializers.ModelSerializer):
    rate = serializers.DecimalField(source='rate_to_irt', max_digits=24, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = CurrencyRate
        fields = ['code', 'name', 'icon', 'rate', 'updated_at']