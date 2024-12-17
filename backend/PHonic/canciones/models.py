from django.db import models
<<<<<<< HEAD
from discos.models import Disco
from generos.models import GeneroMusical

# Create your models here.

class Cancion(models.Model):
    """
    Representa una canción que pertenece a un disco.
    Incluye su título, duración y fecha de lanzamiento.
    """
    titulo = models.CharField(
        max_length=100,
        verbose_name="Título de la Canción"
    )
    duracion = models.DurationField(verbose_name="Duración de la Canción")
    fecha_lanzamiento = models.DateField(verbose_name="Fecha de Lanzamiento")
    disco = models.ForeignKey(
        Disco,
        on_delete=models.CASCADE,
        related_name='canciones',
        verbose_name="Disco"
    )
    genero_musical = models.ForeignKey(
        GeneroMusical,
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['titulo', 'disco'],
                name='unique_titulo_por_disco'
            )
        ]

    def __str__(self):
        return f"{self.titulo} - {self.disco.titulo}"
=======

from artistas.models import Artistas
from discos.models import Discos

class Canciones(models.Model):
    titulo = models.CharField(max_length=100)
    duracion = models.DurationField()
    fecha_lanzamiento = models.DateField()
    album = models.ForeignKey(Discos, on_delete=models.CASCADE, related_name='canciones')

    def __str__(self):
        return self.titulo
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
