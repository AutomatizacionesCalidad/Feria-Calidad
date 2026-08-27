import json
from io import BytesIO
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape

from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone
from feria.models import (
    InsigniaGanada,
    IntentoActividad,
    IntentoRespuesta,
    ProgresoModulo,
)
from .models import Usuario, SesionFeria


def _excel_column_name(index):
    name = ""

    while index:
        index, remainder = divmod(index - 1, 26)
        name = chr(65 + remainder) + name

    return name


def _format_excel_value(value):
    if value is None:
        return ""

    if hasattr(value, "utcoffset"):
        if timezone.is_aware(value):
            value = timezone.localtime(value)

        return value.isoformat(sep=" ", timespec="seconds")

    if hasattr(value, "isoformat"):
        return value.isoformat()

    if isinstance(value, (dict, list)):
        return json.dumps(
            value,
            ensure_ascii=False,
        )

    return str(value)


def _worksheet_xml(rows):
    xml_rows = []

    for row_index, row in enumerate(rows, start=1):
        cells = []

        for col_index, value in enumerate(row, start=1):
            cell_ref = (
                f"{_excel_column_name(col_index)}{row_index}"
            )

            text = escape(_format_excel_value(value))

            cells.append(
                (
                    f'<c r="{cell_ref}" t="inlineStr">'
                    f"<is><t>{text}</t></is>"
                    "</c>"
                )
            )

        xml_rows.append(
            f'<row r="{row_index}">{"".join(cells)}</row>'
        )

    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetData>{"".join(xml_rows)}</sheetData>'
        "</worksheet>"
    )


def _build_xlsx(sheets):
    output = BytesIO()

    with ZipFile(output, "w", ZIP_DEFLATED) as workbook:
        workbook.writestr(
            "[Content_Types].xml",
            (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
                '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
                '<Default Extension="xml" ContentType="application/xml"/>'
                '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
                +
                "".join(
                    (
                        f'<Override PartName="/xl/worksheets/sheet{index}.xml" '
                        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
                    )
                    for index, _sheet in enumerate(sheets, start=1)
                )
                +
                "</Types>"
            ),
        )

        workbook.writestr(
            "_rels/.rels",
            (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                '<Relationship Id="rId1" '
                'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
                'Target="xl/workbook.xml"/>'
                "</Relationships>"
            ),
        )

        workbook.writestr(
            "xl/workbook.xml",
            (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
                'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
                "<sheets>"
                +
                "".join(
                    (
                        f'<sheet name="{escape(name)}" sheetId="{index}" r:id="rId{index}"/>'
                    )
                    for index, (name, _rows) in enumerate(sheets, start=1)
                )
                +
                "</sheets>"
                "</workbook>"
            ),
        )

        workbook.writestr(
            "xl/_rels/workbook.xml.rels",
            (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                +
                "".join(
                    (
                        f'<Relationship Id="rId{index}" '
                        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
                        f'Target="worksheets/sheet{index}.xml"/>'
                    )
                    for index, _sheet in enumerate(sheets, start=1)
                )
                +
                "</Relationships>"
            ),
        )

        for index, (_name, rows) in enumerate(sheets, start=1):
            workbook.writestr(
                f"xl/worksheets/sheet{index}.xml",
                _worksheet_xml(rows),
            )

    output.seek(0)

    return output.getvalue()

# USUARIO
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "cedula",
        "nombre",
        "activo",
        "fecha_creacion",
    )

    search_fields = (
        "cedula",
        "nombre",
    )

    list_filter = (
        "activo",
        "fecha_creacion",
    )

    ordering = (
        "-fecha_creacion",
    )

    readonly_fields = (
        "fecha_creacion",
        "fecha_actualizacion",
    )

# SESIÓN FERIA
@admin.register(SesionFeria)
class SesionFeriaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "usuario",
        "area",
        "estado",
        "fecha_hora_inicio",
        "fecha_hora_finalizacion",
    )

    search_fields = (
        "usuario__cedula",
        "usuario__nombre",
        "area",
    )

    list_filter = (
        "estado",
        "area",
        "fecha_ejecucion",
    )

    ordering = (
        "-fecha_hora_inicio",
    )

    readonly_fields = (
        "fecha_creacion",
        "fecha_actualizacion",
    )

    autocomplete_fields = (
        "usuario",
    )

    actions = (
        "exportar_informe_excel",
    )

    @admin.action(
        description=(
            "Exportar informe completo Excel de las sesiones seleccionadas"
        )
    )
    def exportar_informe_excel(self, request, queryset):
        sesiones = (
            queryset
            .select_related("usuario")
            .order_by(
                "usuario__cedula",
                "fecha_hora_inicio",
            )
        )

        sesion_ids = [
            sesion.id
            for sesion in sesiones
        ]

        sesiones_rows = [
            [
                "sesion_id",
                "cedula",
                "nombre",
                "area",
                "estado",
                "fecha_ejecucion",
                "fecha_hora_inicio",
                "fecha_hora_finalizacion",
            ]
        ]

        for sesion in sesiones:
            sesiones_rows.append(
                [
                    sesion.id,
                    sesion.usuario.cedula,
                    sesion.usuario.nombre,
                    sesion.area,
                    sesion.estado,
                    sesion.fecha_ejecucion,
                    sesion.fecha_hora_inicio,
                    sesion.fecha_hora_finalizacion,
                ]
            )

        progresos_rows = [
            [
                "sesion_id",
                "cedula",
                "stand_codigo",
                "stand_nombre",
                "modulo_codigo",
                "modulo_nombre",
                "estado",
                "fecha_hora_inicio",
                "fecha_hora_finalizacion",
            ]
        ]

        progresos = (
            ProgresoModulo.objects
            .select_related(
                "sesion",
                "sesion__usuario",
                "modulo",
                "modulo__stand",
            )
            .filter(
                sesion_id__in=sesion_ids,
            )
            .order_by(
                "sesion__usuario__cedula",
                "sesion_id",
                "modulo__stand__orden",
                "modulo__orden",
            )
        )

        for progreso in progresos:
            progresos_rows.append(
                [
                    progreso.sesion_id,
                    progreso.sesion.usuario.cedula,
                    progreso.modulo.stand.codigo,
                    progreso.modulo.stand.nombre,
                    progreso.modulo.codigo,
                    progreso.modulo.nombre,
                    progreso.estado,
                    progreso.fecha_hora_inicio,
                    progreso.fecha_hora_finalizacion,
                ]
            )

        respuestas_rows = [
            [
                "sesion_id",
                "cedula",
                "stand_codigo",
                "stand_nombre",
                "modulo_codigo",
                "modulo_nombre",
                "evaluacion_codigo",
                "evaluacion_nombre",
                "pregunta_codigo",
                "pregunta_enunciado",
                "opcion_codigo",
                "respuesta_texto",
                "numero_intento",
                "es_correcta",
                "fecha_hora_respuesta",
            ]
        ]

        respuestas = (
            IntentoRespuesta.objects
            .select_related(
                "sesion",
                "sesion__usuario",
                "pregunta",
                "pregunta__evaluacion",
                "pregunta__evaluacion__modulo",
                "pregunta__evaluacion__modulo__stand",
                "opcion",
            )
            .filter(
                sesion_id__in=sesion_ids,
            )
            .order_by(
                "sesion__usuario__cedula",
                "sesion_id",
                "pregunta__evaluacion__modulo__stand__orden",
                "pregunta__evaluacion__modulo__orden",
                "pregunta__orden",
                "numero_intento",
            )
        )

        for intento in respuestas:
            modulo = intento.pregunta.evaluacion.modulo

            respuestas_rows.append(
                [
                    intento.sesion_id,
                    intento.sesion.usuario.cedula,
                    modulo.stand.codigo,
                    modulo.stand.nombre,
                    modulo.codigo,
                    modulo.nombre,
                    intento.pregunta.evaluacion.codigo,
                    intento.pregunta.evaluacion.nombre,
                    intento.pregunta.codigo,
                    intento.pregunta.enunciado,
                    intento.opcion.codigo if intento.opcion else "",
                    intento.respuesta_texto,
                    intento.numero_intento,
                    "SI" if intento.es_correcta else "NO",
                    intento.fecha_hora_respuesta,
                ]
            )

        actividades_rows = [
            [
                "sesion_id",
                "cedula",
                "stand_codigo",
                "stand_nombre",
                "modulo_codigo",
                "modulo_nombre",
                "codigo_actividad",
                "respuesta_json",
                "numero_intento",
                "es_correcta",
                "fecha_hora",
            ]
        ]

        actividades = (
            IntentoActividad.objects
            .select_related(
                "sesion",
                "sesion__usuario",
                "modulo",
                "modulo__stand",
            )
            .filter(
                sesion_id__in=sesion_ids,
            )
            .order_by(
                "sesion__usuario__cedula",
                "sesion_id",
                "modulo__stand__orden",
                "modulo__orden",
                "codigo_actividad",
                "numero_intento",
            )
        )

        for intento in actividades:
            actividades_rows.append(
                [
                    intento.sesion_id,
                    intento.sesion.usuario.cedula,
                    intento.modulo.stand.codigo,
                    intento.modulo.stand.nombre,
                    intento.modulo.codigo,
                    intento.modulo.nombre,
                    intento.codigo_actividad,
                    intento.respuesta_json,
                    intento.numero_intento,
                    "SI" if intento.es_correcta else "NO",
                    intento.fecha_hora,
                ]
            )

        insignias_rows = [
            [
                "sesion_id",
                "cedula",
                "stand_codigo",
                "stand_nombre",
                "insignia_codigo",
                "insignia_nombre",
                "fecha_hora_obtencion",
            ]
        ]

        insignias = (
            InsigniaGanada.objects
            .select_related(
                "sesion",
                "sesion__usuario",
                "insignia",
                "insignia__stand",
            )
            .filter(
                sesion_id__in=sesion_ids,
            )
            .order_by(
                "sesion__usuario__cedula",
                "sesion_id",
                "fecha_hora_obtencion",
            )
        )

        for insignia_ganada in insignias:
            insignias_rows.append(
                [
                    insignia_ganada.sesion_id,
                    insignia_ganada.sesion.usuario.cedula,
                    insignia_ganada.insignia.stand.codigo,
                    insignia_ganada.insignia.stand.nombre,
                    insignia_ganada.insignia.codigo,
                    insignia_ganada.insignia.nombre,
                    insignia_ganada.fecha_hora_obtencion,
                ]
            )

        sheets = [
            ("Sesiones", sesiones_rows),
            ("Progreso", progresos_rows),
            ("Respuestas", respuestas_rows),
            ("Actividades", actividades_rows),
            ("Insignias", insignias_rows),
        ]

        content = _build_xlsx(sheets)

        filename = (
            "informe_feria_integral_"
            f"{timezone.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        )

        response = HttpResponse(
            content,
            content_type=(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ),
        )

        response["Content-Disposition"] = (
            f'attachment; filename="{filename}"'
        )

        return response
