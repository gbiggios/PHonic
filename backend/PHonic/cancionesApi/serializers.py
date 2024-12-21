from rest_framework import serializers
from canciones.models import Cancion
from discos.models import Disco
from artistas.models import Artista

class ArtistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artista
        fields = ['id', 'nombre', 'nombre_artistico']

class DiscoSerializer(serializers.ModelSerializer):
    artistas = ArtistaSerializer(many=True, read_only=True)  # Los artistas son solo para lectura

    class Meta:
        model = Disco
        fields = ['id', 'titulo', 'artistas']

class CancionSerializer(serializers.ModelSerializer):
    disco = serializers.PrimaryKeyRelatedField(queryset=Disco.objects.all())  # Permite enviar solo el ID del disco
    disco_detalle = DiscoSerializer(source='disco', read_only=True)  # Detalles del disco como solo lectura

    class Meta:
        model = Cancion
        fields = ['id', 'titulo', 'duracion', 'fecha_lanzamiento', 'disco', 'disco_detalle']
