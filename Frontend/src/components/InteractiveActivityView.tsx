"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Droplets,
  FileText,
  Play,
  Search,
} from "lucide-react";
import { Topic } from "@/types/feria";
import { useFairSession } from "@/context/FairSessionContext";
import RutaIngresoSeguro from "@/components/RutaIngresoSeguro";
import { DetectaCorrigeRegistro } from "@/components/DetectaCorrigeRegistro";

interface InteractiveActivityViewProps {
  topic: Topic;
  areaId: string;
}

export default function InteractiveActivityView({
  topic,
  areaId,
}: InteractiveActivityViewProps) {
  const router = useRouter();

  const {
    completeActivity,
  } = useFairSession();

  // ESTADO GENERAL
  const [
    started,
    setStarted,
  ] = useState(false);

  const [
    finished,
    setFinished,
  ] = useState(false);

  const [
    currentScore,
    setCurrentScore,
  ] = useState(100);

  const [
    feedbackMessage,
    setFeedbackMessage,
  ] = useState("");

  // HIGIENE
  const [
    slot1,
    setSlot1,
  ] =
    useState<string | null>(
      null
    );

  const [
    slot2,
    setSlot2,
  ] =
    useState<string | null>(
      null
    );

  const [
    formulaError,
    setFormulaError,
  ] = useState(false);

  const [
    formulaSuccess,
    setFormulaSuccess,
  ] = useState(false);

  const [
    draggedCardId,
    setDraggedCardId,
  ] =
    useState<string | null>(
      null
    );

  // HIGIENE - VALIDAR
  const verifyFormula = () => {
    if (
      slot1 ===
        "limpieza" &&
      slot2 ===
        "sanitizacion"
    ) {
      setFormulaSuccess(
        true
      );

      setFormulaError(
        false
      );

      setCurrentScore(
        100
      );

      setFinished(true);

      setFeedbackMessage(
        "🎉 ¡Secuencia correcta! Primero retiramos lo que vemos y después controlamos lo que no vemos. Limpieza + sanitización = mejor control de la contaminación."
      );

      return;
    }

    setFormulaError(true);
    setFormulaSuccess(false);
  };

  const retryFormula = () => {
    setSlot1(null);
    setSlot2(null);
    setFormulaError(false);
    setFormulaSuccess(false);
  };

  // TERMINAR ACTIVIDAD
  const handleFinishAndStartQuiz =
    () => {
      completeActivity(
        topic.id,
        currentScore
      );

      router.push(
        `/feria/${areaId}/${topic.id}/quiz`
      );
    };

  // VOLVER
  const handleBackToIntro =
    () => {
      router.push(
        `/feria/${areaId}/${topic.id}`
      );
    };

  // ICONO
  const renderTopicIcon =
    () => {
      switch (
        topic.id
      ) {
        case "higiene-manos":
          return (
            <Droplets
              size={30}
            />
          );

        case "material-extrano":
          return (
            <Search
              size={30}
            />
          );

        case "registros":
          return (
            <FileText
              size={30}
            />
          );

        default:
          return (
            <Play
              size={30}
            />
          );
      }
    };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">

      {/* NAVEGACIÓN */}
      <div className="flex items-center justify-between mb-6">

        <button
          type="button"
          onClick={
            handleBackToIntro
          }
          className="py-1.5 px-3 text-stone-600 hover:text-stone-900 bg-white rounded-lg text-xs font-bold border border-stone-200 transition-all cursor-pointer"
          id="btn-act-volver-intro"
        >
          Volver a Introducción
        </button>

        <span className="text-[11px] font-bold text-slate-500 uppercase">
          ACTIVIDAD PRÁCTICA DE REFUERZO
        </span>

      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

        {/* BANNER */}
        <div className="bg-gradient-to-r from-slate-700 to-[#40647E] px-6 sm:px-8 py-5 text-white flex justify-between items-center gap-4">

          <div>

            <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-black text-white/90">

              Pabellón de Simulación Activa

            </span>

            <h3 className="text-base sm:text-lg font-bold mt-1.5">

              Demostración Práctica:{" "}
              {
                topic.name
              }

            </h3>

          </div>

          <div className="text-right shrink-0">

            <div className="text-[10px] text-white/70 font-semibold leading-none uppercase">

              DESEMPEÑO

            </div>

            <div className="text-xl font-black text-[#7EC1AE] mt-1">

              {
                currentScore
              }{" "}
              pts

            </div>

          </div>

        </div>

        {/* CONTENIDO */}
        <div className="p-5 sm:p-8 space-y-6">

          {!started ? (

            // INICIO
            <div className="text-center py-10 space-y-4">

              <div className="w-16 h-16 bg-[#40647E]/10 text-[#40647E] rounded-full flex items-center justify-center mx-auto">

                {
                  renderTopicIcon()
                }

              </div>

              <h4 className="text-lg font-bold text-slate-800">

                ¿Listo para el Reto Práctico de Aprendizaje?

              </h4>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">

                {topic.id ===
                  "higiene-manos" &&
                  "FÓRMULA DE LA HIGIENE: Organiza Limpieza y Sanitización en la secuencia correcta."}

                {topic.id ===
                  "material-extrano" &&
                  "TU RUTA DE INGRESO SEGURO: Supera las estaciones de equipaje, vestimenta por zona y prevención de plagas."}

                {topic.id ===
                  "registros" &&
                  "DETECTA Y CORRIGE EL REGISTRO: Identifica las desviaciones documentales y aplica la corrección oficial."}

              </p>

              <button
                type="button"
                onClick={() =>
                  setStarted(
                    true
                  )
                }
                className="py-3.5 px-10 bg-[#40647E] hover:bg-[#345369] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer mt-4"
                id="btn-iniciar-reto-simulador"
              >

                <Play
                  size={14}
                  fill="currentColor"
                />

                Iniciar Reto

              </button>

            </div>

          ) : (

            <div className="space-y-6">

              {/* HIGIENE */}
              {topic.id ===
                "higiene-manos" && (

                <div className="space-y-6">

                  <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-blue-500/10 p-6 rounded-2xl border border-teal-200 text-center space-y-2">

                    <div className="text-4xl font-extrabold">
                      🧼 + 🛡️ = ✅
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-800">
                      Completa la fórmula de la higiene
                    </h3>

                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Arrastra o toca las tarjetas para ubicarlas en el orden correcto.
                    </p>

                  </div>

                  {/* SLOTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* SLOT 1 */}
                    <div
                      onDragOver={(
                        event
                      ) =>
                        event.preventDefault()
                      }
                      onDrop={(
                        event
                      ) => {
                        event.preventDefault();

                        const cardId =
                          event.dataTransfer.getData(
                            "cardId"
                          ) ||
                          draggedCardId;

                        if (
                          !cardId
                        ) {
                          return;
                        }

                        if (
                          slot2 ===
                          cardId
                        ) {
                          setSlot2(
                            null
                          );
                        }

                        setSlot1(
                          cardId
                        );

                        setFormulaError(
                          false
                        );
                      }}
                      className={`min-h-[160px] border-2 border-dashed rounded-2xl p-4 flex items-center justify-center relative transition-all ${
                        slot1
                          ? "border-teal-500 bg-teal-50/40"
                          : "border-slate-300 bg-slate-50"
                      }`}
                    >

                      <span className="absolute top-3 left-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        PASO 1
                      </span>

                      {slot1 ? (

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              !formulaSuccess
                            ) {
                              setSlot1(
                                null
                              );
                            }
                          }}
                          className="w-full mt-4 bg-white p-4 border border-teal-200 rounded-xl shadow-sm text-center cursor-pointer"
                        >

                          <div className="text-3xl">

                            {slot1 ===
                            "limpieza"
                              ? "🧼"
                              : "🛡️"}

                          </div>

                          <div className="text-xs font-extrabold text-slate-800 mt-1">

                            {slot1 ===
                            "limpieza"
                              ? "LIMPIEZA"
                              : "SANITIZACIÓN"}

                          </div>

                        </button>

                      ) : (

                        <span className="text-xs text-slate-400">
                          Arrastra o toca una tarjeta
                        </span>

                      )}

                    </div>

                    {/* SLOT 2 */}
                    <div
                      onDragOver={(
                        event
                      ) =>
                        event.preventDefault()
                      }
                      onDrop={(
                        event
                      ) => {
                        event.preventDefault();

                        const cardId =
                          event.dataTransfer.getData(
                            "cardId"
                          ) ||
                          draggedCardId;

                        if (
                          !cardId
                        ) {
                          return;
                        }

                        if (
                          slot1 ===
                          cardId
                        ) {
                          setSlot1(
                            null
                          );
                        }

                        setSlot2(
                          cardId
                        );

                        setFormulaError(
                          false
                        );
                      }}
                      className={`min-h-[160px] border-2 border-dashed rounded-2xl p-4 flex items-center justify-center relative transition-all ${
                        slot2
                          ? "border-teal-500 bg-teal-50/40"
                          : "border-slate-300 bg-slate-50"
                      }`}
                    >

                      <span className="absolute top-3 left-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        PASO 2
                      </span>

                      {slot2 ? (

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              !formulaSuccess
                            ) {
                              setSlot2(
                                null
                              );
                            }
                          }}
                          className="w-full mt-4 bg-white p-4 border border-teal-200 rounded-xl shadow-sm text-center cursor-pointer"
                        >

                          <div className="text-3xl">

                            {slot2 ===
                            "sanitizacion"
                              ? "🛡️"
                              : "🧼"}

                          </div>

                          <div className="text-xs font-extrabold text-slate-800 mt-1">

                            {slot2 ===
                            "sanitizacion"
                              ? "SANITIZACIÓN"
                              : "LIMPIEZA"}

                          </div>

                        </button>

                      ) : (

                        <span className="text-xs text-slate-400">
                          Arrastra o toca una tarjeta
                        </span>

                      )}

                    </div>

                  </div>

                  {/* TARJETAS */}
                  {!formulaSuccess &&
                    (!slot1 ||
                      !slot2) && (

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {[
                          {
                            id: "sanitizacion",
                            label:
                              "SANITIZACIÓN 🛡️",
                            text:
                              "Reduce los microorganismos a niveles seguros.",
                          },
                          {
                            id: "limpieza",
                            label:
                              "LIMPIEZA 🧼",
                            text:
                              "Retira suciedad y residuos.",
                          },
                        ].map(
                          (
                            card
                          ) => {
                            const placed =
                              slot1 ===
                                card.id ||
                              slot2 ===
                                card.id;

                            if (
                              placed
                            ) {
                              return null;
                            }

                            return (
                              <button
                                key={
                                  card.id
                                }
                                type="button"
                                draggable
                                onDragStart={(
                                  event
                                ) => {
                                  event.dataTransfer.setData(
                                    "cardId",
                                    card.id
                                  );

                                  setDraggedCardId(
                                    card.id
                                  );
                                }}
                                onClick={() => {
                                  setFormulaError(
                                    false
                                  );

                                  if (
                                    !slot1
                                  ) {
                                    setSlot1(
                                      card.id
                                    );
                                  } else if (
                                    !slot2
                                  ) {
                                    setSlot2(
                                      card.id
                                    );
                                  }
                                }}
                                className="p-4 bg-white border-2 border-slate-200 hover:border-teal-500 rounded-xl shadow-sm text-left cursor-pointer transition-all"
                              >

                                <span className="text-xs font-black text-slate-800 block">
                                  {
                                    card.label
                                  }
                                </span>

                                <span className="text-[11px] text-slate-600 block mt-1">
                                  {
                                    card.text
                                  }
                                </span>

                              </button>
                            );
                          }
                        )}

                      </div>

                    )}

                  {/* VERIFICAR */}
                  {slot1 &&
                    slot2 &&
                    !formulaSuccess && (

                      <div className="space-y-4">

                        {formulaError ? (

                          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-center">

                            <p className="text-xs font-bold text-amber-900">
                              ⚠️ Casi. Primero realizamos la limpieza y luego la sanitización.
                            </p>

                            <button
                              type="button"
                              onClick={
                                retryFormula
                              }
                              className="mt-3 py-2.5 px-6 bg-amber-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                            >
                              Intentar nuevamente
                            </button>

                          </div>

                        ) : (

                          <div className="flex justify-center">

                            <button
                              type="button"
                              onClick={
                                verifyFormula
                              }
                              className="py-3 px-8 bg-[#60A491] hover:bg-[#4E8777] text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                            >

                              <Check
                                size={16}
                              />

                              Validar Fórmula

                            </button>

                          </div>

                        )}

                      </div>

                    )}

                  {formulaSuccess && (

                    <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center">

                      <p className="text-sm font-black text-emerald-900">
                        🎉 ¡Secuencia correcta!
                      </p>

                      <p className="text-xs text-emerald-800 mt-1">
                        Primero limpiamos y después sanitizamos.
                      </p>

                    </div>

                  )}

                </div>
              )}

              {/* MATERIAL EXTRAÑO V2 */}
              {topic.id ===
                "material-extrano" && (

                <RutaIngresoSeguro
                  onComplete={(
                    score,
                    feedback
                  ) => {
                    setCurrentScore(
                      score
                    );

                    setFeedbackMessage(
                      feedback
                    );

                    setFinished(
                      true
                    );
                  }}
                />

              )}

              {/* REGISTROS V2 */}
              {topic.id ===
                "registros" && (

                <DetectaCorrigeRegistro
                  onComplete={(
                    score,
                    feedback
                  ) => {
                    setCurrentScore(
                      score
                    );

                    setFeedbackMessage(
                      feedback
                    );

                    setFinished(
                      true
                    );
                  }}
                />

              )}

              {/* RESULTADO GENERAL */}
              {finished && (

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 mt-6">

                  <div className="flex items-center gap-3">

                    <span className="text-2xl">
                      📊
                    </span>

                    <div>

                      <h4 className="text-sm font-bold text-slate-800">

                        Resultado de la Fase Práctica

                      </h4>

                      <p className="text-xs text-slate-500">

                        Puntaje obtenido:{" "}

                        <strong>
                          {
                            currentScore
                          }{" "}
                          pts
                        </strong>

                      </p>

                    </div>

                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">

                    {
                      feedbackMessage
                    }

                  </p>

                  <div className="flex justify-end pt-3 border-t border-gray-200">

                    <button
                      type="button"
                      onClick={
                        handleFinishAndStartQuiz
                      }
                      className="py-3 px-6 bg-[#40647E] hover:bg-[#345369] text-white rounded-lg text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md"
                      id="btn-avanzar-evaluacion"
                    >

                      Avanzar a Evaluación

                      <ArrowRight
                        size={14}
                      />

                    </button>

                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}