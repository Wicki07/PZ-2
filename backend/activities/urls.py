from django.urls import path, include
from .views import ActivityAPI, PeriodActivityAPI

from rest_framework import routers

#router = routers.DefaultRouter()
#router.register('act', ActivitiesViewSet)

urlpatterns = [
	path('xxx', ActivityAPI.as_view()),
	#path('xxx/<int:pk>/', ActivityAPI.as_view()),
	path('yyy', PeriodActivityAPI.as_view()),

	#path('xxx/<int:pk>/', ActivityAPI.as_view()),
	#path('api/', include(router.urls)),
]
