from django.contrib import admin
from .models import Category, Service
from django.utils.translation import gettext_lazy as _


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name_fa', 'name_en', 'slug', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    prepopulated_fields = {"slug": ("name_en",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_fa', 'category', 'base_price_irt', 'tax_rate', 'is_active', 'requires_manual_review']
    list_filter = ['category', 'is_active', 'requires_manual_review']
    list_editable = ['is_active']
    search_fields = ['title_fa', 'title_en']
    prepopulated_fields = {"title_en": ("title_fa",)}  # Optional helper
    fieldsets = (
        (None, {
            'fields': ('category', 'title_fa', 'title_en', 'icon', 'banner')
        }),
        (_('Pricing'), {
            'fields': ('base_price_irt', 'tax_rate')
        }),
        (_('Content'), {
            'fields': ('description_fa', 'description_en', 'delivery_time_fa', 'delivery_time_en')
        }),
        (_('Settings'), {
            'fields': ('is_active', 'requires_manual_review', 'max_quantity_per_order', 'order')
        }),
    )