from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.chat_app.models import ChatRoom
from apps.chat_app.serializers import MessageSerializer, ChatRoomSerializer, ChatRoomDetailSerializer
from apps.users.permissions import IsSupportStaff


class ChatRoomDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get current active chat for the user (customer or agent)
        try:
            room = ChatRoom.objects.filter(customer=request.user, is_active=True).select_related('customer', 'agent').first()

            if not room:
                return Response({"ok": False, "error": "No active chat found"}, status=404)

            return Response(ChatRoomDetailSerializer(room).data)
        except ChatRoom.DoesNotExist:
            return Response({"ok": False, "error": "No active chat found"}, status=404)


class StartChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Customer starts a new chat (no agent yet)
        room = ChatRoom.objects.create(customer=request.user)
        return Response(ChatRoomSerializer(room).data, status=201)

class AgentChatListView(APIView):
    permission_classes = [IsAuthenticated, IsSupportStaff]

    def get(self, request):
        # All active chats (assigned + unassigned for agents to pick)
        rooms = ChatRoom.objects.filter(is_active=True).select_related('customer', 'agent')
        return Response(ChatRoomSerializer(rooms, many=True).data)

class AdminChatRoomDetailView(APIView):
    permission_classes = [IsAuthenticated, IsSupportStaff]

    def get(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id)
            return Response(ChatRoomDetailSerializer(room).data)
        except ChatRoom.DoesNotExist:
            return Response({"ok": False, "error": "Chat not found"}, status=400)

    def patch(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, agent__isnull=True)
            room.agent = request.user
            room.save()
            return Response(ChatRoomDetailSerializer(room).data)
        except ChatRoom.DoesNotExist:
            return Response({"error": "Chat not found or already assigned"}, status=400)

    def delete(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, agent=request.user)
            room.is_active = False
            room.save()
            return Response({"ok": True})
        except ChatRoom.DoesNotExist:
            return Response({"ok": False, "error": "Chat not found"}, status=400)



class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MessageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "sent"})
        return Response(serializer.errors, status=400)