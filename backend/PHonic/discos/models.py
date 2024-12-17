from django.db import models
<<<<<<< HEAD
from artistas.models import Artista
from generos.models import GeneroMusical

# Create your models here.
class Disco(models.Model):
    """
    Representa un disco que puede tener uno o varios artistas y múltiples géneros musicales.
    Incluye título, fecha de lanzamiento y relaciones con artistas y géneros.
    """
    titulo = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Título del Disco"
    )
    fecha_lanzamiento = models.DateField(verbose_name="Fecha de Lanzamiento")
    artistas = models.ManyToManyField(
        Artista,
        related_name='discos',
        verbose_name="Artistas"
    )
    def __str__(self):
        return self.titulo
=======
from genero_musical.models import GenerosMusicales
from artistas.models import Artistas

class Discos(models.Model):
    titulo = models.CharField(max_length=100)
    fecha_lanzamiento = models.DateField()
    artista = models.ForeignKey(Artistas, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
