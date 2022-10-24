from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.
class Business(models.Model):
    name = models.CharField(max_length=50, blank=False, default='')
    email = models.EmailField(max_length=50, blank=False, default='')
    phone = models.BigIntegerField(blank=True, default='')
    theme = models.CharField(max_length=50, blank=True)
