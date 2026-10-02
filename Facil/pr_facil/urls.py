from django.contrib import admin
from django.urls import path, include
from .views import evaluacion_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', evaluacion_view, name='evaluacion'),
    path('', include('app_facil.urls'))
]