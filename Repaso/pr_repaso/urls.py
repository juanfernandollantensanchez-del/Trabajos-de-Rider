from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_repaso.urls')),  # Deja la raíz vacía para que la app maneje las rutas
]