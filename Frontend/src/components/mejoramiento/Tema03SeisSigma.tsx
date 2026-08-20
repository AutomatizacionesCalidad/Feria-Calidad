"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  XCircle, 
  CheckCircle2, 
  Database, 
  Search, 
  DollarSign, 
  Sparkles,
  TrendingDown,
  Layers
} from 'lucide-react';
import MediaPlaceholder from './MediaPlaceholder';

interface Tema03SeisSigmaProps {
  onPrev: () => void;
  onNext: () => void;
  alreadyCompleted?: boolean;
}

export default function Tema03SeisSigma({
  onPrev,
  onNext,
  alreadyCompleted = false
}: Tema03SeisSigmaProps) {
  const [subStep, setSubStep] = useState<'context' | 'media'>('context');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (subStep === 'media') setSubStep('context');
            else onPrev();
          }}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#2A597A] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Tema 03: 6 Sigma + Lean ({subStep === 'context' ? '1/2 Contexto' : '2/2 Video y Contenido'})
          </span>
        </div>
      </div>

      {/* Step 1: Context */}
      {subStep === 'context' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden fade-in">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#1A3D54] via-[#2A597A] to-[#40647E] text-white p-6 sm:p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
              ENFOQUE 03 · RESOLUCIÓN ESTRUCTURADA
            </span>
            <h2 className="font-title text-xl sm:text-3xl font-black text-white tracking-tight">
              📊 ¿Y SI EL PROBLEMA NO ES TAN SIMPLE?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm font-semibold mt-1">
              El arte de resolver problemas complejos con rigor, datos y método
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Core Premise */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Algunos problemas aparecen una y otra vez, generan pérdidas y no pueden solucionarse con una acción rápida. <strong className="text-slate-900 font-bold">6 Sigma + Lean</strong> permite abordar estos retos mediante análisis estructurado, datos y priorización.
            </p>

            {/* Visual Comparison: Parchar vs Analizar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              
              {/* Parchar */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h4 className="font-title text-sm font-bold uppercase">
                    ❌ Parchar el problema
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-rose-950 font-medium pl-2 border-l-2 border-rose-300">
                  <p>1. Resolver solo el síntoma visible.</p>
                  <p>2. Aplicar soluciones superficiales sin datos.</p>
                  <p className="font-bold text-rose-700">➔ El problema vuelve a presentarse.</p>
                </div>
              </div>

              {/* Analizar */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-title text-sm font-bold uppercase">
                    ✅ Analizar el problema (6 Sigma)
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-950 font-medium pl-2 border-l-2 border-emerald-400">
                  <p>1. Entender las verdaderas causas raíz con datos.</p>
                  <p>2. Reducir la variación del proceso.</p>
                  <p>3. Eliminar desperdicios (Lean).</p>
                  <p className="font-bold text-emerald-800">➔ Lograr mejoras sostenibles y ahorros.</p>
                </div>
              </div>

            </div>

            {/* Quote */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-inner">
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-300 block">
                PRIORIZACIÓN ESTRATÉGICA
              </span>
              <p className="font-title text-sm sm:text-base font-bold text-white leading-snug">
                “No se trata de analizar todo. Se trata de analizar profundamente aquello que realmente importa.”
              </p>
              <p className="text-xs text-slate-300 font-normal pt-1">
                El objetivo es concentrar el conocimiento técnico y los recursos especializados en los problemas que realmente generan impacto en la operación.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2A597A] mx-auto flex items-center justify-center font-bold">
                  <Database size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">📊 Datos</h4>
                <p className="text-xs text-slate-500 font-medium">Medición precisa y evidencia objetiva.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-bold">
                  <Search size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">🔍 Causa</h4>
                <p className="text-xs text-slate-500 font-medium">Llegar al origen, no solo al síntoma.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold">
                  <DollarSign size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">💰 Impacto</h4>
                <p className="text-xs text-slate-500 font-medium">Ahorros y generación de valor sostenible.</p>
              </div>

            </div>

            {/* Closing Takeaway & Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-600">
                ✨ <strong>Los retos complejos requieren decisiones basadas en evidencia.</strong>
              </span>

              <button
                type="button"
                onClick={() => setSubStep('media')}
                className="w-full sm:w-auto py-3 px-6 bg-[#2A597A] hover:bg-[#1E435D] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Step 2: Media */}
      {subStep === 'media' && (
        <MediaPlaceholder
          title="Video – 6 Sigma + Lean"
          description="Conoce cómo el análisis estructurado, la estadística y la priorización ayudan a resolver los problemas complejos de mayor impacto."
          helperText="Conoce cómo el análisis y la priorización ayudan a resolver problemas complejos."
          onNext={onNext}
          nextButtonLabel="Continuar a la Síntesis y Reto Final"
          accentColor="#2A597A"
          badgeLabel="ESPACIO MULTIMEDIA · 6 SIGMA + LEAN"
        />
      )}

    </div>
  );
}
