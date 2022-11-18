from .models import Activity, Participant
from .serializers import ActivitySerializer
from accounts.models import Account
from businesses.models import Business
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from datetime import datetime
from django.utils.timezone import make_aware


class ActivityAPI(generics.GenericAPIView):
	serializer_class = ActivitySerializer

	authentication_classes = []
	permission_classes = []

	def get_queryset(self):
		return None

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


# IMPORTANT: there should be filter option for logged user
class PeriodActivityAPI(generics.GenericAPIView):
	serializer_class = ActivitySerializer

	authentication_classes = []
	permission_classes = []

	def get_queryset(self):
		return None

	def get(self, request, format=None):
		filter_object = self.get_filter_object(request.data)
		if not filter_object:
			return Response({'message: {} Bad request 1'}, status=status.HTTP_400_BAD_REQUEST)

		try:
			from_date = self.text_to_date(request.data['from_date'])
			to_date = self.text_to_date(request.data['to_date'])

			name, value = filter_object
			activities = Activity.objects.filter(datetime__range=(from_date, to_date))
			object_activities = activities

			if name == 'business':
				object_activities = activities.filter(business__name=value)
			elif name == 'lecturer':
				object_activities = activities.filter(account_id=value)

			return Response(ActivitySerializer(object_activities, many=True).data, status=status.HTTP_200_OK)
		except ValueError:
			return Response({'message: {} Bad request 2'}, status=status.HTTP_400_BAD_REQUEST)

	def text_to_date(self, text):
		return make_aware(datetime.strptime(text, '%d.%m.%Y'), timezone=None)

	# lecturer or business
	def get_filter_object(self, data):
		keys = data.keys()
		if 'business' in keys and 'lecturer' not in keys:
			return 'business', data['business']
		elif 'lecturer' in keys and 'business' not in keys:
			return 'lecturer', data['lecturer']
		return None
