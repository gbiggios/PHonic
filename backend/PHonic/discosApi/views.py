# Create your views here.
from rest_framework import viewsets
from discos.models import Disco
from .serializers import DiscoSerializer

class DiscoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar discos.
    
    Este ViewSet permite realizar operaciones CRUD en los discos registrados:
    - **GET**: Lista todos los discos o uno en particular.
    - **POST**: Crea un nuevo disco.
    - **PUT/PATCH**: Actualiza la información de un disco.
    - **DELETE**: Elimina un disco.

    Usa el serializador `DiscoSerializer` para manejar los datos de entrada y salida.
    """
    queryset = Disco.objects.all()
    serializer_class = DiscoSerializer
