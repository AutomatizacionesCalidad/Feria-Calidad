"use client";
import React from 'react';
import { UserSession } from "@/types/feria";
import { 
  Car, 
  AlertTriangle, 
  Shield, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface StandSSTRoutesProps {
  session: UserSession;
  onSelectModule: (moduleId: string) => void;
  onBackToWelcome: () => void;
  onGoToCompleted: () => void;
}

export default function StandSSTRoutes({
  session,
  onSelectModule,
  onBackToWelcome,
  onGoToCompleted
}: StandSSTRoutesProps) {

  const modules = [
    {
      id: 'pesv',
      num: '01',
      name: 'Plan Estratégico de Seguridad Vial – PESV',
      shortName: 'PESV',
      tag: 'Movilidad Segura',
      desc: 'Comportamientos seguros en la vía, prevención de accidentes de tránsito y límite de velocidad.',
      icon: <Car className="w-6 h-6 text-[#60A491]" />,
      badgeColor: '#60A491'
    },
    {
      id: 'accidentalidad',
      num: '02',
      name: 'Accidentalidad',
      shortName: 'Accidentalidad',
      tag: 'Accidente vs. Incidente',
      desc: 'Identificación oportuna de incidentes y actos inseguros para evitar accidentes con lesión.',
      icon: <AlertTriangle className="w-6 h-6 text-[#F2917E]" />,
      badgeColor: '#F2917E'
    },
    {
      id: 'epp',
      num: '03',
      name: 'Elementos de Protección Personal – EPP',
      shortName: 'EPP',
      tag: 'Barrera de Protección',
      desc: 'Función protectora de los EPP y mitigación de consecuencias de los riesgos laborales.',
      icon: <Shield className="w-6 h-6 text-[#40647E]" />,
      badgeColor: '#40647E'
    },
    {
      id: 'reglas-oro',
      num: '04',
      name: 'Reglas de Oro',
      shortName: 'Reglas de Oro',
      tag: 'Normas Obligatorias',
      desc: 'Conductas fundamentales de seguridad para prevenir accidentes y proteger la vida.',
      icon: <Award className="w-6 h-6 text-[#E5A93C]" />,
      badgeColor: '#E5A93C'
    }
  ];

  const getModuleStatus = (moduleId: string) => {
    const isCompleted = session.actividadesCompletadas.includes(moduleId) || (session.evaluaciones[moduleId]?.approved);
    const inProgress = session.progreso[moduleId] === 'in_progress';

    if (isCompleted) {
      return { label: 'Completado', isDone: true, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    if (inProgress) {
      return { label: 'En progreso', isDone: false, color: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' };
    }
    return { label: 'Pendiente', isDone: false, color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  const completedCount = modules.filter(m => getModuleStatus(m.id).isDone).length;
  const sstProgress = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 fade-in">
      
      {/* Top Bar Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWelcome}
            className="py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
            id="btn-volver-welcome-sst"
          >
            <ArrowLeft size={14} />
            Volver a Bienvenida
          </button>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-right">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase block leading-none">
              Progreso Stand SST
            </span>
            <span className="text-sm font-black text-[#4E8777]">
              {sstProgress}% ({completedCount} de 4 módulos)
            </span>
          </div>
          <div className="w-20 bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-[#60A491] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${sstProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stand SST Title & Route Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4E8777] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2">
          Ruta de Aprendizaje
        </span>
        <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Recorrido de Seguridad y Salud en el Trabajo
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Completa los 4 módulos en orden para certificar tus conocimientos en prevención y autocuidado.
        </p>
      </div>

      {/* Visual Roadmap Path Indicator (Desktop Horizontal / Mobile Timeline) */}
      <div className="relative mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        
        {/* Step Flow Ribbon */}
        <div className="hidden md:flex items-center justify-between relative mb-2">
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
          {modules.map((m, idx) => {
            const status = getModuleStatus(m.id);
            return (
              <div key={m.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-title font-extrabold text-xs transition-all border-2 ${
                    status.isDone 
                      ? 'bg-[#60A491] text-white border-[#4E8777] shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {status.isDone ? <Check size={18} /> : m.num}
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-2 text-center max-w-[120px]">
                  {m.shortName}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2 text-[11px] text-slate-500 font-medium">
          01 PESV → 02 Accidentalidad → 03 EPP → 04 Reglas de Oro
        </div>
      </div>

      {/* Grid of 4 Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {modules.map((mod) => {
          const status = getModuleStatus(mod.id);
          const isDone = status.isDone;

          return (
            <div
              key={mod.id}
              id={`sst-module-card-${mod.id}`}
              className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md ${
                isDone 
                  ? 'border-emerald-200 bg-emerald-50/20' 
                  : 'border-slate-200 hover:border-[#60A491]/50'
              }`}
            >
              <div>
                {/* Header row: Number & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 font-mono font-black text-xs text-slate-700 flex items-center justify-center border border-slate-200">
                      {mod.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      {mod.icon}
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${status.color}`}>
                    {isDone ? '✓ ' + status.label : status.label}
                  </span>
                </div>

                {/* Module Titles */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4E8777] block">
                  {mod.tag}
                </span>
                <h3 className="font-title text-base sm:text-lg font-bold text-slate-800 mt-1 leading-snug">
                  {mod.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {mod.desc}
                </p>

                {/* Micro Steps Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                  <span>Contexto</span>
                  <span>•</span>
                  <span>Contenido</span>
                  <span>•</span>
                  <span>Evaluación</span>
                  <span>•</span>
                  <span>Resultado</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {isDone && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={15} />
                      Completado
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectModule(mod.id)}
                  className={`py-2.5 px-6 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    isDone 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300' 
                      : 'bg-[#60A491] hover:bg-[#4E8777] text-white shadow-[#60A491]/20'
                  }`}
                  id={`btn-modulo-${mod.id}`}
                >
                  {isDone ? (
                    <>Revisar Módulo</>
                  ) : (
                    <>
                      Ingresar
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Completion Banner if all 4 are done */}
      {completedCount === 4 && (
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl shadow-sm text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-700 rounded-full">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="font-title text-base font-extrabold text-slate-800">
            ¡Felicitaciones! Has completado los 4 módulos del Stand SST.
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Puedes ver la pantalla final de certificación y finalizar tu recorrido.
          </p>
          <div>
            <button
              onClick={onGoToCompleted}
              className="py-3 px-8 bg-[#4E8777] hover:bg-[#3B6B5E] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              id="btn-ver-final-sst"
            >
              <ShieldCheck size={16} />
              Ver Pantalla Final del Stand SST
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
