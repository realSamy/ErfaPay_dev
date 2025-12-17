from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.users.models import UserProfile
from .models import Wallet


@receiver(post_save, sender=UserProfile)
def create_user_wallet(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'wallet'):
        Wallet.objects.create(user=instance)