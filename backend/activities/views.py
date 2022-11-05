from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from django.views.generic import CreateView, UpdateView, DeleteView, DetailView, View
from django.views.generic.list import ListView

from .models import Activity, Participant
from accounts import Account

from django.urls import reverse_lazy


class IndexActivity(ListView):
	# template_name = ''
	queryset = Activity.objects.all().order_by('datetime')


class CreateActivity(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
	model = Activity
	fields = '__all__'

	# template_name = ''
	# success_url = reverse_lazy('')
	# permission_required = ('',)

	# user which creates new activity must be a lecturer
	def form_valid(self, form):
		form.instance.account = Account.objects.get(pk=self.request.user.id)
		return super(CreateActivity, self).form_valid(form)


class UpdateActivity(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
	model = Activity
	fields = '__all__'

	# template_name = ''
	# permission_required = ('',)
	# success_url = ''


class DeleteActivity(LoginRequiredMixin, PermissionRequiredMixin, DeleteView):
	model = Activity
	# success_url = reverse_lazy('')
	# permission_required = ('',)


class CreateParticipant(LoginRequiredMixin, CreateView):
	model = Participant
	fields = '__all__'

	# template_name = ''
	# success_url = reverse_lazy('')
