from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from apps.users.models import UserProfile


class Command(createsuperuser.Command):
    help = 'Create a main admin user (superuser with role="main_admin")'

    def handle(self, *args, **options):
        super().handle(*args, **options)

        verbosity = options.get('verbosity', 1)

        username = options.get('username')
        if not username:
            username = self.get_value_from_input('Username', options)

        if not username:
            raise CommandError('Username is required but was not provided.')

        try:
            user = UserProfile.objects.get(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.role = 'main_admin'
            user.save(update_fields=['is_staff', 'is_superuser', 'role'])

            if verbosity >= 1:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Main admin user "{username}" successfully created/updated with role "main_admin".'
                    )
                )
        except UserProfile.DoesNotExist:
            raise CommandError(f'User "{username}" was not found after creation.')

    def get_value_from_input(self, field_name, options):
        """Helper to get input similar to how BaseCommand does it"""
        if options['interactive']:
            return input(f'{field_name}: ').strip()
        return None