# Generated by Django 3.1.14 on 2022-10-24 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='account_id',
        ),
    ]
