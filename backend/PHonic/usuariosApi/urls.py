from django.urls import path
from .views import register, csrf_token_view, login_view

urlpatterns = [
    path('register/', register, name='register'),
    path('csrf-token/', csrf_token_view, name='csrf_token'),
    path('login/', login_view, name='login'), 
]
