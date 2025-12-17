from django.utils import timezone

from apps.users.serializers import UserSerializer


def update_last_login(user):
    user.last_login = timezone.now()
    user.save(update_fields=['last_login'])
    print(UserSerializer(user).data)