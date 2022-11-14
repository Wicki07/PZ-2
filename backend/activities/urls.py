from django.urls import path, include
from .views import *
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('act', ActivitiesViewSet)

urlpatterns = [
    path('xxx', ActivityAPI.as_view()),
    path('xxx/<int:pk>', ActivityAPI.as_view()),
    path('mail', views.email, name='email'),
]
