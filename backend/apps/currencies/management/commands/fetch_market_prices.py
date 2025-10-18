from django.core.management.base import BaseCommand
from apps.currencies.utils import fetch_and_update_prices

class Command(BaseCommand):
    help = 'Fetch and update latest market prices from bitycle'

    def handle(self, *args, **kwargs):
        fetch_and_update_prices()
        self.stdout.write(self.style.SUCCESS('Market prices updated.'))