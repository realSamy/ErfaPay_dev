from datetime import timedelta

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q, Sum, Count
from apps.users.permissions import IsSeniorSupportOrAbove, IsMainAdmin
from .models import UserProfile
from .serializers import UserListSerializer, UserDetailSerializer, UserAdminUpdateSerializer
from rest_framework.pagination import PageNumberPagination
from time import sleep

from ..orders.models import Order


class UserPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 200


class AdminUserListView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]
    pagination_class = UserPagination

    def get(self, request):
        queryset = UserProfile.objects.all().order_by('-date_joined')

        # Search
        search = request.query_params.get('q')
        if search:
            queryset = queryset.filter(
                Q(username__icontains=search) |
                Q(email__icontains=search) |
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search)
            )

        # Filters
        role = request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)

        is_blocked = request.query_params.get('blocked')
        if is_blocked in ('true', '1'):
            queryset = queryset.filter(is_blocked=True)
        elif is_blocked in ('false', '0'):
            queryset = queryset.filter(is_blocked=False)

        is_active = request.query_params.get('active')
        if is_active in ('true', '1'):
            queryset = UserProfile.objects.annotate(
            order_count=Count('orders'),
            total_spent=Sum('orders__total_irt')
        ).filter(order_count__gt=0).order_by('-order_count')

        # Pagination
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = UserListSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = UserListSerializer(queryset, many=True)
        return Response({'ok': True, 'data': serializer.data})


class AdminUserDetailView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]  # List/detail/patch: Senior+

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsMainAdmin()]  # Only Main Admin can create users
        return super().get_permissions()

    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(UserProfile, pk=pk)
            serializer = UserDetailSerializer(user)
            return Response({'ok': True, 'data': serializer.data})
        # If no pk → fallback to list (optional)
        return Response({'ok': False, 'error': 'Use /admin/users/ for list'}, status=400)

    def post(self, request):
        """
        Create support user (only Main Admin)
        Required fields: username, email, first_name, last_name, role
        Auto-generates strong password + sends welcome email
        """
        required = ['username', 'email', 'first_name', 'last_name', 'role', 'password']
        for field in required:
            if field not in request.data:
                return Response({'ok': False, 'error': f'{field} is required'}, status=400)

        role = request.data['role']
        if role not in ['simple_support', 'senior_support', 'main_admin']:
            return Response({'ok': False, 'error': 'Invalid role for creation'}, status=400)

        # Prevent creating another main_admin (optional – you can allow or not)
        if role in ['main_admin', 'senior_support'] and not request.user.role == 'main_admin':
            return Response({'ok': False, 'error': f'Only main_admin can create another {role}'}, status=403)

        password = request.data['password']

        try:
            user = UserProfile.objects.create(
                username=request.data['username'] or request.data['email'],
                email=request.data['email'],
                first_name=request.data['first_name'],
                last_name=request.data['last_name'],
                role=role,
                phone_prefix=request.data.get('phone_prefix', ''),
                country_code=request.data.get('country_code', ''),
                is_staff=True,  # Needed for Django admin login
                is_active=True,
                password=make_password(password)
            )

            send_mail(
                subject="حساب پشتیبانی شما در ErfaPay ایجاد شد",
                message=f"""
                سلام {user.first_name} عزیز،

                حساب پشتیبانی شما با موفقیت ایجاد شد.

                اطلاعات ورود:
                لینک: {settings.FRONTEND_URL}
                نام کاربری: {user.username}
                رمز عبور: {password}

                لطفاً پس از اولین ورود، رمز عبور خود را تغییر دهید.

                با احترام،
                تیم ErfaPay
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response({
                'ok': True,
                'message': 'Support user created successfully',
                'data': UserDetailSerializer(user).data,
            }, status=201)

        except Exception as e:
            return Response({'ok': False, 'error': str(e)}, status=400)

    def patch(self, request, pk):
        user = get_object_or_404(UserProfile, pk=pk)
        serializer = UserAdminUpdateSerializer(user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'ok': True, 'data': UserDetailSerializer(user).data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)

    def delete(self, request, pk):
        user = get_object_or_404(UserProfile, pk=pk)
        if user.role == 'main_admin':
            return Response({'ok': False, 'error': 'Cannot delete main admin'}, status=403)
        user.is_active = False
        user.is_blocked = True
        user.save()
        return Response({'ok': True, 'message': 'User deactivated and blocked'})

class AdminGrowthStatsView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        yesterday_start = today_start - timedelta(days=1)
        last_week_start = today_start - timedelta(days=7)
        last_month_start = today_start - timedelta(days=30)  # Approximate 30 days

        # Helper to calculate percentage growth
        def growth(current: int, previous: int) -> float:
            if previous == 0:
                return 100.0 if current > 0 else 0.0
            return round(((current - previous) / previous) * 100, 2)

        # 1. Total regular users (all users count - excluding staff/support)
        all_users = UserProfile.objects.filter(role='regular').count()

        # 2. Total users who have at least one order ever (active users)
        total_active_users = UserProfile.objects.filter(orders__isnull=False).distinct().count()

        # 3. Currently active orders (pending or processing)
        active_orders_count = Order.objects.filter(status__in=['pending', 'processing']).count()

        # New users growth (based on date_joined)
        new_today = UserProfile.objects.filter(date_joined__gte=today_start).count()
        new_yesterday = UserProfile.objects.filter(
            date_joined__gte=yesterday_start,
            date_joined__lt=today_start
        ).count()

        new_last_week = UserProfile.objects.filter(
            date_joined__gte=last_week_start,
            date_joined__lt=today_start
        ).count()
        new_prev_week = UserProfile.objects.filter(
            date_joined__gte=last_week_start - timedelta(days=7),
            date_joined__lt=last_week_start
        ).count()

        new_last_month = UserProfile.objects.filter(
            date_joined__gte=last_month_start,
            date_joined__lt=today_start
        ).count()
        new_prev_month = UserProfile.objects.filter(
            date_joined__gte=last_month_start - timedelta(days=30),
            date_joined__lt=last_month_start
        ).count()

        new_users_growth = {
            "day": growth(new_today, new_yesterday),
            "week": growth(new_last_week, new_prev_week),
            "month": growth(new_last_month, new_prev_month),
        }

        # Active users growth (users who placed at least one order in the period)
        active_today = UserProfile.objects.filter(
            orders__created_at__gte=today_start
        ).distinct().count()
        active_yesterday = UserProfile.objects.filter(
            orders__created_at__gte=yesterday_start,
            orders__created_at__lt=today_start
        ).distinct().count()

        active_last_week = UserProfile.objects.filter(
            orders__created_at__gte=last_week_start,
            orders__created_at__lt=today_start
        ).distinct().count()
        active_prev_week = UserProfile.objects.filter(
            orders__created_at__gte=last_week_start - timedelta(days=7),
            orders__created_at__lt=last_week_start
        ).distinct().count()

        active_last_month = UserProfile.objects.filter(
            orders__created_at__gte=last_month_start,
            orders__created_at__lt=today_start
        ).distinct().count()
        active_prev_month = UserProfile.objects.filter(
            orders__created_at__gte=last_month_start - timedelta(days=30),
            orders__created_at__lt=last_month_start
        ).distinct().count()

        active_users_growth = {
            "day": growth(active_today, active_yesterday),
            "week": growth(active_last_week, active_prev_week),
            "month": growth(active_last_month, active_prev_month),
        }

        return Response({
            'ok': True,
            'data': {
                'total_users': all_users,
                'total_active_users': total_active_users,        # Users with at least one order ever
                'total_active_orders': active_orders_count,      # Pending + Processing
                'new_users_growth': new_users_growth,
                'active_users_growth': active_users_growth,      # Daily active ordering users growth
            }
        })