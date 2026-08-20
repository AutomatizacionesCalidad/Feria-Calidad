/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  Car, 
  AlertTriangle, 
  Shield, 
  Check 
} from 'lucide-react';

interface StandSSTCompletedProps {
  onBackToRoute: () => void;
  onFinishStand: () => void;
}

export default function StandSSTCompleted({
  onBackToRoute,
  onFinishStand
}: StandSSTCompletedProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 fade-in">
      
      {/* Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden text-center">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#3B6B5E] via-[#4E8777] to-[#60A491] text-white p-8 sm:p-12 relative">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-inner mb-4 animate-bounce">
            <ShieldCheck className="w-16 h-16 text-white" />
          </div>

          <span className="text-[11px] font-black tracking-widest uppercase bg-black/20 text-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
            STAND 02 SST COMPLETADO
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            ¡Stand SST completado!
          </h2>
          <p className="text-emerald-100 font-title text-sm sm:text-base font-semibold mt-2 max-w-xl mx-auto">
            Has terminado tu recorrido por los conceptos fundamentales de Seguridad y Salud en el Trabajo.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto">
          
          {/* 4 Checklist Cards */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center">
              Módulos Aprobados (100% de Cumplimiento)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                    <Car size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Módulo 01</span>
                    <span className="text-xs font-extrabold text-slate-800">PESV (Seguridad Vial)</span>
                  </div>
                </div>
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Módulo 02</span>
                    <span className="text-xs font-extrabold text-slate-800">Accidentalidad</span>
                  </div>
                </div>
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                    <Shield size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Módulo 03</span>
                    <span className="text-xs font-extrabold text-slate-800">Elementos de Protección (EPP)</span>
                  </div>
                </div>
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                    <Award size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Módulo 04</span>
                    <span className="text-xs font-extrabold text-slate-800">Reglas de Oro</span>
                  </div>
                </div>
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Highlight Quote Box */}
          <div className="py-6 px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-md border border-slate-950">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-2">
              Compromiso por la Vida
            </span>
            <blockquote className="font-title text-base sm:text-xl font-extrabold text-white leading-relaxed">
              “Trabajar seguro no depende de la suerte. Depende de nuestras decisiones.”
            </blockquote>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 py-3 px-6 rounded-2xl w-fit mx-auto">
            <span className="text-xs font-extrabold text-emerald-900 uppercase">
              Progreso SST:
            </span>
            <span className="text-lg font-black text-[#3B6B5E]">
              100 %
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBackToRoute}
              className="w-full sm:w-auto py-3 px-6 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-bold transition-all border border-stone-200 flex items-center justify-center gap-1.5 cursor-pointer"
              id="btn-sst-volver-recorrido"
            >
              <ArrowLeft size={14} />
              Volver al recorrido
            </button>

            <button
              onClick={onFinishStand}
              className="w-full sm:w-auto py-4 px-10 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-sm font-extrabold transition-all shadow-lg shadow-[#60A491]/25 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-sst-finalizar-stand"
            >
              <ShieldCheck size={18} />
              <span>Finalizar Stand</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
