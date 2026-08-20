"use client";

import React, { useState } from 'react';
import { 
  Sprout, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Lightbulb, 
  Rocket, 
  ShieldCheck, 
  Sparkles,
  Activity,
  Film
} from 'lucide-react';
import MediaPlaceholder from './MediaPlaceholder';

interface Tema01SembrandoIdeasProps {
  onPrev: () => void;
  onNext: () => void;
  alreadyCompleted?: boolean;
}

export default function Tema01SembrandoIdeas({
  onPrev,
  onNext,
  alreadyCompleted = false
}: Tema01SembrandoIdeasProps) {
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
          <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Tema 01: Sembrando Ideas ({subStep === 'context' ? '1/2 Contexto' : '2/2 Contenido Multimedia'})
          </span>
        </div>
      </div>

      {/* Step 1: Context */}
      {subStep === 'context' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden fade-in">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-[#5B7F71] to-[#3B6E5F] text-white p-6 sm:p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
              ENFOQUE 01 · SIMPLICIDAD COTIDIANA
            </span>
            <h2 className="font-title text-xl sm:text-3xl font-black text-white tracking-tight">
              🌱 ¿UNA PEQUEÑA IDEA PUEDE GENERAR UN GRAN CAMBIO?
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-semibold mt-1">
              La revolución de la simplicidad cotidiana en nuestros procesos
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Core Premise */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">Sembrando Ideas</strong> parte de una premisa sencilla: no todas las mejoras necesitan grandes proyectos o inversiones. Las pequeñas oportunidades que identificamos todos los días pueden convertirse en mejoras ágiles, fáciles de implementar y capaces de transformar nuestros procesos.
            </p>

            {/* Highlight quote */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border-l-4 border-emerald-600 text-emerald-950 font-bold text-sm sm:text-base leading-snug">
              “Muchas pequeñas mejoras pueden generar un impacto mayor que una única gran solución.”
            </div>

            {/* Immune System Analogy */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 shadow-inner">
              <div className="flex items-center gap-2.5 text-emerald-300">
                <Activity className="w-5 h-5" />
                <h3 className="font-title text-sm sm:text-base font-bold uppercase tracking-wide">
                  Analogía: El “sistema inmunológico” del proceso
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Sembrando Ideas funciona como el sistema inmunológico: detecta pequeñas oportunidades constantemente y ayuda a mantener el proceso saludable antes de que los problemas crezcan.
              </p>
            </div>

            {/* 3 Action Concepts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-bold">
                  <Eye size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">👀 Detectar</h4>
                <p className="text-xs text-slate-500 font-medium">Encuentro una oportunidad.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold">
                  <Lightbulb size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">💡 Proponer</h4>
                <p className="text-xs text-slate-500 font-medium">Pienso una solución sencilla.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 mx-auto flex items-center justify-center font-bold">
                  <Rocket size={20} />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900">🚀 Mejorar</h4>
                <p className="text-xs text-slate-500 font-medium">Implementamos una mejora práctica.</p>
              </div>

            </div>

            {/* Golden Takeaway & Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-600">
                ✨ <strong>Mejorar también es simplificar.</strong>
              </span>

              <button
                type="button"
                onClick={() => setSubStep('media')}
                className="w-full sm:w-auto py-3 px-6 bg-[#5B7F71] hover:bg-[#4E6F62] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Step 2: Media Space */}
      {subStep === 'media' && (
        <MediaPlaceholder
          title="Contenido – Sembrando Ideas"
          description="Descubre cómo una oportunidad cotidiana puede convertirse en una mejora real a través de la participación ágil de los equipos."
          helperText="Descubre cómo una oportunidad cotidiana puede convertirse en una mejora real."
          onNext={onNext}
          nextButtonLabel="Continuar al Tema 02 – TPM"
          accentColor="#5B7F71"
          badgeLabel="ESPACIO MULTIMEDIA · SEMBRANDO IDEAS"
        />
      )}

    </div>
  );
}
