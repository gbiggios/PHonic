import os

# Ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def crear_serializers():
    """
    Crea un archivo serializers.py en cada aplicación que termina con 'Api' si no existe.
    """
    # Listar todos los directorios en la ruta base
    for app in os.listdir(BASE_DIR):
        app_path = os.path.join(BASE_DIR, app)
        # Verificar si es un directorio y su nombre termina con 'Api'
        if os.path.isdir(app_path) and app.endswith('Api'):
            serializers_path = os.path.join(app_path, 'serializers.py')
            # Crear el archivo serializers.py si no existe
            if not os.path.exists(serializers_path):
                with open(serializers_path, 'w') as f:
                    # Escribir una plantilla básica en el archivo
                    f.write("from rest_framework import serializers\n")
                    f.write(f"# Serializadores para la aplicación {app}\n")
                print(f"Archivo creado: {serializers_path}")
            else:
                print(f"El archivo ya existe: {serializers_path}")

if __name__ == "__main__":
    crear_serializers()
