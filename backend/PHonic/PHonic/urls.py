from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/artistas/', include('artistasApi.urls')),
    path('api/redes_sociales/', include('redesSocialesApi.urls')),
    path('api/generos/', include('generosApi.urls')),
    path('api/discos/', include('discosApi.urls')),
    path('api/canciones/', include('cancionesApi.urls')),
=======
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('genero_musical.urls')),
    path('api/', include('artistas.urls')),
    path('api/', include('discos.urls')),
    path('api/', include('canciones.urls')),

>>>>>>> 34475f7fd07ba1dcba06a7ba3e9370378f3e2418
]
