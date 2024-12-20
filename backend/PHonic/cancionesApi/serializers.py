from rest_framework import serializers
from canciones.models import Cancion
from discos.models import Disco
from artistas.models import Artista

# Serializer para Artista
class ArtistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artista
        fields = ['id', 'nombre', 'nombre_artistico']

# Serializer para Disco
class DiscoSerializer(serializers.ModelSerializer):
    artistas = ArtistaSerializer(many=True)

    class Meta:
        model = Disco
        fields = ['id', 'titulo', 'fecha_lanzamiento', 'artistas']

# Serializer para Cancion
class CancionSerializer(serializers.ModelSerializer):
    disco_detalle = DiscoSerializer(source='disco', read_only=True)

    class Meta:
        model = Cancion
        fields = ['id', 'titulo', 'duracion', 'fecha_lanzamiento', 'disco', 'disco_detalle']
