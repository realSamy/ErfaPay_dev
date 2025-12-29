from django.db import models
from django.utils import timezone
from decimal import Decimal


class CurrencyRate(models.Model):
    """
    نرخ تبدیل ارزهای خارجی به تومان (IRT)
    فقط یک ردیف برای هر ارز وجود دارد (unique code)
    """
    CODE_CHOICES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
        ('BTC', 'Bitcoin'),
        ('USDT', 'Tether USDT'),
        ('TRX', 'TRON'),
        # می‌تونی بعدا اضافه کنی
    ]

    code = models.CharField(max_length=10, unique=True, choices=CODE_CHOICES)
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    rate_to_irt = models.DecimalField(
        max_digits=24, decimal_places=2,
        help_text="نرخ تبدیل ۱ واحد این ارز به تومان (IRT)"
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
        """استفاده در همه جای پروژه (شارژ، سفارش و ...)"""
        try:
            rate_obj = cls.objects.get(code=code)
            return rate_obj.rate_to_irt
        except cls.DoesNotExist:
            # fallback منطقی (مثلاً نرخ ثابت در صورت خطا)
            fallback_rates = {
                'USD': Decimal('620000'),   # 62,000 تومان
                'USDT': Decimal('620000'),
            }
            return fallback_rates.get(code, Decimal('620000'))