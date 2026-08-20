/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HardHat, Heart, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface StandSSTWelcomeProps {
  onStartRoute: () => void;
  onBackToFair: () => void;
  sstProgress: number;
}

export default function StandSSTWelcome({ onStartRoute, onBackToFair, sstProgress }: StandSSTWelcomeProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top bar with back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToFair}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-volver-mapa-sst"
        >
          <ArrowLeft size={14} />
          Volver a la Feria
        </button>

        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Stand 02 Activo
        </span>
      </div>

      {/* Main Welcome Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#4E8777] via-[#60A491] to-[#3B6B5E] text-white p-8 sm:p-10 relative text-center">
          <div className="inline-flex items-center justify-center p-3.5 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25 shadow-inner mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>

          <span className="text-[11px] font-black tracking-widest uppercase bg-black/20 text-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
            STAND 02
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            STAND SST
          </h2>
          <p className="text-emerald-100 font-title text-base sm:text-lg font-semibold mt-1">
            Seguridad y Salud en el Trabajo
          </p>

          {/* Decorative Corner Badges */}
          <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <HardHat size={14} />
            <span>Cultura Preventiva</span>
          </div>
        </div>

        {/* Welcome Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Welcome Intro Paragraph */}
          <div className="p-6 bg-slate-50 border-l-4 border-[#60A491] rounded-r-2xl text-slate-700 space-y-3 leading-relaxed">
            <p className="text-sm sm:text-base font-medium">
              Bienvenido al Stand de Seguridad y Salud en el Trabajo.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              En este recorrido conocerás principios esenciales para prevenir accidentes, proteger tu salud y tomar decisiones seguras durante tu jornada.
            </p>
          </div>

          {/* Highlight Key Message Box */}
          <div className="text-center py-5 px-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4E8777] block mb-1">
              Principio Fundamental
            </span>
            <blockquote className="font-title text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">
              “La seguridad empieza con cada decisión que tomamos.”
            </blockquote>
          </div>

          {/* Quick Route Preview Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              4 Módulos de Aprendizaje:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#4E8777] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  01
                </span>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  PESV (Seguridad Vial)
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#4E8777] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  02
                </span>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Accidentalidad
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#4E8777] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  03
                </span>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Elementos de Protección (EPP)
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#4E8777] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  04
                </span>
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  Reglas de Oro
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
              {sstProgress > 0 ? (
                <span className="text-[#4E8777] font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <CheckCircle2 size={16} />
                  Progreso actual de SST: {sstProgress}%
                </span>
              ) : (
                <span>Comienza tu recorrido para obtener la certificación de SST.</span>
              )}
            </div>

            <button
              onClick={onStartRoute}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#60A491]/25 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-comenzar-recorrido-sst"
            >
              <span>{sstProgress > 0 ? 'Continuar recorrido' : 'Comenzar recorrido'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
