# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from canciones.models import Cancion
from .serializers import CancionSerializer

class CancionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar canciones.
    
    Este ViewSet no solo maneja operaciones CRUD para canciones, sino que también incluye
    endpoints personalizados para filtrar canciones por disquera, artista o disco.

    Operaciones básicas:
    - **GET**: Lista todas las canciones o una en particular.
    - **POST**: Crea una nueva canción.
    - **PUT/PATCH**: Modifica una canción existente.
    - **DELETE**: Elimina una canción.

    Endpoints personalizados:
    - **GET /por_disquera/**: Lista canciones de una disquera específica.
    - **GET /por_artista/**: Lista canciones de un artista específico.
    - **GET /por_disco/**: Lista canciones de un disco específico.
    """
    queryset = Cancion.objects.all()
    serializer_class = CancionSerializer

    @action(detail=False, methods=['get'])
    def por_disquera(self, request):
        """
        Endpoint personalizado para listar canciones asociadas a una disquera.
        
        Parámetros de consulta:
        - `disquera`: ID de la disquera.

        Este endpoint devuelve todas las canciones ordenadas por duración.
        """
        disquera_id = request.query_params.get('disquera')
        if disquera_id:
            canciones = self.queryset.filter(disco__artistas__disquera_id=disquera_id).order_by('duracion')
            serializer = self.get_serializer(canciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Disquera no especificada"}, status=400)

    @action(detail=False, methods=['get'])
    def por_artista(self, request):
        """
        Endpoint personalizado para listar canciones de un artista.

        Parámetros de consulta:
        - `artista`: ID del artista.

        Devuelve canciones del artista ordenadas por duración.
        """
        artista_id = request.query_params.get('artista')
        if artista_id:
            canciones = self.queryset.filter(disco__artistas__id=artista_id).order_by('duracion')
            serializer = self.get_serializer(canciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Artista no especificado"}, status=400)

    @action(detail=False, methods=['get'])
    def por_disco(self, request):
        """
        Endpoint personalizado para listar canciones de un disco.

        Parámetros de consulta:
        - `disco`: ID del disco.

        Devuelve canciones del disco ordenadas por duración.
        """
        disco_id = request.query_params.get('disco')
        if disco_id:
            canciones = self.queryset.filter(disco_id=disco_id).order_by('duracion')
            serializer = self.get_serializer(canciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Disco no especificado"}, status=400)
