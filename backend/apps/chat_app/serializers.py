from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from apps.chat_app.models import ChatRoom, Message
from rest_framework import serializers


class MessageSerializer(serializers.Serializer):
    text = serializers.CharField()
    room_id = serializers.IntegerField(write_only=True)

    def validate_room_id(self, value):
        try:
            room = ChatRoom.objects.get(id=value)
        except ChatRoom.DoesNotExist:
            raise serializers.ValidationError("Chat room does not exist")
        return room

    def validate(self, data):
        user = self.context['request'].user
        room = data['room_id']

        # Customer can always send to their own room
        if room.customer == user:
            return data

        # Agent can send only if assigned
        if room.agent == user:
            return data

        raise serializers.ValidationError("You are not authorized to send messages in this chat")

    def create(self, validated_data):
        room = validated_data['room_id']
        message = Message.objects.create(
            room=room,
            text=validated_data['text'],
            sender=self.context['request'].user
        )
        room.save()  # Update last_message_at
        self.__broadcast(message)
        return message

    def __broadcast(self, message: Message):
        serializer = MessageModelSerializer(message)
        data = serializer.data
        data['read'] = False

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"chat_room_{message.room.id}", {
                'type': 'new_message',
                'message': data
            }
        )


class MessageModelSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    sender = serializers.CharField(source='sender.username')
    sender_id = serializers.IntegerField(source='sender.id')
    role = serializers.SerializerMethodField()
    parts = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(source='created_at', read_only=True)  # Extra for UI

    class Meta:
        model = Message
        fields = ('id', 'text', 'sender', 'sender_id', 'date_time', 'read', 'role', 'parts', 'timestamp')

    def get_role(self, obj: Message):
        return 'user' if obj.sender_id == obj.room.customer.id else 'assistant'

    def get_parts(self, obj: Message):
        return [{'type': 'text', 'text': obj.text}]

class ChatRoomSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    customer_username = serializers.CharField(source='customer.username', read_only=True)
    agent_name = serializers.CharField(source='agent.get_full_name', read_only=True, allow_null=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ('id', 'customer_name', 'customer_username', 'agent_name', 'created_at', 'last_message_at', 'last_message', 'is_active')

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return MessageModelSerializer(msg).data if msg else None

class ChatRoomDetailSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    customer_username = serializers.CharField(source='customer.username', read_only=True)
    agent_name = serializers.CharField(source='agent.get_full_name', read_only=True, allow_null=True)
    messages = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ('id', 'customer_name', 'customer_username', 'agent_name', 'created_at', 'messages', 'is_active')

    def get_messages(self, obj):
        msgs = obj.messages.all()
        return MessageModelSerializer(msgs, many=True).data