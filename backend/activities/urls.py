from django.urls import path
from .views import ActivityAPI, ActivitiesViewSet

from rest_framework import routers

router = routers.DefaultRouter()
router.register('act', ActivitiesViewSet)

urlpatterns = [
	path('xxx', ActivityAPI.as_view()),
	path('xxx/<int:pk>', ActivityAPI.as_view()),
]
