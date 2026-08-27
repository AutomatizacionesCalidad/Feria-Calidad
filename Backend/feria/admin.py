from django.contrib import admin
from .models import ( Stand, Modulo, ProgresoModulo, Evaluacion, Pregunta, OpcionPregunta, IntentoRespuesta, IntentoActividad, Insignia, InsigniaGanada )

# STAND
@admin.register(Stand)
class StandAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo",
        "nombre",
        "orden",
        "activo",
    )

    search_fields = (
        "codigo",
        "nombre",
    )

    list_filter = (
        "activo",
    )

    ordering = (
        "orden",
    )

# MODULO
@admin.register(Modulo)
class ModuloAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo",
        "nombre",
        "stand",
        "orden",
        "activo",
    )

    search_fields = (
        "codigo",
        "nombre",
    )

    list_filter = (
        "stand",
        "activo",
    )

    ordering = (
        "stand__orden",
        "orden",
    )

    autocomplete_fields = (
        "stand",
    )

# PROGRESO MODULO
@admin.register(ProgresoModulo)
class ProgresoModuloAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sesion",
        "modulo",
        "estado",
        "fecha_hora_inicio",
        "fecha_hora_finalizacion",
    )

    search_fields = (
        "sesion__usuario__cedula",
        "modulo__codigo",
        "modulo__nombre",
    )

    list_filter = (
        "estado",
        "modulo__stand",
    )

    autocomplete_fields = (
        "sesion",
        "modulo",
    )

    readonly_fields = (
        "fecha_creacion",
        "fecha_actualizacion",
    )

# EVALUACION
@admin.register(Evaluacion)
class EvaluacionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo",
        "nombre",
        "modulo",
        "puntaje_minimo",
        "activo",
    )

    search_fields = (
        "codigo",
        "nombre",
        "modulo__nombre",
    )

    list_filter = (
        "activo",
        "modulo__stand",
    )

    autocomplete_fields = (
        "modulo",
    )

# PREGUNTA
class OpcionPreguntaInline(admin.TabularInline):
    model = OpcionPregunta

    extra = 0

    fields = (
        "codigo",
        "texto",
        "es_correcta",
        "orden",
        "activo",
    )


@admin.register(Pregunta)
class PreguntaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo",
        "evaluacion",
        "tipo",
        "orden",
        "activo",
    )

    search_fields = (
        "codigo",
        "enunciado",
    )

    list_filter = (
        "tipo",
        "activo",
        "evaluacion__modulo__stand",
    )

    autocomplete_fields = (
        "evaluacion",
    )

    inlines = [
        OpcionPreguntaInline,
    ]

# OPCION PREGUNTA
@admin.register(OpcionPregunta)
class OpcionPreguntaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "pregunta",
        "codigo",
        "texto_corto",
        "es_correcta",
        "orden",
        "activo",
    )

    search_fields = (
        "pregunta__codigo",
        "texto",
    )

    list_filter = (
        "es_correcta",
        "activo",
    )

    autocomplete_fields = (
        "pregunta",
    )

    def texto_corto(self, obj):
        if len(obj.texto) <= 80:
            return obj.texto

        return f"{obj.texto[:80]}..."

    texto_corto.short_description = "Texto"

# INTENTO RESPUESTA
@admin.register(IntentoRespuesta)
class IntentoRespuestaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sesion",
        "pregunta",
        "numero_intento",
        "es_correcta",
        "fecha_hora_respuesta",
    )

    search_fields = (
        "sesion__usuario__cedula",
        "pregunta__codigo",
    )

    list_filter = (
        "es_correcta",
        "pregunta__evaluacion__modulo__stand",
    )

    autocomplete_fields = (
        "sesion",
        "pregunta",
        "opcion",
    )

    ordering = (
        "-fecha_hora_respuesta",
    )

# INTENTO ACTIVIDAD
@admin.register(IntentoActividad)
class IntentoActividadAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sesion",
        "modulo",
        "codigo_actividad",
        "numero_intento",
        "es_correcta",
        "fecha_hora",
    )

    search_fields = (
        "sesion__usuario__cedula",
        "modulo__codigo",
        "codigo_actividad",
    )

    list_filter = (
        "es_correcta",
        "modulo__stand",
    )

    autocomplete_fields = (
        "sesion",
        "modulo",
    )

    ordering = (
        "-fecha_hora",
    )

# INSIGNIA
@admin.register(Insignia)
class InsigniaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo",
        "nombre",
        "stand",
        "activo",
    )

    search_fields = (
        "codigo",
        "nombre",
    )

    list_filter = (
        "stand",
        "activo",
    )

    autocomplete_fields = (
        "stand",
    )

# INSIGNIA GANADA
@admin.register(InsigniaGanada)
class InsigniaGanadaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sesion",
        "insignia",
        "fecha_hora_obtencion",
    )

    search_fields = (
        "sesion__usuario__cedula",
        "insignia__codigo",
        "insignia__nombre",
    )

    list_filter = (
        "insignia__stand",
    )

    autocomplete_fields = (
        "sesion",
        "insignia",
    )

    ordering = (
        "-fecha_hora_obtencion",
    )