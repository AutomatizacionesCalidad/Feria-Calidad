from django.core.management.base import BaseCommand
from django.db import transaction
from feria.models import (
    Evaluacion,
    Insignia,
    Modulo,
    OpcionPregunta,
    Pregunta,
    Stand,
)

class Command(BaseCommand):
    help = (
        "Carga o actualiza los catálogos base "
        "de la Feria Integral."
    )

    @transaction.atomic
    def handle(self, *args, **options):

        self.stdout.write(
            self.style.WARNING(
                "Iniciando carga de catálogos de Feria Integral..."
            )
        )

        # STANDS
        stands_data = [
            {
                "codigo": "calidad",
                "nombre": "Calidad",
                "orden": 1,
            },
            {
                "codigo": "sst",
                "nombre": "Seguridad y Salud en el Trabajo",
                "orden": 2,
            },
            {
                "codigo": "mejoramiento-continuo",
                "nombre": "Mejoramiento Continuo",
                "orden": 3,
            },
            {
                "codigo": "cumplimiento-riesgo",
                "nombre": "Cumplimiento y Riesgo",
                "orden": 4,
            },
        ]

        stands = {}

        for data in stands_data:

            stand, created = (
                Stand.objects.update_or_create(
                    codigo=data["codigo"],
                    defaults={
                        "nombre": data["nombre"],
                        "orden": data["orden"],
                        "activo": True,
                    },
                )
            )

            stands[data["codigo"]] = stand

            estado = (
                "CREADO"
                if created
                else "ACTUALIZADO"
            )

            self.stdout.write(
                f"[{estado}] Stand: {stand.nombre}"
            )

        # MODULOS / HITOS
        modulos_data = [

            # CALIDAD
            {
                "stand": "calidad",
                "codigo": "higiene-manos",
                "nombre": "Higiene de Manos",
                "orden": 1,
            },
            {
                "stand": "calidad",
                "codigo": "material-extrano",
                "nombre": (
                    "Control de Contaminación "
                    "y Material Extraño"
                ),
                "orden": 2,
            },
            {
                "stand": "calidad",
                "codigo": "registros",
                "nombre": (
                    "Buenas Prácticas de "
                    "Documentación y Registros"
                ),
                "orden": 3,
            },

            # SST
            {
                "stand": "sst",
                "codigo": "pesv",
                "nombre": "PESV",
                "orden": 1,
            },
            {
                "stand": "sst",
                "codigo": "accidentalidad",
                "nombre": (
                    "Accidentalidad y Prevención"
                ),
                "orden": 2,
            },
            {
                "stand": "sst",
                "codigo": "epp",
                "nombre": (
                    "Elementos de Protección Personal"
                ),
                "orden": 3,
            },
            {
                "stand": "sst",
                "codigo": "reglas-oro",
                "nombre": "Reglas de Oro",
                "orden": 4,
            },

            # MEJORAMIENTO CONTINUO
            {
                "stand": "mejoramiento-continuo",
                "codigo": "mejoramiento-sembrando",
                "nombre": "Sembrando Ideas",
                "orden": 1,
            },
            {
                "stand": "mejoramiento-continuo",
                "codigo": "mejoramiento-tpm",
                "nombre": "TPM",
                "orden": 2,
            },
            {
                "stand": "mejoramiento-continuo",
                "codigo": "mejoramiento-6sigma",
                "nombre": "6 Sigma + Lean",
                "orden": 3,
            },
            {
                "stand": "mejoramiento-continuo",
                "codigo": "mejoramiento-formula",
                "nombre": (
                    "Fórmula de Transformación"
                ),
                "orden": 4,
            },

            # CUMPLIMIENTO Y RIESGO
            {
                "stand": "cumplimiento-riesgo",
                "codigo": "cumplimiento-conceptos",
                "nombre": (
                    "SAGRILAFT y Conceptos"
                ),
                "orden": 1,
            },
            {
                "stand": "cumplimiento-riesgo",
                "codigo": (
                    "cumplimiento-linea-etica"
                ),
                "nombre": "PTEE y Línea Ética",
                "orden": 2,
            },
            {
                "stand": "cumplimiento-riesgo",
                "codigo": "cumplimiento-reto",
                "nombre": (
                    "Reto ¿Qué harías?"
                ),
                "orden": 3,
            },
            {
                "stand": "cumplimiento-riesgo",
                "codigo": (
                    "cumplimiento-evaluacion"
                ),
                "nombre": (
                    "Evaluación de Cumplimiento"
                ),
                "orden": 4,
            },
        ]

        for data in modulos_data:

            stand = stands[
                data["stand"]
            ]

            modulo, created = (
                Modulo.objects.update_or_create(
                    codigo=data["codigo"],
                    defaults={
                        "stand": stand,
                        "nombre": data["nombre"],
                        "orden": data["orden"],
                        "activo": True,
                    },
                )
            )

            estado = (
                "CREADO"
                if created
                else "ACTUALIZADO"
            )

            self.stdout.write(
                f"[{estado}] Modulo: "
                f"{stand.nombre} -> "
                f"{modulo.nombre}"
            )

        modulos = {
            modulo.codigo: modulo
            for modulo in Modulo.objects.all()
        }

        # EVALUACIONES / PREGUNTAS / OPCIONES
        evaluaciones_data = [
            {
                "modulo": "higiene-manos",
                "codigo": "eval_higiene_manos",
                "nombre": "Evaluación Higiene de Manos",
                "preguntas": [
                    {
                        "codigo": "q_hm_1",
                        "enunciado": (
                            "¿Por qué debemos limpiar y después sanitizar?"
                        ),
                        "tipo": Pregunta.Tipo.MULTIPLE_CHOICE,
                        "orden": 1,
                        "opciones": [
                            {
                                "codigo": "A",
                                "texto": (
                                    "Porque ambos pasos hacen exactamente lo mismo."
                                ),
                                "es_correcta": False,
                                "orden": 1,
                            },
                            {
                                "codigo": "B",
                                "texto": (
                                    "Porque la limpieza retira suciedad y residuos, "
                                    "y la sanitización reduce los microorganismos."
                                ),
                                "es_correcta": True,
                                "orden": 2,
                            },
                            {
                                "codigo": "C",
                                "texto": (
                                    "Porque sanitizar reemplaza la limpieza cuando "
                                    "no hay suciedad visible."
                                ),
                                "es_correcta": False,
                                "orden": 3,
                            },
                        ],
                    },
                ],
            },
            {
                "modulo": "material-extrano",
                "codigo": "eval_material_extrano",
                "nombre": "Evaluación Material Extraño",
                "preguntas": [
                    {
                        "codigo": "q_me_1",
                        "enunciado": (
                            "¿Qué medidas se deben aplicar para reducir el riesgo "
                            "de material extraño y contaminación durante el proceso?"
                        ),
                        "tipo": Pregunta.Tipo.MULTIPLE_CHOICE,
                        "orden": 1,
                        "opciones": [
                            {
                                "codigo": "A",
                                "texto": (
                                    "Permitir lapiceros con tapa, clips metálicos "
                                    "y estibas de madera si la producción está "
                                    "cerca de terminar."
                                ),
                                "es_correcta": False,
                                "orden": 1,
                            },
                            {
                                "codigo": "B",
                                "texto": (
                                    "Controlar la dotación, evitar elementos sueltos, "
                                    "mantener materiales no permitidos fuera de áreas "
                                    "controladas y reportar inmediatamente cualquier "
                                    "condición de contaminación."
                                ),
                                "es_correcta": True,
                                "orden": 2,
                            },
                            {
                                "codigo": "C",
                                "texto": (
                                    "Permitir alimentos en lockers y zonas productivas "
                                    "si permanecen dentro de su empaque."
                                ),
                                "es_correcta": False,
                                "orden": 3,
                            },
                            {
                                "codigo": "D",
                                "texto": (
                                    "Ignorar rastros de plagas mientras no se observe "
                                    "contaminación directa del producto."
                                ),
                                "es_correcta": False,
                                "orden": 4,
                            },
                        ],
                    },
                ],
            },
            {
                "modulo": "registros",
                "codigo": "eval_registros",
                "nombre": "Evaluación Documentación y Registros",
                "preguntas": [
                    {
                        "codigo": "q_r_1",
                        "enunciado": (
                            "¿Cuál es la forma correcta de corregir un dato "
                            "erróneo dentro de un registro?"
                        ),
                        "tipo": Pregunta.Tipo.MULTIPLE_CHOICE,
                        "orden": 1,
                        "opciones": [
                            {
                                "codigo": "A",
                                "texto": (
                                    "Borrar completamente el dato para que no "
                                    "quede visible."
                                ),
                                "es_correcta": False,
                                "orden": 1,
                            },
                            {
                                "codigo": "B",
                                "texto": (
                                    "Trazar una línea sobre el error manteniéndolo "
                                    "legible, escribir el dato correcto y registrar "
                                    "firma y fecha."
                                ),
                                "es_correcta": True,
                                "orden": 2,
                            },
                            {
                                "codigo": "C",
                                "texto": (
                                    "Utilizar corrector líquido y escribir nuevamente "
                                    "el dato."
                                ),
                                "es_correcta": False,
                                "orden": 3,
                            },
                            {
                                "codigo": "D",
                                "texto": (
                                    "Dejar el campo vacío para corregirlo "
                                    "posteriormente."
                                ),
                                "es_correcta": False,
                                "orden": 4,
                            },
                        ],
                    },
                ],
            },
            {
                "modulo": "mejoramiento-formula",
                "codigo": "eval_mejoramiento_formula",
                "nombre": "Evaluación Mejoramiento Continuo",
                "preguntas": [
                    {
                        "codigo": "q_mc_1",
                        "enunciado": (
                            "¿Cómo se complementan los tres enfoques de "
                            "mejoramiento continuo en PREBEL?"
                        ),
                        "tipo": Pregunta.Tipo.MULTIPLE_CHOICE,
                        "orden": 1,
                        "opciones": [
                            {
                                "codigo": "A",
                                "texto": (
                                    "Utilizando únicamente 6 Sigma porque es la "
                                    "más técnica."
                                ),
                                "es_correcta": False,
                                "orden": 1,
                            },
                            {
                                "codigo": "B",
                                "texto": (
                                    "Aplicando Sembrando Ideas para lo cotidiano, "
                                    "TPM para el empoderamiento y sostenimiento, "
                                    "y 6 Sigma para resolver retos complejos."
                                ),
                                "es_correcta": True,
                                "orden": 2,
                            },
                            {
                                "codigo": "C",
                                "texto": (
                                    "Reaccionando solo cuando ocurren fallas "
                                    "graves en las máquinas."
                                ),
                                "es_correcta": False,
                                "orden": 3,
                            },
                        ],
                    },
                ],
            },
        ]

        for data in evaluaciones_data:
            modulo = modulos[data["modulo"]]

            evaluacion, created = (
                Evaluacion.objects.update_or_create(
                    codigo=data["codigo"],
                    defaults={
                        "modulo": modulo,
                        "nombre": data["nombre"],
                        "puntaje_minimo": 80,
                        "activo": True,
                    },
                )
            )

            estado = (
                "CREADA"
                if created
                else "ACTUALIZADA"
            )

            self.stdout.write(
                f"[{estado}] Evaluacion: "
                f"{evaluacion.nombre}"
            )

            for pregunta_data in data["preguntas"]:
                pregunta, created = (
                    Pregunta.objects.update_or_create(
                        codigo=pregunta_data["codigo"],
                        defaults={
                            "evaluacion": evaluacion,
                            "enunciado": pregunta_data["enunciado"],
                            "tipo": pregunta_data["tipo"],
                            "orden": pregunta_data["orden"],
                            "activo": True,
                        },
                    )
                )

                estado = (
                    "CREADA"
                    if created
                    else "ACTUALIZADA"
                )

                self.stdout.write(
                    f"[{estado}] Pregunta: "
                    f"{pregunta.codigo}"
                )

                for opcion_data in pregunta_data["opciones"]:
                    opcion, created = (
                        OpcionPregunta.objects.update_or_create(
                            pregunta=pregunta,
                            codigo=opcion_data["codigo"],
                            defaults={
                                "texto": opcion_data["texto"],
                                "es_correcta": opcion_data["es_correcta"],
                                "orden": opcion_data["orden"],
                                "activo": True,
                            },
                        )
                    )

                    estado = (
                        "CREADA"
                        if created
                        else "ACTUALIZADA"
                    )

                    self.stdout.write(
                        f"[{estado}] Opcion: "
                        f"{pregunta.codigo} -> "
                        f"{opcion.codigo}"
                    )

        # INSIGNIAS
        insignias_data = [

            # CALIDAD
            {
                "stand": "calidad",
                "codigo": "badge-higiene-manos",
                "nombre": (
                    "Guardián de la Higiene"
                ),
            },
            {
                "stand": "calidad",
                "codigo": (
                    "badge-cero-material-extrano"
                ),
                "nombre": (
                    "Cero Material Extraño"
                ),
            },
            {
                "stand": "calidad",
                "codigo": (
                    "badge-registro-impecable"
                ),
                "nombre": (
                    "Registro Impecable"
                ),
            },

            # SST
            {
                "stand": "sst",
                "codigo": "badge-pesv",
                "nombre": (
                    "PESV Seguridad Vial"
                ),
            },
            {
                "stand": "sst",
                "codigo": (
                    "badge-accidentalidad"
                ),
                "nombre": (
                    "Accidentalidad y Prevención"
                ),
            },
            {
                "stand": "sst",
                "codigo": "badge-epp",
                "nombre": (
                    "Uso Seguro de EPP"
                ),
            },
            {
                "stand": "sst",
                "codigo": (
                    "badge-reglas-oro"
                ),
                "nombre": (
                    "Guardián de Reglas de Oro"
                ),
            },

            # MEJORAMIENTO
            {
                "stand": (
                    "mejoramiento-continuo"
                ),
                "codigo": (
                    "badge-transformacion-mejora"
                ),
                "nombre": (
                    "Agente de Transformación "
                    "y Mejora"
                ),
            },

            # CUMPLIMIENTO
            {
                "stand": (
                    "cumplimiento-riesgo"
                ),
                "codigo": (
                    "badge-embajador-cumplimiento"
                ),
                "nombre": (
                    "Embajador del Cumplimiento"
                ),
            },
        ]

        for data in insignias_data:

            stand = stands[
                data["stand"]
            ]

            insignia, created = (
                Insignia.objects.update_or_create(
                    codigo=data["codigo"],
                    defaults={
                        "stand": stand,
                        "nombre": data["nombre"],
                        "activo": True,
                    },
                )
            )

            estado = (
                "CREADA"
                if created
                else "ACTUALIZADA"
            )

            self.stdout.write(
                f"[{estado}] Insignia: "
                f"{insignia.nombre}"
            )

        # RESUMEN
        self.stdout.write("")

        self.stdout.write(
            self.style.SUCCESS(
                "========================================"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "CATALOGOS CARGADOS CORRECTAMENTE"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "========================================"
            )
        )

        self.stdout.write(
            f"Stands: {Stand.objects.count()}"
        )

        self.stdout.write(
            f"Modulos: {Modulo.objects.count()}"
        )

        self.stdout.write(
            f"Insignias: {Insignia.objects.count()}"
        )

        self.stdout.write(
            f"Evaluaciones: {Evaluacion.objects.count()}"
        )

        self.stdout.write(
            f"Preguntas: {Pregunta.objects.count()}"
        )

        self.stdout.write(
            f"Opciones: {OpcionPregunta.objects.count()}"
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Carga finalizada."
            )
        )
