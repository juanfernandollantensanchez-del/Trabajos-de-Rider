from django.db import models

class Mi_curso(models.Model):
    instructor = models.CharField(max_length=150)
    competencia = models.TextField(max_length=200)
    ambiente = models.CharField(max_length=100)
    aprendiz = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.instructor} - {self.competencia}"