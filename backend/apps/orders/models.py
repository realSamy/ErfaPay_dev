from django.db import models, transaction
from django.db.models import F
from django.utils.translation import gettext_lazy as _

from apps.payments.models import WalletTransaction
from apps.users.models import UserProfile
from apps.services.models import Service  # Assume Service model exists
from apps.currencies.models import CurrencyRate  # For rate

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', _('Pending')),
        ('processing', _('Processing')),
        ('done', _('Done')),
        ('rejected', _('Rejected')),
    ]

    user = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='orders')
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name='orders')
    amount_irt = models.DecimalField(max_digits=20, decimal_places=0, help_text=_('Base amount in IRT'))
    tax_amount = models.DecimalField(max_digits=20, decimal_places=0, help_text=_('Tax in IRT'))
    total_irt = models.DecimalField(max_digits=20, decimal_places=0, help_text=_('Total in IRT'))
    usd_irt_rate = models.DecimalField(max_digits=10, decimal_places=4, help_text=_('USD/IRT rate at order time'))
    custom_data = models.JSONField(default=dict, blank=True)  # Docs, files, etc.
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    wallet_transaction = models.OneToOneField('payments.WalletTransaction', null=True, on_delete=models.SET_NULL)
    receipt = models.FileField(upload_to='receipts/', null=True, blank=True)  # PDF
    notes = models.TextField(blank=True)
    processed_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='processed_orders')
    admin_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')

    def __str__(self):
        return f"Order {self.id} for {self.user.username} - {self.total_irt} IRT"

    @transaction.atomic
    def pay_from_wallet(self):
        if self.status != 'pending' or self.user.wallet.balance < self.total_irt:
            raise ValueError("Cannot pay")
        rate = CurrencyRate.get_current_rate('USD')
        self.usd_irt_rate = rate
        self.tax_amount = int(self.amount_irt * (self.service.tax_rate / 100))  # Assume SiteSettings
        self.total_irt = self.amount_irt + self.tax_amount
        self.status = 'processing'

        wt = WalletTransaction.objects.create(
            wallet=self.user.wallet,
            amount=-self.total_irt,
            transaction_type='spend',
            reference_id=str(self.id),
            description=f"Order {self.id} for service {self.service.title_en}",
            admin_approved=True
        )
        self.wallet_transaction = wt
        self.user.wallet.balance = F('balance') - self.total_irt
        self.user.wallet.save(update_fields=['balance'])
        wt.balance_after = self.user.wallet.balance
        wt.save()
        self.save()