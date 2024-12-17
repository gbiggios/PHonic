from rest_framework import serializers
from .models import GenerosMusicales

class GenerosMusicalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenerosMusicales
        fields = '__all__'