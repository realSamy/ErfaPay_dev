from django.contrib.auth import get_user_model
from django.db import models
from apps.services.models import Service


User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    data = models.JSONField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)