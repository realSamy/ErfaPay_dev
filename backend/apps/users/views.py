from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, OTPVerifySerializer, SignupCompleteSerializer, SignupOTPVerifySerializer, \
    SignupEmailSerializer, ResendOTPSerializer, UserDetailSerializer, UserOwnUpdateSerializer
from .models import OTPCode
from apps.users.serializers import UserSerializer, EmailTokenObtainPairSerializer
from django.utils import timezone
from datetime import timedelta

from .utils import update_last_login

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh_token = response.data.get('refresh')
        access_token = response.data.get('access')

        is_secure = request.is_secure()

        # Set refresh token as HttpOnly cookie
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=is_secure,
            samesite='Lax',
            max_age=14 * 24 * 60 * 60,  # 14 days
        )
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=is_secure,
            samesite='Lax',
            max_age=5 * 60,  # 5 min
        )

        return response

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'ok': True, 'data': UserSerializer(request.user).data})

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request):
        serializer = UserOwnUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'ok': True, 'data': UserDetailSerializer(request.user).data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']

            # Rate limit: Check for recent OTP creation (75 seconds cooldown)
            recent_cutoff = timezone.now() - timedelta(seconds=75)
            if OTPCode.objects.filter(
                    user=user,
                    created_at__gte=recent_cutoff
            ).exists():
                return Response(
                    {'ok': False, 'error': 'errors.otp.too_many_requests'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            # Generate and save OTP
            otp_code = OTPCode.objects.create(user=user)

            send_mail(
                subject='ErfaPay OTP Code',
                message=f'Your 5-digit OTP is: {otp_code.code}\nValid for 5 minutes.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            # todo: remove the debug otp
            return Response({'ok': True, 'message': 'OTP sent to your email.', 'otp': otp_code.code}, status=status.HTTP_200_OK)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class OTPVerifyView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            otp_code = serializer.validated_data['otp_code']
            if otp_code.is_valid():
                otp_code.mark_used()

                update_last_login(user)
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                access = refresh.access_token
                # Return serialized user and tokens (no cookie here; adjust if needed)
                response = Response({
                    'ok': True,
                    'data': {
                        'user': UserSerializer(user).data,
                        'access': str(access),
                        'refresh': str(refresh),
                    }
                }, status=status.HTTP_200_OK)

                return response
            return Response({'ok': False, 'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SignupEmailView(APIView):
    def post(self, request):
        serializer = SignupEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            # Rate limit: 75 seconds cooldown (standardized)
            recent_cutoff = timezone.now() - timedelta(seconds=75)
            if OTPCode.objects.filter(
                    email=email,
                    created_at__gte=recent_cutoff
            ).exists():
                return Response(
                    {'ok': False, 'error': 'errors.otp.too_many_requests'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            # Create and send OTP
            otp_code = OTPCode.objects.create(email=email)

            send_mail(
                subject='Your ErfaPay Signup OTP',
                message=f'Your 5-digit OTP is: {otp_code.code}\nValid for 5 minutes.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )

            # todo: remove the debug otp
            return Response({'ok': True, 'message': 'OTP sent to your email.', 'otp': otp_code.code}, status=status.HTTP_200_OK)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SignupOTPVerifyView(APIView):
    def post(self, request):
        serializer = SignupOTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            otp_code = serializer.validated_data['otp_code']
            if otp_code.is_valid():
                otp_code.mark_used()
                return Response({'ok': True, 'message': 'Email verified successfully.'}, status=status.HTTP_200_OK)
            return Response({'ok': False, 'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ResendOTPView(APIView):
    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            # Rate limit: 75 seconds cooldown
            recent_cutoff = timezone.now() - timedelta(seconds=75)
            if OTPCode.objects.filter(
                    email=email,
                    created_at__gte=recent_cutoff
            ).exists():
                return Response(
                    {'ok': False, 'error': 'errors.otp.too_many_requests'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            # Determine flow: login (user exists) or signup (user doesn't)
            try:
                # Login
                user = User.objects.get(email=email)
                is_signup = False
            except User.DoesNotExist:
                # Signup
                user = None
                is_signup = True

            # Create and send new OTP
            if not is_signup:
                otp_code = OTPCode.objects.create(user=user, email=email)
            else:
                otp_code = OTPCode.objects.create(email=email)

            subject = 'Your ErfaPay OTP Code' if not is_signup else 'Your ErfaPay Signup OTP'
            send_mail(
                subject=subject,
                message=f'Your 5-digit OTP is: {otp_code.code}\nValid for 5 minutes.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )

            # todo: remove the debug otp
            return Response({'ok': True, 'message': 'OTP resent to your email.', 'otp': otp_code.code}, status=status.HTTP_200_OK)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class SignupCompleteView(APIView):
    def post(self, request):
        serializer = SignupCompleteSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            response = Response({
                'ok': True,
                'data': {
                    'user': UserSerializer(user).data,
                    'access': str(access),
                    'refresh': str(refresh),
                }
            })
            return response
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)