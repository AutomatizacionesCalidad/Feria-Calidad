"use client";
import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Sprout, 
  Cog, 
  BarChart3,
  MapPin
} from 'lucide-react';

interface StandMejoramientoInsigniaProps {
  onBackToFair: () => void;
  onReviewStand: () => void;
  participantCedula?: string;
  participantArea?: string;
}

export default function StandMejoramientoInsignia({
  onBackToFair,
  onReviewStand,
  participantCedula,
  participantArea
}: StandMejoramientoInsigniaProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in space-y-6">
      
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-center">
        
        {/* Superior Header Banner */}
        <div className="bg-gradient-to-r from-[#446558] via-[#5B7F71] to-[#2A597A] text-white p-8 sm:p-12 relative overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-amber-300 mx-auto flex items-center justify-center shadow-xl shadow-black/20 animate-bounce">
              <Award className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-200 bg-black/25 px-3 py-1 rounded-full inline-block mb-2 border border-white/15">
                STAND 03 · 100% COMPLETADO
              </span>
              <h2 className="font-title text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                ¡LO HICISTE GENIAL!
              </h2>
              {participantCedula && (
                <p className="text-emerald-100 font-bold text-sm sm:text-base mt-1">
                  C.C. {participantCedula} {participantArea ? `· ${participantArea}` : ''}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Main Congratulatory Text */}
          <div className="max-w-xl mx-auto space-y-3">
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
              Ya conoces tres formas de impulsar la productividad en PREBEL: pequeñas mejoras que avanzan con agilidad, personas empoderadas que sostienen nuestros procesos y metodologías estructuradas para resolver problemas complejos.
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-2 border-amber-300 text-slate-900 font-title text-base sm:text-lg font-black tracking-tight leading-snug">
              “Más allá de la eficiencia: transformamos nuestra forma de trabajar.”
            </div>
          </div>

          {/* Badge Display Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200/80 max-w-md mx-auto flex items-center gap-4 text-left shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#5B7F71] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#5B7F71]/30">
              <TrendingUp className="w-9 h-9 text-amber-300" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                INSIGNIA OBTENIDA
              </span>
              <h3 className="font-title text-sm sm:text-base font-bold text-slate-900 leading-tight">
                AGENTE DE TRANSFORMACIÓN Y MEJORA
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Stand 03: Mejoramiento Continuo · Prebel S.A.S BIC
              </p>
            </div>
          </div>

          {/* 3 Pillars Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs font-bold text-slate-700">
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
              🌱 <strong>Sembrando Ideas</strong><br />
              <span className="text-[11px] font-normal text-slate-600">Mejora lo cotidiano</span>
            </div>
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
              ⚙️ <strong>TPM</strong><br />
              <span className="text-[11px] font-normal text-slate-600">Sostiene con personas</span>
            </div>
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
              📊 <strong>6 Sigma + Lean</strong><br />
              <span className="text-[11px] font-normal text-slate-600">Resuelve lo complejo</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onReviewStand}
              className="w-full sm:w-auto py-3 px-5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw size={14} />
              <span>Repasar Contenidos</span>
            </button>

            <button
              type="button"
              onClick={onBackToFair}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#5B7F71] hover:bg-[#4E6F62] text-white font-title font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
              id="btn-finalizar-stand-mejoramiento"
            >
              <span>Finalizar Stand</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
