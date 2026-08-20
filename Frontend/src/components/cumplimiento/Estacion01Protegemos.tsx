"use client";
import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface Estacion01ProtegemosProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Estacion01Protegemos({ onNext, onPrev }: Estacion01ProtegemosProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Station Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Volver al inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#E07A5F] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Estación 01 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#D6684D] to-[#2A597A] text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                ESTACIÓN 01
              </span>
              <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                PROTEGEMOS A PREBEL
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
                Conozcamos nuestra política SAGRILAFT & PTEE
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl border border-white/20 shrink-0">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Informative Text */}
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              En <strong className="text-slate-900">PREBEL</strong> estamos comprometidos con realizar nuestras actividades de manera <strong className="text-[#D6684D]">ética, transparente y conforme a la ley</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Por ello, contamos con controles y procedimientos para prevenir que la compañía sea utilizada en actividades relacionadas con <strong className="text-slate-800">lavado de activos</strong>, <strong className="text-slate-800">financiación del terrorismo</strong> o <strong className="text-slate-800">proliferación de armas de destrucción masiva</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Todos los colaboradores y terceros vinculados debemos cumplir las políticas establecidas, reportar situaciones inusuales y contribuir a la adecuada gestión de estos riesgos.
            </p>
          </div>

          {/* Highlight Card: ¿POR QUÉ ES IMPORTANTE? */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-orange-50/90 border-l-4 border-[#E07A5F] rounded-r-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#D6684D]">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-title text-sm sm:text-base font-extrabold uppercase tracking-wide">
                ¿Por qué es importante?
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              Todos tenemos un papel en la protección de PREBEL. Por eso contamos con herramientas y programas que nos ayudan a trabajar de manera segura, transparente y ética.
            </p>
          </div>

          {/* Internal Policies Notice (Prebelnet & Isolución) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#2A597A] shrink-0" />
              <span>
                Para ampliar la información puedes consultar las políticas publicadas en <strong className="text-slate-800">Prebelnet e Isolución</strong>.
              </span>
            </div>
          </div>

          {/* Station Navigation Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="w-full sm:w-auto py-2.5 px-5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Volver a Bienvenida
            </button>

            <button
              onClick={onNext}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#E07A5F] hover:bg-[#D6684D] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#E07A5F]/20 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-conocer-sagrilaft"
            >
              <span>Conocer SAGRILAFT</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
