from django import forms
from .models import Temblor

class TemblorForm(forms.ModelForm):
    class Meta:
        model = Temblor
        fields = '__all__'