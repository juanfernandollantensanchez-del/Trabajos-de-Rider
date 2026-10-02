from django.http import HttpResponse

def inicio(request):
    return HttpResponse("Módulo de datos activo")