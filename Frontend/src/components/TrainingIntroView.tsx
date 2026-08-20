"use client";
import {
  useState,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Eye,
  Play,
  PlayCircle,
} from "lucide-react";
import {
  Topic,
} from "@/types/feria";
import {
  useFairSession,
} from "@/context/FairSessionContext";

interface TrainingIntroViewProps {
  topic: Topic;
  areaId: string;
}

type IntroSlide = {
  title: string;
  points: string[];
  alert: string;
};

export default function TrainingIntroView({
  topic,
  areaId,
}: TrainingIntroViewProps) {
  const router =
    useRouter();

  const {
    markTopicInProgress,
  } =
    useFairSession();

  const [
    videoPlayed,
    setVideoPlayed,
  ] =
    useState(false);

  const [
    activeSlide,
    setActiveSlide,
  ] =
    useState(0);

  // SLIDES
  const getSlidesContent =
    (): IntroSlide[] => {
      switch (
        topic.id
      ) {
        case "higiene-manos":
          return [
            {
              title:
                "Remoción Biológica Eficaz",

              points: [
                "La limpieza ayuda a retirar suciedad, residuos y materia visible.",
                "La sanitización ayuda a reducir la carga de microorganismos.",
                "Ambos procesos deben realizarse en el orden correcto.",
              ],

              alert:
                "Primero limpiamos. Después sanitizamos.",
            },

            {
              title:
                "La higiene aplica en todos los niveles",

              points: [
                "Manos.",
                "Uniformes.",
                "Equipos.",
                "Áreas de trabajo.",
              ],

              alert:
                "La higiene comienza en cada colaborador y acompaña todo el proceso.",
            },

            {
              title:
                "Evita errores frecuentes",

              points: [
                "No reemplaces la limpieza por sanitización.",
                "No omitas zonas de difícil acceso durante el lavado.",
                "No ingreses al proceso con barreras de higiene incompletas.",
              ],

              alert:
                "Cada barrera ayuda a prevenir contaminación.",
            },
          ];

        case "material-extrano":
          return [
            {
              title:
                "Lo que no pertenece al proceso no debe llegar al producto",

              points: [
                "Accesorios, cabellos, restos de comida y malas prácticas pueden convertirse en fuentes de contaminación.",
                "Vidrio, plástico duro, madera y partículas metálicas comprometen la inocuidad.",
                "Controlar lo que llevamos y cómo ingresamos ayuda a prevenir materiales extraños.",
              ],

              alert:
                "Tú eres la primera línea de defensa.",
            },

            {
              title:
                "Tránsito por Zonas y Despeje de Línea",

              points: [
                "Las zonas Negra, Esclusa y Gris cuentan con protocolos específicos.",
                "En zona gris se retiran madera y cartón y se utilizan materiales autorizados.",
                "El despeje de línea evita mezclas, confusiones y contaminación.",
              ],

              alert:
                "La esclusa es una zona de paso y cambio, no de permanencia.",
            },

            {
              title:
                "Prevención de Plagas y Almacenamiento",

              points: [
                "Las plagas buscan alimento, humedad y refugio.",
                "Los alimentos se almacenan únicamente en los espacios autorizados.",
                "El locker no debe utilizarse para almacenar alimentos o bebidas.",
              ],

              alert:
                "No generes condiciones que atraigan plagas.",
            },
          ];

        case "registros":
          return [
            {
              title:
                "La Regla de Oro Documental",

              points: [
                "Los registros son evidencia de las actividades realizadas.",
                "La información debe diligenciarse de forma inmediata.",
                "Los datos deben ser claros, completos y trazables.",
              ],

              alert:
                "Lo que no está registrado no puede demostrarse.",
            },

            {
              title:
                "Corrección Formal de Errores",

              points: [
                "No se debe utilizar corrector líquido.",
                "El dato original debe permanecer legible.",
                "La corrección debe conservar la trazabilidad.",
              ],

              alert:
                "Nunca ocultes el dato original.",
            },

            {
              title:
                "Evitar Campos Huérfanos",

              points: [
                "No deben quedar campos sin diligenciar.",
                "Cuando algo no aplique debe registrarse N/A según corresponda.",
                "Utiliza escritura legible y tinta indeleble.",
              ],

              alert:
                "Un campo vacío puede interpretarse como información omitida.",
            },
          ];

        default:
          return [];
      }
    };

  const slides =
    getSlidesContent();

  // VOLVER
  const handleBackToArea =
    () => {
      router.push(
        `/feria/${areaId}`
      );
    };

  // ACTIVIDAD
  const handleStartActivity =
    () => {
      markTopicInProgress(
        topic.id
      );

      router.push(
        `/feria/${areaId}/${topic.id}/actividad`
      );
    };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">

      <button
        type="button"
        onClick={
          handleBackToArea
        }
        className="py-1.5 px-3 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 mb-6 cursor-pointer"
        id="btn-intro-regresar"
      >

        <ArrowLeft
          size={14}
        />

        Volver a Temas

      </button>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

        {/* BANNER */}
        <div className="bg-[#40647E] px-8 py-6 text-white flex items-center justify-between">

          <div>

            <span className="text-[10px] font-black tracking-wider uppercase bg-white/20 px-2.5 py-0.5 rounded-full">

              Paso 1: Introducción Teórica

            </span>

            <h2 className="text-xl sm:text-2xl font-bold mt-2">

              {
                topic.name
              }

            </h2>

          </div>

          <BookOpen
            size={40}
            className="hidden sm:block text-white/20"
          />

        </div>

        {/* CONTENIDO */}
        <div className="p-6 sm:p-8 space-y-8">

          <div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">

              <Eye
                size={14}
                className="text-[#40647E]"
              />

              Recurso Técnico de Aprendizaje

            </h3>

            {/* VIDEO - HIGIENE */}
            {topic.introType ===
            "video" ? (

              <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video relative flex flex-col justify-between p-4 shadow-inner border border-slate-950">

                {!videoPlayed ? (

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex flex-col items-center justify-center p-6 text-center">

                    <button
                      type="button"
                      onClick={() =>
                        setVideoPlayed(
                          true
                        )
                      }
                      className="w-16 h-16 rounded-full bg-[#60A491] flex items-center justify-center text-white shadow-lg hover:scale-105 cursor-pointer transition-transform"
                    >

                      <Play
                        size={28}
                        className="translate-x-0.5 fill-white"
                      />

                    </button>

                    <h4 className="text-white text-base font-bold mt-4">

                      Video de Instrucción:{" "}
                      {
                        topic.name
                      }

                    </h4>

                    <p className="text-white/70 text-xs mt-2 max-w-md">

                      Revisa el contenido técnico antes de avanzar al reto interactivo.

                    </p>

                  </div>

                ) : (

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950">

                    <div className="grid grid-cols-3 gap-4 max-w-md w-full">

                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">

                        <div className="text-[#60A491] text-sm font-bold">
                          1. Limpiar
                        </div>

                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">

                        <div className="text-[#F2917E] text-sm font-bold">
                          2. Sanitizar
                        </div>

                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">

                        <div className="text-[#60A491] text-sm font-bold">
                          3. Proteger
                        </div>

                      </div>

                    </div>

                    <p className="text-slate-400 text-xs mt-6">

                      🎬 Contenido técnico de higiene Prebel

                    </p>

                  </div>

                )}

                <div className="mt-auto w-full bg-black/60 px-4 py-2.5 rounded-lg flex items-center justify-between z-20 text-white text-[10px] relative">

                  <button
                    type="button"
                    onClick={() =>
                      setVideoPlayed(
                        !videoPlayed
                      )
                    }
                  >

                    <PlayCircle
                      size={16}
                    />

                  </button>

                  <div className="flex-1 mx-4 bg-white/20 h-1 rounded-full overflow-hidden">

                    <div
                      className="bg-[#60A491] h-1 transition-all"
                      style={{
                        width:
                          videoPlayed
                            ? "80%"
                            : "0%",
                      }}
                    />

                  </div>

                  <span>
                    HD
                  </span>

                </div>

              </div>

            ) : (

              /* SLIDES MATERIAL / REGISTROS */
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">

                <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                  <span className="text-[10px] uppercase font-extrabold text-[#40647E]">

                    Ficha Didáctica{" "}
                    {
                      activeSlide +
                      1
                    }{" "}
                    de{" "}
                    {
                      slides.length
                    }

                  </span>

                  <span className="text-xs text-slate-400">
                    Concepto Técnico
                  </span>

                </div>

                <div className="space-y-3 min-h-[180px] pt-4">

                  <h4 className="text-base font-bold text-slate-800">

                    {
                      slides[
                        activeSlide
                      ]?.title
                    }

                  </h4>

                  <ul className="space-y-2">

                    {slides[
                      activeSlide
                    ]?.points.map(
                      (
                        point,
                        index
                      ) => (

                        <li
                          key={
                            index
                          }
                          className="text-xs text-slate-600 flex items-start gap-2"
                        >

                          <span className="w-1.5 h-1.5 rounded-full bg-[#60A491] mt-1.5 shrink-0" />

                          {
                            point
                          }

                        </li>

                      )
                    )}

                  </ul>

                </div>

                <div className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-md text-amber-800 text-[11px] font-semibold flex items-start gap-2">

                  <AlertCircle
                    size={14}
                    className="shrink-0 mt-0.5"
                  />

                  <span>

                    Regla Crítica:{" "}

                    {
                      slides[
                        activeSlide
                      ]?.alert
                    }

                  </span>

                </div>

                <div className="flex justify-center gap-2 mt-5">

                  {slides.map(
                    (
                      _,
                      index
                    ) => (

                      <button
                        key={
                          index
                        }
                        type="button"
                        onClick={() =>
                          setActiveSlide(
                            index
                          )
                        }
                        className={`w-8 h-2 rounded-full transition-all ${
                          activeSlide ===
                          index
                            ? "bg-[#40647E]"
                            : "bg-slate-200"
                        }`}
                      />

                    )
                  )}

                </div>

              </div>

            )}

          </div>

          {/* DESCRIPCIÓN */}
          <div
            className="text-xs text-slate-600 border-t border-gray-100 pt-6 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                topic.introHtml ??
                "",
            }}
          />

          {/* BOTÓN */}
          <div className="flex justify-end pt-4">

            <button
              type="button"
              onClick={
                handleStartActivity
              }
              className="py-3 px-8 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              id="btn-iniciar-actividad-reto"
            >

              Comenzar Reto Interactivo

            </button>

          </div>
        </div>
      </div>
    </div>
  );
}