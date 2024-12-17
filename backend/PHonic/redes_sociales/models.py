from django.db import models
from artistas.models import Artista

# Create your models here.

class RedSocial(models.Model):
    """
    Representa una red social asociada a un artista.
    Por ejemplo, Instagram, Twitter o YouTube.
    """
    artista = models.ForeignKey(
        Artista,
        on_delete=models.CASCADE,
        related_name='redes_sociales'
    )
    nombre = models.CharField(
        max_length=50,
        verbose_name="Nombre de la Red Social"
    )
    enlace = models.URLField(verbose_name="Enlace a la Red Social")

    def __str__(self):
        return f"{self.nombre}: {self.enlace}"
