from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.fn_getpost_rider, name='transferencia'),
    path('evacuacion/', views.evacuacion, name='evacuacion'),  # Se añade 'evacuacion/' y views.evacuacion
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)