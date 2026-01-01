from .base import *
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

DB_NAME = os.environ.get('POSTGRES_DB')
DB_USER = os.environ.get('POSTGRES_USER')
DB_PASS = os.environ.get('POSTGRES_PASSWORD')

DOMAIN = os.environ.get('DOMAIN')

if DOMAIN:
    CORS_ALLOWED_ORIGINS = [f'https://{DOMAIN}']
    ALLOWED_HOSTS = [DOMAIN, 'backend']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASS,
        'HOST': 'db',
        'PORT': '5432',
    }
}