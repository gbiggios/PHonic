# genero_musical/urls.py
from django.urls import path
from .views import GenerosMusicalesList, GenerosMusicalesDetail

urlpatterns = [
    path('generos/', GenerosMusicalesList.as_view(), name='generos-list'),
    path('generos/<int:pk>/', GenerosMusicalesDetail.as_view(), name='generos-detail'),
]
