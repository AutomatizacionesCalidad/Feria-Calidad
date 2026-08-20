"use client";

import React, { useState } from 'react';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Users,
  Sparkle,
  ShieldCheck
} from 'lucide-react';

export interface SortableStep {
  id: string;
  correctIndex: number;
  title: string;
  subtitle?: string;
  icon?: string;
}

interface SortableChallengeProps {
  onSuccess: () => void;
  onPrev: () => void;
}

const INITIAL_STEPS: SortableStep[] = [
  {
    id: 's5',
    correctIndex: 1, // 2nd step
    title: 'Aplicar 5S en las áreas de trabajo',
    subtitle: 'Condiciones de orden, limpieza y estandarización visual en el entorno productivo.',
    icon: 'sparkles'
  },
  {
    id: 'personas',
    correctIndex: 0, // 1st step
    title: 'Empoderamiento de las personas',
    subtitle: 'Convertir al operador en el dueño activo que cuida, observa y conoce su proceso.',
    icon: 'users'
  },
  {
    id: 'sostener',
    correctIndex: 2, // 3rd step
    title: 'Sostener flujos continuos de trabajo con prevención, calidad y seguridad',
    subtitle: 'Estabilidad operativa, mantenimiento autónomo y anticipación a las fallas.',
    icon: 'shield'
  }
];

export default function SortableChallenge({ onSuccess, onPrev }: SortableChallengeProps) {
  const [items, setItems] = useState<SortableStep[]>(INITIAL_STEPS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Move items with buttons
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    setItems(newItems);
    setValidated(false);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setItems(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setValidated(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleValidate = () => {
    const correct =
      items.every(
        (item, index) =>
          item.correctIndex ===
          index
      );

    setValidated(true);

    setIsCorrect(
      correct
    );
  };

  const handleReset = () => {
    setItems(INITIAL_STEPS);
    setValidated(false);
    setIsCorrect(false);
  };

  const getStepIcon = (type?: string) => {
    switch (type) {
      case 'users':
        return <Users className="w-5 h-5 text-amber-600" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Header Info */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 inline-block mb-1">
            ACTIVIDAD INTERACTIVA TPM
          </span>
          <h3 className="font-title text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            ⚙️ Pon el proceso en orden
          </h3>
        </div>

        {validated && isCorrect && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs shrink-0">
            <CheckCircle2 size={14} />
            ¡Estrategia Ordenada!
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-amber-50/80 border-l-4 border-[#E5A93C] rounded-r-2xl text-slate-800 text-xs sm:text-sm font-medium">
        👉 <strong className="text-slate-900">Instrucción:</strong> Arrastra las tarjetas o utiliza las flechas <strong>(↑ / ↓)</strong> para ordenar los 3 pasos fundamentales de la estrategia TPM.
      </div>

      {/* Sortable List */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;

          let cardBorder = 'border-slate-200 hover:border-amber-300 bg-slate-50/90';
          if (validated) {
            cardBorder = item.correctIndex === index 
              ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-300' 
              : 'border-rose-400 bg-rose-50/60';
          } else if (isOver) {
            cardBorder = 'border-amber-500 bg-amber-50/50 shadow-md';
          }

          return (
            <div
              key={item.id}
              draggable={!isCorrect}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-3 sm:gap-4 ${cardBorder} ${
                isDragging ? 'opacity-40 scale-95' : 'opacity-100'
              }`}
            >
              {/* Position Badge */}
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 font-title font-black text-sm flex items-center justify-center shrink-0 shadow-inner">
                0{index + 1}
              </div>

              {/* Drag Handle (Desktop) */}
              <div className="hidden sm:flex text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing p-1">
                <GripVertical size={20} />
              </div>

              {/* Icon Container */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0">
                {getStepIcon(item.icon)}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-title text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5 leading-relaxed hidden sm:block">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Mobile / Keyboard Reorder buttons */}
              {!isCorrect && (
                <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Subir ${item.title}`}
                    className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    aria-label={`Bajar ${item.title}`}
                    className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validate button if not validated or if incorrect */}
      {!isCorrect && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleValidate}
            className="py-3 px-8 bg-[#E5A93C] hover:bg-[#D4992C] text-slate-950 font-title font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>Validar orden</span>
            <CheckCircle2 size={16} />
          </button>
        </div>
      )}

      {/* Feedback Banner */}
      {validated && (
        <div className={`p-5 rounded-2xl border transition-all ${
          isCorrect 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : 'bg-rose-50 border-rose-300 text-rose-950'
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
                  {isCorrect ? '¡Proceso en marcha!' : 'Casi.'}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {isCorrect 
                  ? 'TPM comienza con personas empoderadas, se fortalece con ambientes organizados y se sostiene mediante procesos estables, seguros y preventivos.'
                  : 'Piensa primero en las personas, después en las condiciones del área y finalmente en cómo sostener el proceso.'
                }
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end">
              {!isCorrect ? (
                <button
                  type="button"
                  onClick={handleReset}
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
                  <span>Conocer 6 Sigma + Lean</span>
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
