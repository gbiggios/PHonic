from rest_framework import serializers
from imagenes.models import ArtistaImagen

class ArtistaImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistaImagen
        fields = '__all__'
