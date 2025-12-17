from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.users.permissions import IsSupportStaff
from django.shortcuts import get_object_or_404
from django.utils import timezone
from apps.notifications.utils import send_notification
from .models import Ticket, TicketMessage, TicketMessageAttachment
from .serializers import TicketDetailSerializer, TicketReplySerializer

User = get_user_model()


class AdminTicketDetailView(APIView):
    permission_classes = [IsSupportStaff]

    def get(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        serializer = TicketDetailSerializer(ticket)
        # Mark as read for admin
        if not ticket.is_read_by_admin:
            ticket.is_read_by_admin = True
            ticket.save(update_fields=['is_read_by_admin'])
        return Response({'ok': True, 'data': serializer.data})


class AdminTicketListView(APIView):
    permission_classes = [IsSupportStaff]

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
    permission_classes = [IsSupportStaff]

    def post(self, request: Request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        serializer = TicketReplySerializer(data=request.data)
        if serializer.is_valid():
            message = TicketMessage.objects.create(
                ticket=ticket,
                sender=None,
                message=serializer.validated_data['message'],
                is_from_admin=True
            )
            if 'attachments' in request.FILES:
                for file in request.FILES.getlist('attachments'):
                    TicketMessageAttachment.objects.create(
                        attachment=file,
                        message=message
                    )
            ticket.is_read_by_user = False
            ticket.is_read_by_admin = True
            ticket.status = 'waiting_user'
            ticket.assigned_to = request.user
            ticket.save()

            send_notification(
                user=ticket.user,
                title_fa=f"پاسخ جدید از پشتیبانی - تیکت {ticket.ticket_id}",
                message_fa=serializer.validated_data['message'][:100] + "...",
                notification_type='ticket',
                link=f"https://erfapay.com/tickets/{ticket.ticket_id}"
            )
            return Response({'ok': True, 'message': 'http.response.tickets.admin_reply_sent',
                             'data': TicketDetailSerializer(ticket).data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)


class AdminTicketUpdateView(APIView):
    permission_classes = [IsSupportStaff]

    def patch(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        status_val = request.data.get('status')
        priority = request.data.get('priority')
        assigned_to = request.data.get('assigned_to')

        if status_val in dict(Ticket.STATUS_CHOICES):
            old_status = ticket.status
            ticket.status = status_val
            if status_val == 'resolved':
                ticket.closed_at = timezone.now()

            send_notification(
                user=ticket.user,
                title_fa=f"وضعیت تیکت شما تغییر کرد",
                message_fa=f"تیکت {ticket.ticket_id} به وضعیت «{ticket.get_status_display()}» تغییر کرد.",
                notification_type='info'
            )
        if priority in dict(Ticket.PRIORITY_CHOICES):
            ticket.priority = priority

        if assigned_to == request.user.pk:
            ticket.assigned_to = request.user

        ticket.save()

        return Response({'ok': True, 'data': TicketDetailSerializer(ticket).data})
