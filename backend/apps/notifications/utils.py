# apps/notifications/utils.py
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import Notification

def send_notification(
    user,
    title_fa,
    message_fa,
    title_en="",
    message_en="",
    notification_type='info',
    link=None,
    send_email=True
):
    return
    # Create in-app notification
    notification = Notification.objects.create(
        user=user,
        title_fa=title_fa,
        title_en=title_en or title_fa,
        message_fa=message_fa,
        message_en=message_en or message_fa,
        notification_type=notification_type,
        link=link
    )

    # Send email if enabled
    if send_email and user.email:
        context = {
            'user': user,
            'title': title_fa,
            'message': message_fa,
            'link': link or f"{settings.FRONTEND_URL}",
            'site_name': "ErfaPay"
        }
        html_message = render_to_string('emails/notification.html', context)
        send_mail(
            subject=f"ErfaPay - {title_fa}",
            message=message_fa,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=True,
        )

    return notification