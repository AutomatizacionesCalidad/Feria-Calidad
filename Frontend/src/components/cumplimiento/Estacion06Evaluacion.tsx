"use client";
import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface Estacion06EvaluacionProps {
  onPassed: () => void;
  onPrev: () => void;
}

export default function Estacion06Evaluacion({ onPassed, onPrev }: Estacion06EvaluacionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const options = [
    {
      id: 'A',
      text: 'Ignorar situaciones sospechosas porque son responsabilidad exclusiva de los jefes.',
      isCorrect: false
    },
    {
      id: 'B',
      text: 'Seguir los procedimientos, actuar con honestidad y reportar cualquier situación inusual o indebida.',
      isCorrect: true
    },
    {
      id: 'C',
      text: 'Aceptar regalos de proveedores si no afectan su trabajo.',
      isCorrect: false
    },
    {
      id: 'D',
      text: 'Modificar registros cuando un compañero lo solicite.',
      isCorrect: false
    }
  ];

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
    setSubmitted(false);
  };

  const handleEvaluate = () => {
    if (!selectedOption) return;
    const correct = selectedOption === 'B';
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-in space-y-6">
      
      {/* Station Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="py-2 px-3.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Volver al Reto</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#E07A5F] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Estación 06 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-6 sm:p-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
            EVALUACIÓN FINAL
          </span>
          <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            ÚLTIMO RETO
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
            Demuestra tus conocimientos para certificar el Stand de Cumplimiento y Riesgo
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Question Title Box */}
          <div className="p-5 bg-slate-50 border-l-4 border-[#2A597A] rounded-r-2xl space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Pregunta de Certificación:
            </span>
            <h3 className="font-title text-sm sm:text-base font-bold text-slate-900 leading-snug">
              ¿Cuál es tu rol como colaborador en el sistema de SAGRILAFT y el PTEE en PREBEL?
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (submitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                }
              } else if (isSelected) {
                btnStyle = 'bg-orange-50 border-[#E07A5F] text-slate-900 shadow-sm ring-1 ring-[#E07A5F]';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => !submitted && handleSelectOption(opt.id)}
                  disabled={submitted && isCorrect}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${btnStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {submitted ? (
                      opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400">
                          {opt.id}
                        </span>
                      )
                    ) : (
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'border-[#E07A5F] bg-[#E07A5F] text-white' : 'border-slate-300 text-slate-500'
                      }`}>
                        {opt.id}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed flex-1">
                    {opt.text}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Validation Feedback & Next Steps */}
          {submitted && (
            <div className={`p-5 rounded-2xl border transition-all ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {isCorrect ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span className="font-title text-sm sm:text-base font-black uppercase tracking-wide">
                      ¡Correcto!
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    La protección de PREBEL es responsabilidad de todos. Nuestro papel es cumplir los procedimientos, actuar con transparencia y reportar oportunamente cualquier situación inusual o indebida.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span className="font-title text-xs sm:text-sm font-black uppercase tracking-wide">
                        Piénsalo nuevamente
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">
                      Recuerda la fórmula del módulo: <strong className="underline">Detecta → Decide → Reporta</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleRetry}
                    className="py-2 px-4 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw size={14} />
                    Intentar de nuevo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Station Navigation & Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="w-full sm:w-auto py-2.5 px-5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Volver al Reto
            </button>

            {!submitted ? (
              <button
                onClick={handleEvaluate}
                disabled={!selectedOption}
                className={`w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedOption
                    ? 'bg-[#E07A5F] hover:bg-[#D6684D] text-white shadow-md shadow-[#E07A5F]/20 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
                id="btn-verificar-evaluacion"
              >
                <span>Verificar Respuesta</span>
                <CheckCircle2 size={16} />
              </button>
            ) : isCorrect ? (
              <button
                onClick={onPassed}
                className="w-full sm:w-auto py-3.5 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                id="btn-obtener-insignia-cumplimiento"
              >
                <span>Obtener mi insignia</span>
                <Award size={16} />
              </button>
            ) : null}
          </div>

        </div>

      </div>

    </div>
  );
}
