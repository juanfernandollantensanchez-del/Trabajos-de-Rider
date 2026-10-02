from django.urls import path
from . import views

urlpatterns = [
    path('popayan/', views.popayan_bienvenida, name='popayan_bienvenida'),
    path('popayan/temblor/', views.temblor_view, name='temblor'),
    path('popayan/temblor/salida/', views.salida_temblor_view, name='salida_temblor'),
    path('popayan/lista/', views.lista_temblores_view, name='lista_temblores'),
]