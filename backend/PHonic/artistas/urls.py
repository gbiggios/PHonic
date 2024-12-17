<<<<<<< HEAD
from rest_framework.routers import DefaultRouter
from .views import ArtistaViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', ArtistaViewSet, basename='artista')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
=======
from django.urls import path
from .views import ArtistasList, ArtistasDetail

urlpatterns = [
    path('artistas/', ArtistasList.as_view(), name='artistas-list'),
    path('artistas/<int:pk>/', ArtistasDetail.as_view(), name='artistas-detail'),
]
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
