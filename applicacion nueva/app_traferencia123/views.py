from django.shortcuts import render, redirect
from .forms import DatoForm, ReporteForm
from .models import Reporte, DetalleReporte, SeguimientoReporte, EquipoRescate

def fn_getpost_rider(request):
    resultados = ""
    metodo = request.method
    form_get = DatoForm()
    form_post = DatoForm()

    if request.method == "GET" and "dato" in request.GET:
        form_get = DatoForm(request.GET)
        if form_get.is_valid():
            dato = form_get.cleaned_data["dato"]
            resultados = f"El dato recibido por GET es: <strong>{dato}</strong>"

    elif request.method == "POST":
        form_post = DatoForm(request.POST)
        if form_post.is_valid():
            dato = form_post.cleaned_data["dato"]
            resultados = f"El dato recibido por POST es: <strong>{dato}</strong>"

    context = {
        "form_get": form_get,
        "form_post": form_post,
        "resultados": resultados,
        "metodo": metodo,
    }

    return render(request, 'inicio.html', context)


def evacuacion(request):
    if request.method == 'POST':
        form = ReporteForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('evacuacion')
    else:
        form = ReporteForm()

    # 1. Consultar TODOS los reportes existentes en tu base de datos
    reportes = Reporte.objects.select_related('detalle').prefetch_related('seguimientos', 'equipos').all()

    # 2. Asignar relaciones retroactivas a TODOS los reportes (antiguos y nuevos)
    equipo_general, _ = EquipoRescate.objects.get_or_create(nombre_equipo="Equipo Alpha CodeRider")

    for r in reportes:
        # Relación 1 a 1: Crear detalle si el reporte no lo tiene
        if not hasattr(r, 'detalle') or r.detalle is None:
            DetalleReporte.objects.get_or_create(
                reporte=r, 
                defaults={'prioridad': 'Alta', 'estado': 'En revisión'}
            )

        # Relación 1 a M: Crear seguimiento si no existe ninguno
        if not r.seguimientos.exists():
            SeguimientoReporte.objects.create(
                reporte=r, 
                comentario="Reporte registrado en el sistema"
            )

        # Relación M a M: Asignar equipo si no tiene ninguno asignado
        if not r.equipos.exists():
            r.equipos.add(equipo_general)

    return render(request, 'evacuacion.html', {
        'form': form,
        'reportes': reportes,
    })