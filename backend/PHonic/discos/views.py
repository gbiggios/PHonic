<<<<<<< HEAD
from django.shortcuts import render

# Create your views here.
=======
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Discos, Artistas
from .serializers import DiscosSerializer

class DiscosList(APIView):
    def get(self, request):
        discos = Discos.objects.all()
        serializer = DiscosSerializer(discos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DiscosSerializer(data=request.data)
        if serializer.is_valid():
            artista_id = serializer.validated_data['artista'].id
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiscosDetail(APIView):
    def get_object(self, pk):
        try:
            return Discos.objects.get(pk=pk)
        except Discos.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        disco = self.get_object(pk)
        serializer = DiscosSerializer(disco)
        return Response(serializer.data)

    def put(self, request, pk):
        disco = self.get_object(pk)
        serializer = DiscosSerializer(disco, data=request.data)
        if serializer.is_valid():
            artista_id = serializer.validated_data['artista'].id
            generos_artista = Artistas.objects.get(id=artista_id).generos_musicales.all()
            # Validar aquí que los géneros musicales del disco pertenezcan a los del artista (si es necesario)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        disco = self.get_object(pk)
        disco.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
