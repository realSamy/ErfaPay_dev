from django.db import models

class MarketPrice(models.Model):
    SOURCE_CHOICES = [
        ('tehran_cgf', 'Currencies Source'),
        ('nobitex_spot', 'Cryptocurrencies Source'),
    ]

    source = models.CharField(max_length=32, choices=SOURCE_CHOICES)
    market = models.CharField(max_length=16)
    name = models.CharField(max_length=16)
    code = models.CharField(max_length=16)
    icon = models.CharField(max_length=32)
    rate = models.DecimalField(max_digits=20, decimal_places=2)
    updated_at = models.DateTimeField()

    class Meta:
        unique_together = ('source', 'market')
