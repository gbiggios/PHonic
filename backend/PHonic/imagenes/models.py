from django.db import models
from artistas.models import Artista

class ArtistaImagen(models.Model):
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE)
    url = models.URLField(max_length=255)

    def __str__(self):
        return f"Imagen de {self.artista.nombre_artistico}"
