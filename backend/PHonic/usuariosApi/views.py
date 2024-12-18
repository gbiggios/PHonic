import json
from django.contrib.auth.models import User
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
