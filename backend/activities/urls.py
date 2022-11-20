from django.urls import path
from .views import ActivityAPI, PeriodActivityAPI

urlpatterns = [
	path('', ActivityAPI.as_view()),
	path('date_period', PeriodActivityAPI.as_view()),
]
