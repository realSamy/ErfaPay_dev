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
        ('percent', 'Percent'),
        ('fixed', 'Fixed'),
    ]

    # category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='services', blank=True, default=None, null=True)

    # Bilingual
    title_fa = models.CharField(max_length=200, verbose_name="Title (FA)")
    title_en = models.CharField(max_length=200, verbose_name="Title (EN)", blank=True)
    description_fa = models.TextField(verbose_name="Description (FA)")
    description_en = models.TextField(verbose_name="Description (EN)", blank=True)

    # Visual
    icon = models.CharField(max_length=200, verbose_name="icon")
    banner = models.ImageField(upload_to='services/banners/', blank=True, null=True)

    # Pricing Model – Percentage of the fee from the amount entered by the user
    commission_type = models.CharField(max_length=10, choices=COMMISSION_TYPE_CHOICES, default='percent')
    commission_percent = models.DecimalField(
        max_digits=5, decimal_places=2,
        default=12.00,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Commission (%)"
    )
    commission_fixed = models.DecimalField(
        max_digits=12, decimal_places=0,
        default=0,
        verbose_name="Fixed Commission (Toman))",
    )

    min_amount = models.DecimalField(
        max_digits=12, decimal_places=0,
        default=10000,
        validators=[MinValueValidator(1000)],
        verbose_name="Minimum Payable Amount (Toman)"
    )
    max_amount = models.DecimalField(
        max_digits=15, decimal_places=0,
        default=100000000,
        verbose_name="Maximum Payable Amount (Toman)"
    )

    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=9.00, verbose_name="Tax Rate (%)")

    user_pricing = models.BooleanField(default=True, verbose_name="Allow user to set the amount")

    # Config
    delivery_time_fa = models.CharField(max_length=100, blank=True)
    delivery_time_en = models.CharField(max_length=100, blank=True)
    requires_manual_review = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    required_fields = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Required Fields Configuration"
    )

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ['order', 'title_fa']

    def __str__(self):
        if self.commission_type == 'percent':
            return f"{self.title_fa} ({self.commission_percent}% Fee)"
        return f"{self.title_fa} ({self.commission_fixed} Toman Fee)"

    def calculate_total_cost(self, user_amount_irt):
        """Calculate total cost including commission and tax based on user amount."""
        if user_amount_irt < self.min_amount:
            raise ValueError(f"Minimum amount is {self.min_amount:,} Toman")

        if user_amount_irt > self.max_amount:
            raise ValueError(f"Maximum amount is {self.max_amount:,} Toman")

        commission = (
            user_amount_irt * self.commission_percent
            if self.commission_type == 'percent'
            else self.commission_fixed
        )
        subtotal = user_amount_irt + commission
        tax = user_amount_irt * self.tax_rate
        total = subtotal + tax

        return {
            'user_amount': int(user_amount_irt),
            'commission': int(commission),
            'tax': int(tax),
            'total_payable': int(total),
        }