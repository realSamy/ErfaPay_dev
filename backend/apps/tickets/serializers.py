# apps/tickets/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ticket, TicketMessage

User = get_user_model()

class TicketMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True)
    sender_avatar = serializers.SerializerMethodField()

    class Meta:
        model = TicketMessage
        fields = ['id', 'message', 'attachment', 'sender_name', 'sender_avatar', 'is_from_admin', 'created_at']
        read_only_fields = fields

    def get_sender_avatar(self, obj):
        if obj.sender and obj.sender.avatar:
            return obj.sender.avatar.url
        return None


class TicketListSerializer(serializers.ModelSerializer):
    unread_user = serializers.BooleanField(source='is_read_by_user', read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ['id', 'ticket_id', 'subject', 'category', 'priority', 'status', 'unread_user', 'last_message', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return msg.message[:60] + "..." if msg and len(msg.message) > 60 else (msg.message if msg else "")


class TicketDetailSerializer(serializers.ModelSerializer):
    messages = TicketMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'ticket_id', 'subject', 'category', 'priority', 'status', 'messages', 'created_at', 'updated_at']
        read_only_fields = ['ticket_id', 'status', 'created_at', 'updated_at']


class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['subject', 'category', 'priority']

    def create(self, validated_data):
        ticket = Ticket.objects.create(
            user=self.context['request'].user,
            **validated_data
        )
        return ticket


class TicketReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketMessage
        fields = ['message', 'attachment']