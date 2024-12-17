from rest_framework.routers import DefaultRouter
from .views import ArtistaViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', ArtistaViewSet, basename='artista')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
