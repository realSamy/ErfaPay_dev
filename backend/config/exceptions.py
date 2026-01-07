from rest_framework.exceptions import APIException, ValidationError
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        errors = []

        # Handle ValidationError (serializer.is_valid() failures)
        if isinstance(exc, ValidationError):
            data = exc.detail
            if isinstance(data, dict):
                for field, messages in data.items():
                    field_name = field if field != 'non_field_errors' else None
                    for msg in (messages if isinstance(messages, list) else [messages]):
                        # Use DRF's built-in error code if available
                        error_code = getattr(msg, 'code', 'invalid')
                        # Build i18n key: errors.field_name.error_code or fallback
                        if field_name:
                            key = f"errors.{field_name}.{error_code}"
                        else:
                            key = f"errors.{error_code}"
                        errors.append({
                            'code': key,
                            'field': field_name,
                            'detail': str(msg)  # Optional: keep raw message as fallback
                        })
            else:
                # Non-field errors (e.g., object-level)
                for msg in (data if isinstance(data, list) else [data]):
                    error_code = getattr(msg, 'code', 'invalid')
                    key = f"errors.{error_code}"
                    errors.append({'code': key, 'field': None})

        # Handle custom APIException subclasses (your defined ones)
        elif hasattr(exc, 'default_code'):
            key = f"errors.{exc.default_code}"
            errors.append({'code': key, 'field': None})

        response.data = {
            'ok': False,
            'errors': errors
        }

    return response


class ResourceNotFoundException(APIException):
    status_code = 404
    default_detail = 'The requested resource was not found.'
    default_code = 'resource_not_found'


class NoActiveChatException(ResourceNotFoundException):
    default_detail = 'No active chat found.'
    default_code = 'no_active_chat'


class ChatNotFoundException(ResourceNotFoundException):
    default_detail = 'Chat not found.'
    default_code = 'chat_not_found'


class ChatAlreadyAssignedException(APIException):
    status_code = 400
    default_detail = 'Chat not found or already assigned.'
    default_code = 'chat_already_assigned'


class NoSettingsFoundException(ResourceNotFoundException):
    default_detail = 'No settings found.'
    default_code = 'no_settings_found'


class InsufficientBalanceException(APIException):
    status_code = 400
    default_detail = 'Insufficient balance.'
    default_code = 'insufficient_balance'


class OrderAlreadyProcessedException(APIException):
    status_code = 400
    default_detail = 'Order already processed.'
    default_code = 'order_already_processed'


class InvalidModeException(APIException):
    status_code = 400
    default_detail = 'Invalid mode.'
    default_code = 'invalid_mode'


class DateRangeTooLargeException(APIException):
    status_code = 400
    default_detail = 'Date range too large.'
    default_code = 'date_range_too_large'


class InvalidStatusException(APIException):
    status_code = 400
    default_detail = 'Invalid status.'
    default_code = 'invalid_status'


class GatewayNotSupportedException(APIException):
    status_code = 400
    default_detail = 'Gateway not supported.'
    default_code = 'gateway_not_supported'


class PaymentAPIErrorException(APIException):
    status_code = 500  # Or dynamic based on response
    default_detail = 'Payment API error.'
    default_code = 'payment_api_error'


class ChargeNotPendingException(APIException):
    status_code = 400
    default_detail = 'Charge is not pending.'
    default_code = 'charge_not_pending'


class CannotDeleteCategoryException(APIException):
    status_code = 400
    default_detail = 'Cannot delete category with active services.'
    default_code = 'cannot_delete_category'


class TicketClosedException(APIException):
    status_code = 400
    default_detail = 'Ticket is closed.'
    default_code = 'ticket_closed'


class TicketAlreadyClosedException(APIException):
    status_code = 400
    default_detail = 'Ticket already closed.'
    default_code = 'ticket_already_closed'


class CannotChangeOwnRoleException(ValidationError):
    default_detail = 'Cannot change your own role.'
    default_code = 'cannot_change_own_role'


class EmailAlreadyRegisteredException(ValidationError):
    default_detail = 'Email already registered.'
    default_code = 'email_already_registered'


class InvalidCredentialsException(APIException):
    status_code = 401
    default_detail = 'Invalid credentials.'
    default_code = 'invalid_credentials'


class UserBlockedException(APIException):
    status_code = 403
    default_detail = 'User is blocked.'
    default_code = 'user_blocked'


class InvalidOTPException(ValidationError):
    status_code = 400
    default_detail = 'Invalid or expired OTP.'
    default_code = 'invalid_otp'


class OTPVerificationRequiredException(ValidationError):
    default_detail = 'OTP verification required. Please verify first.'
    default_code = 'otp_verification_required'


class PasswordMismatchException(ValidationError):
    default_detail = 'Passwords do not match.'
    default_code = 'password_mismatch'


class UserNotFoundException(APIException):
    status_code = 404
    default_detail = 'User not found.'
    default_code = 'user_not_found'


class TOSRequiredException(ValidationError):
    default_detail = 'You must agree to the Terms of Service.'
    default_code = 'tos_not_agreed'


class ServicesUnavailableException(ValidationError):
    default_details = 'Services are currently unavailable'
    default_code = 'services_unavailable'


class ServiceNotFoundException(APIException):
    status_code = 404
    default_detail = 'Service not found or inactive'
    default_code = 'service_not_found'

class NotificationNotFoundException(APIException):
    status_code = 404
    default_detail = 'Notification not found.'
    default_code = 'notification_not_found'

class ChatNotAuthorized(APIException):
    status_code = 401
    default_detail = 'You are not authorized to send messages in this chat'
    default_code = 'chat_not_authorized'

class BulkMailPayloadIncompleteException(ValidationError):
    default_detail = 'Subject and message required'
    default_code = 'bulk_mail_payload_incomplete'