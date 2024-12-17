# Create your views here.
from rest_framework import viewsets
from artistas.models import Artista
from .serializers import ArtistaSerializer

class ArtistaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar artistas.
    
    Este ViewSet maneja todas las operaciones CRUD (Create, Read, Update, Delete) de los artistas:
    - **GET**: Recupera una lista de artistas o un artista específico.
    - **POST**: Crea un nuevo artista.
    - **PUT/PATCH**: Actualiza la información de un artista existente.
    - **DELETE**: Elimina un artista del sistema.

    Utiliza el serializador `ArtistaSerializer` para transformar los datos entre JSON y objetos del modelo Artista.
    """
    queryset = Artista.objects.all()  # Recupera todos los artistas de la base de datos
    serializer_class = ArtistaSerializer  # Serializador asociado al modelo Artista
