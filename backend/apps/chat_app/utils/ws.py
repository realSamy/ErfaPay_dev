from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def broadcast(room_id, data):
    data['read'] = False

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"chat_room_{room_id}", {
            'type': 'new_message',
            'message': data
        }
    )

def room_end(room_id):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"chat_room_{room_id}", {
            'type': 'room_end',
        }
    )

def introduce_agent(room_id, agent):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"chat_room_{room_id}", {
            'type': 'introduce_agent',
            'agent': agent
        }
    )