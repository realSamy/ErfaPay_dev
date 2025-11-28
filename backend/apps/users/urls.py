from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (LoginView, OTPVerifyView, MeView, SignupEmailView, SignupOTPVerifyView, SignupCompleteView,
                    ResendOTPView)

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
]
