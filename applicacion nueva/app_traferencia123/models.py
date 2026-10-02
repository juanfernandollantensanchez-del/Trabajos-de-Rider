from django.db import models

# TU MODELO INTACTO (NO SE MODIFICA NADA)
class Reporte(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    foto = models.ImageField(upload_to='fotos/')
    documento = models.FileField(upload_to='documen/', blank=True, null=True)  # Cambiado a FileField
    audio = models.FileField(upload_to='audios/', blank=True, null=True)       # Cambiado a 'audios/'
    fecha = models.DateTimeField(auto_now_add=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)

    def __str__(self):
        return self.nombre


# -------------------------------------------------------------
# NUEVOS MODELOS PARA RELACIONES (CONECTADOS A TU REPORTE)
# -------------------------------------------------------------

# 1. RELACIÓN 1 A 1 (1:1)
# Cada Reporte tiene de forma exclusiva UN solo detalle de evaluación
class DetalleReporte(models.Model):
    reporte = models.OneToOneField(Reporte, on_delete=models.CASCADE, related_name='detalle')
    prioridad = models.CharField(max_length=20, default='Alta')
    estado = models.CharField(max_length=50, default='En revisión')

    def __str__(self):
        return f"Detalle de {self.reporte.nombre}"


# 2. RELACIÓN 1 A MUCHOS (1:M)
# UN Reporte puede tener MUCHOS comentarios de seguimiento
class SeguimientoReporte(models.Model):
    reporte = models.ForeignKey(Reporte, on_delete=models.CASCADE, related_name='seguimientos')
    comentario = models.CharField(max_length=200)

    def __str__(self):
        return f"Seguimiento: {self.comentario}"


# 3. RELACIÓN MUCHOS A MUCHOS (M:M)
# MUCHOS Equipos de socorro pueden atender MUCHOS Reportes
class EquipoRescate(models.Model):
    nombre_equipo = models.CharField(max_length=100)
    reportes = models.ManyToManyField(Reporte, related_name='equipos', blank=True)

    def __str__(self):
        return self.nombre_equipo