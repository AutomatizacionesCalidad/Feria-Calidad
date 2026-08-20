"use client";

import React from 'react';
import { 
  Sprout, 
  Cog, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface TransicionRetoFinalProps {
  onPrev: () => void;
  onStartFormula: () => void;
}

export default function TransicionRetoFinal({
  onPrev,
  onStartFormula
}: TransicionRetoFinalProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Tema 03</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#5B7F71] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Integración de los 3 Enfoques
          </span>
        </div>
      </div>

      {/* Main Transition Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-stone-800 to-[#5B7F71] text-white p-6 sm:p-10 text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/25 mb-1">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="font-title text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            TRES ENFOQUES, UN SOLO PROPÓSITO
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Ya conoces los tres pilares de productividad en PREBEL. Cada uno responde a una necesidad distinta de la operación.
          </p>
        </div>

        {/* 3 Summary Cards */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Sembrando Ideas */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-emerald-500/20">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                  SEMBRANDO IDEAS
                </span>
                <h3 className="font-title text-base font-bold text-slate-900 mt-2">
                  Agilidad para las oportunidades cotidianas
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-semibold border-t border-emerald-200 pt-3">
                Mejoras rápidas y de bajo costo ejecutadas en el día a día.
              </p>
            </div>

            {/* TPM */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-300 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-amber-500/20">
                  <Cog className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  TPM
                </span>
                <h3 className="font-title text-base font-bold text-slate-900 mt-2">
                  Empoderamiento para sostener el proceso
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-semibold border-t border-amber-200 pt-3">
                Personas que cuidan sus máquinas, previenen fallas y aseguran 5S.
              </p>
            </div>

            {/* 6 Sigma */}
            <div className="p-6 rounded-2xl bg-blue-50/70 border-2 border-blue-300 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2A597A] text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-blue-900/20">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1A3D54] bg-blue-200/80 px-2.5 py-0.5 rounded-full">
                  6 SIGMA + LEAN
                </span>
                <h3 className="font-title text-base font-bold text-slate-900 mt-2">
                  Rigor para solucionar problemas complejos
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-semibold border-t border-blue-200 pt-3">
                Análisis estructurado con datos, causas raíz y proyectos de ahorro.
              </p>
            </div>

          </div>

          {/* Central Message */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-2 shadow-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              SINERGIA DE TRANSFORMACIÓN
            </span>
            <p className="font-title text-base sm:text-lg font-bold text-white max-w-2xl mx-auto leading-snug">
              “Cada enfoque tiene una fortaleza diferente. Cuando trabajan juntos, construyen una organización capaz de mejorar y transformarse continuamente.”
            </p>
          </div>

          {/* Launch Formula CTA */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onStartFormula}
              className="py-4 px-10 bg-[#E5A93C] hover:bg-[#D4992C] text-slate-950 font-title font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2.5 hover:scale-[1.02]"
              id="btn-construir-formula"
            >
              <span>Construir la fórmula</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
