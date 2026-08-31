from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from feria.sqlite_queue import sqlite_write_transaction
from feria.models import InsigniaGanada, Modulo, ProgresoModulo
from .models import Usuario, SesionFeria
from .serializers import IniciarSesionSerializer


def _estado_liviano_sesion(sesion):
    progresos = (
        ProgresoModulo.objects
        .select_related(
            "modulo",
            "modulo__stand",
        )
        .filter(
            sesion=sesion,
        )
        .order_by(
            "modulo__stand__orden",
            "modulo__orden",
        )
    )

    insignias = (
        InsigniaGanada.objects
        .select_related(
            "insignia",
        )
        .filter(
            sesion=sesion,
        )
        .order_by(
            "fecha_hora_obtencion",
        )
    )

    actividades_completadas = [
        progreso.modulo.codigo
        for progreso in progresos
        if (
            progreso.estado
            == ProgresoModulo.Estado.COMPLETADO
        )
    ]

    return {
        "progreso_modulos": [
            {
                "modulo_codigo": (
                    progreso.modulo.codigo
                ),
                "estado": progreso.estado,
                "fecha_hora_inicio": (
                    progreso.fecha_hora_inicio
                ),
                "fecha_hora_finalizacion": (
                    progreso.fecha_hora_finalizacion
                ),
            }
            for progreso in progresos
        ],
        "actividades_completadas": (
            actividades_completadas
        ),
        "insignias_ganadas": [
            {
                "codigo": (
                    insignia_ganada
                    .insignia.codigo
                ),
                "fecha_hora_obtencion": (
                    insignia_ganada
                    .fecha_hora_obtencion
                ),
            }
            for insignia_ganada in insignias
        ],
    }

class IniciarSesionFeriaView(APIView):
    """
    Inicia o recupera una participación en la Feria Integral.

    Reglas:
    - Si el usuario no existe, se crea.
    - Si tiene una sesión EN_PROGRESO, se recupera.
    - Si no tiene sesión activa, se crea una nueva.
    - Al crear una nueva sesión, se inicializan los módulos.
    """

    @sqlite_write_transaction()
    def post(self, request):
        serializer = IniciarSesionSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

        cedula = data["cedula"]
        area = data.get("area")
        fecha_ejecucion = data.get(
            "fecha_ejecucion"
        )

        # 1. BUSCAR O CREAR USUARIO
        usuario, usuario_creado = (
            Usuario.objects.get_or_create(
                cedula=cedula,
                defaults={
                    "activo": True,
                },
            )
        )
        # 2. BUSCAR SESIÓN ACTIVA
        sesion_activa = (
            SesionFeria.objects
            .filter(
                usuario=usuario,
                estado=SesionFeria.Estado.EN_PROGRESO,
            )
            .order_by(
                "-fecha_hora_inicio"
            )
            .first()
        )

        # 3. SI YA EXISTE SESIÓN ACTIVA → RECUPERAR
        if sesion_activa:
            progresos_count = (
                ProgresoModulo.objects
                .filter(
                    sesion=sesion_activa
                )
                .count()
            )

            return Response(
                {
                    "message": (
                        "Sesión de Feria recuperada correctamente."
                    ),

                    "usuario_creado": usuario_creado,

                    "sesion_creada": False,

                    "sesion_recuperada": True,

                    "usuario": {
                        "id": usuario.id,
                        "cedula": usuario.cedula,
                        "nombre": usuario.nombre,
                    },

                    "sesion": {
                        "id": sesion_activa.id,
                        "area": sesion_activa.area,
                        "fecha_ejecucion": (
                            sesion_activa.fecha_ejecucion
                        ),
                        "fecha_hora_inicio": (
                            sesion_activa.fecha_hora_inicio
                        ),
                        "fecha_hora_finalizacion": (
                            sesion_activa.fecha_hora_finalizacion
                        ),
                        "estado": sesion_activa.estado,
                    },

                    "modulos_inicializados": (
                        progresos_count
                    ),

                    "estado_sesion": (
                        _estado_liviano_sesion(
                            sesion_activa
                        )
                    ),
                },
                status=status.HTTP_200_OK,
            )

        # 4. CREAR NUEVA SESIÓN
        sesion = SesionFeria.objects.create(
            usuario=usuario,
            area=area,
            fecha_ejecucion=fecha_ejecucion,
            fecha_hora_inicio=timezone.now(),
            estado=SesionFeria.Estado.EN_PROGRESO,
        )

        # 5. INICIALIZAR PROGRESOS
        modulos = (
            Modulo.objects
            .filter(
                activo=True
            )
            .order_by(
                "stand__orden",
                "orden",
            )
        )

        progresos = [
            ProgresoModulo(
                sesion=sesion,
                modulo=modulo,
                estado=(
                    ProgresoModulo.Estado.PENDIENTE
                ),
            )
            for modulo in modulos
        ]

        ProgresoModulo.objects.bulk_create(
            progresos
        )

        # 6. RESPUESTA NUEVA SESIÓN
        return Response(
            {
                "message": (
                    "Sesión de Feria iniciada correctamente."
                ),

                "usuario_creado": usuario_creado,

                "sesion_creada": True,

                "sesion_recuperada": False,

                "usuario": {
                    "id": usuario.id,
                    "cedula": usuario.cedula,
                    "nombre": usuario.nombre,
                },

                "sesion": {
                    "id": sesion.id,
                    "area": sesion.area,
                    "fecha_ejecucion": (
                        sesion.fecha_ejecucion
                    ),
                    "fecha_hora_inicio": (
                        sesion.fecha_hora_inicio
                    ),
                    "fecha_hora_finalizacion": (
                        sesion.fecha_hora_finalizacion
                    ),
                    "estado": sesion.estado,
                },

                "modulos_inicializados": (
                    len(progresos)
                ),

                "estado_sesion": (
                    _estado_liviano_sesion(
                        sesion
                    )
                ),
            },
            status=status.HTTP_201_CREATED,
        )

class FinalizarSesionFeriaView(APIView):
    """
    Finaliza una SesionFeria activa.
    """

    @sqlite_write_transaction()
    def post(self, request, sesion_id):
        try:
            sesion = (
                SesionFeria.objects
                .select_for_update()
                .get(
                    id=sesion_id
                )
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesión indicada no existe."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            sesion.estado
            == SesionFeria.Estado.FINALIZADA
        ):
            return Response(
                {
                    "message": (
                        "La sesión ya se encontraba finalizada."
                    ),
                    "sesion": {
                        "id": sesion.id,
                        "estado": sesion.estado,
                        "fecha_hora_finalizacion": (
                            sesion.fecha_hora_finalizacion
                        ),
                    },
                },
                status=status.HTTP_200_OK,
            )

        sesion.estado = (
            SesionFeria.Estado.FINALIZADA
        )

        sesion.fecha_hora_finalizacion = (
            timezone.now()
        )

        sesion.save(
            update_fields=[
                "estado",
                "fecha_hora_finalizacion",
                "fecha_actualizacion",
            ]
        )

        return Response(
            {
                "message": (
                    "Sesión de Feria finalizada correctamente."
                ),
                "sesion": {
                    "id": sesion.id,
                    "estado": sesion.estado,
                    "fecha_hora_inicio": (
                        sesion.fecha_hora_inicio
                    ),
                    "fecha_hora_finalizacion": (
                        sesion.fecha_hora_finalizacion
                    ),
                },
            },
            status=status.HTTP_200_OK,
        )
