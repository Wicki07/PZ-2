from rest_framework import serializers
from .models import Activity

class AcitivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'business', 'name', 'date', 'start_time', 'end_time', 'leader', 'base_activity')

