import os
import shutil

# Lista de aplicaciones del proyecto PHonic
apps_to_clean = [
    'artistas',
    'redes_sociales',
    'generos',
    'discos',
    'canciones',
]

# Ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def clean_migrations(app_name):
    migration_dir = os.path.join(BASE_DIR, app_name, 'migrations')
    
    if os.path.exists(migration_dir):
        print(f"Limpieza de migraciones en: {migration_dir}")
        
        # Eliminar todos los archivos excepto __init__.py
        for filename in os.listdir(migration_dir):
            file_path = os.path.join(migration_dir, filename)
            if filename != '__init__.py' and os.path.isfile(file_path):
                os.remove(file_path)
                print(f"Eliminado: {file_path}")
        
        # Eliminar __pycache__ en migrations si existe
        pycache_dir = os.path.join(migration_dir, '__pycache__')
        if os.path.exists(pycache_dir):
            shutil.rmtree(pycache_dir)
            print(f"Eliminado: {pycache_dir}")
    else:
        print(f"No se encontró la carpeta de migraciones para la app: {app_name}")

def clean_app_pycache(app_name):
    # Limpiar el __pycache__ a nivel de la aplicación
    app_pycache_dir = os.path.join(BASE_DIR, app_name, '__pycache__')
    if os.path.exists(app_pycache_dir):
        shutil.rmtree(app_pycache_dir)
        print(f"Eliminado __pycache__ en la app: {app_name}")
    else:
        print(f"No se encontró __pycache__ para la app: {app_name}")

def clean_project_pycache():
    # Limpiar el __pycache__ a nivel del proyecto principal
    project_pycache_dir = os.path.join(BASE_DIR, '__pycache__')
    if os.path.exists(project_pycache_dir):
        shutil.rmtree(project_pycache_dir)
        print("Eliminado __pycache__ a nivel del proyecto.")
    else:
        print("No se encontró __pycache__ a nivel del proyecto.")

if __name__ == "__main__":
    for app in apps_to_clean:
        clean_migrations(app)
        clean_app_pycache(app)
    
    # Limpiar el __pycache__ global del proyecto
    clean_project_pycache()
