from rest_framework import serializers
from redes_sociales.models import RedSocial

class RedSocialSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo RedSocial.
    Convierte instancias del modelo RedSocial en datos JSON y viceversa.
    """
    class Meta:
        model = RedSocial
        fields = '__all__'  # Incluye todos los campos del modelo RedSocial
