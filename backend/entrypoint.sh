#!/bin/bash
set -e

# Run migrations
python manage.py migrate

# Create main admin if not exists (non-interactive)
python manage.py create_main_admin --noinput --username "$DJANGO_SUPERUSER_USERNAME" --email "$DJANGO_SUPERUSER_EMAIL" --password "$DJANGO_SUPERUSER_PASSWORD" || true  # '|| true' to ignore if already exists

# Collect static files (if needed)
python manage.py collectstatic --noinput

exec "$@"