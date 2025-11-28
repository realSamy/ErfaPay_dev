from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
from apps.currencies.models import CurrencyRate  # For future dynamic pricing
from django.contrib.contenttypes.fields import GenericRelation


class Category(models.Model):
    name_fa = models.CharField(max_length=100, verbose_name=_("Category Name (FA)"))
    name_en = models.CharField(max_length=100, verbose_name=_("Category Name (EN)"))
    slug = models.SlugField(unique=True, max_length=120)
    icon = models.ImageField(upload_to='categories/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        ordering = ['order', 'name_fa']

    def __str__(self):
        return self.name_fa


class Service(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='services')

    # Bilingual fields
    title_fa = models.CharField(max_length=200, verbose_name=_("Title (FA)"))
    title_en = models.CharField(max_length=200, verbose_name=_("Title (EN)"))
    description_fa = models.TextField(verbose_name=_("Description (FA)"))
    description_en = models.TextField(verbose_name=_("Description (EN)"), blank=True)

    # Visual
    icon = models.ImageField(upload_to='services/icons/', help_text=_("Uploaded by ErfaPay management"))
    banner = models.ImageField(upload_to='services/banners/', blank=True, null=True)

    # Pricing (in IRT - Iranian Toman)
    base_price_irt = models.DecimalField(
        max_digits=20, decimal_places=0,
        validators=[MinValueValidator(1)],
        verbose_name=_("Base Price (IRT)")
    )
    tax_rate = models.DecimalField(
        max_digits=5, decimal_places=2, default=9.00,
        help_text=_("Tax rate in percent (e.g., 9.00 for 9%)")
    )

    # Features & Config
    delivery_time_fa = models.CharField(max_length=100, blank=True, verbose_name=_("Delivery Time (FA)"))
    delivery_time_en = models.CharField(max_length=100, blank=True, verbose_name=_("Delivery Time (EN)"))
    is_active = models.BooleanField(default=True)
    requires_manual_review = models.BooleanField(
        default=False,
        help_text=_("If true, order goes to 'pending admin approval' after payment")
    )
    max_quantity_per_order = models.PositiveIntegerField(default=10)
    order = models.PositiveIntegerField(default=0)

    # Relations
    orders = GenericRelation('orders.Order', related_query_name='service_order')

    class Meta:
        verbose_name = _("Service")
        verbose_name_plural = _("Services")
        ordering = ['category__order', 'order', 'title_fa']
        unique_together = ['category', 'title_fa']

    def __str__(self):
        return f"{self.title_fa} ({self.category.name_fa})"

    def get_final_price(self):
        """Returns total price including tax"""
        tax_amount = self.base_price_irt * (self.tax_rate / 100)
        return self.base_price_irt + tax_amount

    def get_price_display(self):
        return f"{int(self.base_price_irt):,} IRT"