from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


def upload_path(instance, file):
    return '/'.join(['accounts', str(instance.account_id), file])


class Account(models.Model):
    email = models.EmailField(max_length=50, blank=False, default='')
    name = models.CharField(max_length=50, blank=False, default='')
    last_name = models.CharField(max_length=50, blank=False, default='')
    phone = models.BigIntegerField(blank=True, default='')
    image = models.ImageField(null=True, upload_to=upload_path)
    role = models.CharField(max_length=50, blank=True)
