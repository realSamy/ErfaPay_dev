import os
from celery import Celery

# Set the default Django settings module for the 'celery' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.prod')

# Create the Celery app instance
app = Celery('config')

# Load task modules from all registered Django apps and your custom config
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps (including apps.currencies.tasks)
app.autodiscover_tasks()

# Optional: Define beat schedule here if you prefer it in code instead of settings.py
@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')