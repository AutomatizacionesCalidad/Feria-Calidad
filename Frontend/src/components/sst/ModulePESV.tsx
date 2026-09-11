"use client";
import React, { useState } from 'react';
import { 
  Car, 
  AlertTriangle, 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useFairSession } from "@/context/FairSessionContext";
import {
  useSwipeNavigation,
} from "@/hooks/useSwipeNavigation";

interface ModulePESVProps {
  onComplete: () => void;
  onBackToRoute: () => void;
  alreadyCompleted?: boolean;
}

export default function ModulePESV({ onComplete, onBackToRoute, alreadyCompleted = false }: ModulePESVProps) {
  const { registerActivityAttempt } =
    useFairSession();

  const pesvInfographicUrl =
    "/documentos/sst/infografia-pesv.pdf";

  const pesvInfographicImageUrl =
    "/image/sst/infografia-pesv.png";

  // Screen sequence: 1: Contexto -> 2: Contenido (Infografía) -> 3: Pregunta
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleEvaluate = (option: string) => {
    setSelectedOption(option);
    setHasEvaluated(true);
    const correct = option === 'B';
    setIsAnswerCorrect(correct);
    registerActivityAttempt({
      moduloCodigo: "pesv",
      codigoActividad: "pesv-limite-velocidad",
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

  const goToNextScreen = () => {
    setCurrentScreen((screen) =>
      screen < 3
        ? ((screen + 1) as 1 | 2 | 3)
        : screen
    );
  };

  const goToPreviousScreen = () => {
    setCurrentScreen((screen) =>
      screen > 1
        ? ((screen - 1) as 1 | 2 | 3)
        : screen
    );
  };

  const swipeHandlers =
    useSwipeNavigation({
      onSwipeLeft:
        goToNextScreen,
      onSwipeRight:
        goToPreviousScreen,
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top Breadcrumb / Nav */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToRoute}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-pesv-volver-ruta"
        >
          <ArrowLeft size={14} />
          Volver al Recorrido
        </button>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 1 ? 'bg-[#60A491] text-white border-[#4E8777]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            1. Contexto
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 2 ? 'bg-[#60A491] text-white border-[#4E8777]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            2. Contenido
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 3 ? 'bg-[#60A491] text-white border-[#4E8777]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            3. Pregunta
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div
        className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden touch-pan-y"
        {...swipeHandlers}
      >
        
        {/* Module Header Bar */}
        <div className="bg-gradient-to-r from-[#4E8777] to-[#60A491] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white shadow-inner">
              <Car size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100 block">
                MÓDULO 01 • STAND SST
              </span>
              <h2 className="font-title text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                Plan Estratégico de Seguridad Vial – PESV
              </h2>
            </div>
          </div>

          {alreadyCompleted && (
            <span className="hidden sm:flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
              <CheckCircle2 size={14} />
              Completado
            </span>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PANTALLA 1: CONTEXTO */}
        {/* ========================================================================= */}
        {currentScreen === 1 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                ¿Qué es el PESV?
              </h3>
              
              <div className="mt-4 p-5 bg-slate-50 border-l-4 border-[#60A491] rounded-r-2xl text-slate-700 leading-relaxed text-sm sm:text-base">
                El <strong className="text-slate-900">Plan Estratégico de Seguridad Vial (PESV)</strong> es una herramienta de gestión que establece acciones para promover comportamientos seguros en la vía, prevenir accidentes de tránsito y proteger la vida de todos los actores viales.
              </div>
            </div>

            {/* Objetivo del PESV */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <h4 className="font-title text-sm sm:text-base font-bold text-[#3B6B5E] uppercase tracking-wider">
                ¿Cuál es su objetivo?
              </h4>
              <p className="font-title text-base sm:text-lg font-bold text-slate-800 leading-snug">
                “Reducir los riesgos viales y fortalecer una cultura de seguridad dentro de la organización.”
              </p>
            </div>

            {/* 3 Featured Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#60A491] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#4E8777] mx-auto flex items-center justify-center text-xl">
                  🚗
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800">
                  Movilidad segura
                </h5>
                <p className="text-xs text-slate-500">
                  Desplazamientos responsables para peatones, conductores y ciclistas.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#60A491] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800">
                  Prevención de accidentes
                </h5>
                <p className="text-xs text-slate-500">
                  Identificación de riesgos y cumplimiento riguroso de límites de velocidad.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#60A491] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-xl">
                  💚
                </div>
                <h5 className="font-title text-sm font-bold text-slate-800">
                  Protección de la vida
                </h5>
                <p className="text-xs text-slate-500">
                  El valor de la vida y la integridad física como prioridad absoluta.
                </p>
              </div>
            </div>

            {/* Closing statement */}
            <div className="text-center py-3 bg-slate-50 rounded-xl border border-slate-200 font-title font-extrabold text-slate-700 text-sm sm:text-base">
              En la vía, cada decisión cuenta.
            </div>

            {/* Footer Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onBackToRoute}
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Volver a la ruta
              </button>

              <button
                onClick={() => setCurrentScreen(2)}
                className="py-3 px-8 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#60A491]/20 flex items-center gap-2 cursor-pointer"
                id="btn-pesv-continuar-screen-1"
              >
                <span>Continuar</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 2: CONTENIDO (INFOGRAFÍA PESV) */}
        {/* ========================================================================= */}
        {currentScreen === 2 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4E8777] bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full inline-block">
                Recurso Visual
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Infografía PESV
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Conoce las principales recomendaciones para movilizarte de manera segura.
              </p>
            </div>

            <div className="bg-slate-50 border border-emerald-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#4E8777] flex items-center justify-center border border-emerald-200">
                    <FileText size={20} />
                  </div>

                  <div>
                    <span className="font-title text-sm font-bold text-slate-800 uppercase block">
                      Guía de Movilidad Segura Prebel
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Infografía visual
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={pesvInfographicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#60A491] hover:text-[#3B6B5E] text-xs font-bold inline-flex items-center gap-1.5 transition-all"
                  >
                    <ExternalLink size={14} />
                    Abrir
                  </a>

                  <a
                    href={pesvInfographicUrl}
                    download
                    className="px-3 py-2 rounded-xl bg-[#60A491] hover:bg-[#4E8777] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download size={14} />
                    Descargar
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
                <img
                  src={pesvInfographicImageUrl}
                  alt="Infografía PESV - guía de movilidad segura Prebel"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen(1)}
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                ← Anterior
              </button>

              <button
                onClick={() => setCurrentScreen(3)}
                className="py-3 px-8 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#60A491]/20 flex items-center gap-2 cursor-pointer"
                id="btn-pesv-ya-revise-infografia"
              >
                <span>Ya revisé la infografía</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 3: PREGUNTA */}
        {/* ========================================================================= */}
        {currentScreen === 3 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4E8777] bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full inline-block">
                Evaluación del Módulo
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Pon a prueba lo aprendido
              </h3>
            </div>

            {/* Question Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <h4 className="font-title text-base sm:text-lg font-bold text-slate-800 text-center leading-snug">
                ¿Cuál es el límite de velocidad permitido al interior de la empresa?
              </h4>

              {/* Options */}
              <div className="space-y-3 max-w-md mx-auto">
                {[
                  { key: 'A', text: '50 km/h' },
                  { key: 'B', text: '15 km/h' },
                  { key: 'C', text: '30 km/h' }
                ].map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';

                  if (hasEvaluated) {
                    if (opt.key === 'B') {
                      btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected && opt.key !== 'B') {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-emerald-50 border-[#60A491] text-[#3B6B5E] font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => !hasEvaluated && handleEvaluate(opt.key)}
                      disabled={hasEvaluated && isAnswerCorrect}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      id={`btn-pesv-opt-${opt.key}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {hasEvaluated && opt.key === 'B' && (
                        <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                      )}
                      {hasEvaluated && isSelected && opt.key !== 'B' && (
                        <XCircle size={18} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {hasEvaluated && (
                <div className="animate-fade-in max-w-md mx-auto">
                  {isAnswerCorrect ? (
                    <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-emerald-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-emerald-800">
                        <CheckCircle2 size={18} />
                        ¡Correcto!
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-900">
                        Respetar los límites de velocidad ayuda a prevenir incidentes y proteger a peatones, conductores y demás actores viales.
                      </p>
                      <div className="pt-2">
                        <span className="inline-block bg-emerald-600 text-white font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          ✓ Módulo 1 completado
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl space-y-3 text-rose-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-rose-800">
                        <XCircle size={18} />
                        Inténtalo nuevamente.
                      </div>
                      <p className="text-xs leading-relaxed text-rose-900">
                        Recuerda que dentro de las instalaciones debemos desplazarnos a una velocidad segura y controlada.
                      </p>
                      <button
                        onClick={handleRetry}
                        className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all"
                        id="btn-pesv-retry"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Footer Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen(2)}
                className="py-2.5 px-5 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                ← Anterior
              </button>

              {isAnswerCorrect ? (
                <button
                  onClick={onBackToRoute}
                  className="py-3 px-8 bg-[#4E8777] hover:bg-[#3B6B5E] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  id="btn-pesv-finalizar-modulo"
                >
                  <CheckCircle2 size={16} />
                  <span>Volver al Recorrido</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Selecciona la respuesta correcta para completar el módulo.
                </span>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
