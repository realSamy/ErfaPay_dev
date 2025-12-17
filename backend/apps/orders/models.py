from django.db import models, transaction
from django.db.models import F


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('done', 'Done'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey('users.UserProfile', on_delete=models.PROTECT, related_name='orders')
    service = models.ForeignKey('services.Service', on_delete=models.PROTECT, related_name='orders')

    # Pricing fields (calculated at creation)
    user_amount_irt = models.DecimalField(max_digits=20, decimal_places=0, help_text="Amount user entered")
    commission_irt = models.DecimalField(max_digits=20, decimal_places=0)
    tax_amount = models.DecimalField(max_digits=20, decimal_places=0)
    total_irt = models.DecimalField(max_digits=20, decimal_places=0, help_text="Final amount deducted")

    usd_irt_rate = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    custom_data = models.JSONField(default=dict, blank=True)  # link, username, quantity, etc.
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    wallet_transaction = models.OneToOneField(
        'payments.WalletTransaction', null=True, blank=True, on_delete=models.SET_NULL
    )
    receipt = models.FileField(upload_to='receipts/', null=True, blank=True)

    # Admin fields
    processed_by = models.ForeignKey(
        'users.UserProfile', on_delete=models.SET_NULL, null=True, blank=True,
        related_name='processed_orders', help_text="Admin who is handling this order"
    )
    admin_notes = models.TextField(blank=True, help_text="Internal admin notes")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['status', 'processed_by'])]

    def __str__(self):
        return f"Order {self.id} - {self.service.title_fa} - {self.total_irt:,} IRT"

    @transaction.atomic
    def pay_from_wallet(self):
        if self.status != 'pending':
            raise ValueError("Order already processed")

        if self.user.wallet.balance < self.total_irt:
            raise ValueError("Insufficient balance")

        from apps.currencies.models import CurrencyRate
        self.usd_irt_rate = CurrencyRate.get_current_rate('USD')

        # Deduct from wallet
        from apps.payments.models import WalletTransaction
        wt = WalletTransaction.objects.create(
            wallet=self.user.wallet,
            amount=-self.total_irt,
            transaction_type='spend',
            reference_id=str(self.id),
            description=f"Order {self.id}: {self.service.title_fa}",
            balance_after=F('wallet__balance') - self.total_irt
        )
        self.wallet_transaction = wt
        self.user.wallet.balance = F('balance') - self.total_irt
        self.user.wallet.save(update_fields=['balance'])
        wt.refresh_from_db()
        wt.balance_after = self.user.wallet.balance
        wt.save(update_fields=['balance_after'])

        self.status = 'processing' if self.service.requires_manual_review else 'done'
        self.save()