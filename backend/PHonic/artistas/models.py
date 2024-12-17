from django.db import models
<<<<<<< HEAD

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
=======
from genero_musical.models import GenerosMusicales

class Artistas(models.Model):
    nombre = models.CharField(max_length=100)
    nombre_artistico = models.CharField(max_length=100)
    biografia = models.TextField()
    fecha_nacimiento = models.DateField()
    generos_musicales = models.ManyToManyField(GenerosMusicales)
    redes_sociales = models.JSONField(default=dict)

    def __str__(self):
        return self.nombre
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
