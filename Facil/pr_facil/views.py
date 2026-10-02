from django.shortcuts import render

def evaluacion_view(request):
    evaluacion = [
        {"id": 1, "nombre": "Evaluación Diagnóstica", "nota": 4.5},
        {"id": 2, "nombre": "Parcial Módulo 1", "nota": 4.0},
        {"id": 3, "nombre": "Proyecto Final ADSO", "nota": 5.0},
    ]
    
    contexto = {
        'ficha': '3229426',
        'evaluacion': evaluacion
    }
    # Cambiado para que busque en la subcarpeta pr_facil/templates/index.html
    return render(request, 'index.html', contexto)