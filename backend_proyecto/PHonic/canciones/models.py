from django.db import models
from discos.models import Disco

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

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['titulo', 'disco'],
                name='unique_titulo_por_disco'
            )
        ]

    def __str__(self):
        return f"{self.titulo} - {self.disco.titulo}"
