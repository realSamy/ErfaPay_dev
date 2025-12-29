import csv
import json
from datetime import datetime
from io import StringIO

from django.db.models import Sum, Count, Q
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
from django.http import StreamingHttpResponse
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsSeniorSupportOrAbove
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Order, OrderAttachment
from .serializers import OrderListSerializer, OrderCreateSerializer, OrderAdminListSerializer
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
                if 'attachments' in request.FILES:
                    for file in request.FILES.getlist('attachments'):
                        OrderAttachment.objects.create(
                            attachment=file,
                            order=order
                        )
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
class StandardAdminPagination(PageNumberPagination):
    page_size = 20  # Default items per page
    page_size_query_param = 'page_size'  # Allow client to override: ?page_size=50
    max_page_size = 100  # Safety limit


class AdminOrderListView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]
    pagination_class = StandardAdminPagination

    ALLOWED_SORT_FIELDS = {
        'id',
        'created_at',
        'updated_at',
        'total_irt',
        'user_amount_irt',
        'status',
        'user',
        'user__email',
        'user__profile__phone',
        'service__title_fa',
    }

    def get(self, request):
        # Base queryset
        search = request.query_params.get('search')
        user_id = request.query_params.get('user_id')
        order_status = request.query_params.getlist('status')
        sorting_params = request.query_params.getlist('sorting')

        if user_id:
            orders = Order.objects.filter(user_id=user_id)
        else:
            orders = Order.objects.all()

        if search:
            orders = orders.filter(
                Q(user__username__icontains=search) |
                Q(user__email__icontains=search) |
                Q(service__title_fa__icontains=search) |
                Q(id__icontains=search)
            )

        if sorting_params:
            order_by_list = []
            for sort_param in sorting_params:
                try:
                    sort_obj = json.loads(sort_param)
                    if not isinstance(sort_obj, dict):
                        continue
                    field_id = sort_obj.get('id')
                    desc = sort_obj.get('desc', False)

                    if field_id not in self.ALLOWED_SORT_FIELDS:
                        continue  # silently ignore invalid fields

                    order_field = f"-{field_id}" if desc else field_id
                    order_by_list.append(order_field)

                except json.JSONDecodeError:
                    continue  # ignore malformed JSON

            if order_by_list:
                orders = orders.order_by(*order_by_list)
        else:
            # Default sorting if none provided
            orders = orders.order_by('-created_at')

        # Filter by status if provided
        if order_status:
            if isinstance(order_status, str):
                orders = orders.filter(status=order_status)
            elif isinstance(order_status, list):
                orders = orders.filter(status__in=order_status)

        # Apply pagination
        paginator = self.pagination_class()
        paginated_orders = paginator.paginate_queryset(orders, request)

        # Serialize the current page
        serializer = OrderAdminListSerializer(paginated_orders, many=True)

        # Return paginated response with your wrapper
        return paginator.get_paginated_response(serializer.data)


class AdminOrderUpdateView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        return Response({
            'ok': True,
            'data': OrderAdminListSerializer(order).data
        })

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
            'data': OrderAdminListSerializer(order).data
        })


class AdminChartView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        mode = request.query_params.get('mode', 'daily')
        format_type = request.query_params.get('output', 'json')
        metric = request.query_params.get('metric', 'count')  # 'count' or 'revenue'

        if mode == 'daily':
            trunc = TruncDay('created_at')
        elif mode == 'weekly':
            trunc = TruncWeek('created_at')
        elif mode == 'monthly':
            trunc = TruncMonth('created_at')
        else:
            return Response({'error': 'Invalid mode'}, status=status.HTTP_400_BAD_REQUEST)

        # Filter successful orders (done)
        qs = Order.objects.filter(status='done').annotate(date=trunc)

        if metric == 'revenue':
            qs = qs.values('date').annotate(value=Sum('total_irt')).order_by('date')
        else:  # count
            qs = qs.values('date').annotate(value=Count('id')).order_by('date')

        current_year = datetime.now().year
        labels = []

        for item in qs:
            dt = item['date']

            if isinstance(dt, datetime):
                if mode in ('daily', 'weekly'):
                    if dt.year == current_year:
                        # 1 Aug
                        labels.append(dt.strftime('%d %b').lstrip('0'))
                    else:
                        # 2024-08-01
                        labels.append(dt.strftime('%Y-%m-%d'))
                else:  # monthly
                    labels.append(dt.strftime('%Y-%m'))
            else:
                labels.append(str(dt))

        values = [float(item['value'] or 0) for item in qs]

        if format_type == 'csv':
            return self.generate_csv(labels, values, metric)

        return Response({'ok': True, 'data': {'labels': labels, 'values': values}})

    def generate_csv(self, labels, values, metric):
        output = StringIO()
        writer = csv.writer(output)
        header = 'Date' if metric == 'count' else 'Date'
        value_header = 'Order Count' if metric == 'count' else 'Revenue (IRT)'
        writer.writerow([header, value_header])
        for label, value in zip(labels, values):
            writer.writerow([label, value])

        response = StreamingHttpResponse(output.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="orders_report.csv"'
        return response
