from django.shortcuts import render
from django.http import HttpResponse
from .models import Convocatoria
from django.shortcuts import render, redirect


def crear_convocatoria(request):
    convocatorias = [
        Convocatoria(
            titulo_capacitacion='Capacitacion en Python',
            duracion='3 meses',
            tipo='Online',
            detalle='Aprende Python'
        ),
        Convocatoria(
            titulo_capacitacion='Capacitacion en Django',
            duracion='2 meses',
            tipo='Presencial',
            detalle='Desarrolla aplicaciones con Django'
        ),
        Convocatoria(
            titulo_capacitacion='Capacitacion en Data Science',
            duracion='4 meses',
            tipo='Online',
            detalle='Explora el mundo del analisis de datos y la ciencia de datos.'
        ),
    ]

    Convocatoria.objects.bulk_create(convocatorias)

    return HttpResponse("Convocatorias creadas exitosamente.")

def listar_convocatorias(request):
    convocatorias= Convocatoria.objects.all()
    return render (request, 'convocatorias.html', {'convocatorias': convocatorias})

def detalle_convocatoria(request, id):
    convocatoria = Convocatoria.objects.get(id=id)

    return render(
        request,
        'detalle_convocatoria.html',
        {'convocatoria': convocatoria}
    )


def eliminar_convocatoria(request, id):
    convocatoria = Convocatoria.objects.get(id=id)
    convocatoria.delete()

    return redirect('listar_convocatorias')


def inicio(request):
    return render(request, 'app_sena/main_sena.html')


def bienvenidos(request):
    return HttpResponse(
        "Bienvenido a la página de Bienvenidos de Sena"
    )


def fn_coderider(request):
    return render(request, 'app_sena/main_sena.html')


def fn_sena(request):
    return render(request, 'app_sena/main_sena.html')