# apps/tickets/views.py

from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction
from apps.notifications.utils import send_notification
from .models import Ticket, TicketMessage, TicketMessageAttachment
from .pdf import generate_ticket_pdf
from .serializers import (
    TicketListSerializer, TicketDetailSerializer,
    TicketCreateSerializer, TicketReplySerializer
)


class TicketListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = request.user.tickets.all()
        serializer = TicketListSerializer(tickets, many=True)
        return Response({'ok': True, 'data': serializer.data})

    def post(self, request):
        serializer = TicketCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            ticket = serializer.save()
            # Auto first message
            message = TicketMessage.objects.create(
                ticket=ticket,
                sender=request.user,
                message=request.data.get('message', 'درخواست پشتیبانی جدید'),
                is_from_admin=False
            )
            if 'attachments' in request.FILES:
                for file in request.FILES.getlist('attachments'):
                    TicketMessageAttachment.objects.create(
                        attachment=file,
                        message=message
                    )
            send_notification(
                user=None,  # Will be sent to staff later via signal
                title_fa=f"تیکت جدید: {ticket.ticket_id}",
                message_fa=f"کاربر {request.user.username} تیکت جدیدی ایجاد کرد: {ticket.subject}",
                notification_type='ticket'
            )
            return Response({
                'ok': True,
                'message': 'تیکت با موفقیت ایجاد شد',
                'ticket_id': ticket.ticket_id
            }, status=status.HTTP_201_CREATED)
        return Response({'ok': False, 'errors': serializer.errors}, status=400)


class TicketDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id, user=request.user)
        serializer = TicketDetailSerializer(ticket)
        # Mark as read for user
        if not ticket.is_read_by_user:
            ticket.is_read_by_user = True
            ticket.save(update_fields=['is_read_by_user'])
        return Response({'ok': True, 'data': serializer.data})


class TicketReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id, user=request.user)
        if ticket.status == 'closed':
            return Response({'ok': False, 'error': 'تیکت بسته شده است'}, status=400)

        serializer = TicketReplySerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                message = serializer.save(
                    ticket=ticket,
                    sender=request.user,
                    is_from_admin=False
                )
                if 'attachments' in request.FILES:
                    for file in request.FILES.getlist('attachments'):
                        TicketMessageAttachment.objects.create(
                            attachment=file,
                            message=message
                        )
                if ticket.status == 'waiting_user':
                    ticket.status = 'open'
                ticket.is_read_by_admin = False
                ticket.save()

                # Notify admins
                send_notification(
                    user=None,
                    title_fa=f"پاسخ جدید در تیکت {ticket.ticket_id}",
                    message_fa=f"کاربر {request.user.username} پاسخ داد.",
                    notification_type='ticket'
                )
            return Response({'ok': True, 'message': 'http.response.tickets.reply_sent',
                             'data': TicketDetailSerializer(ticket).data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)


class TicketCloseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id, user=request.user)
        if ticket.status == 'closed':
            return Response({'ok': False, 'error': 'تیکت قبلاً بسته شده'}, status=400)

        ticket.status = 'closed'
        ticket.closed_at = timezone.now()
        ticket.save()

        send_notification(
            user=request.user,
            title_fa="تیکت شما بسته شد",
            message_fa=f"تیکت {ticket.ticket_id} با موفقیت بسته شد.",
            notification_type='success'
        )
        return Response({'ok': True, 'message': 'تیکت بسته شد', 'data': TicketDetailSerializer(ticket).data})


class TicketPDFView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id, user=request.user)
        return generate_ticket_pdf(ticket)
