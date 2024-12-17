from rest_framework.routers import DefaultRouter
from .views import CancionViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', CancionViewSet, basename='cancion')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
