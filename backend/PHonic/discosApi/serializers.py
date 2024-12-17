from rest_framework import serializers
from discos.models import Disco

class DiscoSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Disco.
    Convierte instancias del modelo Disco en datos JSON y viceversa.
    """
    class Meta:
        model = Disco
        fields = '__all__'  # Incluye todos los campos del modelo Disco
