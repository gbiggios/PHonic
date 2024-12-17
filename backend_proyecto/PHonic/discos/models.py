from django.db import models
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
    generos = models.ManyToManyField(
        GeneroMusical,
        related_name='discos',
        verbose_name="Géneros Musicales"
    )

    def __str__(self):
        return self.titulo
