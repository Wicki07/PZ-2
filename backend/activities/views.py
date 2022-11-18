from .models import Activity, Participant
from accounts.models import Account
from businesses.models import Business
from django.contrib.auth import get_user_model
from .serializers import ActivitySerializer

from rest_framework.response import Response
from rest_framework import generics, permissions, status, viewsets


class ActivityAPI(generics.GenericAPIView):
	serializer_class = ActivitySerializer

	authentication_classes = []
	permission_classes = []

	def get(self, request, format=None):
		activities = Activity.objects.all()
		return Response(ActivitySerializer(activities, many=True).data, status=status.HTTP_200_OK)

	def post(self, request, format=None):
		if request.data.__contains__('id'):
			account = Account.objects.get(id=request.data['account'])
			business = Business.objects.get(id=request.data['business'])

			activity = Activity.objects.get(id=request.data['id'])
			activity.account = account
			activity.business = business
			activity.title = request.data['title']
			activity.description = request.data['description']
			activity.datetime = request.data['datetime']
			activity.period = request.data['period']
			activity.participant_number = request.data['participant_number']

			activity.save()
			return Response({'message': '{} Activity has been updated'}, status=status.HTTP_200_OK)
		else:
			account = Account.objects.get(id=request.data['account'])
			business = Business.objects.get(id=request.data['business'])

			activity = Activity.objects.create(
				account=account,
				business=business,
				title=request.data['title'],
				description=request.data['description'],
				datetime=request.data['datetime'],
				period=request.data['period'],
				participant_number=request.data['participant_number'],
			)
			activity.save()
			return Response({'message': '{} Activity has been created'}, status=status.HTTP_200_OK)

	def delete(self, request, format=None):
		Activity.objects.get(id=request.data['id']).delete()
		return Response({'message': '{} Activity has been deleted'}, status=status.HTTP_204_NO_CONTENT)


class PeriodActivityAPI(generics.GenericAPIView):
	serializer_class = ActivitySerializer

	authentication_classes = []
	permission_classes = []

	def get_queryset(self):
		return None

	def get(self, request, format=None):
		activities = Activity.objects.filter(datetime__day='01')
		return Response(ActivitySerializer(activities, many=True).data, status=status.HTTP_200_OK)
