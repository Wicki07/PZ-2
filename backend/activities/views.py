from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from django.views.generic import CreateView, UpdateView, DeleteView, DetailView, View
from django.views.generic.list import ListView

from .models import Activity, Participant
from accounts import *

from django.urls import reverse_lazy

from .forms import ActivityForm


class IndexActivity(ListView):
	template_name = 'index.html'
	queryset = Activity.objects.all().order_by('datetime')


class DetailActivity(DetailView):
	model = Activity
	template_name = 'detail.html'

	def get_context_data(self, **kwargs):
		context = super(DetailActivity, self).get_context_data()
		return context


class CreateActivity(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
	form_class = ActivityForm

	template_name = 'create.html'
	success_url = reverse_lazy('activity_index')
	permission_required = ('',)

	'''
	# user which creates new activity must be a lecturer
	def form_valid(self, form):
		form.instance.account = Account.objects.get(pk=self.request.user.id)
		return super(CreateActivity, self).form_valid(form)
	'''


class UpdateActivity(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
	model = Activity
	fields = '__all__'

	template_name = 'update.html'
	success_url = reverse_lazy('activity_index')
	permission_required = ('',)


class DeleteActivity(LoginRequiredMixin, PermissionRequiredMixin, DeleteView):
	model = Activity
	template_name = 'delete.html'
	success_url = reverse_lazy('activity_index')
	permission_required = ('',)


class CreateParticipant(LoginRequiredMixin, CreateView):
	model = Participant
	fields = '__all__'

	template_name = 'create_participant.html'
	success_url = reverse_lazy('activity_index')
