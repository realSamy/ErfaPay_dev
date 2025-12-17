# apps/tickets/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ticket, TicketMessage, TicketCategory, TicketMessageAttachment
from apps.users.serializers import UserSerializer

User = get_user_model()

class TicketCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCategory
        fields = ['id', 'title_fa', 'title_en', 'slug', 'is_active', 'order']
        read_only_fields = ['id', 'slug']

class TicketMessageSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)  # Use pk as id
    role = serializers.SerializerMethodField()
    parts = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(source='created_at', read_only=True)  # Extra for UI

    class Meta:
        model = TicketMessage
        fields = ['id', 'role', 'parts', 'timestamp']  # Add sender_avatar if needed

    def get_role(self, obj):
        return 'assistant' if obj.is_from_admin else 'user'

    def get_parts(self, obj: TicketMessage):
        attachments = obj.attachments.all()

        return ([{'type': 'text', 'text': obj.message}]
                + [{'type': 'file', 'url': attachment.attachment.url, 'filename': attachment.attachment.name.split('/')[-1]} for attachment in attachments])

class TicketListSerializer(serializers.ModelSerializer):
    category = TicketCategorySerializer(read_only=True)
    unread_user = serializers.BooleanField(source='is_read_by_user', read_only=True)
    last_message = serializers.SerializerMethodField()
    assigned_to = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ['id', 'ticket_id', 'subject', 'category', 'priority', 'status', 'unread_user', 'last_message', 'created_at', 'updated_at', 'assigned_to']

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return msg.message[:60] + "..." if msg and len(msg.message) > 60 else (msg.message if msg else "")

    def get_assigned_to(self, obj):
        if obj.assigned_to:
            return UserSerializer(obj.assigned_to).data
        return None


class TicketDetailSerializer(serializers.ModelSerializer):
    category = TicketCategorySerializer(read_only=True)
    messages = TicketMessageSerializer(many=True, read_only=True)
    assigned_to = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ['id', 'ticket_id', 'subject', 'category', 'priority', 'status', 'messages', 'created_at', 'updated_at', 'user', 'assigned_to']
        read_only_fields = ['ticket_id', 'status', 'created_at', 'updated_at', 'user', 'assigned_to']

    def get_assigned_to(self, obj):
        if obj.assigned_to:
            return UserSerializer(obj.assigned_to).data
        return None

    def get_user(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return None




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
        fields = ['message']
