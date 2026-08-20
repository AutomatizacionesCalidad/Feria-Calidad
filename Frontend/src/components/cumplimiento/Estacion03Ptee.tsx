"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Handshake, 
  Search, 
  Ban, 
  Gift, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface Estacion03PteeProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Estacion03Ptee({ onNext, onPrev }: Estacion03PteeProps) {
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | null>(null);

  const handleDecision = (choice: 'A' | 'B') => {
    setSelectedDecision(choice);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-8">
      
      {/* Station Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#E07A5F] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Estación 03 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-6 sm:p-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
            ESTACIÓN 03
          </span>
          <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            Programa de Transparencia y Ética Empresarial – PTEE
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
            Reglas y mecanismos para trabajar con honestidad y transparencia
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Definition Box */}
          <div className="p-5 bg-slate-50 border-l-4 border-[#2A597A] rounded-r-2xl space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#2A597A] block">
              ¿Qué es el PTEE?
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
              Son las reglas y mecanismos que ayudan a que todos trabajemos con honestidad y transparencia.
            </p>
          </div>

          {/* 3 Pillars of PTEE */}
          <div className="space-y-4">
            <h3 className="font-title text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E07A5F]" />
              Tres Pilares Fundamentales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Pillar 1: Honestidad */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2.5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2A597A] flex items-center justify-center">
                  <Handshake className="w-6 h-6" />
                </div>
                <h4 className="font-title text-xs sm:text-sm font-black uppercase tracking-wide text-slate-800">
                  🤝 HONESTIDAD
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Actuar correctamente incluso cuando nadie está observando.
                </p>
              </div>

              {/* Pillar 2: Transparencia */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-title text-xs sm:text-sm font-black uppercase tracking-wide text-slate-800">
                  🔎 TRANSPARENCIA
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Registrar y comunicar la realidad de las operaciones tal como suceden.
                </p>
              </div>

              {/* Pillar 3: Cero Ventajas Indebidas */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2.5">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Ban className="w-6 h-6" />
                </div>
                <h4 className="font-title text-xs sm:text-sm font-black uppercase tracking-wide text-slate-800">
                  🚫 CERO VENTAJAS INDEBIDAS
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  No aceptar ni ofrecer beneficios para alterar decisiones o registros.
                </p>
              </div>

            </div>
          </div>

          {/* Microcaso PTEE Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            
            {/* Header Alert */}
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-base">🎁</span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                MICROCASO: ¿REGALO O SEÑAL DE ALERTA?
              </span>
            </div>

            {/* Scenario Box */}
            <div className="p-5 bg-slate-50 border-l-4 border-amber-500 rounded-r-2xl space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                Un proveedor ofrece dinero o un regalo a un auxiliar de bodega para que <strong className="text-amber-800 underline">reciba una cantidad de producto diferente</strong> a la que realmente llegó.
              </p>
            </div>

            {/* Question & Options */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-slate-700">
                ¿Qué deberías hacer?
              </h4>

              {/* Option A */}
              <button
                onClick={() => handleDecision('A')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedDecision === 'A' 
                    ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold">
                    Aceptarlo si el producto es de buena calidad.
                  </p>
                  {selectedDecision === 'A' && (
                    <span className="text-[10px] font-black uppercase text-rose-600 block mt-1">
                      ✗ Incorrecto: Aceptar beneficios para alterar cantidades es una falta grave y un acto de soborno.
                    </span>
                  )}
                </div>
              </button>

              {/* Option B (Correct) */}
              <button
                onClick={() => handleDecision('B')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedDecision === 'B' 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  B
                </span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold">
                    Rechazar el ofrecimiento y reportarlo al jefe inmediato o por medio de la Línea Ética.
                  </p>
                  {selectedDecision === 'B' && (
                    <span className="text-[10px] font-black uppercase text-emerald-700 block mt-1">
                      ✓ Decisión Correcta
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Feedback when answered correctly */}
            {selectedDecision === 'B' && (
              <div className="space-y-3 fade-in">
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      ¡Correcto!
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    No debemos aceptar beneficios que busquen modificar, ocultar o influir en una operación de la compañía.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl text-center shadow-inner">
                  <p className="text-xs sm:text-sm font-bold text-orange-200">
                    “La transparencia significa que los registros deben reflejar lo que realmente ocurrió.”
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Station Navigation Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="w-full sm:w-auto py-2.5 px-5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Estación Anterior
            </button>

            <button
              onClick={onNext}
              disabled={selectedDecision !== 'B'}
              className={`w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedDecision === 'B'
                  ? 'bg-[#E07A5F] hover:bg-[#D6684D] text-white shadow-md shadow-[#E07A5F]/20 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              id="btn-continuar-estacion-linea-etica"
            >
              <span>Conoce la Línea Ética</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
