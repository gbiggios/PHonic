from django.db import models

# Create your models here.

class GeneroMusical(models.Model):
    """
    Representa un género musical como rock, pop, jazz, etc.
    Cada género puede estar asociado a uno o varios discos.
    """
    nombre = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nombre del Género Musical"
    )
    descripcion = models.TextField(
        blank=True,
        null=True,
        verbose_name="Descripción del Género"
    )

    def __str__(self):
        return self.nombre
