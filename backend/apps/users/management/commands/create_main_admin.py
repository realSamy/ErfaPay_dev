import os

from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from apps.users.models import UserProfile

class Command(createsuperuser.Command):
    help = 'Create a main admin user (superuser with role="main_admin") non-interactively if env vars are set'

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument('--pass', '--password')
        parser.add_argument('--firstname', '--first-name', dest='first_name')
        parser.add_argument('--lastname', '--last-name', dest='last_name')

    def handle(self, *args, **options):
        first_name = options.get('first_name') or os.environ.get('DJANGO_SUPERUSER_FIRSTNAME', '')
        last_name = options.get('last_name') or os.environ.get('DJANGO_SUPERUSER_LASTNAME', '')
        # Set defaults from env vars for non-interactive mode
        if not options['interactive']:
            os.environ['DJANGO_SUPERUSER_FIRSTNAME'] = first_name
            os.environ['DJANGO_SUPERUSER_LASTNAME'] = last_name
            options['username'] = options.get('username') or os.environ.get('DJANGO_SUPERUSER_USERNAME')
            options['email'] = options.get('email') or os.environ.get('DJANGO_SUPERUSER_EMAIL')
            options['password'] = options.get('password') or os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        super().handle(*args, **options)

        username = options['username']
        if not username:
            raise CommandError('Username is required.')

        try:
            user = UserProfile.objects.get(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.role = 'main_admin'
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            user.save(update_fields=['is_staff', 'is_superuser', 'role', 'first_name', 'last_name'])

            if options['verbosity'] >= 1:
                self.stdout.write(self.style.SUCCESS(f'Main admin "{username}" created/updated with role "main_admin".'))
        except UserProfile.DoesNotExist:
            raise CommandError(f'User "{username}" not found.')