from rest_framework import viewsets
from imagenes.models import ArtistaImagen
from .serializers import ArtistaImagenSerializer

class ArtistaImagenViewSet(viewsets.ModelViewSet):
    queryset = ArtistaImagen.objects.all()
    serializer_class = ArtistaImagenSerializer
