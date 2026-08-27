from rest_framework import serializers
from .models import Usuario, SesionFeria

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            "id",
            "cedula",
            "nombre",
        )

class SesionFeriaSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = SesionFeria
        fields = (
            "id",
            "usuario",
            "area",
            "fecha_ejecucion",
            "fecha_hora_inicio",
            "fecha_hora_finalizacion",
            "estado",
        )

class IniciarSesionSerializer(serializers.Serializer):
    cedula = serializers.CharField(
        max_length=20,
    )

    area = serializers.CharField(
        max_length=150,
        required=False,
        allow_blank=True,
        allow_null=True,
    )

    fecha_ejecucion = serializers.DateField(
        required=False,
        allow_null=True,
    )

    def validate_cedula(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "La cédula es obligatoria."
            )

        if not value.isdigit():
            raise serializers.ValidationError(
                "La cédula debe contener únicamente números."
            )

        return value