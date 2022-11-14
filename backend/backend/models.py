from django.db import models
from django.contrib.auth import get_user_model


def upload_path(instance, file):
    return '/'.join(['accounts', str(instance.account_id), file])


class Account(models.Model):
    account_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    email = models.EmailField(max_length=50, blank=False, default='')
    name = models.CharField(max_length=50, blank=False, default='')
    last_name = models.CharField(max_length=50, blank=False, default='')
    phone = models.BigIntegerField(blank=True, default='')
    image = models.ImageField(null=True, upload_to=upload_path)
    role = models.CharField(max_length=50, blank=True)


class Business(models.Model):
    business_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False, default='')
    email = models.EmailField(max_length=50, blank=False, default='')
    phone = models.BigIntegerField(blank=True, default='')
    theme = models.CharField(max_length=50, blank=True)


class Activity(models.Model):
    activity_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE,related_name="account")
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False, default='')
    description = models.TextField(max_length=255, blank=True, default='')
    datetime = models.DateTimeField(blank=False)
    period = models.CharField(max_length=50, blank=True, default='')
    participant_number = models.IntegerField(blank=True)


class Participant(models.Model):
    participant_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE,related_name="account2")
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
