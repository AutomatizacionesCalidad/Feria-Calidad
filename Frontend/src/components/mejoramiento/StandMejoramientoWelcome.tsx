"use client";
import React from 'react';
import { 
  TrendingUp, 
  Sprout, 
  Cog, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lightbulb,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface StandMejoramientoWelcomeProps {
  onStartRoute: () => void;
  onBackToFair: () => void;
  progressPercent: number;
}

export default function StandMejoramientoWelcome({
  onStartRoute,
  onBackToFair,
  progressPercent
}: StandMejoramientoWelcomeProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Top Breadcrumb & Return to Fair */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToFair}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Volver al Mapa de la Feria</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#5B7F71] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Stand 03 – Mejoramiento Continuo
          </span>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#446558] via-[#5B7F71] to-[#2A597A] text-white p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle decoration elements */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 text-emerald-200 px-3 py-1 rounded-full border border-white/15">
                STAND 03 · MEJORAMIENTO CONTINUO
              </span>
              {progressPercent > 0 && (
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                  {progressPercent}% Completado
                </span>
              )}
            </div>

            <h1 className="font-title text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              MÁS ALLÁ DE LA EFICIENCIA:
            </h1>
            <p className="font-title text-base sm:text-xl font-bold text-emerald-200">
              3 enfoques disruptivos para transformar la productividad
            </p>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium leading-relaxed pt-1">
              Tres formas de mejorar. Un mismo objetivo: transformar nuestros procesos en PREBEL.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Central Question */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#5B7F71] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full inline-block">
              REFLEXIÓN INICIAL
            </span>
            <h2 className="font-title text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              ¿TODOS LOS PROBLEMAS SE RESUELVEN DE LA MISMA MANERA?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              No toda oportunidad de mejora necesita un gran proyecto. Algunas se resuelven con una idea sencilla, otras requieren empoderar a las personas que conocen el proceso y algunas necesitan análisis técnico y estadístico.
            </p>
          </div>

          {/* 3 Approaches Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. Sembrando Ideas */}
            <div className="bg-gradient-to-b from-emerald-50/70 to-white p-6 rounded-2xl border-2 border-emerald-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-3 shadow-inner">
                  <Sprout className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                    ENFOQUE 01
                  </span>
                  <h3 className="font-title text-base font-bold text-slate-900">
                    🌱 Sembrando Ideas
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-snug">
                    Pequeñas mejoras, grandes resultados.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-100/80 text-[11px] text-emerald-900 font-medium">
                “Lo cotidiano puede mejorar con agilidad y análisis simple.”
              </div>
            </div>

            {/* 2. TPM */}
            <div className="bg-gradient-to-b from-amber-50/70 to-white p-6 rounded-2xl border-2 border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mb-3 shadow-inner">
                  <Cog className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
                    ENFOQUE 02
                  </span>
                  <h3 className="font-title text-base font-bold text-slate-900">
                    ⚙️ TPM
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-snug">
                    Personas comprometidas con sus equipos y procesos.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-100/80 text-[11px] text-amber-900 font-medium">
                “Las personas sostienen y cuidan el proceso desde la prevención.”
              </div>
            </div>

            {/* 3. 6 Sigma + Lean */}
            <div className="bg-gradient-to-b from-blue-50/70 to-white p-6 rounded-2xl border-2 border-blue-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-[#2A597A] mb-3 shadow-inner">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#2A597A] bg-blue-100/60 px-2 py-0.5 rounded-md">
                    ENFOQUE 03
                  </span>
                  <h3 className="font-title text-base font-bold text-slate-900">
                    📊 6 Sigma + Lean
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-snug">
                    Método y análisis para resolver retos complejos.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-blue-100/80 text-[11px] text-[#1E435E] font-medium">
                “Los problemas complejos requieren datos, causas raíz y método.”
              </div>
            </div>

          </div>

          {/* Golden Rule Highlight */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white text-center shadow-md space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-300">
              PRINCIPIO FUNDAMENTAL PREBEL
            </span>
            <p className="font-title text-sm sm:text-base font-bold text-white max-w-xl mx-auto leading-snug">
              “El verdadero mejoramiento continuo consiste en utilizar el enfoque correcto para cada reto.”
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Sparkles size={16} className="text-amber-500" />
              <span>Recorrido corto y dinámico en 3 estaciones + reto final integrador.</span>
            </div>

            <button
              type="button"
              onClick={onStartRoute}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#5B7F71] hover:bg-[#4E6F62] text-white font-title font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
              id="btn-comenzar-recorrido-mejoramiento"
            >
              <span>Comenzar recorrido</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
