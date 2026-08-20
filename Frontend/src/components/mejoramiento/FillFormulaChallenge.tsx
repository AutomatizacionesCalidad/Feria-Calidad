"use client";

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight, 
  Layers, 
  Zap, 
  Award,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface FillFormulaChallengeProps {
  onPassed: () => void;
  onPrev: () => void;
}

interface ApproachOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
}

const AVAILABLE_OPTIONS: ApproachOption[] = [
  { id: '6sigma', name: '6 Sigma', icon: '📊', color: '#2A597A', tagline: 'Análisis técnico y estadístico' },
  { id: 'tpm', name: 'TPM', icon: '⚙️', color: '#E5A93C', tagline: 'Sostenimiento y personas' },
  { id: 'sembrando', name: 'Sembrando Ideas', icon: '🌱', color: '#5B7F71', tagline: 'Agilidad y fácil implementación' }
];

export default function FillFormulaChallenge({ onPassed, onPrev }: FillFormulaChallengeProps) {
  // Slots state: slot1, slot2, slot3 storing option ID
  const [slots, setSlots] = useState<{ slot1: string | null; slot2: string | null; slot3: string | null }>({
    slot1: null,
    slot2: null,
    slot3: null
  });

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Correct answer matching:
  // slot1 = '6sigma'
  // slot2 = 'sembrando'
  // slot3 = 'tpm'

  const handlePlaceInSlot = (slotKey: 'slot1' | 'slot2' | 'slot3', optionId: string) => {
    // If option was in another slot, clear that slot
    const updatedSlots = { ...slots };
    (Object.keys(updatedSlots) as Array<'slot1' | 'slot2' | 'slot3'>).forEach(k => {
      if (updatedSlots[k] === optionId) {
        updatedSlots[k] = null;
      }
    });

    updatedSlots[slotKey] = optionId;
    setSlots(updatedSlots);
    setSelectedTagId(null);
    setValidated(false);
  };

  const handleRemoveFromSlot = (slotKey: 'slot1' | 'slot2' | 'slot3') => {
    setSlots(prev => ({ ...prev, [slotKey]: null }));
    setValidated(false);
  };

  // Drag & drop
  const handleDragStart = (e: React.DragEvent, optionId: string) => {
    e.dataTransfer.setData('text/plain', optionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropSlot = (e: React.DragEvent, slotKey: 'slot1' | 'slot2' | 'slot3') => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData('text/plain');
    if (optionId) {
      handlePlaceInSlot(slotKey, optionId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleValidate = () => {
    const allFilled = slots.slot1 && slots.slot2 && slots.slot3;
    if (!allFilled) return;

    const correct = slots.slot1 === '6sigma' && slots.slot2 === 'sembrando' && slots.slot3 === 'tpm';
    setValidated(true);
    setIsCorrect(correct);
  };

  const handleReset = () => {
    setSlots({ slot1: null, slot2: null, slot3: null });
    setSelectedTagId(null);
    setValidated(false);
    setIsCorrect(false);
  };

  const isAllFilled = slots.slot1 !== null && slots.slot2 !== null && slots.slot3 !== null;

  // Render option badge
  const renderPlacedOption = (optionId: string | null, slotKey: 'slot1' | 'slot2' | 'slot3', slotName: string) => {
    if (!optionId) {
      return (
        <button
          type="button"
          onClick={() => {
            if (selectedTagId) {
              handlePlaceInSlot(slotKey, selectedTagId);
            }
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropSlot(e, slotKey)}
          className={`inline-flex items-center justify-center min-w-[140px] px-3 py-1.5 mx-1.5 my-1 rounded-xl border-2 border-dashed font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            selectedTagId 
              ? 'border-amber-400 bg-amber-50 text-amber-900 animate-pulse ring-2 ring-amber-300' 
              : 'border-slate-300 bg-white/80 hover:border-slate-400 text-slate-400'
          }`}
        >
          {selectedTagId ? '👇 Toca para ubicar' : `[ ${slotName} ]`}
        </button>
      );
    }

    const option = AVAILABLE_OPTIONS.find(o => o.id === optionId);
    if (!option) return null;

    let borderStyle = 'border-amber-400 bg-amber-100/90 text-amber-950';
    if (validated) {
      const correctOptionForSlot = slotKey === 'slot1' ? '6sigma' : slotKey === 'slot2' ? 'sembrando' : 'tpm';
      borderStyle = optionId === correctOptionForSlot 
        ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black' 
        : 'border-rose-400 bg-rose-100 text-rose-950';
    }

    return (
      <span
        onClick={() => !isCorrect && handleRemoveFromSlot(slotKey)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropSlot(e, slotKey)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 mx-1.5 my-1 rounded-xl border-2 font-black text-xs sm:text-sm shadow-xs transition-all ${
          !isCorrect ? 'cursor-pointer hover:scale-105' : ''
        } ${borderStyle}`}
        title={!isCorrect ? 'Haz clic para remover' : ''}
      >
        <span>{option.icon}</span>
        <span>{option.name}</span>
        {!isCorrect && (
          <span className="text-[10px] ml-0.5 text-slate-500 font-normal hover:text-slate-800">✕</span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#5B7F71]/15 text-[#5B7F71] inline-block mb-1">
            EVALUACIÓN INTEGRADORA
          </span>
          <h3 className="font-title text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            COMPLETA LA FÓRMULA
          </h3>
        </div>

        {validated && isCorrect && (
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs shrink-0">
            <CheckCircle2 size={15} />
            ¡Fórmula Validada!
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-slate-50 border-l-4 border-[#5B7F71] rounded-r-2xl text-slate-700 text-xs sm:text-sm font-medium">
        👉 <strong className="text-slate-900">Instrucción:</strong> Arrastra o selecciona cada enfoque disponible en la parte inferior y colócalo en el espacio correspondiente dentro de la frase.
      </div>

      {/* Main Interactive Sentence Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-amber-50/30 to-teal-50/30 border-2 border-slate-200 text-slate-800 leading-loose text-sm sm:text-base font-medium shadow-inner">
        <p className="font-sans leading-loose text-justify sm:text-left">
          El planteamiento técnico y estadístico de{' '}
          {renderPlacedOption(slots.slot1, 'slot1', 'ESPACIO 1')}
          , unido a la agilidad de fácil implementación y cambio de{' '}
          {renderPlacedOption(slots.slot2, 'slot2', 'ESPACIO 2')}
          , sumado a la dinámica de sostenimiento de los procesos con empoderamiento de las personas que logra{' '}
          {renderPlacedOption(slots.slot3, 'slot3', 'ESPACIO 3')}
          , nos permitirá en PREBEL ser eficientes y capaces de autotransformarnos.
        </p>
      </div>

      {/* Draggable & Clickable Tags Bank */}
      {!isCorrect && (
        <div className="space-y-3 pt-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
            Enfoques disponibles (toca o arrastra hacia los espacios):
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AVAILABLE_OPTIONS.map((opt) => {
              const isUsed = Object.values(slots).includes(opt.id);
              const isSelected = selectedTagId === opt.id;

              return (
                <div
                  key={opt.id}
                  draggable={!isUsed}
                  onDragStart={(e) => handleDragStart(e, opt.id)}
                  onClick={() => {
                    if (!isUsed) {
                      setSelectedTagId(isSelected ? null : opt.id);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-2 select-none ${
                    isUsed
                      ? 'opacity-35 bg-slate-100 border-slate-200 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-400/40 cursor-pointer scale-102'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 shadow-2xs cursor-grab active:cursor-grabbing'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{opt.icon}</span>
                    <div>
                      <span className="font-title text-sm font-bold block leading-tight">
                        {opt.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {opt.tagline}
                      </span>
                    </div>
                  </div>

                  {!isUsed && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                      {isSelected ? 'Seleccionado' : 'Usar'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Validate Button */}
      {!isCorrect && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleValidate}
            disabled={!isAllFilled}
            className={`py-3.5 px-8 rounded-xl font-title font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
              isAllFilled
                ? 'bg-[#E5A93C] hover:bg-[#D4992C] text-slate-950 cursor-pointer hover:scale-[1.02]'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <span>Validar fórmula</span>
            <CheckCircle2 size={16} />
          </button>
        </div>
      )}

      {/* Incorrect Feedback */}
      {validated && !isCorrect && (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 space-y-3 fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="text-sm font-extrabold uppercase tracking-wide">
              Aún falta ajustar la fórmula
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            Revisa la correspondencia de cada enfoque:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-800">
            <div className="p-2.5 bg-white/90 rounded-xl border border-rose-200">
              📊 <strong>6 Sigma:</strong> análisis técnico y estadístico.
            </div>
            <div className="p-2.5 bg-white/90 rounded-xl border border-rose-200">
              🌱 <strong>Sembrando Ideas:</strong> agilidad y fácil implementación.
            </div>
            <div className="p-2.5 bg-white/90 rounded-xl border border-rose-200">
              ⚙️ <strong>TPM:</strong> sostenimiento y empoderamiento de personas.
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="py-2 px-4 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <RotateCcw size={13} />
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Correct Celebration & Complete Formula Graphic */}
      {validated && isCorrect && (
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50/50 border-2 border-emerald-400 rounded-3xl text-center space-y-6 shadow-md fade-in">
          
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full inline-block mb-1.5">
              ✅ ¡FÓRMULA COMPLETA!
            </span>
            <h3 className="font-title text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              HAS INTEGRADO NUESTRA FÓRMULA DE TRANSFORMACIÓN
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-xl mx-auto mt-1">
              Has identificado cómo se complementan nuestros tres enfoques de mejoramiento continuo para lograr una organización altamente productiva y resiliente.
            </p>
          </div>

          {/* Visual Formula Union */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center max-w-3xl mx-auto text-xs sm:text-sm font-bold">
            
            {/* 6 Sigma */}
            <div className="md:col-span-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center">
              <span className="text-2xl mb-1">📊</span>
              <span className="font-title font-black text-slate-900">6 SIGMA + LEAN</span>
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5">Resolver lo complejo</span>
            </div>

            {/* Operator * */}
            <div className="md:col-span-1 text-slate-400 text-lg font-black font-mono">
              +
            </div>

            {/* Sembrando Ideas */}
            <div className="md:col-span-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center">
              <span className="text-2xl mb-1">🌱</span>
              <span className="font-title font-black text-slate-900">SEMBRANDO IDEAS</span>
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5">Mejorar lo cotidiano</span>
            </div>

            {/* Operator * */}
            <div className="md:col-span-1 text-slate-400 text-lg font-black font-mono">
              +
            </div>

            {/* TPM */}
            <div className="md:col-span-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center">
              <span className="text-2xl mb-1">⚙️</span>
              <span className="font-title font-black text-slate-900">TPM</span>
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5">Sostener la mejora</span>
            </div>

          </div>

          {/* Equal Result */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl max-w-xl mx-auto shadow-inner space-y-1">
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 block">
              RESULTADO PREBEL
            </span>
            <div className="font-title text-xl sm:text-2xl font-black text-white tracking-wide flex items-center justify-center gap-2">
              <span>🚀</span>
              <span>AUTOTRANSFORMACIÓN Y EFICIENCIA</span>
            </div>
            <p className="text-xs text-slate-300 font-normal pt-1">
              “Mejorar no es utilizar una sola metodología. Es saber utilizar el enfoque correcto para cada oportunidad.”
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onPassed}
              className="py-3.5 px-8 bg-[#5B7F71] hover:bg-[#4E6F62] text-white font-title font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Ver Reconocimiento y Cierre</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
