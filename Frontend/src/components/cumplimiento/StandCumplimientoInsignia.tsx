"use client";
import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  RotateCcw, 
  ArrowRight, 
  Trophy 
} from 'lucide-react';

interface StandCumplimientoInsigniaProps {
  onFinish: () => void;
  onReview: () => void;
  participantName: string;
}

export default function StandCumplimientoInsignia({
  onFinish,
  onReview,
  participantName
}: StandCumplimientoInsigniaProps) {
  const achievements = [
    'Conoces las políticas SAGRILAFT y PTEE',
    'Identificas señales de alerta oportunamente',
    'Sabes que no se deben aceptar sobornos ni alterar registros',
    'Conoces los canales seguros de la Línea Ética',
    'Aplicaste con éxito la fórmula: Detecta → Decide → Reporta'
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in space-y-6">
      
      {/* Main Badge Award Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-center relative">
        
        {/* Banner Glow Background */}
        <div className="bg-gradient-to-br from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-8 sm:p-12 relative overflow-hidden">
          
          {/* Animated Badge Icon Container */}
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-1.5 shadow-2xl mx-auto flex items-center justify-center animate-pulse">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-300 flex flex-col items-center justify-center text-center p-2">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mb-0.5" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-yellow-300">
                  PREBEL
                </span>
              </div>
            </div>
            
            {/* Sparkle badge chips */}
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-md">
              <Sparkles size={14} />
            </div>
          </div>

          <span className="text-xs font-black uppercase tracking-widest bg-black/25 text-yellow-200 px-3.5 py-1 rounded-full inline-block mb-2">
            INSIGNIA OFICIAL STAND 04
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            EMBAJADOR DEL CUMPLIMIENTO
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
            Reconocimiento otorgado a: <strong className="text-white underline">{participantName}</strong>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-6">
          
          <div>
            <h3 className="font-title text-lg sm:text-xl font-black text-slate-800 uppercase tracking-tight">
              ¡FELICITACIONES!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Has completado con éxito todo el recorrido de entrenamiento de <strong className="text-[#D6684D]">Cumplimiento y Riesgo</strong>.
            </p>
          </div>

          {/* 5 Validation Checks Grid */}
          <div className="text-left bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
              Competencias y aprendizajes certificados:
            </span>
            {achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Closing Corporate Integrity Oath Quote */}
          <div className="p-5 bg-gradient-to-r from-orange-50/80 via-amber-50/60 to-orange-50/80 border border-orange-200 rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D6684D] block">
              Compromiso Prebel
            </span>
            <blockquote className="font-title text-sm sm:text-base font-extrabold text-slate-800">
              “La integridad comienza conmigo. Proteger a PREBEL es compromiso de todos.”
            </blockquote>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onReview}
              className="w-full sm:w-auto py-3 px-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Repasar contenidos</span>
            </button>

            <button
              onClick={onFinish}
              className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#D6684D] to-[#E07A5F] hover:from-[#C4573D] hover:to-[#D6684D] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#E07A5F]/25 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-finalizar-stand-cumplimiento"
            >
              <span>Volver a la Feria</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
