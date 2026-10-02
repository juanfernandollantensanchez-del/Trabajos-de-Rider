import uuid
from django.db import models

# 1. TABLA USUARIO
class Usuario(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    correo = models.EmailField(unique=True, help_text="Ingrese un correo válido")
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.correo

# 2. TABLA PERFIL (Relación 1 a 1)
class Perfil(models.Model):
    usuario = models.OneToOneField(
        Usuario, 
        on_delete=models.CASCADE, 
        related_name="perfil"
    )
    biografia = models.TextField(blank=True)
    foto = models.ImageField(upload_to="fotos/", null=True, blank=True)
    edad = models.PositiveSmallIntegerField(null=True, blank=True)

    def __str__(self):
        return f"Perfil de {self.usuario.correo}"

# 3. TABLA CATEGORIA (Para relación N a N)
class Categoria(models.Model):
    slug = models.SlugField(primary_key=True, max_length=100)
    nombre = models.CharField(max_length=100, db_column="nombre_categoria")
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

# 4 y 5. TABLA PUBLICACION (Relación 1 a N + N a N)
class Publicacion(models.Model):
    ESTADOS = [
        ("pendiente", "Pendiente"),
        ("publicado", "Publicado"),
    ]

    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relación 1 a N
    autor = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        limit_choices_to={"activo": True},
        related_name="publicaciones"
    )
    
    # Relación N a N (Django crea automáticamente la 5ta tabla intermedia)
    categorias = models.ManyToManyField(
        Categoria, 
        related_name="publicaciones",
        blank=True
    )

    estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")
    datos = models.JSONField(default=dict, blank=True)
    actualizado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Publicación {self.codigo}"