from base import *
from celery.schedules import crontab

DEBUG = os.environ.get('DEBUG', False) in ['True', 'true', True]

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')
CELERY_BEAT_SCHEDULE = {
    'update-rates-every-10-min': {
        'task': 'apps.currencies.tasks.update_rates_task',
        'schedule': crontab(minute='*/10'),
    },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('SMTP_HOST')
EMAIL_PORT = int(os.environ.get('SMTP_PORT', 587))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('SMTP_USER')
EMAIL_HOST_PASSWORD = os.environ.get('SMTP_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('SMTP_FROM')

DOMAIN = os.environ.get('DOMAIN')
if DOMAIN:
    CORS_ALLOWED_ORIGINS = [f'https://{DOMAIN}']
    ALLOWED_HOSTS = [f'https://{DOMAIN}']
