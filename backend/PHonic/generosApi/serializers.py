from rest_framework import serializers
from generos.models import GeneroMusical

class GeneroMusicalSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo GeneroMusical.
    Convierte instancias del modelo GeneroMusical en datos JSON y viceversa.
    """
    class Meta:
        model = GeneroMusical
        fields = '__all__'  # Incluye todos los campos del modelo GeneroMusical
