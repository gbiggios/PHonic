# Create your views here.
from rest_framework import viewsets
from generos.models import GeneroMusical
from .serializers import GeneroMusicalSerializer

class GeneroMusicalViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar géneros musicales.
    
    Este ViewSet facilita el manejo de los géneros musicales que se asocian a discos:
    - **GET**: Lista todos los géneros o uno en particular.
    - **POST**: Agrega un nuevo género musical.
    - **PUT/PATCH**: Modifica información de un género existente.
    - **DELETE**: Elimina un género musical.

    El serializador `GeneroMusicalSerializer` transforma los datos JSON en objetos del modelo y viceversa.
    """
    queryset = GeneroMusical.objects.all()
    serializer_class = GeneroMusicalSerializer
