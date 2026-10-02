from django.shortcuts import render


def inicio(request):
    return render(request, 'appjuan/main_juan.html')