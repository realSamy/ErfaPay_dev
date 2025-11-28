from django.core.management.base import BaseCommand
from apps.currencies.utils import fetch_and_update_rates

class Command(BaseCommand):
    help = 'Update currency rates from bitycle.com'

    def handle(self, *args, **kwargs):
        count = fetch_and_update_rates()
        self.stdout.write(self.style.SUCCESS(f'Successfully updated {count} rates'))