import { FairData } from "@/types/feria";

export const fairData: FairData = {
  areas: [

    // CALIDAD
    {
      id: "calidad",
      name: "Calidad",
      description:
        "Aquí iniciarás una experiencia para descubrir cómo cada acción cuenta en la entrega de productos con altos estándares de calidad. Explora este espacio, pon a prueba tus conocimientos y conviértete en un guardián de la calidad.",
      color: "#40647E",
      icon: "ShieldCheck",
      isPlaceholder: false,

      topics: [
        
        // HIGIENE
        {
          id: "higiene-manos",

          name:
            "HIGIENE A TODOS LOS NIVELES",

          description:
            "Pon a prueba tus conocimientos sobre higiene y buenas prácticas, aplicando los procedimientos que garantizan seguridad y calidad en nuestras operaciones.",

          introType: "video",

          videoSrc:
            "/assets/videos/higiene-manos.mp4",

          sourceDocs: [
            "limpieza de manos.pdf",
          ],

          introHtml: `
            <div class="space-y-6 text-prebel-gray font-sans">
              <div class="space-y-3">
                <h5 class="font-semibold text-prebel-blue">
                  💡 Primero limpiamos. Después sanitizamos. Siempre protegemos.
                </h5>

                <p>
                  La limpieza elimina la suciedad y los residuos; la sanitización reduce los microorganismos que no podemos ver.
                </p>

                <p>
                  Juntas ayudan a prevenir la contaminación y a proteger nuestras manos, uniformes, áreas, equipos y, sobre todo, la calidad de nuestros productos.
                </p>

                <p>
                  En Prebel, la higiene no es un paso más: es parte de hacer las cosas bien.
                </p>
              </div>
            </div>
          `,

          activityType:
            "ordenar-proceso-reto-tiempo",

          badge: {
            id: "badge-higiene-manos",

            name:
              "INSIGNIA HIGIENE A TODOS LOS NIVELES",

            icon: "ShieldAlert",

            color: "#60A491",
          },

          quiz: [
            {
              id: "q_hm_1",

              type:
                "multiple-choice",

              question:
                "¿Por qué debemos limpiar y después sanitizar?",

              options: [
                "Porque ambos pasos hacen exactamente lo mismo.",

                "Porque la limpieza retira suciedad y residuos, y la sanitización reduce los microorganismos.",

                "Porque sanitizar reemplaza la limpieza cuando no hay suciedad visible.",
              ],

              correctAnswer:
                "Porque la limpieza retira suciedad y residuos, y la sanitización reduce los microorganismos.",

              explanation:
                "¡Correcto! Limpiar y sanitizar se complementan: uno elimina suciedad y residuos; el otro reduce los microorganismos. Recuerda la fórmula: 1. Limpio 🧼 → 2. Sanitizo 🛡️ → 3. Protejo ✅",
            },
          ],
        },

        // MATERIAL EXTRAÑO
        {
          id: "material-extrano",

          name:
            "CONTROL DE CONTAMINACIÓN Y MATERIAL EXTRAÑO",

          description:
            "Pon a prueba tus conocimientos sobre tránsito interno, zonas productivas, control de material extraño, plagas y despeje de línea para asegurar procesos más seguros y confiables.",

          introType:
            "interactive",

          sourceDocs: [
            "material extraño.pdf",
            "despeje de línea.pdf",
            "control de plagas.pdf",
          ],

          introHtml: `
            <div class="space-y-4 text-prebel-gray font-sans">

              <p>
                El material extraño se define como cualquier elemento sólido o contaminante ajeno al lote de producción que pueda incrustarse o mezclarse con el cosmético.
              </p>

              <div class="bg-prebel-bg-warm/40 p-4 border-l-4 border-prebel-coral rounded-r-md">

                <h5 class="font-semibold text-prebel-blue flex items-center gap-2 mb-1">
                  ⚠️ Despeje de Línea y Alerta de Plagas:
                </h5>

                <ul class="list-disc pl-5 text-sm space-y-1">

                  <li>
                    <strong>Despeje de línea:</strong>
                    Mitigación total de mezclas o remanentes de órdenes anteriores antes de arrancar.
                  </li>

                  <li>
                    <strong>Integridad de uniformes:</strong>
                    Dotación del personal libre de botones; lapiceros monobloque sin tapa.
                  </li>

                  <li>
                    <strong>Higiene visual:</strong>
                    Prohibido el uso de grapadoras, clips y estibas de madera en áreas grises.
                  </li>

                  <li>
                    <strong>Control integrado:</strong>
                    Vigilancia y control permanente de riesgos asociados a plagas.
                  </li>

                </ul>

              </div>

              <p class="text-xs text-gray-400">
                Contenido técnico basado en las prácticas de control de contaminación y prevención de plagas de Prebel.
              </p>

            </div>
          `,

          activityType:
            "ruta-ingreso-seguro",

          badge: {
            id:
              "badge-cero-material-extrano",

            name:
              "INSIGNIA GUARDIAN MATERIAL EXTRAÑO",

            icon:
              "Search",

            color:
              "#F2917E",
          },

          quiz: [
            {
              id:
                "q_me_1",

              type:
                "multiple-choice",

              question:
                "¿Qué medidas se deben aplicar para reducir el riesgo de material extraño y contaminación durante el proceso?",

              options: [
                "Permitir lapiceros con tapa, clips metálicos y estibas de madera si la producción está cerca de terminar.",

                "Controlar la dotación, evitar elementos sueltos, mantener materiales no permitidos fuera de áreas controladas y reportar inmediatamente cualquier condición de contaminación.",

                "Permitir alimentos en lockers y zonas productivas si permanecen dentro de su empaque.",

                "Ignorar rastros de plagas mientras no se observe contaminación directa del producto.",
              ],

              correctAnswer:
                "Controlar la dotación, evitar elementos sueltos, mantener materiales no permitidos fuera de áreas controladas y reportar inmediatamente cualquier condición de contaminación.",

              explanation:
                "El control de contaminación requiere mantener barreras preventivas, evitar elementos susceptibles de convertirse en material extraño y reportar oportunamente cualquier condición que pueda comprometer el proceso.",
            },
          ],
        },

        // REGISTROS
        {
          id: "registros",

          name:
            "DOCUMENTACIÓN Y REGISTROS",

          description:
            "Pon a prueba tus conocimientos en buenas prácticas de documentación y registros, demostrando tu habilidad para diligenciar, conservar y controlar la información de manera clara, completa y confiable.",

          introType:
            "interactive",

          sourceDocs: [
            "registros.pdf",
          ],

          introHtml: `
            <div class="space-y-4 text-prebel-gray font-sans">

              <p>
                Lo que no está registrado, no existe. Los registros son el respaldo documental de las actividades realizadas durante el proceso.
              </p>

              <div class="bg-prebel-bg-warm/40 p-4 border-l-4 border-prebel-blue rounded-r-md">

                <h5 class="font-semibold text-prebel-blue flex items-center gap-2 mb-1">
                  ✏️ Pilares de la Documentación en Prebel:
                </h5>

                <ul class="list-disc pl-5 text-sm space-y-1">

                  <li>
                    <strong>Permanente:</strong>
                    tinta indeleble y letra clara.
                  </li>

                  <li>
                    <strong>Corrección formal:</strong>
                    línea sobre el error conservando su legibilidad, dato correcto, firma y fecha.
                  </li>

                  <li>
                    <strong>Diligenciamiento:</strong>
                    completar todos los campos y utilizar N/A cuando no aplique.
                  </li>

                  <li>
                    <strong>Trazabilidad:</strong>
                    los registros deben permitir identificar quién realizó cada actividad.
                  </li>

                </ul>

              </div>

            </div>
          `,

          activityType:
            "detecta-corrige-registro",

          badge: {
            id:
              "badge-registro-impecable",

            name:
              "INSIGNIA GUARDIAN DE LOS REGISTROS",

            icon:
              "CheckSquare",

            color:
              "#40647E",
          },

          quiz: [
            {
              id:
                "q_r_1",

              type:
                "multiple-choice",

              question:
                "¿Cuál es la forma correcta de corregir un dato erróneo dentro de un registro?",

              options: [
                "Borrar completamente el dato para que no quede visible.",

                "Trazar una línea sobre el error manteniéndolo legible, escribir el dato correcto y registrar firma y fecha.",

                "Utilizar corrector líquido y escribir nuevamente el dato.",

                "Dejar el campo vacío para corregirlo posteriormente.",
              ],

              correctAnswer:
                "Trazar una línea sobre el error manteniéndolo legible, escribir el dato correcto y registrar firma y fecha.",

              explanation:
                "Las correcciones deben conservar la trazabilidad del dato original. No se deben ocultar los registros mediante corrector, borrado o tachones que impidan su lectura.",
            },
          ],
        },
      ],
    },

    // SST
    {
      id: "sst",

      name:
        "SST",

      description:
        "Seguridad y Salud en el Trabajo. Prevención de riesgos laborales, seguridad vial, reporte de incidentes, uso de elementos de protección personal y cumplimiento de reglas esenciales para proteger la vida.",

      color:
        "#60A491",

      icon:
        "Activity",

      isPlaceholder:
        false,

      topics: [
        {
          id:
            "pesv",

          name:
            "Plan Estratégico de Seguridad Vial – PESV",

          description:
            "Comportamientos seguros en la vía, prevención de accidentes de tránsito y cumplimiento de las normas de movilidad.",

          introType:
            "interactive",

          sourceDocs:
            [],

          activityType:
            "sst-pesv",

          badge: {
            id:
              "badge-pesv",

            name:
              "GUARDIÁN DE LA SEGURIDAD VIAL",

            icon:
              "Car",

            color:
              "#60A491",
          },

          quiz:
            [],
        },

        {
          id:
            "accidentalidad",

          name:
            "Accidentalidad",

          description:
            "Identificación de accidentes, incidentes y actos inseguros para prevenir lesiones durante el trabajo.",

          introType:
            "interactive",

          sourceDocs:
            [],

          activityType:
            "sst-accidentalidad",

          badge: {
            id:
              "badge-accidentalidad",

            name:
              "GUARDIÁN DE LA PREVENCIÓN",

            icon:
              "AlertTriangle",

            color:
              "#F2917E",
          },

          quiz:
            [],
        },

        {
          id:
            "epp",

          name:
            "Elementos de Protección Personal – EPP",

          description:
            "Uso adecuado de los elementos de protección personal como barrera frente a los riesgos presentes durante el trabajo.",

          introType:
            "interactive",

          sourceDocs:
            [],

          activityType:
            "sst-epp",

          badge: {
            id:
              "badge-epp",

            name:
              "GUARDIÁN DE LA PROTECCIÓN",

            icon:
              "Shield",

            color:
              "#40647E",
          },

          quiz:
            [],
        },

        {
          id:
            "reglas-oro",

          name:
            "Reglas de Oro",

          description:
            "Conductas fundamentales de seguridad para prevenir accidentes y proteger la vida durante las actividades laborales.",

          introType:
            "interactive",

          sourceDocs:
            [],

          activityType:
            "sst-reglas-oro",

          badge: {
            id:
              "badge-reglas-oro",

            name:
              "GUARDIÁN DE LAS REGLAS DE ORO",

            icon:
              "Award",

            color:
              "#E5A93C",
          },

          quiz:
            [],
        },
      ],
    },

    // MEJORAMIENTO CONTINUO
    {
      id: "mejoramiento-continuo",
      name: "Mejoramiento Continuo",
      description:
        "Más allá de la eficiencia: 3 enfoques disruptivos para transformar la productividad (Sembrando Ideas, TPM y 6 Sigma + Lean).",
      descriptionProvisional:
        "Tres formas de mejorar. Un mismo objetivo: transformar nuestros procesos.",
      color: "#5B7F71",
      icon: "TrendingUp",
      isPlaceholder: false,
      topics: [
        {
          id: "mejoramiento-formula",
          name: "MÁS ALLÁ DE LA EFICIENCIA: 3 ENFOQUES DE TRANSFORMACIÓN",
          description:
            "Descubre cómo Sembrando Ideas, TPM y 6 Sigma + Lean se complementan para impulsar la productividad y autotransformación en PREBEL.",
          introType: "interactive",
          sourceDocs: [
            "sembrando-ideas.pdf",
            "tpm-prebel.pdf",
            "lean-6sigma.pdf",
          ],
          activityType: "formula-transformacion",
          badge: {
            id: "badge-transformacion-mejora",
            name: "AGENTE DE TRANSFORMACIÓN Y MEJORA",
            icon: "Award",
            color: "#5B7F71",
          },
          quiz: [
            {
              id: "q_mc_1",
              type: "multiple-choice",
              question:
                "¿Cómo se complementan los tres enfoques de mejoramiento continuo en PREBEL?",
              options: [
                "Utilizando únicamente 6 Sigma porque es la más técnica.",
                "Aplicando Sembrando Ideas para lo cotidiano, TPM para el empoderamiento y sostenimiento, y 6 Sigma para resolver retos complejos.",
                "Reaccionando solo cuando ocurren fallas graves en las máquinas.",
              ],
              correctAnswer:
                "Aplicando Sembrando Ideas para lo cotidiano, TPM para el empoderamiento y sostenimiento, y 6 Sigma para resolver retos complejos.",
              explanation:
                "¡Correcto! El verdadero mejoramiento continuo consiste en utilizar el enfoque correcto para cada oportunidad: agilidad para lo cotidiano (Sembrando Ideas), personas empoderadas que cuidan el proceso (TPM) y método riguroso para lo complejo (6 Sigma).",
            },
          ],
        },
      ],
    },

    // CUMPLIMIENTO Y RIESGO
    {
      id:
        "cumplimiento-riesgo",

      name:
        "Cumplimiento y Riesgo",

      description:
        "Cultura de integridad, cumplimiento legal, prevención de riesgos, SAGRILAFT, PTEE y toma de decisiones éticas dentro de Prebel.",

      color:
        "#E07A5F",

      icon:
        "AlertOctagon",

      isPlaceholder:
        false,

      topics: [
        {
          id:
            "cumplimiento-integridad",

          name:
            "Actuamos con Integridad y Transparencia",

          description:
            "Recorrido interactivo para reconocer situaciones inusuales, tomar decisiones correctas y utilizar oportunamente los canales de reporte.",

          introType:
            "interactive",

          sourceDocs:
            [],

          activityType:
            "cumplimiento-recorrido",

          badge: {
            id:
              "badge-embajador-cumplimiento",

            name:
              "EMBAJADOR DEL CUMPLIMIENTO",

            icon:
              "Scale",

            color:
              "#E07A5F",
          },

          quiz:
            [],
        },
      ],
    },
  ],
};