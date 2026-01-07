from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_bulk_email_task(self, subject, message, user_filter=None):
    """
    Send email to all (or filtered) users.
    user_filter: dict of Q() filters, e.g. {'is_active': True}
    """
    queryset = User.objects.filter(is_active=True)
    if user_filter:
        queryset = queryset.filter(**user_filter)

    # Exclude users with no email or blocked
    queryset = queryset.exclude(Q(email__isnull=True) | Q(email='') | Q(is_blocked=True))

    total = queryset.count()
    sent = 0
    failed = []

    for user in queryset.iterator(chunk_size=1000):  # Efficient DB streaming
        try:
            send_mail(
                subject=subject,
                html_message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=settings.ENV == 'development',
            )
            sent += 1
        except Exception as exc:
            failed.append(user.email)
            # Retry individual email on transient failure
            self.retry(exc=exc)

    # Optional: log or notify admin about results
    print(f"Bulk email completed: {sent}/{total} sent. Failed: {len(failed)}")
    return {'sent': sent, 'total': total, 'failed': len(failed)}