
# PHonic

PHonic es una aplicación para la gestión de información de artistas, discos, canciones, géneros musicales y redes sociales. Este proyecto está diseñado para satisfacer las necesidades de una disquera, brindando flexibilidad y escalabilidad mediante un sistema basado en Django.

## Características principales

1. **Gestión de Artistas:**
   - Registro de artistas con sus nombres reales y artísticos.
   - Biografía y fecha de nacimiento de cada artista.

2. **Redes Sociales:**
   - Asociación de redes sociales a artistas.
   - Almacenamiento de enlaces a perfiles en plataformas como Instagram, Twitter, etc.

3. **Géneros Musicales:**
   - Registro de géneros musicales con nombres únicos y descripciones opcionales.
   - Asociación de géneros a discos.

4. **Gestión de Discos:**
   - Registro de discos con títulos únicos.
   - Asociación de discos a uno o varios artistas.
   - Asignación de múltiples géneros a cada disco.

5. **Gestión de Canciones:**
   - Registro de canciones con títulos, duración y fecha de lanzamiento.
   - Asociación de canciones a discos.
   - Garantía de unicidad de títulos de canciones por disco.

## Aplicaciones de PHonic

1. **artistas:** Maneja el registro de artistas, incluyendo sus datos personales, nombres artísticos y biografía.
2. **redes_sociales:** Gestiona las redes sociales asociadas a los artistas, permitiendo almacenar enlaces a plataformas.
3. **generos:** Controla los géneros musicales disponibles y su descripción.
4. **discos:** Administra los discos creados por los artistas, sus géneros asociados y su fecha de lanzamiento.
5. **canciones:** Maneja las canciones incluidas en cada disco, con detalles como duración y fecha de publicación.

## Configuración del entorno local

Para ejecutar este proyecto en un entorno local, sigue estos pasos:

1. **Crear un entorno virtual:**
   Navega al directorio raíz del proyecto y ejecuta:
   ```bash
   python -m venv env
   ```

2. **Activar el entorno virtual:**
   - En macOS/Linux:
     ```bash
     source env/bin/activate
     ```
   - En Windows:
     ```bash
     env\Scripts\activate
     ```

3. **Instalar dependencias:**
   Asegúrate de estar dentro del entorno virtual y ejecuta:
   ```bash
   pip install -r requirements.txt
   ```

   *(Nota: El archivo `requirements.txt` contiene todas las dependencias necesarias para ejecutar el proyecto.)*

## Modelos definidos

### Artista
- `nombre`: Nombre real del artista.
- `nombre_artistico`: Nombre artístico único del artista.
- `biografia`: Descripción del artista.
- `fecha_nacimiento`: Fecha de nacimiento.

### Red Social
- `artista`: Relación con el modelo Artista.
- `nombre`: Nombre de la red social (e.g., Instagram).
- `enlace`: URL al perfil del artista.

### Género Musical
- `nombre`: Nombre único del género musical.
- `descripcion`: Descripción opcional del género.

### Disco
- `titulo`: Título único del disco.
- `fecha_lanzamiento`: Fecha de lanzamiento del disco.
- `artistas`: Relación con uno o varios artistas.
- `generos`: Relación con uno o varios géneros musicales.

### Canción
- `titulo`: Título de la canción.
- `duracion`: Duración de la canción.
- `fecha_lanzamiento`: Fecha de lanzamiento de la canción.
- `disco`: Relación con el disco al que pertenece.

## Endpoints de la API

### Artistas
- **GET /api/artistas/**: Lista todos los artistas.
- **POST /api/artistas/**: Crea un nuevo artista.
- **GET /api/artistas/<id>/**: Obtiene los detalles de un artista.
- **PUT /api/artistas/<id>/**: Actualiza un artista.
- **DELETE /api/artistas/<id>/**: Elimina un artista.

### Canciones
- **GET /api/canciones/**: Lista todas las canciones.
- **POST /api/canciones/**: Crea una nueva canción.
- **GET /api/canciones/<id>/**: Obtiene los detalles de una canción.
- **PUT /api/canciones/<id>/**: Actualiza una canción.
- **DELETE /api/canciones/<id>/**: Elimina una canción.
- **GET /api/canciones/por_disquera/?disquera=<id_disquera>**: Lista canciones por disquera, ordenadas por duración.
- **GET /api/canciones/por_artista/?artista=<id_artista>**: Lista canciones por artista, ordenadas por duración.
- **GET /api/canciones/por_disco/?disco=<id_disco>**: Lista canciones por disco, ordenadas por duración.

### Discos
- **GET /api/discos/**: Lista todos los discos.
- **POST /api/discos/**: Crea un nuevo disco.
- **GET /api/discos/<id>/**: Obtiene los detalles de un disco.
- **PUT /api/discos/<id>/**: Actualiza un disco.
- **DELETE /api/discos/<id>/**: Elimina un disco.

### Géneros
- **GET /api/generos/**: Lista todos los géneros musicales.
- **POST /api/generos/**: Crea un nuevo género.
- **GET /api/generos/<id>/**: Obtiene los detalles de un género.
- **PUT /api/generos/<id>/**: Actualiza un género.
- **DELETE /api/generos/<id>/**: Elimina un género.

### Redes Sociales
- **GET /api/redes_sociales/**: Lista todas las redes sociales.
- **POST /api/redes_sociales/**: Crea una nueva red social.
- **GET /api/redes_sociales/<id>/**: Obtiene los detalles de una red social.
- **PUT /api/redes_sociales/<id>/**: Actualiza una red social.
- **DELETE /api/redes_sociales/<id>/**: Elimina una red social.

## Endpoints Personalizados

Los endpoints personalizados creados para manejar filtros específicos están disponibles en la API de canciones. Estos endpoints permiten realizar consultas más específicas basadas en parámetros.

### Canciones - Endpoints Personalizados

- **GET /api/canciones/por_disquera/**: Lista canciones asociadas a una disquera específica, ordenadas por duración.
- **GET /api/canciones/por_artista/**: Lista canciones de un artista específico, ordenadas por duración.
- **GET /api/canciones/por_disco/**: Lista canciones de un disco específico, ordenadas por duración.

## Seguridad de la API

Por defecto, la API está abierta, pero puedes aplicar las siguientes estrategias para protegerla:

1. **Permisos personalizados:**
   - Limita el acceso a los endpoints para ciertos usuarios o roles.
   - Ejemplo: Permitir solo a superusuarios realizar operaciones de escritura (crear, actualizar, eliminar).

   ```python
   from rest_framework.permissions import BasePermission

   class IsSuperUser(BasePermission):
       def has_permission(self, request, view):
           return request.user and request.user.is_superuser
   ```

   Aplica este permiso en un ViewSet:
   ```python
   class ArtistaViewSet(viewsets.ModelViewSet):
       permission_classes = [IsSuperUser]
       queryset = Artista.objects.all()
       serializer_class = ArtistaSerializer
   ```

2. **Autenticación con Tokens:**
   - Usa `djangorestframework.authtoken` para generar y manejar tokens de autenticación.
   - Configura en `settings.py`:
     ```python
     REST_FRAMEWORK = {
         'DEFAULT_AUTHENTICATION_CLASSES': [
             'rest_framework.authentication.SessionAuthentication',
             'rest_framework.authentication.TokenAuthentication',
         ],
         'DEFAULT_PERMISSION_CLASSES': [
             'rest_framework.permissions.IsAuthenticated',
         ],
     }
     ```

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
