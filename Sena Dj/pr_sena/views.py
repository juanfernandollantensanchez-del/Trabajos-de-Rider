from django.shortcuts import render

def fn_inicio(request):
    return render(request, 'pr_sena/inicio.html')