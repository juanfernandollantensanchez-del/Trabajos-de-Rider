from django.db import models

class Temblor(models.Model):
    nombre = models.CharField(max_length=150)
    fecha_hora = models.DateTimeField(null=True, blank=True)
    magnitud = models.FloatField()
    profundidad = models.IntegerField(null=True, blank=True)
    intensidad = models.CharField(max_length=50, null=True, blank=True)
    alerta = models.CharField(max_length=20, null=True, blank=True)
    observaciones = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - Magnitud {self.magnitud}"