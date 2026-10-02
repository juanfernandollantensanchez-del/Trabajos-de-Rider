from django.shortcuts import render
from django.template.defaultfilters import date as django_date_filter
from .models import Temblor
from .forms import TemblorForm

def popayan_bienvenida(request):
    return render(request, 'popayan.html')

def temblor_view(request):
    return render(request, 'temblor.html')

def salida_temblor_view(request):
    if request.method == 'POST':
        datos_formulario = {
            'nombre': request.POST.get('temblor'),
            'fecha_hora': request.POST.get('fecha_hora') or None,
            'magnitud': request.POST.get('magnitud') or None,
            'profundidad': request.POST.get('profundidad') or None,
            'intensidad': request.POST.get('intensidad'),
            'alerta': request.POST.get('alerta'),
            'observaciones': request.POST.get('observaciones'),
        }

        form = TemblorForm(datos_formulario)

        if form.is_valid():
            registro_creado = form.save()
            return render(request, 'resultado.html', {'registro': registro_creado})
        else:
            print("Errores en el formulario:", form.errors)

    return render(request, 'temblor.html')


def lista_temblores_view(request):
    query = request.GET.get('q', '').strip()
    campo = request.GET.get('campo', 'todos')

    todos_los_registros = Temblor.objects.all().order_by('-id')

    # Si no hay texto en el buscador, devolvemos todo sin filtrar
    if not query:
        return render(request, 'lista.html', {
            'registros': todos_los_registros,
            'query': query,
            'campo': campo
        })

    q_lower = query.lower()
    q_decimal_dot = q_lower.replace(',', '.')
    q_decimal_comma = q_lower.replace('.', ',')

    registros_filtrados = []

    for sismo in todos_los_registros:
        # 1. Convertimos cada campo a texto
        id_str = str(sismo.id)
        nombre_str = (sismo.nombre or '').lower()
        magnitud_str = str(sismo.magnitud or '')
        profundidad_str = str(sismo.profundidad or '')
        intensidad_str = (sismo.intensidad or '').lower()
        alerta_str = (sismo.alerta or '').lower()
        observaciones_str = (sismo.observaciones or '').lower()

        # 2. Convertimos la fecha tanto al formato de BD como al texto formateado que sale en pantalla
        fecha_str = ""
        if sismo.fecha_hora:
            fecha_espanol = django_date_filter(sismo.fecha_hora, r"j \d\e F \d\e Y \a \l\a\s H:i")
            fecha_str = f"{sismo.fecha_hora} {fecha_espanol}".lower()

        # 3. Evaluamos la coincidencia según el campo seleccionado
        coincide = False

        if campo == 'id' and q_lower in id_str:
            coincide = True
        elif campo == 'nombre' and q_lower in nombre_str:
            coincide = True
        elif campo == 'magnitud' and (q_decimal_dot in magnitud_str or q_decimal_comma in magnitud_str):
            coincide = True
        elif campo == 'profundidad' and q_lower in profundidad_str:
            coincide = True
        elif campo == 'fecha_hora' and q_lower in fecha_str:
            coincide = True
        elif campo == 'intensidad' and q_lower in intensidad_str:
            coincide = True
        elif campo == 'alerta' and q_lower in alerta_str:
            coincide = True
        elif campo == 'observaciones' and q_lower in observaciones_str:
            coincide = True
        elif campo == 'todos':
            texto_general = f"{id_str} {nombre_str} {magnitud_str} {profundidad_str} {fecha_str} {intensidad_str} {alerta_str} {observaciones_str}"
            if q_lower in texto_general or q_decimal_dot in texto_general or q_decimal_comma in texto_general:
                coincide = True

        if coincide:
            registros_filtrados.append(sismo)

    return render(request, 'lista.html', {
        'registros': registros_filtrados,
        'query': query,
        'campo': campo
    })
    