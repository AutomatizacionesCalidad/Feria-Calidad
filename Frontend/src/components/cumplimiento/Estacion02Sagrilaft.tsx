"use client";
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Coins, 
  AlertTriangle, 
  Bomb, 
  Gift, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface Estacion02SagrilaftProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Estacion02Sagrilaft({ onNext, onPrev }: Estacion02SagrilaftProps) {
  // Card flip / toggle states for "Descubre los riesgos"
  const [openedCards, setOpenedCards] = useState<Record<string, boolean>>({
    lavado: false,
    terrorismo: false,
    armas: false,
    soborno: false
  });

  // Microcase state
  const [microcaseStep, setMicrocaseStep] = useState<'initial' | 'detected' | 'decided'>('initial');
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | null>(null);

  const toggleCard = (id: string) => {
    setOpenedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allCardsDiscovered = Object.values(openedCards).filter(Boolean).length === 4;

  const handleDecision = (choice: 'A' | 'B') => {
    setSelectedDecision(choice);
    if (choice === 'B') {
      setMicrocaseStep('decided');
    }
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
            Estación 02 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-6 sm:p-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
            ESTACIÓN 02
          </span>
          <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            ¿Qué es SAGRILAFT?
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
            Sistema de Autocontrol y Gestión del Riesgo Integral
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Acronym Explanatory Box */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#D6684D] block uppercase">
              SAGRILAFT
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos, Financiación del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva.
            </p>
            <div className="pt-2 border-t border-slate-200/80">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                👉 Es un sistema que ayuda a <strong className="text-slate-800">PREBEL</strong> a evitar que personas o empresas utilicen nuestras operaciones para actividades ilegales.
              </p>
            </div>
          </div>

          {/* Activity Section: DESCUBRE LOS RIESGOS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-title text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E07A5F]" />
                  Descubre los Riesgos
                </h3>
                <p className="text-xs text-slate-500">
                  Toca cada tarjeta para conocer los 4 conceptos clave que debemos prevenir.
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full shrink-0">
                {Object.values(openedCards).filter(Boolean).length} de 4 exploradas
              </span>
            </div>

            {/* 4 Flip/Expand Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Lavado de Activos */}
              <div 
                onClick={() => toggleCard('lavado')}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between min-h-[140px] ${
                  openedCards.lavado 
                    ? 'bg-amber-50/80 border-amber-400 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💰</span>
                    <span className="font-title text-xs sm:text-sm font-black text-slate-800 uppercase">
                      Lavado de Activos
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {openedCards.lavado ? 'Ocultar' : 'Descubrir'}
                  </span>
                </div>
                
                {openedCards.lavado ? (
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2.5 pt-2 border-t border-amber-200/80 fade-in">
                    Es cuando alguien intenta ocultar el origen ilegal de un dinero o mercancía.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 italic mt-2">
                    Toca aquí para ver el concepto...
                  </p>
                )}
              </div>

              {/* Card 2: Financiación del Terrorismo */}
              <div 
                onClick={() => toggleCard('terrorismo')}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between min-h-[140px] ${
                  openedCards.terrorismo 
                    ? 'bg-orange-50/80 border-orange-400 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">⚠️</span>
                    <span className="font-title text-xs sm:text-sm font-black text-slate-800 uppercase">
                      Financiación del Terrorismo
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {openedCards.terrorismo ? 'Ocultar' : 'Descubrir'}
                  </span>
                </div>
                
                {openedCards.terrorismo ? (
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2.5 pt-2 border-t border-orange-200/80 fade-in">
                    Es cuando se entregan recursos o apoyo a grupos que realizan actividades ilegales o violentas.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 italic mt-2">
                    Toca aquí para ver el concepto...
                  </p>
                )}
              </div>

              {/* Card 3: Proliferación de Armas */}
              <div 
                onClick={() => toggleCard('armas')}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between min-h-[140px] ${
                  openedCards.armas 
                    ? 'bg-rose-50/80 border-rose-400 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🚫</span>
                    <span className="font-title text-xs sm:text-sm font-black text-slate-800 uppercase">
                      Proliferación de Armas
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {openedCards.armas ? 'Ocultar' : 'Descubrir'}
                  </span>
                </div>
                
                {openedCards.armas ? (
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2.5 pt-2 border-t border-rose-200/80 fade-in">
                    Es ayudar a fabricar, transportar o suministrar materiales para armas extremadamente peligrosas.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 italic mt-2">
                    Toca aquí para ver el concepto...
                  </p>
                )}
              </div>

              {/* Card 4: Soborno */}
              <div 
                onClick={() => toggleCard('soborno')}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between min-h-[140px] ${
                  openedCards.soborno 
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🎁</span>
                    <span className="font-title text-xs sm:text-sm font-black text-slate-800 uppercase">
                      Soborno
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {openedCards.soborno ? 'Ocultar' : 'Descubrir'}
                  </span>
                </div>
                
                {openedCards.soborno ? (
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2.5 pt-2 border-t border-emerald-200/80 fade-in">
                    Ocurre cuando una persona ofrece, entrega, solicita o recibe dinero, regalos, favores o cualquier beneficio para obtener una ventaja indebida o influir en una decisión.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 italic mt-2">
                    Toca aquí para ver el concepto...
                  </p>
                )}
              </div>

            </div>

            {/* Success check once all 4 are opened */}
            {allCardsDiscovered && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Ahora conoces algunas situaciones que pueden representar riesgos para PREBEL.</span>
              </div>
            )}
          </div>

          {/* Microcaso SAGRILAFT Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            
            {/* Animated Alert Header */}
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                🚨 MICROCASO: DETECTA LA SEÑAL DE ALERTA
              </span>
            </div>

            {/* Scenario description */}
            <div className="p-5 bg-slate-50 border-l-4 border-rose-500 rounded-r-2xl space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                Un conductor llega a recoger mercancía y solicita cargar unas cajas adicionales que <strong className="text-rose-700 underline">no aparecen en los documentos de despacho</strong>.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                Además, pide que <strong className="text-rose-700 underline">no queden registradas en el sistema</strong>.
              </p>
            </div>

            {/* Step 1: Detectar */}
            {microcaseStep === 'initial' && (
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center space-y-3 shadow-xs">
                <h4 className="text-xs sm:text-sm font-bold text-slate-700">
                  ¿Algo te parece inusual en esta solicitud?
                </h4>
                <button
                  onClick={() => setMicrocaseStep('detected')}
                  className="py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-rose-600/20 inline-flex items-center gap-2 cursor-pointer"
                  id="btn-detectar-alerta"
                >
                  <Eye size={16} />
                  <span>Sí, veo una señal de alerta</span>
                </button>
              </div>
            )}

            {/* Step 2: Decidir & Reportar */}
            {microcaseStep !== 'initial' && (
              <div className="space-y-4 fade-in">
                
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Correcto. La solicitud no coincide con la documentación y además se está pidiendo ocultar la operación.
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-slate-700">
                    ¿Qué deberías hacer en este momento?
                  </h4>

                  {/* Decision A */}
                  <button
                    onClick={() => handleDecision('A')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      selectedDecision === 'A' 
                        ? 'bg-rose-50 border-rose-400 text-rose-950' 
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold">
                        Cargar las cajas para evitar retrasos en el despacho.
                      </p>
                      {selectedDecision === 'A' && (
                        <span className="text-[10px] font-black uppercase text-rose-600 block mt-1">
                          ✗ Incorrecto: Cargar mercancía no autorizada viola los controles de PREBEL.
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Decision B (Correct) */}
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
                        No cargar la mercancía adicional y reportar la situación a tu jefe o mediante la Línea Ética.
                      </p>
                      {selectedDecision === 'B' && (
                        <span className="text-[10px] font-black uppercase text-emerald-700 block mt-1">
                          ✓ Decisión Correcta
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Final Feedback Banner */}
                {selectedDecision === 'B' && (
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl space-y-1 shadow-inner fade-in">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E07A5F] block">
                      Detecta → Decide → Reporta
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                      Si la mercancía no está autorizada ni documentada, no debe cargarse.
                    </p>
                  </div>
                )}

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
              id="btn-continuar-estacion-ptee"
            >
              <span>Conocer PTEE</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
