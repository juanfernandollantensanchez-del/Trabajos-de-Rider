from django.contrib import admin
from .models import Usuario, Perfil, Categoria, Publicacion

admin.site.register(Usuario)
admin.site.register(Perfil)
admin.site.register(Categoria)
admin.site.register(Publicacion)