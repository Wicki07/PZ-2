from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import *
from businesses.models import *


# Create your models here.
class Activity(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False, default='')
    description = models.TextField(max_length=255, blank=True, default='')
    datetime = models.DateTimeField(blank=False)
    period = models.CharField(max_length=50, blank=True, default='')
    participant_number = models.IntegerField(blank=True)


class Participant(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)