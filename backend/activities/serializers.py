from rest_framework import serializers
from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
	class Meta:
		model = Activity
		fields = '__all__'

	def update(self, instance, validated_data):
		instance.title = validated_data['title']
		instance.save()
		return instance
