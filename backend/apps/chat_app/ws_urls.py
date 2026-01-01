from django.urls import path

from apps.chat_app.consumers.message import MessageConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:room_id>/', MessageConsumer.as_asgi()),
]
