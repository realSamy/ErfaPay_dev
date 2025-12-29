import secrets

from django.utils import timezone
from django.conf import settings
from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserProfile(AbstractUser):
    ROLE_CHOICES = [
        ('regular', _('Regular User')),
        ('simple_support', _('Simple Support')),
        ('senior_support', _('Senior Support')),
        ('main_admin', _('Main Admin')),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='regular')
    phone_prefix = models.CharField(max_length=10, blank=True)  # e.g., '+98'
    country_code = models.CharField(max_length=3, blank=True)  # e.g., 'IR'
    is_verified = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"

class OTPCode(models.Model):
    OTP_TYPE_CHOICES = [
        ('login', 'Login'),
        ('signup', 'Sign Up'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField(blank=True, null=True)  # For signup (pre-user)
    code = models.CharField(max_length=5)
    otp_type = models.CharField(max_length=10, choices=OTP_TYPE_CHOICES, default='login')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'OTP Code'
        verbose_name_plural = 'OTP Codes'

    def save(self, *args, **kwargs):
        if not self.pk:  # New instance
            self.code = str(secrets.randbelow(90000) + 10000)
            self.expires_at = timezone.now() + timedelta(minutes=5)
        super().save(*args, **kwargs)

    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at

    def mark_used(self):
        self.is_used = True
        self.save()