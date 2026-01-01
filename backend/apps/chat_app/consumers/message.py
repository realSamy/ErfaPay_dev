import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from apps.chat_app.models import ChatRoom


class MessageConsumer(WebsocketConsumer):
    def connect(self):
        room_id = self.scope['url_route']['kwargs']['room_id']
        try:
            self.room = ChatRoom.objects.get(id=room_id)
        except ChatRoom.DoesNotExist:
            self.close()
            return

        self.room_group_name = f"chat_room_{self.room.id}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def new_message(self, event):
        self.send(text_data=json.dumps({
            'type': 'new_message',
            'message': event['message']
        }))

    def disconnect(self, code):
        if hasattr(self, 'room_group_name'):
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )