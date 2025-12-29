from django.db import models, transaction
from django.db.models import F
from django.utils.translation import gettext_lazy as _
from apps.users.models import UserProfile
from apps.currencies.models import CurrencyRate  # Assume this exists for rates

class Wallet(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(
        max_digits=20, decimal_places=0, default=0, 
        help_text=_('Balance in Iranian Toman (IRT)')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Wallet')
        verbose_name_plural = _('Wallets')

    def __str__(self):
        return f"Wallet for {self.user.username} - Balance: {self.balance} IRT"

class WalletTransaction(models.Model):
    TYPE_CHOICES = [
        ('charge', _('Charge')),
        ('spend', _('Spend')),
        ('adjustment', _('Adjustment')),
    ]

    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, related_name='transactions')
    amount = models.DecimalField(
        max_digits=20, decimal_places=0,
        help_text=_('Positive for charge/adjustment add, negative for spend/adjustment subtract')
    )
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    balance_after = models.DecimalField(max_digits=20, decimal_places=0, blank=True, null=True)
    reference_id = models.CharField(max_length=100, null=True, blank=True)  # Order ID or Charge ID
    description = models.TextField(blank=True)
    adjusted_by = models.ForeignKey(
        UserProfile, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='adjustments_made', help_text=_('Admin who performed adjustment')
    )
    admin_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['wallet', '-created_at'])]
        ordering = ['-created_at']
        verbose_name = _('Wallet Transaction')
        verbose_name_plural = _('Wallet Transactions')

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} IRT for {self.wallet.user.username}"

class Charge(models.Model):
    GATEWAY_CHOICES = [
        ('paypal', _('PayPal')),
        ('crypto', _('Crypto')),
        ('voucher', _('Voucher')),
    ]
    STATUS_CHOICES = [
        ('pending', _('Pending')),
        ('success', _('Success')),
        ('failed', _('Failed')),
    ]

    user = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='charges')
    foreign_amount = models.DecimalField(max_digits=10, decimal_places=2, help_text=_('Amount in foreign currency (e.g., USD)'))
    irt_amount = models.DecimalField(max_digits=20, decimal_places=0, help_text=_('Converted amount in IRT'))
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=4, help_text=_('USD to IRT rate at charge time'))
    gateway = models.CharField(max_length=20, choices=GATEWAY_CHOICES)
    gateway_reference = models.CharField(max_length=100, blank=True)  # PayPal Order ID or tx hash
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    wallet_transaction = models.OneToOneField(WalletTransaction, null=True, on_delete=models.SET_NULL)
    admin_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Charge')
        verbose_name_plural = _('Charges')

    def __str__(self):
        return f"Charge {self.id} for {self.user.username} - {self.irt_amount} IRT"

    @transaction.atomic
    def complete(self):
        if self.status != 'pending':
            return

        from apps.currencies.models import CurrencyRate
        rate = CurrencyRate.get_current_rate('USD')
        self.exchange_rate = rate
        self.irt_amount = int(self.foreign_amount * rate)
        self.status = 'success'

        wt = WalletTransaction.objects.create(
            wallet=self.user.wallet,
            amount=self.irt_amount,
            transaction_type='charge',
            reference_id=str(self.id),
            description=f"Charge via {self.get_gateway_display()}",
            admin_approved=self.admin_approved
        )
        self.wallet_transaction = wt

        # Correct balance update
        self.user.wallet.balance = F('balance') + self.irt_amount
        self.user.wallet.save(update_fields=['balance'])
        self.user.wallet.refresh_from_db()

        wt.balance_after = self.user.wallet.balance
        wt.save(update_fields=['balance_after'])

        self.save()