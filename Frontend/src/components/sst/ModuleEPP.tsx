"use client";
import React, { useState } from 'react';
import { 
  Shield, 
  HardHat, 
  Glasses, 
  Headphones, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Video, 
  Play, 
  HelpCircle,
  Footprints,
  Sparkles
} from 'lucide-react';

interface ModuleEPPProps {
  onComplete: () => void;
  onBackToRoute: () => void;
  alreadyCompleted?: boolean;
}

export default function ModuleEPP({
  onComplete,
  onBackToRoute,
  alreadyCompleted = false
}: ModuleEPPProps) {
  // Screen sequence: 1: Contexto -> 2: Contenido (Video) -> 3: Evaluación (Verdadero o Falso)
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  // True/False evaluation state
  const [selectedAnswer, setSelectedAnswer] = useState<'VERDADERO' | 'FALSO' | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleEvaluate = (ans: 'VERDADERO' | 'FALSO') => {
    setSelectedAnswer(ans);
    setHasEvaluated(true);
    const correct = ans === 'FALSO';
    setIsAnswerCorrect(correct);
    if (correct) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setHasEvaluated(false);
    setIsAnswerCorrect(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top Breadcrumb / Nav */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToRoute}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-epp-volver-ruta"
        >
          <ArrowLeft size={14} />
          Volver al Recorrido
        </button>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 1 ? 'bg-[#40647E] text-white border-[#2A597A]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            1. Contexto
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 2 ? 'bg-[#40647E] text-white border-[#2A597A]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            2. Contenido
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 3 ? 'bg-[#40647E] text-white border-[#2A597A]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            3. Evaluación
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#2A597A] to-[#40647E] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white shadow-inner">
              <Shield size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-100 block">
                MÓDULO 03 • STAND SST
              </span>
              <h2 className="font-title text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                Elementos de Protección Personal – EPP
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
                ¿Qué es un EPP?
              </h3>
              
              <div className="mt-4 p-5 bg-slate-50 border-l-4 border-[#40647E] rounded-r-2xl text-slate-700 leading-relaxed text-sm sm:text-base">
                Un <strong className="text-slate-900">Elemento de Protección Personal (EPP)</strong> es un elemento diseñado para proteger al trabajador frente a los riesgos presentes durante la ejecución de su labor.
              </div>
            </div>

            {/* Subtitle: Función */}
            <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-6 space-y-2">
              <h4 className="font-title text-sm sm:text-base font-bold text-[#2A597A] uppercase tracking-wider">
                ¿Cuál es su función?
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Prevenir o reducir la probabilidad de sufrir lesiones o enfermedades laborales cuando los riesgos no pueden eliminarse completamente.
              </p>
            </div>

            {/* 6 Visual Examples of EPP */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Ejemplos de Elementos de Protección:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">⛑️</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Casco</span>
                  <span className="text-[10px] text-slate-500 block">Protección craneal</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">🥽</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Protección visual</span>
                  <span className="text-[10px] text-slate-500 block">Gafas de seguridad</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">🧤</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Guantes</span>
                  <span className="text-[10px] text-slate-500 block">Protección de manos</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">🎧</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Protección auditiva</span>
                  <span className="text-[10px] text-slate-500 block">Tapones / orejeras</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">🥾</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Calzado de seguridad</span>
                  <span className="text-[10px] text-slate-500 block">Puntera y suela</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center space-y-2 hover:border-[#40647E] transition-all">
                  <span className="text-2xl block">😷</span>
                  <span className="font-title text-xs font-bold text-slate-800 block">Protección respiratoria</span>
                  <span className="text-[10px] text-slate-500 block">Mascarilla con filtro</span>
                </div>
              </div>
            </div>

            {/* Featured Idea Box */}
            <div className="text-center py-5 px-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-950">
              <blockquote className="font-title text-base sm:text-lg font-extrabold text-emerald-300 leading-snug">
                “El EPP protege, pero no hace desaparecer el peligro.”
              </blockquote>
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
                className="py-3 px-8 bg-[#40647E] hover:bg-[#2A597A] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#40647E]/20 flex items-center gap-2 cursor-pointer"
                id="btn-epp-continuar-screen-1"
              >
                <span>Continuar</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 2: CONTENIDO (VIDEO EPP) */}
        {/* ========================================================================= */}
        {currentScreen === 2 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2A597A] bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full inline-block">
                Recurso Audiovisual
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Tu EPP es una barrera de protección
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Aprende la colocación adecuada, el cuidado y la importancia del uso continuo.
              </p>
            </div>

            {/* Video Player Box */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-950 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2 text-sky-400">
                  <Video size={16} />
                  <span>Video – Elementos de Protección Personal</span>
                </div>
                <span className="bg-white/10 px-2.5 py-1 rounded-full font-mono text-[11px] text-white">
                  ⏱️ Duración: 01:00 min
                </span>
              </div>

              {/* Video Screen Simulation */}
              <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-white/10 overflow-hidden">
                {!isPlaying ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setIsPlaying(true);
                        setHasWatchedVideo(true);
                      }}
                      className="w-16 h-16 rounded-full bg-[#40647E] hover:bg-[#2A597A] text-white flex items-center justify-center mx-auto shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      id="btn-play-video-epp"
                    >
                      <Play size={26} className="ml-1" />
                    </button>
                    <p className="text-xs text-slate-300 font-medium max-w-sm">
                      Haz clic para reproducir el video instructivo sobre la matriz de EPP y barreras de contención.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-md w-full animate-fade-in">
                    <div className="grid grid-cols-3 gap-3 text-left">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-sky-400 block">1. Inspección</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Buen estado físico</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-emerald-400 block">2. Ajuste</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Talla adecuada</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-amber-400 block">3. Higiene</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Limpieza y recambio</span>
                      </div>
                    </div>

                    <p className="text-xs text-sky-300 italic">
                      🎬 [Reproduciendo video técnico: <strong>barrera-proteccion-epp.mp4</strong>]
                    </p>
                    
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Pausar video
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>{hasWatchedVideo ? '✅ Video visualizado' : '▶️ Reproduce el video para avanzar a la evaluación'}</span>
                <span className="text-sky-400 font-bold">Matriz de EPP Prebel</span>
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
                className="py-3 px-8 bg-[#40647E] hover:bg-[#2A597A] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#40647E]/20 flex items-center gap-2 cursor-pointer"
                id="btn-epp-continuar-screen-2"
              >
                <span>Continuar a la Evaluación</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 3: EVALUACIÓN (VERDADERO O FALSO) */}
        {/* ========================================================================= */}
        {currentScreen === 3 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2A597A] bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full inline-block">
                Evaluación: Verdadero o Falso
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Pon a prueba tu criterio de seguridad
              </h3>
            </div>

            {/* Question Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
                <p className="font-title text-base sm:text-lg font-bold text-slate-800 leading-snug">
                  “El uso de los EPP elimina completamente el riesgo de sufrir un accidente de trabajo.”
                </p>
              </div>

              {/* True / False Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => !hasEvaluated && handleEvaluate('VERDADERO')}
                  disabled={hasEvaluated && isAnswerCorrect}
                  className={`p-5 rounded-2xl border text-center font-title font-extrabold text-sm sm:text-base transition-all cursor-pointer ${
                    hasEvaluated && selectedAnswer === 'VERDADERO'
                      ? 'bg-rose-100 border-rose-400 text-rose-800 shadow-sm'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  id="btn-epp-verdadero"
                >
                  VERDADERO
                </button>

                <button
                  onClick={() => !hasEvaluated && handleEvaluate('FALSO')}
                  disabled={hasEvaluated && isAnswerCorrect}
                  className={`p-5 rounded-2xl border text-center font-title font-extrabold text-sm sm:text-base transition-all cursor-pointer ${
                    hasEvaluated && selectedAnswer === 'FALSO'
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  id="btn-epp-falso"
                >
                  FALSO
                </button>
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
                        Los EPP ayudan a reducir la exposición y las posibles consecuencias de un riesgo, pero <strong>no eliminan completamente el peligro</strong>. Por eso deben utilizarse junto con las demás medidas de prevención y control.
                      </p>
                      <div className="pt-2">
                        <span className="inline-block bg-emerald-600 text-white font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          ✓ Módulo 3 completado
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl space-y-3 text-rose-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-rose-800">
                        <XCircle size={18} />
                        Respuesta incorrecta
                      </div>
                      <p className="text-xs leading-relaxed text-rose-900">
                        <strong>Recuerda:</strong> usar un EPP no significa que el riesgo haya desaparecido.
                      </p>
                      <button
                        onClick={handleRetry}
                        className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all"
                        id="btn-epp-retry"
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
                  id="btn-epp-finalizar-modulo"
                >
                  <CheckCircle2 size={16} />
                  <span>Volver al Recorrido</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Selecciona la opción correcta para aprobar el módulo.
                </span>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
