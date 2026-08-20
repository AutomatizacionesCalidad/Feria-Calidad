"use client";
import React, { useState } from 'react';
import { 
  Cog, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  Eye, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  Users,
  ShieldCheck,
  RotateCw,
  Lightbulb
} from 'lucide-react';
import MediaPlaceholder from './MediaPlaceholder';
import SortableChallenge from './SortableChallenge';

interface Tema02TpmProps {
  onPrev: () => void;
  onNext: () => void;
  alreadyCompleted?: boolean;
}

export default function Tema02Tpm({
  onPrev,
  onNext,
  alreadyCompleted = false
}: Tema02TpmProps) {
  const [subStep, setSubStep] = useState<'context' | 'media' | 'activity'>('context');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (subStep === 'activity') setSubStep('media');
            else if (subStep === 'media') setSubStep('context');
            else onPrev();
          }}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Tema 02: TPM ({subStep === 'context' ? '1/3 Contexto' : subStep === 'media' ? '2/3 Video' : '3/3 Actividad'})
          </span>
        </div>
      </div>

      {/* Step 1: Context */}
      {subStep === 'context' && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden fade-in">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#9A6B1F] via-[#C98B27] to-[#E5A93C] text-white p-6 sm:p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-100 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
              ENFOQUE 02 · MANTENIMIENTO PRODUCTIVO TOTAL
            </span>
            <h2 className="font-title text-xl sm:text-3xl font-black text-white tracking-tight">
              ⚙️ ¿QUIÉN CONOCE MEJOR UNA MÁQUINA QUE QUIEN TRABAJA CON ELLA TODOS LOS DÍAS?
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm font-semibold mt-1">
              Convertir al operador en el verdadero “dueño” del proceso
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Core Premise */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">TPM</strong> busca que las personas se conviertan en verdaderos <strong>“dueños” de sus máquinas y procesos</strong>. El operador deja de ser únicamente quien ejecuta una tarea y se convierte también en una fuente activa de prevención, cuidado y mejora.
            </p>

            {/* Visual Transformation: Antes -> TPM -> Después */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                La transformación del modelo de cuidado:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                
                {/* Antes */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md inline-block mb-2">
                      ANTES
                    </span>
                    <h4 className="font-title text-sm font-bold text-rose-950 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-rose-600" />
                      Reactivo
                    </h4>
                    <p className="text-xs text-rose-900/80 font-medium mt-1 leading-relaxed">
                      Esperar a que aparezca el problema o la máquina falle para intervenir.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-rose-700">Paradas no programadas</div>
                </div>

                {/* TPM */}
                <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block mb-2">
                      CON TPM
                    </span>
                    <h4 className="font-title text-sm font-bold text-amber-950 flex items-center gap-1.5">
                      <Cog className="w-4 h-4 text-amber-700 animate-spin-slow" />
                      Cuidado Diario
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-800 pt-1">
                      <span className="p-1 bg-white/80 rounded border border-amber-200">👀 Observar</span>
                      <span className="p-1 bg-white/80 rounded border border-amber-200">🧹 Cuidar</span>
                      <span className="p-1 bg-white/80 rounded border border-amber-200">🔧 Prevenir</span>
                      <span className="p-1 bg-white/80 rounded border border-amber-200">💡 Proponer</span>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-amber-900">Operador empoderado</div>
                </div>

                {/* Después */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-2">
                      DESPUÉS
                    </span>
                    <h4 className="font-title text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Proceso Estable
                    </h4>
                    <p className="text-xs text-emerald-900/80 font-medium mt-1 leading-relaxed">
                      Un proceso más seguro, predecible y con menor cantidad de fallas.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">Flujo continuo de valor</div>
                </div>

              </div>
            </div>

            {/* Supportive text & Golden Quote */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-inner">
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-300 block">
                BENEFICIO MULTIPLICADOR
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                Al empoderar al operador en las rutinas de cuidado básico, el personal técnico especializado puede dedicar más tiempo a actividades predictivas y de mayor complejidad.
              </p>
            </div>

            {/* Highlight Quote */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border-l-4 border-[#E5A93C] text-slate-900 font-bold text-sm sm:text-base leading-snug">
              “De reaccionar ante las fallas a anticiparnos a ellas.”
            </div>

            {/* Connection with Sembrando Ideas */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs sm:text-sm text-teal-950 font-medium flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-teal-200 shrink-0 text-emerald-700">
                <Lightbulb size={18} />
              </div>
              <p>
                <strong>Conexión metodológica:</strong> Cuando un operador identifica una oportunidad durante sus rutinas de cuidado, esa observación puede alimentar iniciativas ágiles como <strong>Sembrando Ideas</strong>.
              </p>
            </div>

            {/* Navigation CTA */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
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

      {/* Step 2: Media */}
      {subStep === 'media' && (
        <MediaPlaceholder
          title="TPM: cuidar, prevenir y mejorar"
          description="Conoce cómo el empoderamiento de las personas y el mantenimiento autónomo ayudan a sostener la mejora de los procesos en planta."
          helperText="Conoce cómo el empoderamiento de las personas ayuda a sostener la mejora del proceso."
          onNext={() => setSubStep('activity')}
          accentColor="#E5A93C"
          badgeLabel="ESPACIO MULTIMEDIA · TPM"
        />
      )}

      {/* Step 3: Sortable Strategy Activity */}
      {subStep === 'activity' && (
        <SortableChallenge
          onSuccess={onNext}
          onPrev={() => setSubStep('media')}
        />
      )}

    </div>
  );
}
