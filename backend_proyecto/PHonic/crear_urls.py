import os

# Ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def crear_urls():
    """
    Crea un archivo urls.py en cada aplicación del proyecto si no existe.
    """
    for app in os.listdir(BASE_DIR):
        app_path = os.path.join(BASE_DIR, app)
        # Verificar si es un directorio y contiene "__init__.py" (indicativo de una app Django)
        if os.path.isdir(app_path) and os.path.exists(os.path.join(app_path, '__init__.py')):
            urls_path = os.path.join(app_path, 'urls.py')
            # Crear el archivo urls.py si no existe
            if not os.path.exists(urls_path):
                with open(urls_path, 'w') as f:
                    # Plantilla básica del archivo urls.py
                    f.write("from django.urls import path\n")
                    f.write(f"# from .views import <vistas de la app {app}>\n\n")
                    f.write("urlpatterns = [\n")
                    f.write("    # path('ruta/', vista, name='nombre'),\n")
                    f.write("]\n")
                print(f"Archivo creado: {urls_path}")
            else:
                print(f"El archivo ya existe: {urls_path}")

if __name__ == "__main__":
    crear_urls()
