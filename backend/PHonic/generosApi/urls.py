from rest_framework.routers import DefaultRouter
from .views import GeneroMusicalViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', GeneroMusicalViewSet, basename='genero_musical')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
