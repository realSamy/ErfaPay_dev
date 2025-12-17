from django.db import models
from django.utils import timezone


class TicketCategory(models.Model):
    title_fa = models.CharField(max_length=100, verbose_name="نام دسته‌بندی (فارسی)")
    title_en = models.CharField(max_length=100, verbose_name="Category Name (EN)")
    slug = models.SlugField(unique=True, max_length=120, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "دسته‌بندی تیکت"
        verbose_name_plural = "دسته‌بندی‌های تیکت"
        ordering = ['order', 'title_fa']

    def __str__(self):
        return self.title_fa

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title_en, allow_unicode=True)
        super().save(*args, **kwargs)


class Ticket(models.Model):
    PRIORITY_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High'), ('urgent', 'Urgent')]
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('waiting_user', 'Waiting for User'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    user = models.ForeignKey('users.UserProfile', on_delete=models.CASCADE, related_name='tickets')
    assigned_to = models.ForeignKey('users.UserProfile', on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='assigned_tickets')
    subject = models.CharField(max_length=200)
    category = models.ForeignKey(TicketCategory, on_delete=models.PROTECT, related_name='tickets')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    ticket_id = models.CharField(max_length=20, unique=True, editable=False)  # e.g. TKT-2025-0001
    is_read_by_user = models.BooleanField(default=True)
    is_read_by_admin = models.BooleanField(default=False)
    closed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.ticket_id:
            year = timezone.now().strftime('%Y')
            last = Ticket.objects.filter(ticket_id__startswith=f'TKT-{year}').count()
            self.ticket_id = f"TKT-{year}-{last + 1:04d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.ticket_id} - {self.subject}"


class TicketMessage(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey('users.UserProfile', on_delete=models.CASCADE, null=True, blank=True)
    is_from_admin = models.BooleanField(default=False)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update read status
        if self.is_from_admin:
            self.ticket.is_read_by_user = False
        else:
            self.ticket.is_read_by_admin = False
        self.ticket.save(update_fields=['is_read_by_user', 'is_read_by_admin'])


class TicketMessageAttachment(models.Model):
    attachment = models.FileField(upload_to='tickets/attachments/')
    message = models.ForeignKey(TicketMessage, on_delete=models.PROTECT, related_name='attachments')
