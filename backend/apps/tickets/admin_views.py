# apps/tickets/admin_views.py
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from apps.notifications.utils import send_notification
from .models import Ticket, TicketMessage
from .serializers import TicketDetailSerializer, TicketReplySerializer

User = get_user_model()

class AdminTicketListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        tickets = Ticket.objects.all().select_related('user').prefetch_related('messages')
        status_filter = request.query_params.get('status')
        priority = request.query_params.get('priority')
        search = request.query_params.get('q')

        if status_filter:
            tickets = tickets.filter(status=status_filter)
        if priority:
            tickets = tickets.filter(priority=priority)
        if search:
            tickets = tickets.filter(Q(subject__icontains=search) | Q(ticket_id__icontains=search))

        serializer = TicketDetailSerializer(tickets, many=True)
        return Response({'ok': True, 'data': serializer.data})


class AdminTicketReplyView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        serializer = TicketReplySerializer(data=request.data)
        if serializer.is_valid():
            TicketMessage.objects.create(
                ticket=ticket,
                sender=None,
                message=serializer.validated_data['message'],
                attachment=serializer.validated_data.get('attachment'),
                is_from_admin=True
            )
            ticket.is_read_by_user = False
            ticket.is_read_by_admin = True
            ticket.status = 'waiting_user'
            ticket.save()

            send_notification(
                user=ticket.user,
                title_fa=f"پاسخ جدید از پشتیبانی - تیکت {ticket.ticket_id}",
                message_fa=serializer.validated_data['message'][:100] + "...",
                notification_type='ticket',
                link=f"https://erfapay.com/tickets/{ticket.ticket_id}"
            )
            return Response({'ok': True, 'message': 'پاسخ ادمین ثبت شد'})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)


class AdminTicketUpdateView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        status_val = request.data.get('status')
        priority = request.data.get('priority')

        if status_val in dict(Ticket.STATUS_CHOICES):
            old_status = ticket.status
            ticket.status = status_val
            if status_val == 'resolved':
                ticket.closed_at = timezone.now()
            ticket.save()

            send_notification(
                user=ticket.user,
                title_fa=f"وضعیت تیکت شما تغییر کرد",
                message_fa=f"تیکت {ticket.ticket_id} به وضعیت «{ticket.get_status_display()}» تغییر کرد.",
                notification_type='info'
            )
        if priority in dict(Ticket.PRIORITY_CHOICES):
            ticket.priority = priority
            ticket.save()

        return Response({'ok': True, 'ticket': TicketDetailSerializer(ticket).data})