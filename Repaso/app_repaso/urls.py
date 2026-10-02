from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('mi-aplicacion/', views.mi_aplicacion, name='mi_aplicacion'),
    path('crear-curso/', views.crear_curso, name='crear_curso'),
    path('listar-curso/', views.listar_curso, name='listar_curso'),
    path('detalle-curso/<int:id>/', views.detalle_curso, name='detalle_curso'),
    path('eliminar-curso/<int:id>/', views.eliminar_curso, name='eliminar_curso'),
]