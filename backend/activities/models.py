from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

from backend.models import Account
from businesses.models import *


# Create your models here.
class Activity(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="activity")
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False, default='')
    description = models.TextField(max_length=255, blank=True, default='')
    datetime = models.DateTimeField(blank=False)
    period = models.CharField(max_length=50, blank=True, default='')
    participant_number = models.IntegerField(blank=True)

    def __str__(self):
        return f'{self.business} - {self.title}'


class Participant(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="participant")
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
