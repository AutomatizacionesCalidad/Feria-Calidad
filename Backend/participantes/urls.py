from django.urls import path
from .views import ( IniciarSesionFeriaView, FinalizarSesionFeriaView )

urlpatterns = [
    path("sesiones/iniciar/", IniciarSesionFeriaView.as_view(), name="iniciar-sesion-feria"),
    path("sesiones/<int:sesion_id>/finalizar/", FinalizarSesionFeriaView.as_view(), name="finalizar-sesion-feria"),
]