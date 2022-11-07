from django.urls import path
from .views import *

urlpatterns = [
	path('', IndexActivity.as_view(), name='activity_index'),
	path('create/', CreateActivity.as_view(), name='activity_create'),
	path('<int:pk>/detail', DetailActivity.as_view(), name='activity_detail'),
	path('<int:pk>/update/', UpdateActivity.as_view(), name='activity_update'),
	path('<int:pk>/delete/', DeleteActivity.as_view(), name='activity_delete'),

	path('participant_create/', CreateParticipant.as_view(), name='participant_create'),
]
