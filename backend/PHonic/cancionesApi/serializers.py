from rest_framework import serializers
from canciones.models import Cancion

class CancionSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Cancion.
    Convierte instancias del modelo Cancion en datos JSON y viceversa.
    """
    class Meta:
        model = Cancion
        fields = '__all__'  # Incluye todos los campos del modelo Cancion
