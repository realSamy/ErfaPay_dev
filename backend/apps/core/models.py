from django.db import models
from django.core.cache import cache
from django.contrib.auth import get_user_model
from datetime import datetime, time
from django.utils import timezone

User = get_user_model()

class SiteSettings(models.Model):
    # === Order Hours & Availability (from your admin page) ===
    order_hours = models.JSONField(
        default=dict,
        help_text="Example: {'from': '09:00', 'to': '18:00', 'days': ['Saturday', 'Sunday', ...]}"
    )
    order_availability = models.BooleanField(
        default=True,
        verbose_name="Order placement enabled"
    )

    # === Branding ===
    site_name_fa = models.CharField(max_length=100, default="ErfaPay", verbose_name="نام سایت (فارسی)")
    site_name_en = models.CharField(max_length=100, default="ErfaPay", verbose_name="Site Name (EN)")
    logo = models.ImageField(upload_to='site/', blank=True, null=True, verbose_name="لوگو")
    favicon = models.ImageField(upload_to='site/', blank=True, null=True, verbose_name="Favicon")

    # === Support Info ===
    support_email = models.EmailField(default="support@erfapay.com")
    support_phone = models.CharField(max_length=20, default="+98 21 1234 5678")
    support_telegram = models.CharField(max_length=100, blank=True)

    # === Financial Settings ===
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=9.00, verbose_name="Tax Rate (%)")
    min_charge_usd = models.DecimalField(max_digits=8, decimal_places=2, default=1.00, verbose_name="Min Charge (USD)")

    # === Maintenance & Messages ===
    maintenance_mode = models.BooleanField(default=False, verbose_name="Maintenance Mode")
    maintenance_message_fa = models.TextField(blank=True, verbose_name="پیام تعمیرات (فارسی)")
    maintenance_message_en = models.TextField(blank=True, verbose_name="Maintenance Message (EN)")

    # === Audit ===
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        'users.UserProfile', on_delete=models.SET_NULL, null=True, blank=True,
        related_name='settings_updates', verbose_name="آخرین ویرایش توسط"
    )

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def save(self, *args, **kwargs):
        self.pk = 1  # Force singleton
        super().save(*args, **kwargs)
        cache.delete('site_settings')

    def __str__(self):
        return "ErfaPay Site Settings"

    @classmethod
    def get_settings(cls):
        """Cached singleton access – use this everywhere"""
        cached = cache.get('site_settings')
        if cached:
            return cached
        obj, created = cls.objects.get_or_create(pk=1)
        cache.set('site_settings', obj, timeout=60*60*24)  # 24h
        return obj

    @classmethod
    def is_order_allowed_now(cls) -> bool:
        """
        Returns True if orders are allowed right now.
        Considers:
        - Global toggle (order_availability)
        - Scheduled hours (order_hours)
        """
        settings = cls.get_settings()

        # 1. Global toggle off → blocked
        if not settings.order_availability:
            return False

        # 2. If no schedule defined → allow 24/7
        if not settings.order_hours:
            return True

        hours = settings.order_hours
        if not all(k in hours for k in ('from', 'to', 'days')):
            return True  # Malformed → default allow

        try:
            start_str = hours['from']  # "09:00"
            end_str = hours['to']  # "18:00"
            allowed_days = hours['days']  # ["Saturday", "Sunday", ...]

            start_time = datetime.strptime(start_str, "%H:%M").time()
            end_time = datetime.strptime(end_str, "%H:%M").time()

            now = timezone.localtime()  # Tehran time
            current_time = now.time()
            current_weekday = now.strftime("%A")  # "Monday", "Tuesday", ...

            # Check day
            if current_weekday not in allowed_days:
                return False

            # Check time range
            if start_time <= end_time:
                return start_time <= current_time <= end_time
            else:  # Overnight (e.g. 22:00 → 06:00)
                return current_time >= start_time or current_time <= end_time

        except Exception:
            # Any parsing error → default to ALLOW (fail-open)
            return True

        return True

    @classmethod
    def get_availability_message(cls) -> str:
        settings = cls.get_settings()
        if not settings.order_availability:
            return "سفارش‌گیری در حال حاضر غیرفعال است."

        if not settings.order_hours:
            return "سفارش‌گیری ۲۴ ساعته فعال است."

        h = settings.order_hours
        days_fa = {'Monday': 'دوشنبه', 'Tuesday': 'سه‌شنبه', 'Wednesday': 'چهارشنبه',
                   'Thursday': 'پنج‌شنبه', 'Friday': 'جمعه', 'Saturday': 'شنبه', 'Sunday': 'یکشنبه'}
        days = ', '.join(days_fa.get(d, d) for d in h.get('days', []))
        return f"ساعات سفارش‌گیری: {h['from']} تا {h['to']} – {days}"