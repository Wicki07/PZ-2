from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q


UserModel = get_user_model()


class EmailBackend(ModelBackend):
    def authenticate(self, data, **kwargs):
        try:
            user = UserModel.objects.get(email=data.POST.get('username'))
        except UserModel.DoesNotExist:
            return None
        
        if user.check_password(data.POST.get('password')):
            return user