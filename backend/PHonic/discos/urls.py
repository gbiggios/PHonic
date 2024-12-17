from django.urls import path
<<<<<<< HEAD
# from .views import <vistas de la app discos>

urlpatterns = [
    # path('ruta/', vista, name='nombre'),
=======
from .views import DiscosList, DiscosDetail

urlpatterns = [
    path('discos/', DiscosList.as_view(), name='discos-list'),
    path('discos/<int:pk>/', DiscosDetail.as_view(), name='discos-detail'),
>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
]
