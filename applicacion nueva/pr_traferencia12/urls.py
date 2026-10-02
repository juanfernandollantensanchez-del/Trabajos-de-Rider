from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_traferencia123.urls')),  # Carga la app en la raíz
]