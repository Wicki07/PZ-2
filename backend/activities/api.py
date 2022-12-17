from rest_framework import generics, permissions, serializers, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.utils import serializer_helpers
from .serializers import AcitivitySerializer, PraticipationSerializer
from .models import *
from django.contrib.auth import get_user_model
from rest_framework import status
from django.contrib.auth.models import User
from knox.auth import TokenAuthentication
import datetime

class ActivityAPI(generics.GenericAPIView):
    serializer_class = AcitivitySerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        id = request.query_params.get('business')
        data = Activity.objects.filter(business = id, base_activity = None)
        serializer = AcitivitySerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        business = Business.objects.filter(user = request.user.id).first()
        data = request.data
        data['business'] = business.id
        data['end_time'] = request.data['endtime']
        data['start_time'] = request.data['starttime']
        data['name'] = request.data['activityname']
        serializer = self.get_serializer(data = data)
        serializer.is_valid(raise_exception = True)
        activity = serializer.save()
        date = datetime.datetime.strptime(request.data['date'], "%Y-%m-%d")
        if request.data['periodicity'] != 'Brak':
            for _ in range(int(request.data['amount']) - 1):
                date = self.addDays(date, request.data['periodicity'])
                Activity.objects.create(
                    business=business, 
                    end_time=data['end_time'], 
                    start_time=data['start_time'], 
                    name=data['name'], 
                    leader=data['leader'], 
                    date = date,
                    base_activity = activity.id
                )
        # if request.data['isBusiness']:
        #   Business.objects.create(user=user, category = request.data['category'])
        return Response(AcitivitySerializer(activity).data, status=status.HTTP_204_NO_CONTENT)

    def addDays(self, date, periodicy):
        if periodicy == 'Co miesiąc':
            return date + datetime.timedelta(months=1)
        if periodicy == 'Codziennie':
            return date + datetime.timedelta(days=1)
        if periodicy == 'Co tydzień':
            return date + datetime.timedelta(days=7)
        if periodicy == 'Co dwa tygodnie':
            return date + datetime.timedelta(days=14)


class PraticipationAPI(generics.GenericAPIView):
    serializer_class = PraticipationSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        activity = Activity.objects.filter(id = request.data['activityId']).first()
        data = request.data
        data['activity'] = activity.id
        data['user'] = request.user.id
        serializer = self.get_serializer(data = data)
        serializer.is_valid(raise_exception = True)
        participation = serializer.save()
        return Response(PraticipationSerializer(participation).data, status=status.HTTP_204_NO_CONTENT)

