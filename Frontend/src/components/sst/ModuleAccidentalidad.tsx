"use client";
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  Video, 
  HelpCircle,
  Link,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface ModuleAccidentalidadProps {
  onComplete: () => void;
  onBackToRoute: () => void;
  alreadyCompleted?: boolean;
}

export default function ModuleAccidentalidad({
  onComplete,
  onBackToRoute,
  alreadyCompleted = false
}: ModuleAccidentalidadProps) {
  // Screen sequence: 1: Contexto -> 2: Contenido (Video) -> 3: Actividad Interactiva
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  // Interactive matching state
  // Left: concepts (A, B, C)
  // Right: definitions (1, 2, 3)
  const [selectedConcept, setSelectedConcept] = useState<'A' | 'B' | 'C' | null>(null);
  const [matches, setMatches] = useState<Record<'A' | 'B' | 'C', number | null>>({
    A: null,
    B: null,
    C: null
  });
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  const concepts = [
    { id: 'A' as const, label: 'A. Accidente de trabajo', color: 'border-rose-300 bg-rose-50/50' },
    { id: 'B' as const, label: 'B. Incidente de trabajo', color: 'border-amber-300 bg-amber-50/50' },
    { id: 'C' as const, label: 'C. Acto inseguro', color: 'border-blue-300 bg-blue-50/50' }
  ];

  const definitions = [
    { 
      id: 1, 
      text: 'Comportamiento o acción de una persona que aumenta la probabilidad de que ocurra un accidente.' 
    },
    { 
      id: 2, 
      text: 'Suceso repentino ocurrido por causa o con ocasión del trabajo que produce una lesión, incapacidad, invalidez o muerte.' 
    },
    { 
      id: 3, 
      text: 'Suceso relacionado con el trabajo que no ocasionó lesión, pero que pudo haberla causado.' 
    }
  ];

  // Match handler
  const handleSelectDefinition = (defId: number) => {
    if (!selectedConcept) return;

    // Check if another concept already has this definition
    const updated = { ...matches };
    (Object.keys(updated) as Array<'A' | 'B' | 'C'>).forEach((c) => {
      if (updated[c] === defId) {
        updated[c] = null;
      }
    });

    updated[selectedConcept] = defId;
    setMatches(updated);
    setSelectedConcept(null);
    setHasEvaluated(false);
  };

  const handleVerifyMatching = () => {
    // Correct solution: A -> 2, B -> 3, C -> 1
    const isCorrect = matches.A === 2 && matches.B === 3 && matches.C === 1;
    setHasEvaluated(true);
    setAllCorrect(isCorrect);
    if (isCorrect) {
      onComplete();
    }
  };

  const handleResetMatching = () => {
    setMatches({ A: null, B: null, C: null });
    setSelectedConcept(null);
    setHasEvaluated(false);
    setAllCorrect(false);
  };

  const isMatchingComplete = matches.A !== null && matches.B !== null && matches.C !== null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top Breadcrumb / Nav */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToRoute}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-acc-volver-ruta"
        >
          <ArrowLeft size={14} />
          Volver al Recorrido
        </button>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 1 ? 'bg-[#F2917E] text-white border-[#e07560]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            1. Contexto
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 2 ? 'bg-[#F2917E] text-white border-[#e07560]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            2. Contenido
          </span>
          <span className="text-slate-300">→</span>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
            currentScreen === 3 ? 'bg-[#F2917E] text-white border-[#e07560]' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            3. Actividad
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#e07560] to-[#F2917E] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white shadow-inner">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-100 block">
                MÓDULO 02 • STAND SST
              </span>
              <h2 className="font-title text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                Accidentalidad
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
                ¿Accidente o incidente?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Comprender la diferencia técnica es el primer paso para prevenir cualquier daño.
              </p>
            </div>

            {/* 2 Comparative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Accidente de Trabajo */}
              <div className="p-6 bg-rose-50/60 border border-rose-200 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    🚨
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 block">
                      Evento con lesión
                    </span>
                    <h4 className="font-title text-base font-extrabold text-slate-900">
                      ACCIDENTE DE TRABAJO
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  Es todo suceso repentino que sobrevenga por causa o con ocasión del trabajo y que produzca en el trabajador una lesión orgánica, perturbación funcional o psiquiátrica, invalidez o muerte.
                </p>
              </div>

              {/* Incidente de Trabajo */}
              <div className="p-6 bg-amber-50/60 border border-amber-200 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    ⚠️
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block">
                      Evento casi accidente
                    </span>
                    <h4 className="font-title text-base font-extrabold text-slate-900">
                      INCIDENTE DE TRABAJO
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  Es un evento relacionado con el trabajo que tuvo el potencial de convertirse en accidente, pero no produjo una lesión.
                </p>
              </div>

            </div>

            {/* Featured Quote */}
            <div className="text-center py-5 px-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-950">
              <blockquote className="font-title text-sm sm:text-base font-extrabold text-amber-300 leading-snug">
                “Un incidente sin lesión también importa: identificarlo puede evitar un accidente futuro.”
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
                className="py-3 px-8 bg-[#F2917E] hover:bg-[#e07560] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#F2917E]/20 flex items-center gap-2 cursor-pointer"
                id="btn-acc-continuar-screen-1"
              >
                <span>Continuar</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 2: CONTENIDO (VIDEO ACCIDENTALIDAD) */}
        {/* ========================================================================= */}
        {currentScreen === 2 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full inline-block">
                Recurso Audiovisual
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Aprendamos a reconocer los eventos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Conoce cómo actuar y reportar a tiempo para salvaguardar tu bienestar.
              </p>
            </div>

            {/* Video Player Box */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-950 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2 text-rose-400">
                  <Video size={16} />
                  <span>Video – Accidentalidad</span>
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
                      className="w-16 h-16 rounded-full bg-[#F2917E] hover:bg-[#e07560] text-white flex items-center justify-center mx-auto shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      id="btn-play-video-acc"
                    >
                      <Play size={26} className="ml-1" />
                    </button>
                    <p className="text-xs text-slate-300 font-medium max-w-sm">
                      Haz clic para reproducir el video explicativo de prevención de incidentes y actos inseguros.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-md w-full animate-fade-in">
                    <div className="grid grid-cols-3 gap-3 text-left">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-amber-400 block">1. Detectar</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Acto o condición</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-teal-400 block">2. Reportar</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Líder SST</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-emerald-400 block">3. Corregir</span>
                        <span className="text-[11px] text-slate-300 leading-tight block mt-1">Cero lesiones</span>
                      </div>
                    </div>

                    <p className="text-xs text-rose-300 italic">
                      🎬 [Reproduciendo video técnico: <strong>reconocimiento-accidentalidad.mp4</strong>]
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
                <span>{hasWatchedVideo ? '✅ Video visualizado' : '▶️ Reproduce el video para habilitar la actividad'}</span>
                <span className="text-amber-400 font-bold">Prevención Prebel</span>
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
                className="py-3 px-8 bg-[#F2917E] hover:bg-[#e07560] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#F2917E]/20 flex items-center gap-2 cursor-pointer"
                id="btn-acc-continuar-screen-2"
              >
                <span>Continuar a la Actividad</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 3: ACTIVIDAD INTERACTIVA (UNE CADA CONCEPTO CON SU SIGNIFICADO) */}
        {/* ========================================================================= */}
        {currentScreen === 3 && (
          <div className="p-6 sm:p-10 space-y-8 fade-in">
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full inline-block">
                Actividad Interactiva
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Une cada concepto con su significado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Toca primero un concepto en la columna izquierda y luego su definición correspondiente a la derecha.
              </p>
            </div>

            {/* Interactive Matching Board */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1: Concepts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
                    Columna 1: Conceptos
                  </h4>

                  {concepts.map((concept) => {
                    const isSelected = selectedConcept === concept.id;
                    const matchedDefId = matches[concept.id];
                    
                    return (
                      <button
                        key={concept.id}
                        onClick={() => setSelectedConcept(concept.id)}
                        disabled={hasEvaluated && allCorrect}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                          isSelected 
                            ? 'ring-2 ring-[#e07560] bg-rose-100/70 border-rose-400 shadow-sm' 
                            : matchedDefId !== null 
                              ? 'bg-white border-emerald-300 shadow-xs' 
                              : 'bg-white hover:bg-slate-100/80 border-slate-200'
                        }`}
                        id={`btn-concept-${concept.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-title font-extrabold text-xs sm:text-sm text-slate-800">
                            {concept.label}
                          </span>
                          {matchedDefId !== null && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                              Unido con #{matchedDefId}
                            </span>
                          )}
                        </div>

                        {isSelected && (
                          <span className="text-[10px] text-rose-700 font-semibold animate-pulse">
                            👉 Toca ahora su definición en la columna derecha...
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Column 2: Definitions (Shuffled display) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
                    Columna 2: Significados
                  </h4>

                  {definitions.map((def) => {
                    // Check which concept is linked to this definition
                    const linkedConcept = (Object.keys(matches) as Array<'A' | 'B' | 'C'>).find(
                      c => matches[c] === def.id
                    );

                    return (
                      <button
                        key={def.id}
                        onClick={() => handleSelectDefinition(def.id)}
                        disabled={hasEvaluated && allCorrect}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          linkedConcept 
                            ? 'bg-white border-emerald-300 shadow-xs' 
                            : selectedConcept 
                              ? 'bg-white hover:border-rose-400 hover:bg-rose-50/30 border-dashed border-slate-300' 
                              : 'bg-white hover:bg-slate-100/80 border-slate-200'
                        }`}
                        id={`btn-def-${def.id}`}
                      >
                        <span className="w-7 h-7 rounded-xl bg-slate-100 font-mono font-bold text-xs text-slate-700 flex items-center justify-center shrink-0 border border-slate-200 mt-0.5">
                          {def.id}
                        </span>

                        <div className="flex-1">
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {def.text}
                          </p>

                          {linkedConcept && (
                            <span className="inline-block mt-2 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              ✓ Enlazado a concepto {linkedConcept}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Action and verification button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <button
                  onClick={handleResetMatching}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                >
                  Reiniciar emparejamiento
                </button>

                <button
                  onClick={handleVerifyMatching}
                  disabled={!isMatchingComplete || (hasEvaluated && allCorrect)}
                  className={`py-3 px-8 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isMatchingComplete && !(hasEvaluated && allCorrect)
                      ? 'bg-[#F2917E] hover:bg-[#e07560] text-white cursor-pointer shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  id="btn-verificar-emparejamiento"
                >
                  Comprobar respuestas
                </button>
              </div>

              {/* Feedback Alert */}
              {hasEvaluated && (
                <div className="animate-fade-in">
                  {allCorrect ? (
                    <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-emerald-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-emerald-800">
                        <CheckCircle2 size={18} />
                        ¡Excelente!
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-900">
                        Reconocer la diferencia entre accidente, incidente y acto inseguro nos permite actuar antes de que ocurra una lesión.
                      </p>
                      <div className="pt-2">
                        <span className="inline-block bg-emerald-600 text-white font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          ✓ Módulo 2 completado
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl space-y-3 text-rose-950">
                      <div className="flex items-center gap-2 font-title font-extrabold text-sm text-rose-800">
                        <XCircle size={18} />
                        Hay relaciones incorrectas.
                      </div>
                      <p className="text-xs leading-relaxed text-rose-900">
                        Recuerda: El <strong>accidente</strong> causa lesión, el <strong>incidente</strong> tuvo el potencial pero no lesionó, y el <strong>acto inseguro</strong> es la conducta que eleva el riesgo.
                      </p>
                      <button
                        onClick={handleResetMatching}
                        className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all"
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

              {allCorrect ? (
                <button
                  onClick={onBackToRoute}
                  className="py-3 px-8 bg-[#4E8777] hover:bg-[#3B6B5E] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  id="btn-acc-finalizar-modulo"
                >
                  <CheckCircle2 size={16} />
                  <span>Volver al Recorrido</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Une los 3 pares y comprueba tus respuestas.
                </span>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
