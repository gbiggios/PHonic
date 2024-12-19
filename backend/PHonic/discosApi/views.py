# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from discos.models import Disco
from generos.models import GeneroMusical
from generosApi.serializers import GeneroMusicalSerializer
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

    @action(detail=True, methods=['get'], url_path='generos', url_name='generos')
    def generos(self, request, pk=None):
        """
        Devuelve los géneros asociados a un disco específico.
        
        Endpoint: /api/discos/<id>/generos/
        """
        try:
            # Obtener el disco por su ID
            disco = self.get_object()
            # Obtener los géneros asociados al disco
            generos = disco.generos.all()
            # Serializar los géneros
            serializer = GeneroMusicalSerializer(generos, many=True)
            return Response(serializer.data)
        except Disco.DoesNotExist:
            # Manejo de errores si el disco no existe
            return Response({"error": "Disco no encontrado"}, status=404)
