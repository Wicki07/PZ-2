from rest_framework import serializers
from backend.models import *


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'
        model = Account
        fields = '__all__'


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        verbose_name = 'Business'
        verbose_name_plural = 'Businesses'
        model = Business
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'
        model = Activity
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        verbose_name = 'Participant'
        verbose_name_plural = 'Participants'
        model = Participant
        fields = '__all__'
