from rest_framework.routers import DefaultRouter
from .views import ArtistaImagenViewSet

router = DefaultRouter()
router.register(r'', ArtistaImagenViewSet, basename='imagen')  # Prefijo vacío o diferente nombre

urlpatterns = router.urls
