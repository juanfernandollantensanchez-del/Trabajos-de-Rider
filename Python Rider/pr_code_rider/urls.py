from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('code-rider/', include('app_code_rider.urls')),
]
