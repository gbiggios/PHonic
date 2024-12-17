from rest_framework import serializers
from .models import Discos

class DiscosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discos
        fields = '__all__'