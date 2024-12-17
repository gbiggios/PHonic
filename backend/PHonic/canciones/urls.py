from django.urls import path
<<<<<<< HEAD
# from .views import <vistas de la app canciones>

urlpatterns = [
    # path('ruta/', vista, name='nombre'),
=======
from .views import CancionesList, CancionesDetail

urlpatterns = [
    path('canciones/', CancionesList.as_view(), name='canciones-list'),
    path('canciones/<int:pk>/', CancionesDetail.as_view(), name='canciones-detail'),
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
]
