from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from app_sena import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('empleate/', include('app_sena.urls')),

    path('crear-convocatoria/', views.crear_convocatoria),
    
    path('listar-convocatoria/', views.listar_convocatorias),

    path(
        'bienvenidos/',
        lambda request: HttpResponse(
            "Bienvenido a la página de Bienvenidos de Sena"
        )
    ),

    path(
        'bienvenidos/gracias/',
        lambda request: HttpResponse(
            "Gracias por visitarnos, Sena se despide"
        )
    ),

    path('bienvenidos/juan/', include('app_juan.urls')),

    path('empleate/juan/', include('app_juan.urls')),
]