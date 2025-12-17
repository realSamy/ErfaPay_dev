from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q, Sum, Count
from apps.users.permissions import IsSeniorSupportOrAbove, IsMainAdmin
from .models import UserProfile
from .serializers import UserListSerializer, UserDetailSerializer, UserAdminUpdateSerializer
from rest_framework.pagination import PageNumberPagination
from time import sleep


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
            return paginator.get_paginated_response({
                'ok': True,
                'data': serializer.data
            })

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

            # todo: will be implemented in production
            # noinspection PyUnreachableCode
            if False:
                # Send welcome email
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