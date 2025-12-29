from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenRefreshView

from .admin_views import AdminUserListView, AdminUserDetailView, AdminGrowthStatsView
from .views import (LoginView, OTPVerifyView, MeView, SignupEmailView, SignupOTPVerifyView, SignupCompleteView,
                    ResendOTPView, UserProfileView)

urlpatterns = [
    # OTP Resend
    path('otp-resend/', csrf_exempt(ResendOTPView.as_view()), name='resend_otp'),

    # Signup
    path('signup/otp/', csrf_exempt(SignupOTPVerifyView.as_view()), name='signup_verify_otp'),
    path('signup/complete/', csrf_exempt(SignupCompleteView.as_view()), name='signup_complete'),
    path('signup/', csrf_exempt(SignupEmailView.as_view()), name='signup_request_otp'),

    # Login
    path('signin/otp/', csrf_exempt(OTPVerifyView.as_view()), name='login_verify_otp'),
    path('signin/', csrf_exempt(LoginView.as_view()), name='login_request_otp'),

    path('refresh/', csrf_exempt(TokenRefreshView.as_view()), name='token_refresh'),

    # Profile
    path('users/me/', MeView.as_view()),

    # Own Profile (User)
    path('profile/', UserProfileView.as_view(), name='user-profile'),

    # Admin
    path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/users/stats/', AdminGrowthStatsView.as_view(), name='admin-user-stats'),
    path('admin/users/<int:pk>/', AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/create/', AdminUserDetailView.as_view(), name='admin-user-detail'),
]
