"use client";
import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Eye, 
  CheckCircle2, 
  Megaphone, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  ShieldAlert,
  FileCheck
} from 'lucide-react';

interface StandCumplimientoWelcomeProps {
  onStartRoute: () => void;
  onBackToFair: () => void;
  progressPercent: number;
}

export default function StandCumplimientoWelcome({
  onStartRoute,
  onBackToFair,
  progressPercent
}: StandCumplimientoWelcomeProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top bar with back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToFair}
          className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="btn-volver-mapa-cumplimiento"
        >
          <ArrowLeft size={14} />
          Volver a la Feria
        </button>

        <span className="text-xs font-bold px-3 py-1 bg-orange-50 text-orange-800 border border-orange-200 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse"></span>
          Stand 04 Activo
        </span>
      </div>

      {/* Main Welcome Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        {/* Header Banner with Prebel Salmon/Coral & Corporate Navy tones */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-8 sm:p-10 relative text-center">
          <div className="inline-flex items-center justify-center p-3.5 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25 shadow-inner mb-4">
            <Scale className="w-12 h-12 text-white" />
          </div>

          <span className="text-[11px] font-black tracking-widest uppercase bg-black/20 text-orange-100 px-3 py-1 rounded-full inline-block mb-2">
            STAND 04
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Actuamos con Integridad y Transparencia
          </h2>
          <p className="text-orange-100 font-title text-base sm:text-lg font-semibold mt-1">
            Cumplimiento y Gestión del Riesgo
          </p>

          {/* Decorative Corner Badge */}
          <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <ShieldCheck size={14} />
            <span>Cultura de Integridad</span>
          </div>
        </div>

        {/* Welcome Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Welcome Intro Paragraph */}
          <div className="p-6 bg-slate-50 border-l-4 border-[#E07A5F] rounded-r-2xl text-slate-700 space-y-3 leading-relaxed">
            <p className="text-sm sm:text-base font-semibold text-slate-800">
              En PREBEL hacemos nuestros negocios de manera ética, transparente y conforme a la ley.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Todos tenemos un papel importante en la protección de la compañía: cumplir los procedimientos, identificar situaciones inusuales y reportarlas oportunamente también hace parte de nuestro trabajo.
            </p>
          </div>

          {/* Highlight Key Message Box */}
          <div className="text-center py-5 px-6 bg-gradient-to-r from-orange-50/80 via-amber-50/60 to-orange-50/80 border border-orange-200/80 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D6684D] block mb-1">
              Principio Fundamental
            </span>
            <blockquote className="font-title text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">
              “La integridad se demuestra en las decisiones que tomamos todos los días.”
            </blockquote>
          </div>

          {/* Core Concept Triad: DETECTA -> DECIDE -> REPORTA */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
              Nuestra fórmula de acción diaria:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: DETECTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs hover:border-[#E07A5F]/40 transition-all flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#D6684D] flex items-center justify-center mb-1">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-wide text-slate-800">
                  👀 DETECTA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Reconoce señales o comportamientos inusuales en las operaciones.
                </p>
              </div>

              {/* Card 2: DECIDE */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-wide text-slate-800">
                  ✅ DECIDE
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Actúa siempre de acuerdo con las políticas, normas y procedimientos.
                </p>
              </div>

              {/* Card 3: REPORTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs hover:border-[#2A597A]/40 transition-all flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2A597A] flex items-center justify-center mb-1">
                  <Megaphone className="w-6 h-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-wide text-slate-800">
                  📢 REPORTA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Utiliza los canales establecidos (Línea Ética) cuando identifiques algo incorrecto.
                </p>
              </div>

            </div>
          </div>

          {/* Golden Rule Summary Quote */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-1 shadow-inner">
            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              Si algo parece inusual: <strong className="text-orange-300">no se ignora</strong>, <strong className="text-orange-300">no se participa</strong>, <strong className="text-orange-300">no se oculta</strong>.
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wide text-emerald-400 uppercase">
              ¡SE REPORTA OPORTUNAMENTE!
            </p>
          </div>

          {/* Quick Route Preview Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              6 Microestaciones del Recorrido:
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { num: '01', title: 'Protegemos a PREBEL' },
                { num: '02', title: 'SAGRILAFT' },
                { num: '03', title: 'PTEE' },
                { num: '04', title: 'Línea Ética' },
                { num: '05', title: 'Reto ¿Qué harías?' },
                { num: '06', title: 'Evaluación final' },
              ].map(st => (
                <div key={st.num} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center flex flex-col items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-[#E07A5F]/15 text-[#D6684D] font-mono font-black text-[10px] flex items-center justify-center mb-1">
                    {st.num}
                  </span>
                  <span className="text-[10.5px] font-bold text-slate-700 leading-tight">
                    {st.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
              {progressPercent > 0 ? (
                <span className="text-[#D6684D] font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <CheckCircle2 size={16} />
                  Progreso en Cumplimiento y Riesgo: {progressPercent}%
                </span>
              ) : (
                <span>Completa las microestaciones para obtener la insignia de Embajador del Cumplimiento.</span>
              )}
            </div>

            <button
              onClick={onStartRoute}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#E07A5F] hover:bg-[#D6684D] text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#E07A5F]/25 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-comenzar-recorrido-cumplimiento"
            >
              <span>{progressPercent > 0 ? 'Continuar recorrido' : 'Comenzar recorrido'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
