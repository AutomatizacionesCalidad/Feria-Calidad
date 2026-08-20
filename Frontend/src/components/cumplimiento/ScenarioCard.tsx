"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export interface ScenarioItem {
  id: string;
  category: string;
  title: string;
  situation: string;
  imageIllustration: React.ReactNode;
  correctOption: string;
  incorrectOption: string;
  explanation: string;
  correctIsOptionA?: boolean; // To randomize or specify position
}

interface ScenarioCardProps {
  key?: React.Key;
  scenario: ScenarioItem;
  onSolve: (isCorrect: boolean) => void;
  isSolved: boolean;
  onNextScenario?: () => void;
  hasNextScenario?: boolean;
}

export default function ScenarioCard({ 
  scenario, 
  onSolve, 
  isSolved,
  onNextScenario,
  hasNextScenario = false 
}: ScenarioCardProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const optionAIsCorrect = scenario.correctIsOptionA ?? false;
  const optionAText = optionAIsCorrect ? scenario.correctOption : scenario.incorrectOption;
  const optionBText = optionAIsCorrect ? scenario.incorrectOption : scenario.correctOption;

  // Whenever the scenario changes, reset local selection to allow fresh interaction
  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(false);
  }, [scenario.id]);

  const handleSelectOption = (choice: 'A' | 'B') => {
    setSelectedOption(choice);
    setAnswered(true);

    const correct = (choice === 'A' && optionAIsCorrect) || (choice === 'B' && !optionAIsCorrect);
    setIsCorrect(correct);

    if (correct) {
      onSolve(true);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all">
      {/* Header bar of Scenario */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
          {scenario.category}
        </span>
        {isSolved ? (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 size={13} />
            Caso Resuelto
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-500">
            Selecciona la decisión correcta
          </span>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Visual Illustration + Situation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="w-full rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/80 p-4 flex flex-col items-center justify-center min-h-[160px] text-center relative overflow-hidden">
            {scenario.imageIllustration}
            <span className="text-xs font-bold text-slate-700 mt-2 block">
              {scenario.title}
            </span>
          </div>

          {/* Situation Text Banner */}
          <div className="p-3.5 bg-amber-50/80 border-l-4 border-amber-400 rounded-r-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">
              Situación observada:
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              {scenario.situation}
            </p>
          </div>
        </div>

        {/* Right Side: Decisions & Interactive Options */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
              ¿Qué decisión debes tomar?
            </h4>
            {answered && isCorrect && (
              <button
                onClick={handleRetry}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-700 underline cursor-pointer"
              >
                Probar otra opción
              </button>
            )}
          </div>

          {/* Option A Button */}
          <button
            type="button"
            onClick={() => handleSelectOption('A')}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
              selectedOption === 'A'
                ? optionAIsCorrect
                  ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-xs'
                  : 'bg-rose-50/90 border-rose-500 text-rose-950 shadow-xs'
                : answered && optionAIsCorrect
                ? 'bg-emerald-50/40 border-emerald-400 text-emerald-950'
                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {selectedOption === 'A' ? (
                optionAIsCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )
              ) : (
                <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  A
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold leading-snug">
                {optionAText}
              </p>
              {selectedOption === 'A' && (
                <span className={`text-[10px] font-black uppercase tracking-wider block mt-1.5 ${
                  optionAIsCorrect ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {optionAIsCorrect ? '✓ Decisión Correcta' : '✗ Decisión Incorrecta'}
                </span>
              )}
            </div>
          </button>

          {/* Option B Button */}
          <button
            type="button"
            onClick={() => handleSelectOption('B')}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
              selectedOption === 'B'
                ? !optionAIsCorrect
                  ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-xs'
                  : 'bg-rose-50/90 border-rose-500 text-rose-950 shadow-xs'
                : answered && !optionAIsCorrect
                ? 'bg-emerald-50/40 border-emerald-400 text-emerald-950'
                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {selectedOption === 'B' ? (
                !optionAIsCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )
              ) : (
                <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  B
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold leading-snug">
                {optionBText}
              </p>
              {selectedOption === 'B' && (
                <span className={`text-[10px] font-black uppercase tracking-wider block mt-1.5 ${
                  !optionAIsCorrect ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {!optionAIsCorrect ? '✓ Decisión Correcta' : '✗ Decisión Incorrecta'}
                </span>
              )}
            </div>
          </button>

          {/* Feedback & Action Banner */}
          {answered && (
            <div className={`p-4 rounded-xl border mt-3 transition-all ${
              isCorrect 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="text-xs font-black uppercase tracking-wide">
                      {isCorrect ? '¡Excelente decisión!' : 'Decisión Incorrecta'}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium">
                    {scenario.explanation}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  {!isCorrect ? (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="py-1.5 px-3 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <RotateCcw size={12} />
                      Reintentar
                    </button>
                  ) : hasNextScenario && onNextScenario ? (
                    <button
                      type="button"
                      onClick={onNextScenario}
                      className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>Siguiente Caso</span>
                      <ArrowRight size={13} />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
