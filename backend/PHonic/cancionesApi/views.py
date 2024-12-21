from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from canciones.models import Cancion
from .serializers import CancionSerializer

class CancionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar canciones.
    """
    queryset = Cancion.objects.all().select_related('disco').prefetch_related('disco__artistas')
    serializer_class = CancionSerializer

    @action(detail=False, methods=['get'])
    def por_disquera(self, request):
        """
        Lista canciones de una disquera específica.
        """
        disquera_id = request.query_params.get('disquera')
        if disquera_id:
            canciones = self.queryset.filter(disco__disquera_id=disquera_id).order_by('duracion')
            serializer = self.get_serializer(canciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Disquera no especificada"}, status=400)

    @action(detail=False, methods=['get'])
    def por_artista(self, request):
        """
        Lista canciones de un artista específico.
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
        Lista canciones de un disco específico.
        """
        disco_id = request.query_params.get('disco')
        if disco_id:
            canciones = self.queryset.filter(disco_id=disco_id).order_by('duracion')
            serializer = self.get_serializer(canciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Disco no especificado"}, status=400)
