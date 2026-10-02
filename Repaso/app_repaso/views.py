from django.shortcuts import render, get_object_or_404, redirect
from .models import Mi_curso
from django.http import HttpResponse

def inicio(request):
    return render(request, 'repaso/main.repaso.html')

def mi_aplicacion(request):
    return render(request, 'repaso/inici.html')

def listar_curso(request):  # Se corrigió 'requues' por 'request'
    cursos = Mi_curso.objects.all()
    return render(request, 'repaso/crear.cursos.html', {'mi_cursos': cursos})

def crear_curso(request):
    mi_cursos = [
        Mi_curso(
            instructor='Carlos Pérez',
            competencia='Desarrollo Web en Python',
            ambiente='Ambiente 101',
            aprendiz='Juan Rodríguez'
        ),
        Mi_curso(
            instructor='Ana Gómez',
            competencia='Bases de Datos con Django',
            ambiente='Ambiente 202',
            aprendiz='María López'
        ),
        Mi_curso(
            instructor='Luis Martínez',
            competencia='Ciencia de Datos',
            ambiente='Virtual',
            aprendiz='Pedro Gómez'
        ),
    ]
    Mi_curso.objects.bulk_create(mi_cursos)
    return HttpResponse("Mis cursos fueron creados exitosamente.")

# ⬇️ VISTA PARA VER EL DETALLE DE UN CURSO ⬇️
def detalle_curso(request, id):
    curso = get_object_or_404(Mi_curso, pk=id)
    return render(request, 'repaso/detalle_curso.html', {'curso': curso})

# ⬇️ VISTA PARA ELIMINAR UN CURSO ⬇️
def eliminar_curso(request, id):
    curso = get_object_or_404(Mi_curso, pk=id)
    if request.method == 'POST':
        curso.delete()
    return redirect('listar_curso')