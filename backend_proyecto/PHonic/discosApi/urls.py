from rest_framework.routers import DefaultRouter
from .views import DiscoViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', DiscoViewSet, basename='disco')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
