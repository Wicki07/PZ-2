from django.urls import path
from django.urls.conf import path, include
from .api import ActivityAPI
from knox import views as knox_views

urlpatterns = [
    path('api/activity/create', ActivityAPI.as_view()),
]
