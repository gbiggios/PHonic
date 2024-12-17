# Create your views here.

from rest_framework import viewsets
from redes_sociales.models import RedSocial
from .serializers import RedSocialSerializer

class RedSocialViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar redes sociales asociadas a los artistas.
    
    Este ViewSet proporciona una forma fácil de manejar las redes sociales relacionadas con los artistas:
    - **GET**: Lista todas las redes sociales o una en particular.
    - **POST**: Crea una nueva red social asociada a un artista.
    - **PUT/PATCH**: Actualiza información de una red social existente.
    - **DELETE**: Elimina una red social.

    Utiliza el serializador `RedSocialSerializer` para la transformación de datos.
    """
    queryset = RedSocial.objects.all()
    serializer_class = RedSocialSerializer
