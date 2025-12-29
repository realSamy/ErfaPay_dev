from django.db import models
from django.core.cache import cache
from django.contrib.auth import get_user_model
from datetime import datetime, time
from django.utils import timezone

User = get_user_model()

from django.db import models
from django.utils import timezone
from datetime import timezone as dt_timezone
from datetime import time

class GlobalSettings(models.Model):
    WEEKDAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]

    time_from = models.TimeField(default=time(9, 0))
    time_to = models.TimeField(default=time(17, 0))
    weekday_from = models.IntegerField(choices=WEEKDAY_CHOICES, default=0)
    weekday_to = models.IntegerField(choices=WEEKDAY_CHOICES, default=4)
    global_availability = models.BooleanField(default=True)
    enable_schedule = models.BooleanField(default=False)

    def is_service_available(self) -> bool:
        if not self.global_availability:
            return False

        if not self.enable_schedule:
            return True

        now = timezone.now().astimezone(dt_timezone.utc)
        current_weekday = now.weekday()  # 0=Monday ... 6=Sunday
        current_time = now.time()

        if not self._is_weekday_in_range(current_weekday):
            return False

        if not self._is_time_in_range(current_time):
            return False

        return True

    def _is_weekday_in_range(self, day: int) -> bool:
        if self.weekday_from <= self.weekday_to:
            return self.weekday_from <= day <= self.weekday_to
        else:
            return day >= self.weekday_from or day <= self.weekday_to

    def _is_time_in_range(self, current: time) -> bool:
        if self.time_from <= self.time_to:
            return self.time_from <= current <= self.time_to
        else:
            return current >= self.time_from or current <= self.time_to