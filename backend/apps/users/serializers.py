from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from apps.users.models import OTPCode

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'role', 'country_code', 'full_name']
        read_only_fields = ['id', 'email']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make username field accept email format
        self.fields['username'].label = 'Email Address'
        self.fields['username'].help_text = 'Enter your email address'

    def validate(self, attrs):
        # Map email or username to 'username' for super().validate
        identifier = attrs.pop('email', None) or attrs.get('username')
        if not identifier:
            raise ValidationError('Must include email or username and password.')

        attrs['username'] = identifier
        password = attrs.get('password')
        if not password:
            raise ValidationError('Must include password.')

        # Authenticate using the backend (treats username as email)
        user = authenticate(
            request=self.context.get('request'),
            username=identifier,
            password=password,
        )
        if not user:
            raise ValidationError('No active account found with the given credentials')
        if not user.is_active:
            raise ValidationError('User account is disabled.')

        validated_attrs = super().validate(attrs)
        validated_attrs['user'] = UserSerializer(user).data
        return validated_attrs


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(username=email, password=password)
        if user and user.is_active:
            attrs['user'] = user
            return attrs
        raise serializers.ValidationError('errors.auth.invalid_creds')


class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=5, min_length=5)

    def validate(self, attrs):
        email = attrs.get('email')
        otp = attrs.get('otp')
        try:
            user = User.objects.get(email=email)
            otp_code = OTPCode.objects.filter(user=user, code=otp).first()
            if not otp_code or not otp_code.is_valid():
                raise serializers.ValidationError('Invalid or expired OTP.')
            attrs['user'] = user
            attrs['otp_code'] = otp_code
            return attrs
        except User.DoesNotExist:
            raise serializers.ValidationError('User not found.')


class SignupEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value


class SignupOTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=5, min_length=5)

    def validate(self, attrs):
        email = attrs.get('email')
        otp = attrs.get('otp')
        try:
            otp_code = OTPCode.objects.filter(email=email, code=otp).first()
            if not otp_code or not otp_code.is_valid():
                raise serializers.ValidationError('Invalid or expired OTP.')
            attrs['otp_code'] = otp_code
            return attrs
        except OTPCode.DoesNotExist:
            raise serializers.ValidationError('Invalid or expired OTP.')


class SignupCompleteSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    tos_agreed = serializers.BooleanField()
    country_code = serializers.CharField(max_length=2)

    def validate(self, attrs):
        email = attrs.get('email')
        # Check for recent verified OTP (used within 5 min)
        recent_cutoff = timezone.now() - timedelta(minutes=5)
        if not OTPCode.objects.filter(
                email=email,
                is_used=True,
                created_at__gte=recent_cutoff
        ).exists():
            raise serializers.ValidationError('Email verification required. Please verify OTP first.')

        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError('Passwords do not match.')
        validate_password(password)  # Django's password validators
        if not attrs.get('tos_agreed'):
            raise serializers.ValidationError('You must agree to the Terms of Service.')

        # Set username to email for simplicity
        attrs['username'] = email
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data.pop('tos_agreed')
        user = User.objects.create_user(**validated_data)
        user.is_verified = True  # Auto-verify on signup
        user.save()
        return user


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Optional: Check if email is valid for flow (exists for login or not for signup)
        return value


class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'full_name', 'email', 'role', 'country_code', 'is_verified', 'is_blocked', 'last_login', 'date_joined']
        read_only_fields = fields

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

class UserDetailSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'full_name', 'email', 'role', 'phone_prefix', 'country_code', 'is_verified', 'is_blocked', 'last_login', 'date_joined']
        read_only_fields = fields

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

class UserOwnUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_prefix', 'country_code']
        read_only_fields = ['username', 'email', 'role', 'is_verified', 'is_blocked']

class UserAdminUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'role', 'phone_prefix', 'country_code', 'is_verified', 'is_blocked']
        read_only_fields = ['username', 'email', 'id', 'date_joined', 'last_login']

    def validate_role(self, value):
        # Optional: Prevent downgrading self
        if self.instance and self.context['request'].user == self.instance and value != self.instance.role:
            raise serializers.ValidationError("Cannot change your own role")
        return value