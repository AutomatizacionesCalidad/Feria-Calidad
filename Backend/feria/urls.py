from django.urls import path

from .views import (
    CompletarModuloView,
    GanarInsigniaView,
    IniciarModuloView,
    RegistrarIntentoActividadView,
    RegistrarIntentoRespuestaView,
    ResumenSesionFeriaView,
)

urlpatterns = [
    path(
        "sesiones/<int:sesion_id>/modulos/<str:modulo_codigo>/iniciar/",
        IniciarModuloView.as_view(),
        name="iniciar-modulo",
    ),

    path(
        "sesiones/<int:sesion_id>/modulos/<str:modulo_codigo>/completar/",
        CompletarModuloView.as_view(),
        name="completar-modulo",
    ),

    path(
        "sesiones/<int:sesion_id>/respuestas/",
        RegistrarIntentoRespuestaView.as_view(),
        name="registrar-intento-respuesta",
    ),

    path(
        "sesiones/<int:sesion_id>/actividades/",
        RegistrarIntentoActividadView.as_view(),
        name="registrar-intento-actividad",
    ),

    path(
        "sesiones/<int:sesion_id>/insignias/<str:insignia_codigo>/ganar/",
        GanarInsigniaView.as_view(),
        name="ganar-insignia",
    ),

    path(
        "sesiones/<int:sesion_id>/resumen/",
        ResumenSesionFeriaView.as_view(),
        name="resumen-sesion-feria",
    ),
]
