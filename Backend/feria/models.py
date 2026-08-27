from django.db import models

# STAND
class Stand(models.Model):
    """
    Catálogo de stands de la Feria Integral.

    Ejemplos:
    - Calidad
    - SST
    - Mejoramiento Continuo
    - Cumplimiento y Riesgo
    """

    codigo = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
    )

    nombre = models.CharField(
        max_length=150,
    )

    orden = models.PositiveIntegerField(
        default=0,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        db_table = "FERIA_Stand"
        ordering = ["orden", "nombre"]
        verbose_name = "Stand"
        verbose_name_plural = "Stands"

    def __str__(self):
        return self.nombre

# MÓDULO / HITO
class Modulo(models.Model):
    """
    Hito o módulo que forma parte de un stand.

    El progreso general de la feria se calculará a partir
    de estos módulos.
    """

    stand = models.ForeignKey(
        Stand,
        on_delete=models.PROTECT,
        related_name="modulos",
    )

    codigo = models.CharField(
        max_length=120,
        unique=True,
        db_index=True,
    )

    nombre = models.CharField(
        max_length=200,
    )

    orden = models.PositiveIntegerField(
        default=0,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        db_table = "FERIA_Modulo"
        ordering = [
            "stand__orden",
            "orden",
        ]
        verbose_name = "Módulo"
        verbose_name_plural = "Módulos"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "stand",
                    "orden",
                ],
                name="uq_modulo_stand_orden",
            ),
        ]

    def __str__(self):
        return f"{self.stand.nombre} - {self.nombre}"

# PROGRESO POR MÓDULO
class ProgresoModulo(models.Model):
    """
    Estado de un módulo para una sesión determinada.

    Solo puede existir un registro por combinación:
    Sesión + Módulo.
    """

    class Estado(models.TextChoices):
        PENDIENTE = "PENDIENTE", "Pendiente"
        EN_PROGRESO = "EN_PROGRESO", "En progreso"
        COMPLETADO = "COMPLETADO", "Completado"

    sesion = models.ForeignKey(
        "participantes.SesionFeria",
        on_delete=models.CASCADE,
        related_name="progresos_modulo",
    )

    modulo = models.ForeignKey(
        Modulo,
        on_delete=models.PROTECT,
        related_name="progresos",
    )

    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.PENDIENTE,
        db_index=True,
    )

    fecha_hora_inicio = models.DateTimeField(
        blank=True,
        null=True,
    )

    fecha_hora_finalizacion = models.DateTimeField(
        blank=True,
        null=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "FERIA_ProgresoModulo"
        verbose_name = "Progreso de Módulo"
        verbose_name_plural = "Progresos de Módulo"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "sesion",
                    "modulo",
                ],
                name="uq_progreso_sesion_modulo",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "sesion",
                    "estado",
                ],
                name="idx_progreso_sesion_estado",
            ),
        ]

    def __str__(self):
        return (
            f"Sesión {self.sesion_id} - "
            f"{self.modulo.codigo} - "
            f"{self.estado}"
        )

# EVALUACIÓN
class Evaluacion(models.Model):
    """
    Evaluación asociada a un módulo.

    Un módulo puede tener una o varias evaluaciones.
    """

    modulo = models.ForeignKey(
        Modulo,
        on_delete=models.PROTECT,
        related_name="evaluaciones",
    )

    codigo = models.CharField(
        max_length=120,
        unique=True,
        db_index=True,
    )

    nombre = models.CharField(
        max_length=200,
    )

    puntaje_minimo = models.PositiveSmallIntegerField(
        default=80,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        db_table = "FERIA_Evaluacion"
        ordering = [
            "modulo",
            "id",
        ]
        verbose_name = "Evaluación"
        verbose_name_plural = "Evaluaciones"

    def __str__(self):
        return f"{self.modulo.nombre} - {self.nombre}"

# PREGUNTA
class Pregunta(models.Model):
    """
    Pregunta perteneciente a una evaluación.
    """

    class Tipo(models.TextChoices):
        MULTIPLE_CHOICE = (
            "MULTIPLE_CHOICE",
            "Selección múltiple",
        )

        TRUE_FALSE = (
            "TRUE_FALSE",
            "Verdadero / Falso",
        )

        SITUATIONAL = (
            "SITUATIONAL",
            "Situacional",
        )

    evaluacion = models.ForeignKey(
        Evaluacion,
        on_delete=models.CASCADE,
        related_name="preguntas",
    )

    codigo = models.CharField(
        max_length=120,
        unique=True,
        db_index=True,
    )

    enunciado = models.TextField()

    tipo = models.CharField(
        max_length=30,
        choices=Tipo.choices,
        default=Tipo.MULTIPLE_CHOICE,
    )

    orden = models.PositiveIntegerField(
        default=0,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        db_table = "FERIA_Pregunta"
        ordering = [
            "evaluacion",
            "orden",
        ]
        verbose_name = "Pregunta"
        verbose_name_plural = "Preguntas"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "evaluacion",
                    "orden",
                ],
                name="uq_pregunta_evaluacion_orden",
            ),
        ]

    def __str__(self):
        return self.enunciado[:80]

# OPCIÓN DE PREGUNTA
class OpcionPregunta(models.Model):
    """
    Posibles opciones para una pregunta.

    La columna es_correcta permite que el backend determine
    si la respuesta elegida por el usuario fue correcta.
    """

    pregunta = models.ForeignKey(
        Pregunta,
        on_delete=models.CASCADE,
        related_name="opciones",
    )

    codigo = models.CharField(
        max_length=20,
    )

    texto = models.TextField()

    es_correcta = models.BooleanField(
        default=False,
    )

    orden = models.PositiveIntegerField(
        default=0,
    )

    activo = models.BooleanField(
        default=True,
    )

    class Meta:
        db_table = "FERIA_OpcionPregunta"
        ordering = [
            "pregunta",
            "orden",
        ]
        verbose_name = "Opción de Pregunta"
        verbose_name_plural = "Opciones de Pregunta"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "pregunta",
                    "codigo",
                ],
                name="uq_opcion_pregunta_codigo",
            ),
            models.UniqueConstraint(
                fields=[
                    "pregunta",
                    "orden",
                ],
                name="uq_opcion_pregunta_orden",
            ),
        ]

    def __str__(self):
        return (
            f"{self.pregunta.codigo} - "
            f"{self.codigo}"
        )

# INTENTO DE RESPUESTA
class IntentoRespuesta(models.Model):
    """
    Cada intento realizado por el usuario en una pregunta.

    NO se reemplazan respuestas anteriores.

    Si el usuario falla dos veces y luego acierta,
    deben existir tres registros.
    """

    sesion = models.ForeignKey(
        "participantes.SesionFeria",
        on_delete=models.CASCADE,
        related_name="intentos_respuesta",
    )

    pregunta = models.ForeignKey(
        Pregunta,
        on_delete=models.PROTECT,
        related_name="intentos",
    )

    opcion = models.ForeignKey(
        OpcionPregunta,
        on_delete=models.PROTECT,
        related_name="intentos",
        blank=True,
        null=True,
    )

    respuesta_texto = models.TextField(
        blank=True,
        null=True,
    )

    numero_intento = models.PositiveIntegerField()

    es_correcta = models.BooleanField(
        default=False,
        db_index=True,
    )

    fecha_hora_respuesta = models.DateTimeField()

    class Meta:
        db_table = "FERIA_IntentoRespuesta"
        ordering = [
            "sesion",
            "pregunta",
            "numero_intento",
        ]

        verbose_name = "Intento de Respuesta"
        verbose_name_plural = "Intentos de Respuesta"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "sesion",
                    "pregunta",
                    "numero_intento",
                ],
                name="uq_intento_sesion_pregunta_num",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "sesion",
                    "pregunta",
                ],
                name="idx_intento_sesion_pregunta",
            ),
        ]

    def __str__(self):
        resultado = (
            "Correcta"
            if self.es_correcta
            else "Incorrecta"
        )

        return (
            f"Sesión {self.sesion_id} - "
            f"{self.pregunta.codigo} - "
            f"Intento {self.numero_intento} - "
            f"{resultado}"
        )

# INTENTO DE ACTIVIDAD
class IntentoActividad(models.Model):
    """
    Guarda intentos realizados en actividades interactivas
    que no necesariamente son preguntas tradicionales.

    Ejemplos:
    - Ordenar tarjetas TPM
    - Fórmula de Mejoramiento
    - Material Extraño
    - Detectar errores en registros
    """

    sesion = models.ForeignKey(
        "participantes.SesionFeria",
        on_delete=models.CASCADE,
        related_name="intentos_actividad",
    )

    modulo = models.ForeignKey(
        Modulo,
        on_delete=models.PROTECT,
        related_name="intentos_actividad",
    )

    codigo_actividad = models.CharField(
        max_length=150,
        db_index=True,
    )

    numero_intento = models.PositiveIntegerField()

    respuesta_json = models.JSONField(
        blank=True,
        null=True,
    )

    es_correcta = models.BooleanField(
        default=False,
        db_index=True,
    )

    fecha_hora = models.DateTimeField()

    class Meta:
        db_table = "FERIA_IntentoActividad"

        ordering = [
            "sesion",
            "modulo",
            "codigo_actividad",
            "numero_intento",
        ]

        verbose_name = "Intento de Actividad"
        verbose_name_plural = "Intentos de Actividad"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "sesion",
                    "modulo",
                    "codigo_actividad",
                    "numero_intento",
                ],
                name="uq_intento_actividad_num",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "sesion",
                    "modulo",
                    "codigo_actividad",
                ],
                name="idx_intento_actividad",
            ),
        ]

    def __str__(self):
        return (
            f"Sesión {self.sesion_id} - "
            f"{self.codigo_actividad} - "
            f"Intento {self.numero_intento}"
        )

# INSIGNIA
class Insignia(models.Model):
    """
    Catálogo de insignias disponibles en la Feria Integral.
    """

    stand = models.ForeignKey(
        Stand,
        on_delete=models.PROTECT,
        related_name="insignias",
    )

    codigo = models.CharField(
        max_length=120,
        unique=True,
        db_index=True,
    )

    nombre = models.CharField(
        max_length=200,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        db_table = "FERIA_Insignia"
        ordering = [
            "stand__orden",
            "nombre",
        ]

        verbose_name = "Insignia"
        verbose_name_plural = "Insignias"

    def __str__(self):
        return self.nombre

# INSIGNIA GANADA
class InsigniaGanada(models.Model):
    """
    Insignia obtenida por un participante durante una sesión.

    Una insignia solo puede obtenerse una vez por sesión.
    """

    sesion = models.ForeignKey(
        "participantes.SesionFeria",
        on_delete=models.CASCADE,
        related_name="insignias_ganadas",
    )

    insignia = models.ForeignKey(
        Insignia,
        on_delete=models.PROTECT,
        related_name="otorgamientos",
    )

    fecha_hora_obtencion = models.DateTimeField()

    class Meta:
        db_table = "FERIA_InsigniaGanada"

        ordering = [
            "fecha_hora_obtencion",
        ]

        verbose_name = "Insignia Ganada"
        verbose_name_plural = "Insignias Ganadas"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "sesion",
                    "insignia",
                ],
                name="uq_insignia_sesion",
            ),
        ]

    def __str__(self):
        return (
            f"{self.sesion.usuario.cedula} - "
            f"{self.insignia.nombre}"
        )