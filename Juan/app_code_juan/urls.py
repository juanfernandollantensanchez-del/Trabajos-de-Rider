from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from .import views
urlpatterns = [
    
path('admin/', admin.site.urls),
    
path('', lambda request: HttpResponse(
    "<h1>Hola queridos aprendices CodeJuan esta trabajando para que aprendas</h1>")),

path('bienvenida/', lambda request: HttpResponse(
    "Bienvenido aprendiz, CodeJuan <b>dio respuesta</b> desde el archivo<h1> urls.py de la app</h1>")),

path('despedida/', lambda request: HttpResponse(
    'Gracias por visitarme, CodeJuan se despide')),
]
