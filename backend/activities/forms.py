from django import forms
from .models import Activity


class DateInput(forms.DateInput):
    input_type = 'date'


class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity
        fields = '__all__'
        widgets = {'datetime': DateInput()}


class EmailForm(forms.Form):
    Email = forms.EmailField()

    def __str__(self):
        return self.Email
