import os

def get_project_code(root_dir):
    project_content = []
    for root, dirs, files in os.walk(root_dir):
        # Excluir carpetas innecesarias como __pycache__ y .git
        dirs[:] = [d for d in dirs if d not in ('__pycache__', '.git', 'env', 'venv')]
        
        rel_dir = os.path.relpath(root, root_dir)
        if rel_dir == '.':
            rel_dir = ''
        
        project_content.append(f"\n--- Directory: {rel_dir} ---\n")
        
        for file in files:
            file_path = os.path.join(root, file)
            project_content.append(f"\n### File: {file_path} ###\n")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                project_content.append(content)
            except Exception as e:
                project_content.append(f"[Error reading file: {file_path} - {e}]")
    return project_content

def save_to_txt(file_name, content):
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))

if __name__ == "__main__":
    # Directorio raíz del proyecto
    root_directory = os.path.dirname(os.path.abspath(__file__))
    
    # Obtener el código y estructura del proyecto
    project_code = get_project_code(root_directory)
    
    # Guardar en archivo TXT
    output_file = "project_code.txt"
    save_to_txt(output_file, project_code)
    
    print(f"Código y estructura del proyecto guardados en '{output_file}'.")
