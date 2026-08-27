from django.db import transaction
from django.utils import timezone
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from participantes.models import SesionFeria
from .models import (
    Insignia,
    InsigniaGanada,
    IntentoActividad,
    IntentoRespuesta,
    Modulo,
    OpcionPregunta,
    Pregunta,
    ProgresoModulo,
)

class IniciarModuloView(APIView):
    """
    Marca un módulo como EN_PROGRESO.

    Si ya está iniciado o completado, no duplica nada.
    """

    @transaction.atomic
    def post(self, request, sesion_id, modulo_codigo):
        try:
            sesion = SesionFeria.objects.get(
                id=sesion_id,
                estado=SesionFeria.Estado.EN_PROGRESO,
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesión no existe o ya está finalizada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            modulo = Modulo.objects.get(
                codigo=modulo_codigo,
                activo=True,
            )
        except Modulo.DoesNotExist:
            return Response(
                {
                    "detail": "El módulo indicado no existe."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            progreso = (
                ProgresoModulo.objects
                .select_for_update()
                .get(
                    sesion=sesion,
                    modulo=modulo,
                )
            )
        except ProgresoModulo.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "No existe progreso para este módulo "
                        "en la sesión indicada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # Si ya está completado, no tocamos nada
        if (
            progreso.estado
            == ProgresoModulo.Estado.COMPLETADO
        ):
            return Response(
                {
                    "message": (
                        "El módulo ya estaba completado."
                    ),
                    "progreso": {
                        "modulo": modulo.codigo,
                        "estado": progreso.estado,
                        "fecha_hora_inicio": (
                            progreso.fecha_hora_inicio
                        ),
                        "fecha_hora_finalizacion": (
                            progreso.fecha_hora_finalizacion
                        ),
                    },
                },
                status=status.HTTP_200_OK,
            )

        # Si ya estaba en progreso, tampoco reiniciamos la hora
        if (
            progreso.estado
            == ProgresoModulo.Estado.EN_PROGRESO
        ):
            return Response(
                {
                    "message": (
                        "El módulo ya estaba en progreso."
                    ),
                    "progreso": {
                        "modulo": modulo.codigo,
                        "estado": progreso.estado,
                        "fecha_hora_inicio": (
                            progreso.fecha_hora_inicio
                        ),
                        "fecha_hora_finalizacion": (
                            progreso.fecha_hora_finalizacion
                        ),
                    },
                },
                status=status.HTTP_200_OK,
            )

        progreso.estado = (
            ProgresoModulo.Estado.EN_PROGRESO
        )

        progreso.fecha_hora_inicio = (
            timezone.now()
        )

        progreso.save(
            update_fields=[
                "estado",
                "fecha_hora_inicio",
                "fecha_actualizacion",
            ]
        )

        return Response(
            {
                "message": (
                    "Módulo iniciado correctamente."
                ),
                "progreso": {
                    "modulo": modulo.codigo,
                    "estado": progreso.estado,
                    "fecha_hora_inicio": (
                        progreso.fecha_hora_inicio
                    ),
                    "fecha_hora_finalizacion": (
                        progreso.fecha_hora_finalizacion
                    ),
                },
            },
            status=status.HTTP_200_OK,
        )

class CompletarModuloView(APIView):
    """
    Marca un módulo como COMPLETADO.

    Si nunca fue iniciado, asigna hora de inicio y fin.
    """

    @transaction.atomic
    def post(self, request, sesion_id, modulo_codigo):
        try:
            sesion = SesionFeria.objects.get(
                id=sesion_id,
                estado=SesionFeria.Estado.EN_PROGRESO,
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesión no existe o ya está finalizada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            modulo = Modulo.objects.get(
                codigo=modulo_codigo,
                activo=True,
            )
        except Modulo.DoesNotExist:
            return Response(
                {
                    "detail": "El módulo indicado no existe."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            progreso = (
                ProgresoModulo.objects
                .select_for_update()
                .get(
                    sesion=sesion,
                    modulo=modulo,
                )
            )
        except ProgresoModulo.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "No existe progreso para este módulo "
                        "en la sesión indicada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            progreso.estado
            == ProgresoModulo.Estado.COMPLETADO
        ):
            return Response(
                {
                    "message": (
                        "El módulo ya estaba completado."
                    ),
                    "progreso": {
                        "modulo": modulo.codigo,
                        "estado": progreso.estado,
                        "fecha_hora_inicio": (
                            progreso.fecha_hora_inicio
                        ),
                        "fecha_hora_finalizacion": (
                            progreso.fecha_hora_finalizacion
                        ),
                    },
                },
                status=status.HTTP_200_OK,
            )

        ahora = timezone.now()

        if not progreso.fecha_hora_inicio:
            progreso.fecha_hora_inicio = ahora

        progreso.estado = (
            ProgresoModulo.Estado.COMPLETADO
        )

        progreso.fecha_hora_finalizacion = (
            ahora
        )

        progreso.save(
            update_fields=[
                "estado",
                "fecha_hora_inicio",
                "fecha_hora_finalizacion",
                "fecha_actualizacion",
            ]
        )

        return Response(
            {
                "message": (
                    "Módulo completado correctamente."
                ),
                "progreso": {
                    "modulo": modulo.codigo,
                    "estado": progreso.estado,
                    "fecha_hora_inicio": (
                        progreso.fecha_hora_inicio
                    ),
                    "fecha_hora_finalizacion": (
                        progreso.fecha_hora_finalizacion
                    ),
                },
            },
            status=status.HTTP_200_OK,
        )


class RegistrarIntentoRespuestaView(APIView):
    """
    Registra un intento de respuesta para una pregunta.

    El backend calcula:
    - número de intento
    - si la opción elegida es correcta
    - fecha y hora real del servidor
    """

    @transaction.atomic
    def post(self, request, sesion_id):
        try:
            sesion = (
                SesionFeria.objects
                .select_for_update()
                .get(
                    id=sesion_id,
                    estado=SesionFeria.Estado.EN_PROGRESO,
                )
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesión no existe o ya está finalizada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        pregunta_codigo = request.data.get(
            "pregunta_codigo"
        )

        opcion_codigo = request.data.get(
            "opcion_codigo"
        )

        respuesta_texto = request.data.get(
            "respuesta_texto"
        )

        if not pregunta_codigo:
            return Response(
                {
                    "detail": (
                        "Debe enviar pregunta_codigo."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            pregunta = Pregunta.objects.get(
                codigo=pregunta_codigo,
                activo=True,
            )
        except Pregunta.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La pregunta indicada no existe."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        opcion = None

        if opcion_codigo:
            try:
                opcion = OpcionPregunta.objects.get(
                    pregunta=pregunta,
                    codigo=opcion_codigo,
                    activo=True,
                )
            except OpcionPregunta.DoesNotExist:
                return Response(
                    {
                        "detail": (
                            "La opción indicada no existe "
                            "para esta pregunta."
                        )
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

        if not opcion and not respuesta_texto:
            return Response(
                {
                    "detail": (
                        "Debe enviar opcion_codigo o respuesta_texto."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        ultimo_intento = (
            IntentoRespuesta.objects
            .filter(
                sesion=sesion,
                pregunta=pregunta,
            )
            .order_by(
                "-numero_intento"
            )
            .first()
        )

        numero_intento = (
            1
            if not ultimo_intento
            else ultimo_intento.numero_intento + 1
        )

        es_correcta = (
            opcion.es_correcta
            if opcion
            else False
        )

        intento = IntentoRespuesta.objects.create(
            sesion=sesion,
            pregunta=pregunta,
            opcion=opcion,
            respuesta_texto=(
                respuesta_texto
                if respuesta_texto is not None
                else opcion.texto
            ),
            numero_intento=numero_intento,
            es_correcta=es_correcta,
            fecha_hora_respuesta=timezone.now(),
        )

        return Response(
            {
                "message": (
                    "Intento de respuesta registrado correctamente."
                ),
                "intento": {
                    "id": intento.id,
                    "sesion_id": sesion.id,
                    "pregunta_codigo": pregunta.codigo,
                    "opcion_codigo": (
                        opcion.codigo
                        if opcion
                        else None
                    ),
                    "respuesta_texto": intento.respuesta_texto,
                    "numero_intento": intento.numero_intento,
                    "es_correcta": intento.es_correcta,
                    "fecha_hora_respuesta": (
                        intento.fecha_hora_respuesta
                    ),
                },
            },
            status=status.HTTP_201_CREATED,
        )


class RegistrarIntentoActividadView(APIView):
    """
    Registra un intento de una actividad interactiva.

    El backend calcula el numero de intento y usa la hora real del servidor.
    """

    @transaction.atomic
    def post(self, request, sesion_id):
        try:
            sesion = (
                SesionFeria.objects
                .select_for_update()
                .get(
                    id=sesion_id,
                    estado=SesionFeria.Estado.EN_PROGRESO,
                )
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesion no existe o ya esta finalizada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        modulo_codigo = request.data.get(
            "modulo_codigo"
        )

        codigo_actividad = request.data.get(
            "codigo_actividad"
        )

        respuesta_json = request.data.get(
            "respuesta_json"
        )

        es_correcta = request.data.get(
            "es_correcta"
        )

        if not modulo_codigo:
            return Response(
                {
                    "detail": (
                        "Debe enviar modulo_codigo."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not codigo_actividad:
            return Response(
                {
                    "detail": (
                        "Debe enviar codigo_actividad."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not isinstance(
            es_correcta,
            bool,
        ):
            return Response(
                {
                    "detail": (
                        "Debe enviar es_correcta como booleano."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            modulo = Modulo.objects.get(
                codigo=modulo_codigo,
                activo=True,
            )
        except Modulo.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "El modulo indicado no existe."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        ultimo_intento = (
            IntentoActividad.objects
            .filter(
                sesion=sesion,
                modulo=modulo,
                codigo_actividad=codigo_actividad,
            )
            .order_by(
                "-numero_intento"
            )
            .first()
        )

        numero_intento = (
            1
            if not ultimo_intento
            else ultimo_intento.numero_intento + 1
        )

        intento = IntentoActividad.objects.create(
            sesion=sesion,
            modulo=modulo,
            codigo_actividad=codigo_actividad,
            numero_intento=numero_intento,
            respuesta_json=respuesta_json,
            es_correcta=es_correcta,
            fecha_hora=timezone.now(),
        )

        return Response(
            {
                "message": (
                    "Intento de actividad registrado correctamente."
                ),
                "intento": {
                    "id": intento.id,
                    "sesion_id": sesion.id,
                    "modulo_codigo": modulo.codigo,
                    "codigo_actividad": intento.codigo_actividad,
                    "numero_intento": intento.numero_intento,
                    "respuesta_json": intento.respuesta_json,
                    "es_correcta": intento.es_correcta,
                    "fecha_hora": intento.fecha_hora,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class GanarInsigniaView(APIView):
    """
    Registra una insignia ganada por una sesion.

    Si la insignia ya habia sido ganada, no crea duplicados.
    """

    @transaction.atomic
    def post(self, request, sesion_id, insignia_codigo):
        try:
            sesion = (
                SesionFeria.objects
                .select_for_update()
                .get(
                    id=sesion_id,
                    estado=SesionFeria.Estado.EN_PROGRESO,
                )
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesion no existe o ya esta finalizada."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            insignia = Insignia.objects.get(
                codigo=insignia_codigo,
                activo=True,
            )
        except Insignia.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La insignia indicada no existe."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        insignia_ganada, creada = (
            InsigniaGanada.objects.get_or_create(
                sesion=sesion,
                insignia=insignia,
                defaults={
                    "fecha_hora_obtencion":
                        timezone.now(),
                },
            )
        )

        return Response(
            {
                "message": (
                    "Insignia registrada correctamente."
                    if creada
                    else "La insignia ya estaba registrada."
                ),
                "creada": creada,
                "insignia": {
                    "id": insignia_ganada.id,
                    "sesion_id": sesion.id,
                    "codigo": insignia.codigo,
                    "nombre": insignia.nombre,
                    "fecha_hora_obtencion": (
                        insignia_ganada.fecha_hora_obtencion
                    ),
                },
            },
            status=(
                status.HTTP_201_CREATED
                if creada
                else status.HTTP_200_OK
            ),
        )


class ResumenSesionFeriaView(APIView):
    """
    Devuelve el consolidado completo de una sesion de feria.

    Solo usuarios administradores pueden consultar este reporte.
    """

    permission_classes = [IsAdminUser]

    def get(self, request, sesion_id):
        try:
            sesion = (
                SesionFeria.objects
                .select_related("usuario")
                .get(id=sesion_id)
            )
        except SesionFeria.DoesNotExist:
            return Response(
                {
                    "detail": (
                        "La sesion indicada no existe."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        progresos = (
            ProgresoModulo.objects
            .select_related(
                "modulo",
                "modulo__stand",
            )
            .filter(sesion=sesion)
            .order_by(
                "modulo__stand__orden",
                "modulo__orden",
            )
        )

        intentos_respuesta = (
            IntentoRespuesta.objects
            .select_related(
                "pregunta",
                "pregunta__evaluacion",
                "pregunta__evaluacion__modulo",
                "pregunta__evaluacion__modulo__stand",
                "opcion",
            )
            .filter(sesion=sesion)
            .order_by(
                "pregunta__evaluacion__modulo__stand__orden",
                "pregunta__evaluacion__modulo__orden",
                "pregunta__orden",
                "numero_intento",
            )
        )

        intentos_actividad = (
            IntentoActividad.objects
            .select_related(
                "modulo",
                "modulo__stand",
            )
            .filter(sesion=sesion)
            .order_by(
                "modulo__stand__orden",
                "modulo__orden",
                "codigo_actividad",
                "numero_intento",
            )
        )

        insignias_ganadas = (
            InsigniaGanada.objects
            .select_related(
                "insignia",
                "insignia__stand",
            )
            .filter(sesion=sesion)
            .order_by("fecha_hora_obtencion")
        )

        total_modulos = progresos.count()
        modulos_completados = progresos.filter(
            estado=ProgresoModulo.Estado.COMPLETADO
        ).count()

        porcentaje_avance = (
            round(
                (modulos_completados / total_modulos) * 100,
                2,
            )
            if total_modulos
            else 0
        )

        return Response(
            {
                "usuario": {
                    "id": sesion.usuario.id,
                    "cedula": sesion.usuario.cedula,
                    "nombre": sesion.usuario.nombre,
                    "activo": sesion.usuario.activo,
                },
                "sesion": {
                    "id": sesion.id,
                    "area": sesion.area,
                    "fecha_ejecucion": sesion.fecha_ejecucion,
                    "fecha_hora_inicio": sesion.fecha_hora_inicio,
                    "fecha_hora_finalizacion": (
                        sesion.fecha_hora_finalizacion
                    ),
                    "estado": sesion.estado,
                },
                "totales": {
                    "modulos": total_modulos,
                    "modulos_completados": modulos_completados,
                    "porcentaje_avance": porcentaje_avance,
                    "intentos_respuesta": intentos_respuesta.count(),
                    "intentos_actividad": intentos_actividad.count(),
                    "insignias_ganadas": insignias_ganadas.count(),
                },
                "progreso_modulos": [
                    {
                        "id": progreso.id,
                        "estado": progreso.estado,
                        "fecha_hora_inicio": progreso.fecha_hora_inicio,
                        "fecha_hora_finalizacion": (
                            progreso.fecha_hora_finalizacion
                        ),
                        "modulo": {
                            "id": progreso.modulo.id,
                            "codigo": progreso.modulo.codigo,
                            "nombre": progreso.modulo.nombre,
                            "orden": progreso.modulo.orden,
                        },
                        "stand": {
                            "id": progreso.modulo.stand.id,
                            "codigo": progreso.modulo.stand.codigo,
                            "nombre": progreso.modulo.stand.nombre,
                            "orden": progreso.modulo.stand.orden,
                        },
                    }
                    for progreso in progresos
                ],
                "intentos_respuesta": [
                    {
                        "id": intento.id,
                        "pregunta": {
                            "id": intento.pregunta.id,
                            "codigo": intento.pregunta.codigo,
                            "enunciado": intento.pregunta.enunciado,
                            "tipo": intento.pregunta.tipo,
                            "orden": intento.pregunta.orden,
                        },
                        "evaluacion": {
                            "id": intento.pregunta.evaluacion.id,
                            "codigo": intento.pregunta.evaluacion.codigo,
                            "nombre": intento.pregunta.evaluacion.nombre,
                        },
                        "modulo": {
                            "codigo": (
                                intento.pregunta.evaluacion.modulo.codigo
                            ),
                            "nombre": (
                                intento.pregunta.evaluacion.modulo.nombre
                            ),
                        },
                        "stand": {
                            "codigo": (
                                intento.pregunta
                                .evaluacion
                                .modulo
                                .stand
                                .codigo
                            ),
                            "nombre": (
                                intento.pregunta
                                .evaluacion
                                .modulo
                                .stand
                                .nombre
                            ),
                        },
                        "opcion": (
                            {
                                "id": intento.opcion.id,
                                "codigo": intento.opcion.codigo,
                                "texto": intento.opcion.texto,
                            }
                            if intento.opcion
                            else None
                        ),
                        "respuesta_texto": intento.respuesta_texto,
                        "numero_intento": intento.numero_intento,
                        "es_correcta": intento.es_correcta,
                        "fecha_hora_respuesta": (
                            intento.fecha_hora_respuesta
                        ),
                    }
                    for intento in intentos_respuesta
                ],
                "intentos_actividad": [
                    {
                        "id": intento.id,
                        "modulo": {
                            "id": intento.modulo.id,
                            "codigo": intento.modulo.codigo,
                            "nombre": intento.modulo.nombre,
                        },
                        "stand": {
                            "codigo": intento.modulo.stand.codigo,
                            "nombre": intento.modulo.stand.nombre,
                        },
                        "codigo_actividad": intento.codigo_actividad,
                        "numero_intento": intento.numero_intento,
                        "respuesta_json": intento.respuesta_json,
                        "es_correcta": intento.es_correcta,
                        "fecha_hora": intento.fecha_hora,
                    }
                    for intento in intentos_actividad
                ],
                "insignias_ganadas": [
                    {
                        "id": insignia_ganada.id,
                        "codigo": insignia_ganada.insignia.codigo,
                        "nombre": insignia_ganada.insignia.nombre,
                        "stand": {
                            "codigo": (
                                insignia_ganada.insignia.stand.codigo
                            ),
                            "nombre": (
                                insignia_ganada.insignia.stand.nombre
                            ),
                        },
                        "fecha_hora_obtencion": (
                            insignia_ganada.fecha_hora_obtencion
                        ),
                    }
                    for insignia_ganada in insignias_ganadas
                ],
            },
            status=status.HTTP_200_OK,
        )
