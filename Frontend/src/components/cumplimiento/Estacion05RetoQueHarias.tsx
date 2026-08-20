"use client";
import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  ClipboardList, 
  Inbox, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  ShieldCheck 
} from 'lucide-react';
import ScenarioCard, { ScenarioItem } from './ScenarioCard';

interface Estacion05RetoQueHariasProps {
  onComplete: () => void;
  onPrev: () => void;
  alreadyCompleted?: boolean;
}

export default function Estacion05RetoQueHarias({ 
  onComplete, 
  onPrev,
  alreadyCompleted = false
}: Estacion05RetoQueHariasProps) {
  // Always initialize scenarios clean so the user can interactively solve each one
  const [solvedScenarios, setSolvedScenarios] = useState<Record<string, boolean>>({
    empaque: false,
    cargue: false,
    inventarios: false,
    recepcion: false
  });

  const [activeTab, setActiveTab] = useState<number>(0);

  const scenarios: ScenarioItem[] = [
    {
      id: 'empaque',
      category: 'Caso 01 – Empaque de Producto',
      title: 'Línea de Empaque y Acondicionamiento',
      situation: 'Un compañero te pide empacar más unidades de las registradas en la orden de producción.',
      correctOption: 'Empacar únicamente la cantidad autorizada y reportar la novedad.',
      incorrectOption: 'Empacar las unidades adicionales porque el compañero lo solicitó.',
      explanation: 'La operación debe coincidir exactamente con lo autorizado y documentado. Alterar cantidades genera desviaciones graves de inventario y trazabilidad.',
      correctIsOptionA: false,
      imageIllustration: (
        <div className="flex flex-col items-center justify-center p-3 text-[#E07A5F]">
          <div className="w-16 h-16 rounded-2xl bg-orange-100/90 border border-orange-200 flex items-center justify-center text-[#D6684D] shadow-inner mb-2">
            <Package className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-extrabold uppercase text-slate-700">Control de Unidades en Empaque</span>
        </div>
      )
    },
    {
      id: 'cargue',
      category: 'Caso 02 – Cargue de Camiones',
      title: 'Muelle de Despacho y Transporte',
      situation: 'El conductor solicita agregar cajas que no aparecen en el manifiesto de carga para aprovechar el viaje.',
      correctOption: 'Cargar únicamente lo que está debidamente autorizado y documentado.',
      incorrectOption: 'Agregar las cajas para aprovechar el espacio disponible en el camión.',
      explanation: 'Si existe una diferencia entre la mercancía física y la documentación, debe detenerse la operación correspondiente y reportarse.',
      correctIsOptionA: false,
      imageIllustration: (
        <div className="flex flex-col items-center justify-center p-3 text-[#2A597A]">
          <div className="w-16 h-16 rounded-2xl bg-blue-100/90 border border-blue-200 flex items-center justify-center text-[#2A597A] shadow-inner mb-2">
            <Truck className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-extrabold uppercase text-slate-700">Verificación de Manifiesto de Carga</span>
        </div>
      )
    },
    {
      id: 'inventarios',
      category: 'Caso 03 – Manejo de Inventarios',
      title: 'Auditoría y Control de Existencias',
      situation: 'Al revisar las existencias aparece una diferencia entre el inventario físico y el sistema.',
      correctOption: 'Los inventarios deben reflejar la realidad y cualquier diferencia debe reportarse.',
      incorrectOption: 'Modificar las cantidades en el sistema para ocultar el faltante.',
      explanation: 'Alterar registros para ocultar diferencias va en contra de los principios de transparencia e integridad de PREBEL.',
      correctIsOptionA: true,
      imageIllustration: (
        <div className="flex flex-col items-center justify-center p-3 text-emerald-700">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100/90 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-inner mb-2">
            <ClipboardList className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-extrabold uppercase text-slate-700">Veracidad en Registros de Inventario</span>
        </div>
      )
    },
    {
      id: 'recepcion',
      category: 'Caso 04 – Recepción de Mercancía',
      title: 'Muelle de Recibo de Proveedores',
      situation: 'Un proveedor entrega una cantidad diferente a la registrada y solicita que no quede evidencia de la diferencia.',
      correctOption: 'Toda diferencia en el recibo de mercancía debe registrarse y reportarse.',
      incorrectOption: 'Aceptar la mercancía y no registrar la diferencia porque el proveedor lo solicitó.',
      explanation: 'Lo recibido debe coincidir con lo registrado. Las diferencias no se ocultan: se documentan y reportan oportunamente.',
      correctIsOptionA: true,
      imageIllustration: (
        <div className="flex flex-col items-center justify-center p-3 text-amber-700">
          <div className="w-16 h-16 rounded-2xl bg-amber-100/90 border border-amber-200 flex items-center justify-center text-amber-700 shadow-inner mb-2">
            <Inbox className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-extrabold uppercase text-slate-700">Inspección de Entrada de Proveedores</span>
        </div>
      )
    }
  ];

  const handleSolve = (scenarioId: string) => {
    setSolvedScenarios(prev => {
      const updated = { ...prev, [scenarioId]: true };
      return updated;
    });
  };

  const solvedCount = Object.values(solvedScenarios).filter(Boolean).length;
  const allSolved = solvedCount === scenarios.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
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
            Estación 05 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header with Progress Counter */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                ACTIVIDAD INTERACTIVA
              </span>
              <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                RETO: ¿QUÉ HARÍAS?
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
                Relaciona cada situación laboral con la decisión ética y legal correcta
              </p>
            </div>

            {/* Counter Badge */}
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-5 py-3 text-center shrink-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-200 block">
                Situaciones resueltas
              </span>
              <span className="font-title text-2xl font-black text-white">
                {solvedCount} / {scenarios.length}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Instructions Box */}
          <div className="p-4 bg-slate-50 border-l-4 border-[#E07A5F] rounded-r-xl text-slate-700 text-xs sm:text-sm font-medium">
            💡 <strong className="text-slate-900">Instrucción:</strong> Observa cada situación y selecciona la acción que consideres correcta de acuerdo con los principios de <strong className="text-[#D6684D]">Detecta → Decide → Reporta</strong>.
          </div>

          {/* Scenario Tabs for quick mobile & desktop navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {scenarios.map((sc, idx) => {
              const isDone = solvedScenarios[sc.id];
              const isActive = activeTab === idx;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveTab(idx)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-white text-[#D6684D]' : isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isDone ? '✓' : `0${idx + 1}`}
                  </span>
                  <span>{sc.id === 'empaque' ? 'Empaque' : sc.id === 'cargue' ? 'Cargue' : sc.id === 'inventarios' ? 'Inventarios' : 'Recepción'}</span>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Card */}
          <div className="fade-in">
            <ScenarioCard
              key={scenarios[activeTab].id}
              scenario={scenarios[activeTab]}
              onSolve={() => handleSolve(scenarios[activeTab].id)}
              isSolved={!!solvedScenarios[scenarios[activeTab].id]}
              hasNextScenario={activeTab < scenarios.length - 1}
              onNextScenario={() => {
                if (activeTab < scenarios.length - 1) {
                  setActiveTab(activeTab + 1);
                }
              }}
            />
          </div>

          {/* All Solved Celebration Screen */}
          {allSolved && (
            <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-3xl text-center space-y-4 shadow-sm fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25 animate-bounce">
                <Trophy className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-1">
                  ✅ 4 / 4 – DECISIONES CORRECTAS
                </span>
                <h3 className="font-title text-2xl font-black text-slate-800 uppercase tracking-tight">
                  ¡LO HICISTE GENIAL!
                </h3>
              </div>

              <div className="max-w-xl mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                <strong className="text-slate-900 block mb-1">Aprendizaje clave:</strong>
                Cuando identificamos situaciones inusuales, posibles actos de corrupción o comportamientos contrarios a la ética, debemos actuar de forma responsable y utilizar los canales de reporte establecidos, como la Línea Ética.
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSolvedScenarios({
                      empaque: false,
                      cargue: false,
                      inventarios: false,
                      recepcion: false
                    });
                    setActiveTab(0);
                  }}
                  className="py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Volver a practicar los 4 casos</span>
                </button>
              </div>
            </div>
          )}

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
              onClick={onComplete}
              disabled={!allSolved}
              className={`w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                allSolved
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              id="btn-ir-evaluacion-cumplimiento"
            >
              <span>Ir a la Evaluación Final</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
