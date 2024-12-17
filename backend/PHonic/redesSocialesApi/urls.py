from rest_framework.routers import DefaultRouter
from .views import RedSocialViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'', RedSocialViewSet, basename='red_social')

# Asignar las URLs generadas por el enrutador
urlpatterns = router.urls
