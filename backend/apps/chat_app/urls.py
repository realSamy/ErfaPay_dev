from django.urls import path

from apps.chat_app.views.message_view import StartChatView, AgentChatListView, AdminChatRoomDetailView, SendMessageView, ChatRoomDetailView

urlpatterns = [
    path('current/', ChatRoomDetailView.as_view()),
    path('start/', StartChatView.as_view()),
    path('admin/list/', AgentChatListView.as_view()),
    path('admin/room/<int:room_id>/', AdminChatRoomDetailView.as_view()),
    path('message/send/', SendMessageView.as_view()),
]
