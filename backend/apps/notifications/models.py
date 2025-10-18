from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    IMPORTANCE_CHOICES = [
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('critical', 'Critical'),
    ]

    AUDIENCE_TYPE_CHOICES = [
        ('all', 'All Users'),
        ('user', 'Specific User'),
        ('role', 'User Role'),
    ]

    title = models.CharField(max_length=255)
    body = models.TextField()
    importance = models.CharField(max_length=20, choices=IMPORTANCE_CHOICES, default='info')

    audience_type = models.CharField(max_length=10, choices=AUDIENCE_TYPE_CHOICES, default='all')
    target_user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='targeted_notifications')
    target_role = models.CharField(max_length=100, null=True, blank=True)

    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_notifications')

    is_active = models.BooleanField(default=True)
    scheduled_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.importance}] {self.title}"


class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_notifications')
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name='user_notifications')
    is_seen = models.BooleanField(default=False)
    seen_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'notification')  # Prevent duplicates
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification #{self.notification_id} → {self.user.username} ({'seen' if self.is_seen else 'unseen'})"