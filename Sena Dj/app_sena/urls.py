from django.http import HttpResponse
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),

    path(
        'crear-convocatoria/',
        views.crear_convocatoria,
        name='crear_convocatoria'
    ),

    path(
        'listar-convocatoria/',
        views.listar_convocatorias,
        name='listar_convocatorias'
    ),

    path(
        'detalle-convocatoria/<int:id>/',
        views.detalle_convocatoria,
        name='detalle_convocatoria'
    ),

    path(
        'eliminar-convocatoria/<int:id>/',
        views.eliminar_convocatoria,
        name='eliminar_convocatoria'
    ),

    path('bienvenidos/', lambda request: HttpResponse(
        "Bienvenido a la página de principal de Empleate"
    )),

    path('gracias/', lambda request: HttpResponse(
        "Gracias por visitarnos, Empleate se despide"
    )),

    path(
        'fnRider-Multilinea/',
        views.fn_sena,
        name='rider_multilinea' 
    ),

    path(
        'fn_coderider/',
        views.fn_coderider,
        name='coderider'
    ),
]