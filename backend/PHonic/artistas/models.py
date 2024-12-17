from django.db import models

# Create your models here.

class Artista(models.Model):
    """
    Representa un artista que puede tener uno o varios discos.
    Incluye su nombre artístico, biografía y fecha de nacimiento.
    """
    nombre = models.CharField(
        max_length=100,
        verbose_name="Nombre Real"
    )
    nombre_artistico = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nombre Artístico"
    )
    biografia = models.TextField(verbose_name="Biografía")
    fecha_nacimiento = models.DateField(verbose_name="Fecha de Nacimiento")

    def __str__(self):
        return self.nombre_artistico
