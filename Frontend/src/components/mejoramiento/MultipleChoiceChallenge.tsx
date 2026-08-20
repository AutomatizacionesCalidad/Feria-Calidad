"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceChallengeProps {
  category: string;
  title: string;
  question: string;
  options: MultipleChoiceOption[];
  correctFeedbackTitle?: string;
  correctFeedbackMessage: string;
  correctFeedbackHighlight?: string;
  incorrectFeedbackMessage: string;
  onSuccess: () => void;
  nextButtonLabel?: string;
  accentColor?: string;
}

export default function MultipleChoiceChallenge({
  category,
  title,
  question,
  options,
  correctFeedbackTitle = '¡Exacto!',
  correctFeedbackMessage,
  correctFeedbackHighlight,
  incorrectFeedbackMessage,
  onSuccess,
  nextButtonLabel = 'Continuar',
  accentColor = '#5B7F71'
}: MultipleChoiceChallengeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (
    option: MultipleChoiceOption
  ) => {
    setSelectedId(
      option.id
    );

    setAnswered(true);

    setIsCorrect(
      option.isCorrect
    );
  };

  const handleRetry = () => {
    setSelectedId(null);
    setAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <span 
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {category}
          </span>
          <h3 className="font-title text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {title}
          </h3>
        </div>

        {answered && isCorrect && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 size={14} />
            ¡Completado!
          </span>
        )}
      </div>

      {/* Question */}
      <div className="p-4 bg-slate-50 border-l-4 border-[#E5A93C] rounded-r-2xl">
        <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
          Pregunta de reflexión:
        </span>
        <p className="font-title text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedId === option.id;

          let cardStyle = 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-800';
          if (isSelected) {
            cardStyle = option.isCorrect
              ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-sm ring-2 ring-emerald-400/30'
              : 'bg-rose-50/90 border-rose-500 text-rose-950 shadow-sm ring-2 ring-rose-400/30';
          } else if (answered && option.isCorrect) {
            cardStyle = 'bg-emerald-50/50 border-emerald-300 text-emerald-950';
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative ${cardStyle}`}
            >
              <div className="mt-0.5 shrink-0">
                {isSelected ? (
                  option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-xs font-bold text-slate-600 shadow-xs">
                    {letter}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {option.text}
                </p>
                {isSelected && (
                  <span className={`text-[10px] font-black uppercase tracking-wider block mt-1.5 ${
                    option.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {option.isCorrect ? '✓ Opción Correcta' : '✗ Opción Incorrecta'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Container */}
      {answered && (
        <div className={`p-5 rounded-2xl border transition-all ${
          isCorrect 
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
            : 'bg-rose-50/80 border-rose-300 text-rose-950'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="text-sm font-extrabold uppercase tracking-wide">
                  {isCorrect ? correctFeedbackTitle : 'No necesariamente'}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {isCorrect ? correctFeedbackMessage : incorrectFeedbackMessage}
              </p>
              {isCorrect && correctFeedbackHighlight && (
                <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-xs font-bold border border-emerald-200">
                  {correctFeedbackHighlight}
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end">
              {!isCorrect ? (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="py-2 px-4 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <RotateCcw size={13} />
                  Reintentar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSuccess}
                  className="w-full sm:w-auto py-3 px-6 bg-[#5B7F71] hover:bg-[#4E6F62] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <span>{nextButtonLabel}</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
