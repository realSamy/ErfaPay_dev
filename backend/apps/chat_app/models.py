from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class ChatRoom(models.Model):
    """One chat room per customer-agent conversation"""
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer_chats')
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='agent_chats')
    created_at = models.DateTimeField(auto_now_add=True)
    last_message_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-last_message_at']

    def __str__(self):
        return f"Chat {self.id}: {self.customer.username} → {self.agent.username if self.agent else 'Unassigned'}"

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['date_time']