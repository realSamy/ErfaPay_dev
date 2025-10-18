from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    PRICING_TYPE_CHOICES = [
        ('fixed', 'Fixed Price'),
        ('per_item', 'Per Item'),
    ]

    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='services')

    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    pricing_type = models.CharField(max_length=20, choices=PRICING_TYPE_CHOICES, default='fixed')

    is_active = models.BooleanField(default=True)
    icon = models.ImageField(upload_to='services/icons/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ServiceField(models.Model):
    FIELD_TYPE_CHOICES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('email', 'Email'),
        ('file', 'File Upload'),
        ('select', 'Dropdown'),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='fields')
    name = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPE_CHOICES)
    required = models.BooleanField(default=True)
    choices = models.TextField(blank=True, help_text="Comma-separated values (used only if field_type is 'select')")

    def __str__(self):
        return f"{self.service.title} - {self.label}"
