from rest_framework import generics, permissions, serializers, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.utils import serializer_helpers
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer, UsersActivatedSerializer
from .models import *
from django.contrib.auth import get_user_model
from rest_framework import status
from django.contrib.auth.models import User

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        if request.data['isBusiness']:
          Business.objects.create(user=user, category = request.data['category'])
        return Response({
            "user": UserSerializer(user, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class PasswordResetAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        return Response({
            "user": UserSerializer(user, context = self.get_serializer_context()).data,
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UsersActivationAccountViewSet(generics.RetrieveAPIView):

    authentication_classes = []
    permission_classes = []

    serializer_class = UsersActivatedSerializer

    default_serializer_class = UsersActivatedSerializer
    
    def get_object(self):
        activation = UserActivate.objects.filter(activate_code=self.request.query_params.get('code'))
        user = get_user_model().objects.none()
        if(activation):
            user = [a.user_id for a in activation]
            # Aktywujemy konto użytkownika
            user[0].is_active = True
            user[0].save()
            # Usuwamy kod aktywacyjny
            activation.delete()
            return user
        else:
            return Response({'message': '{} Konto zostało już aktywowane'}, status=status.HTTP_204_NO_CONTENT)

class BusinessViewSet(generics.RetrieveAPIView):

    authentication_classes = []
    permission_classes = []

    serializer_class = UserSerializer

    default_serializer_class = UserSerializer
    
    def get_object(self):
        User = get_user_model()
        users = User.objects.filter(role = "business")
        serializer = UserSerializer(users)
        print(serializer.data)
        return serializer.data,


