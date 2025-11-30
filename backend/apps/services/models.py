# apps/services/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    name_fa = models.CharField(max_length=100, verbose_name=_("نام دسته‌بندی (فارسی)"))
    name_en = models.CharField(max_length=100, verbose_name=_("Category Name (EN)"))
    slug = models.SlugField(unique=True, max_length=120)
    icon = models.ImageField(upload_to='categories/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "دسته‌بندی خدمات"
        verbose_name_plural = "دسته‌بندی‌ها"
        ordering = ['order']

    def __str__(self):
        return self.name_fa


class Service(models.Model):
    COMMISSION_TYPE_CHOICES = [
        ('percent', 'درصدی'),
        ('fixed', 'مقداری ثابت'),
    ]

    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='services')

    # Bilingual
    title_fa = models.CharField(max_length=200, verbose_name="عنوان سرویس (فارسی)")
    title_en = models.CharField(max_length=200, verbose_name="Title (EN)", blank=True)
    description_fa = models.TextField(verbose_name="توضیحات (فارسی)")
    description_en = models.TextField(verbose_name="Description (EN)", blank=True)

    # Visual
    icon = models.ImageField(upload_to='services/icons/', verbose_name="آیکون")
    banner = models.ImageField(upload_to='services/banners/', blank=True, null=True)

    # Pricing Model – درصد کارمزد از مبلغ وارد شده توسط کاربر
    commission_type = models.CharField(max_length=10, choices=COMMISSION_TYPE_CHOICES, default='percent')
    commission_percent = models.DecimalField(
        max_digits=5, decimal_places=2,
        default=12.00,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="کارمزد (%)"
    )
    commission_fixed = models.DecimalField(
        max_digits=12, decimal_places=0,
        default=0,
        verbose_name="کارمزد ثابت (تومان)",
        help_text="اگر نوع کارمزد 'مقداری ثابت' باشد"
    )

    min_amount = models.DecimalField(
        max_digits=12, decimal_places=0,
        default=10000,
        validators=[MinValueValidator(1000)],
        verbose_name="حداقل مبلغ قابل پرداخت (تومان)"
    )
    max_amount = models.DecimalField(
        max_digits=15, decimal_places=0,
        default=100000000,
        verbose_name="حداکثر مبلغ قابل پرداخت (تومان)"
    )

    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=9.00, verbose_name="مالیات (%)")

    # Config
    delivery_time_fa = models.CharField(max_length=100, blank=True, verbose_name="زمان تحویل (فارسی)")
    delivery_time_en = models.CharField(max_length=100, blank=True)
    requires_manual_review = models.BooleanField(default=True, verbose_name="نیاز به بررسی دستی؟")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "سرویس"
        verbose_name_plural = "سرویس‌ها"
        ordering = ['category__order', 'order', 'title_fa']

    def __str__(self):
        return f"{self.title_fa} ({self.commission_percent}% کارمزد)"

    def calculate_total_cost(self, user_amount_irt):
        """محاسبه مبلغ نهایی که کاربر باید پرداخت کند"""
        if user_amount_irt < self.min_amount:
            raise ValueError(f"حداقل مبلغ {self.min_amount:,} تومان است")

        if user_amount_irt > self.max_amount:
            raise ValueError(f"حداکثر مبلغ {self.max_amount:,} تومان است")

        commission = (
            user_amount_irt * (self.commission_percent / 100)
            if self.commission_type == 'percent'
            else self.commission_fixed
        )
        subtotal = user_amount_irt + commission
        tax = subtotal * (self.tax_rate / 100)
        total = subtotal + tax

        return {
            'user_amount': int(user_amount_irt),
            'commission': int(commission),
            'tax': int(tax),
            'total_payable': int(total),
        }