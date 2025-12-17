from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsSeniorSupportOrAbove
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Order
from .serializers import OrderListSerializer, OrderCreateSerializer
from .pdf import generate_order_receipt
from apps.notifications.utils import send_notification

# === User Endpoints ===
class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = request.user.orders.select_related('service').all()
        serializer = OrderListSerializer(orders, many=True)
        return Response({'ok': True, 'data': serializer.data})


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response({'ok': False, 'errors': serializer.errors}, status=400)

        with transaction.atomic():
            order = serializer.save()
            try:
                order.pay_from_wallet()
                send_notification(
                    user=request.user,
                    title_fa="سفارش شما ثبت شد",
                    message_fa=f"سفارش {order.id} با موفقیت پرداخت شد و در حال بررسی است.",
                    notification_type='order'
                )
                return Response({
                    'ok': True,
                    'message': 'Order created and paid successfully',
                    'order_id': order.id
                }, status=201)
            except Exception as e:
                return Response({'ok': False, 'error': str(e)}, status=400)


class OrderReceiptView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)
        return generate_order_receipt(order)


# === Admin Endpoints ===
class AdminOrderListView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        orders = Order.objects.select_related('user', 'service').all()
        status = request.query_params.get('status')
        if status:
            orders = orders.filter(status=status)
        serializer = OrderListSerializer(orders, many=True)
        return Response({'ok': True, 'data': serializer.data})


class AdminOrderUpdateView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        new_status = request.data.get('status')
        admin_notes = request.data.get('admin_notes', '')

        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'ok': False, 'error': 'Invalid status'}, status=400)

        # Assign admin when status changes from pending
        if order.status == 'pending' and new_status != 'pending':
            order.processed_by = request.user

        order.status = new_status
        if admin_notes:
            order.admin_notes = admin_notes
        order.save()

        # Notify user
        status_names = {'processing': 'در حال انجام', 'done': 'تکمیل شد', 'rejected': 'رد شد'}
        send_notification(
            user=order.user,
            title_fa=f"سفارش شما {status_names.get(new_status, new_status)}",
            message_fa=f"سفارش {order.id} به وضعیت «{status_names.get(new_status, new_status)}» تغییر کرد.",
            notification_type='order'
        )

        return Response({
            'ok': True,
            'message': f'Order status updated to {new_status}',
            'order': OrderListSerializer(order).data
        })