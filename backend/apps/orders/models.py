from django.db import models, transaction
from django.db.models import F

from config import exceptions


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

    custom_data = models.JSONField(default=list, blank=True)  # link, username, quantity, etc.
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
            raise exceptions.OrderAlreadyProcessedException

        wallet = self.user.wallet
        if wallet.balance < self.total_irt:
            raise exceptions.InsufficientBalanceException

        from apps.currencies.models import CurrencyRate
        self.usd_irt_rate = CurrencyRate.get_current_rate('USD')

        # Deduct from wallet balance atomically
        updated_rows = wallet.__class__.objects.filter(
            id=wallet.id,
            balance__gte=self.total_irt
        ).update(balance=F('balance') - self.total_irt)

        if updated_rows == 0:
            raise exceptions.InsufficientBalanceException

        # Refresh wallet balance from DB
        wallet.refresh_from_db(fields=['balance'])
        new_balance = wallet.balance

        # Create transaction record
        from apps.payments.models import WalletTransaction
        wt = WalletTransaction.objects.create(
            wallet=wallet,
            amount=-self.total_irt,
            transaction_type='spend',
            reference_id=str(self.id),
            description=f"Order {self.id}: {self.service.title_fa}",
            balance_after=new_balance
        )

        self.wallet_transaction = wt
        self.save(update_fields=['usd_irt_rate', 'wallet_transaction', 'status'])

        return wt


class OrderAttachment(models.Model):
    attachment = models.FileField(upload_to='orders/attachments/')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='attachments')
