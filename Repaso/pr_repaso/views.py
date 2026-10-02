from django.shortcuts import render

def inicio(request):
    return render(request, 'repaso/main.repaso.html')