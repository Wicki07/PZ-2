from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from django.views.generic import CreateView, UpdateView, DeleteView, DetailView, View
from django.views.generic.list import ListView

from .models import Activity, Participant
from accounts.models import *
from businesses.models import *

from django.urls import reverse_lazy
from django.contrib.auth import get_user_model

from .forms import ActivityForm
from .serializers import ActivitySerializer

from rest_framework.response import Response
from rest_framework import generics, permissions, status, viewsets


class ActivityAPI(generics.GenericAPIView):
	serializer_class = ActivitySerializer
	authentication_classes = []
	permission_classes = []

	def post(self, request, *args, **kwargs):
		if request.data.__contains__('id'):
			activity = Activity.objects.get(id=request.data['id'])
			activity.account = request.data['account']
			activity.business = request.data['business']
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


class ActivitiesViewSet(viewsets.ModelViewSet):
	queryset = get_user_model().objects.none()

	authentication_classes = []
	permission_classes = []

	# Lista serializerii dla danech typów zapytań
	serializer_classes = {
		'GET': ActivitySerializer,
	}

	# Jeżeli danego zapytania nie ma na liście serializer_classes to wykorzystany będzie domyślny
	default_serializer_class = ActivitySerializer

	def get_queryset(self):
		activities = Activity.objects.all()
		return activities

	# Metoda wybiera z jakiego serializera będziemy korzystać
	def get_serializer_class(self):
		return self.serializer_classes.get(self.action, self.default_serializer_class)
