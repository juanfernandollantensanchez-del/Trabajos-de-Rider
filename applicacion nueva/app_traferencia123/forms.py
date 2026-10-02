from django import forms
from .models import Reporte

class DatoForm(forms.Form):
    dato = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'CodeRider'})
    )

class ReporteForm(forms.ModelForm):
    class Meta:
        model = Reporte
        fields = ['nombre', 'descripcion', 'foto', 'documento', 'audio', 'video']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ej. Alma marla'}),
            'descripcion': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Escribe la descripción aquí...'}),
            'foto': forms.FileInput(attrs={'class': 'file-input'}),
            'documento': forms.FileInput(attrs={'class': 'file-input'}),
            'audio': forms.FileInput(attrs={'class': 'file-input'}),
            'video': forms.FileInput(attrs={'class': 'file-input'}),
        }