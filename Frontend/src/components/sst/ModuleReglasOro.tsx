"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  HardHat,
  Heart,
  ShieldCheck,
  Video,
  XCircle,
} from "lucide-react";
import { useFairSession } from "@/context/FairSessionContext";

interface ModuleReglasOroProps {
  onComplete: () => void;
  onBackToRoute: () => void;
  alreadyCompleted?: boolean;
}

export default function ModuleReglasOro({
  onComplete,
  onBackToRoute,
  alreadyCompleted = false,
}: ModuleReglasOroProps) {
  const { registerActivityAttempt } =
    useFairSession();

  const [
    currentScreen,
    setCurrentScreen,
  ] = useState<1 | 2 | 3>(1);

  const [
    selectedOption,
    setSelectedOption,
  ] = useState<string | null>(null);

  const [
    hasEvaluated,
    setHasEvaluated,
  ] = useState(false);

  const [
    isAnswerCorrect,
    setIsAnswerCorrect,
  ] = useState(false);

  const handleEvaluate = (
    option: string
  ) => {
    setSelectedOption(option);
    setHasEvaluated(true);

    const correct =
      option === "B";

    setIsAnswerCorrect(correct);

    registerActivityAttempt({
      moduloCodigo: "reglas-oro",
      codigoActividad:
        "reglas-oro-proposito",
      respuestaJson: {
        opcion: option,
      },
      esCorrecta: correct,
    });

    if (correct) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    setIsAnswerCorrect(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToRoute}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-ro-volver-ruta"
        >
          <ArrowLeft size={14} />
          Volver al Recorrido
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 1
              ? "bg-[#E5A93C] text-slate-900 border-[#c48d28]"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}>
            1. Contexto
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 2
              ? "bg-[#E5A93C] text-slate-900 border-[#c48d28]"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}>
            2. Contenido
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 3
              ? "bg-[#E5A93C] text-slate-900 border-[#c48d28]"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}>
            3. Pregunta
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        <div className="bg-gradient-to-r from-[#c48d28] via-[#E5A93C] to-[#dba032] text-slate-900 p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-slate-900 shadow-inner">
              <Award size={24} />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900/80 block">
                MÓDULO 04 • STAND SST
              </span>

              <h2 className="font-title text-lg sm:text-xl font-extrabold uppercase text-slate-900 tracking-tight">
                Reglas de Oro
              </h2>
            </div>
          </div>

          {alreadyCompleted && (
            <span className="hidden sm:flex items-center gap-1 bg-white/40 text-slate-900 text-xs font-black px-3 py-1 rounded-full border border-white/50">
              <CheckCircle2 size={14} />
              Completado
            </span>
          )}
        </div>

        {currentScreen === 1 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            <div>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                ¿Qué son las Reglas de Oro?
              </h3>

              <div className="mt-4 p-5 bg-amber-50/70 border-l-4 border-[#E5A93C] rounded-r-2xl text-slate-800 leading-relaxed text-sm sm:text-base">
                Las <strong className="text-slate-900">Reglas de Oro</strong> son normas fundamentales de seguridad que establecen los comportamientos obligatorios para prevenir accidentes y proteger la vida de los trabajadores durante la ejecución de sus labores.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white border border-amber-200 rounded-2xl shadow-xs text-center space-y-3 hover:border-amber-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-xs">
                  <ShieldCheck size={26} />
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Prevenir
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identificar y controlar peligros antes de iniciar cualquier operación.
                </p>
              </div>

              <div className="p-6 bg-white border border-amber-200 rounded-2xl shadow-xs text-center space-y-3 hover:border-amber-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-xs">
                  <HardHat size={26} />
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Trabajar seguro
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cumplir estrictamente los procedimientos y el uso de equipo de protección.
                </p>
              </div>

              <div className="p-6 bg-white border border-amber-200 rounded-2xl shadow-xs text-center space-y-3 hover:border-amber-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 mx-auto flex items-center justify-center shadow-xs">
                  <Heart size={26} />
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Proteger la vida
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Regresar sanos y salvos a nuestros hogares todos los días.
                </p>
              </div>
            </div>

            <div className="text-center py-5 px-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-950">
              <blockquote className="font-title text-sm sm:text-base font-extrabold text-amber-300 leading-snug">
                “Una regla de seguridad no es una sugerencia: es una barrera que protege vidas.”
              </blockquote>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onBackToRoute}
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Volver a la ruta
              </button>

              <button
                onClick={() =>
                  setCurrentScreen(2)
                }
                className="py-3 px-8 bg-[#E5A93C] hover:bg-[#c48d28] text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#E5A93C]/20 flex items-center gap-2 cursor-pointer"
                id="btn-ro-continuar-screen-1"
              >
                <span>Continuar</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {currentScreen === 2 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full inline-block">
                Recurso Visual
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Reglas de Oro
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Identifica las conductas fundamentales que debemos cumplir para trabajar de forma segura.
              </p>
            </div>

            <div className="bg-slate-950 rounded-3xl p-4 sm:p-5 text-white shadow-lg border border-slate-950 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2 text-amber-300">
                  <Video size={16} />
                  <span>Video - Reglas de Oro</span>
                </div>
                <span className="bg-white/10 px-2.5 py-1 rounded-full font-mono text-[11px] text-white">
                  SST Prebel
                </span>
              </div>

              <video
                controls
                preload="metadata"
                className="w-full aspect-video rounded-2xl bg-black border border-white/10"
              >
                <source
                  src="/videos/sst/reglas-oro.mp4"
                  type="video/mp4"
                />
                Tu navegador no puede reproducir este video.
              </video>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentScreen(1)
                }
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Anterior
              </button>

              <button
                onClick={() =>
                  setCurrentScreen(3)
                }
                className="py-3 px-8 bg-[#E5A93C] hover:bg-[#c48d28] text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#E5A93C]/20 flex items-center gap-2 cursor-pointer"
                id="btn-ro-ya-revise-video"
              >
                <span>Ya revisé el video</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {currentScreen === 3 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full inline-block">
                Evaluación del Módulo
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Pon a prueba lo aprendido
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <h4 className="font-title text-base sm:text-lg font-bold text-slate-800 text-center leading-snug">
                ¿Cuál es el principal propósito de las Reglas de Oro en Seguridad y Salud en el Trabajo?
              </h4>

              <div className="space-y-3 max-w-lg mx-auto">
                {[
                  {
                    key: "A",
                    text:
                      "Aumentar la velocidad de las tareas.",
                  },
                  {
                    key: "B",
                    text:
                      "Prevenir accidentes y proteger la vida de los trabajadores.",
                  },
                  {
                    key: "C",
                    text:
                      "Reducir el uso de los elementos de protección personal.",
                  },
                ].map((opt) => {
                  const isSelected =
                    selectedOption ===
                    opt.key;

                  let btnStyle =
                    "bg-white hover:bg-slate-100 border-slate-200 text-slate-700";

                  if (hasEvaluated) {
                    if (opt.key === "B") {
                      btnStyle =
                        "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                    } else if (
                      isSelected &&
                      opt.key !== "B"
                    ) {
                      btnStyle =
                        "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                    }
                  } else if (isSelected) {
                    btnStyle =
                      "bg-amber-50 border-[#E5A93C] text-amber-900 font-bold shadow-xs";
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() =>
                        !hasEvaluated &&
                        handleEvaluate(
                          opt.key
                        )
                      }
                      disabled={
                        hasEvaluated &&
                        isAnswerCorrect
                      }
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      id={`btn-ro-opt-${opt.key}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {hasEvaluated &&
                        opt.key === "B" && (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-700 shrink-0"
                        />
                      )}

                      {hasEvaluated &&
                        isSelected &&
                        opt.key !== "B" && (
                        <XCircle
                          size={18}
                          className="text-rose-600 shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasEvaluated && (
                <div className="animate-fade-in max-w-lg mx-auto">
                  {isAnswerCorrect ? (
                    <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-emerald-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-emerald-800">
                        <CheckCircle2 size={18} />
                        ¡Correcto!
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-900">
                        Las Reglas de Oro establecen comportamientos esenciales para prevenir accidentes y proteger la vida durante el trabajo.
                      </p>
                      <div className="pt-2">
                        <span className="inline-block bg-emerald-600 text-white font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          ✓ Módulo 4 completado
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl space-y-3 text-rose-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-rose-800">
                        <XCircle size={18} />
                        Inténtalo nuevamente
                      </div>
                      <p className="text-xs leading-relaxed text-rose-900">
                        Recuerda que las Reglas de Oro son barreras protectoras diseñadas para resguardar la vida humana y la integridad de los colaboradores.
                      </p>
                      <button
                        onClick={handleRetry}
                        className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all"
                        id="btn-ro-retry"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentScreen(2)
                }
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Anterior
              </button>

              {isAnswerCorrect ? (
                <button
                  onClick={onBackToRoute}
                  className="py-3 px-8 bg-[#4E8777] hover:bg-[#3B6B5E] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  id="btn-ro-finalizar-modulo"
                >
                  <CheckCircle2 size={16} />
                  <span>Volver al Recorrido</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Selecciona la opción correcta para completar el módulo.
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
