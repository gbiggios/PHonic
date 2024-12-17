from rest_framework import serializers
from artistas.models import Artista

class ArtistaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Artista.
    Convierte instancias del modelo Artista en datos JSON y viceversa.
    """
    class Meta:
        model = Artista
        fields = '__all__'  # Incluye todos los campos del modelo Artista

