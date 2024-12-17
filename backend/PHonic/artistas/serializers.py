from rest_framework import serializers
from .models import Artistas

class ArtistasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artistas
        fields = '__all__'