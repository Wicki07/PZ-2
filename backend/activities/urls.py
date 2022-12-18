from django.urls import path
from django.urls.conf import path, include
from .api import ActivityAPI, PraticipationAPI

urlpatterns = [
    path('api/activity', ActivityAPI.as_view()),
    path('api/participation', PraticipationAPI.as_view()),
]
