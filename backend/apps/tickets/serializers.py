from rest_framework import serializers
from .models import Ticket, TicketCategory, TicketMessage, TicketAttachment
from django.contrib.auth import get_user_model

User = get_user_model()


class TicketCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCategory
        fields = ['id', 'name']


class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = ['id', 'file']


class TicketMessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    uploaded_files = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=False, use_url=True),
        write_only=True,
        required=False
    )

    class Meta:
        model = TicketMessage
        fields = ['id', 'ticket', 'sender', 'message', 'is_staff', 'created_at', 'attachments', 'uploaded_files']

    def create(self, validated_data):
        uploaded_files = validated_data.pop('uploaded_files', [])
        message = TicketMessage.objects.create(**validated_data)

        for file in uploaded_files:
            TicketAttachment.objects.create(message=message, file=file)

        return message


class TicketSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_staff=True), required=False)
    messages = TicketMessageSerializer(many=True, read_only=True)
    category = TicketCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=TicketCategory.objects.filter(is_active=True), source='category', write_only=True
    )

    class Meta:
        model = Ticket
        fields = [
            'id', 'subject', 'category', 'category_id', 'status', 'priority',
            'user', 'assigned_to', 'created_at', 'updated_at', 'messages'
        ]

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
