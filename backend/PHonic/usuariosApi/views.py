import json
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if email and password:
            if not User.objects.filter(email=email).exists():
                User.objects.create_user(username=email, email=email, password=password)
                return JsonResponse({"message": "Usuario registrado exitosamente"}, status=201)
            return JsonResponse({"error": "El usuario ya existe"}, status=400)
        return JsonResponse({"error": "Campos inválidos"}, status=400)



def csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({"csrfToken": csrf_token})

def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return JsonResponse({"error": "Por favor, ingresa tu usuario y contraseña."}, status=400)

        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                
                # Depuración
                print(f"Usuario autenticado: {user.username}, is_staff: {user.is_staff}")

                if user.is_staff:
                    return JsonResponse({"redirect_url": "/admin-home"}, status=200)
                else:
                    return JsonResponse({"redirect_url": "/user-home"}, status=200)
            else:
                return JsonResponse({"error": "Tu cuenta está desactivada."}, status=400)
        else:
            return JsonResponse({"error": "Credenciales inválidas."}, status=401)

    return JsonResponse({"error": "Método no permitido."}, status=405)

