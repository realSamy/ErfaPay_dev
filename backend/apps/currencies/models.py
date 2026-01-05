from django.db import models
from django.utils import timezone
from decimal import Decimal


class CurrencyRate(models.Model):
    CODE_CHOICES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
        ('BTC', 'Bitcoin'),
        ('USDT', 'Tether USDT'),
        ('TRX', 'TRON'),
    ]

    code = models.CharField(max_length=10, unique=True, choices=CODE_CHOICES)
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    rate_to_irt = models.DecimalField(
        max_digits=24, decimal_places=2,
        help_text="Exchange rate to Iranian Rial (IRT)"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Currency Rate"
        verbose_name_plural = "Currency Rates"
        ordering = ['code']

    def __str__(self):
        return f"{self.code} → {self.rate_to_irt:,} IRT"

    @classmethod
    def get_current_rate(cls, code: str) -> Decimal:
        try:
            rate_obj = cls.objects.get(code=code)
            return rate_obj.rate_to_irt
        except cls.DoesNotExist:
            fallback_rates = {
                'USD': Decimal('620000'),
                'USDT': Decimal('620000'),
            }
            return fallback_rates.get(code, Decimal('620000'))
