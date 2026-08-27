from django.db import models

# USUARIO
class Usuario(models.Model):
    """
    Participante de la Feria Integral.

    La cédula identifica de manera única a la persona.
    Un usuario puede participar en múltiples sesiones de feria
    a lo largo del tiempo.
    """

    cedula = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
    )

    nombre = models.CharField(
        max_length=150,
        blank=True,
        null=True,
    )

    activo = models.BooleanField(
        default=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "FERIA_Usuario"
        ordering = ["cedula"]
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        if self.nombre:
            return f"{self.cedula} - {self.nombre}"

        return self.cedula

# SESIÓN DE FERIA
class SesionFeria(models.Model):
    """
    Representa una participación del usuario en la Feria Integral.

    Cada vez que un usuario comienza una nueva ejecución,
    se crea una SesionFeria independiente.
    """

    class Estado(models.TextChoices):
        EN_PROGRESO = "EN_PROGRESO", "En progreso"
        FINALIZADA = "FINALIZADA", "Finalizada"

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.PROTECT,
        related_name="sesiones",
    )

    area = models.CharField(
        max_length=150,
        blank=True,
        null=True,
    )

    fecha_ejecucion = models.DateField(
        blank=True,
        null=True,
    )

    fecha_hora_inicio = models.DateTimeField()

    fecha_hora_finalizacion = models.DateTimeField(
        blank=True,
        null=True,
    )

    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.EN_PROGRESO,
        db_index=True,
    )

    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "FERIA_SesionFeria"
        ordering = ["-fecha_hora_inicio"]
        verbose_name = "Sesión de Feria"
        verbose_name_plural = "Sesiones de Feria"

        indexes = [
            models.Index(
                fields=[
                    "usuario",
                    "estado",
                ],
                name="idx_sesion_usuario_estado",
            ),
            models.Index(
                fields=[
                    "fecha_hora_inicio",
                ],
                name="idx_sesion_fecha_inicio",
            ),
        ]

    def __str__(self):
        return (
            f"Sesión {self.id} - "
            f"{self.usuario.cedula} - "
            f"{self.estado}"
        )