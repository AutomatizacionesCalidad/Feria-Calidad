"use client";
import React, { useState } from 'react';
import { Play, Film, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface MediaPlaceholderProps {
  title: string;
  badgeLabel?: string;
  description: string;
  helperText?: string;
  onNext: () => void;
  accentColor?: string;
  typeLabel?: string;
  nextButtonLabel?: string;
}

export default function MediaPlaceholder({
  title,
  badgeLabel = 'ESPACIO MULTIMEDIA',
  description,
  helperText = 'Descubre cómo una oportunidad cotidiana puede convertirse en una mejora real.',
  onNext,
  accentColor = '#5B7F71',
  typeLabel = 'Video / Infografía Interactiva',
  nextButtonLabel = 'Continuar'
}: MediaPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all space-y-6 p-6 sm:p-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span 
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {badgeLabel}
          </span>
          <h3 className="font-title text-lg sm:text-xl font-bold text-slate-800">
            {title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {typeLabel}
        </span>
      </div>

      {/* Media Mock Player / Visual Canvas */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-stone-800 to-slate-950 border border-slate-800 text-white min-h-[220px] sm:min-h-[280px] flex flex-col items-center justify-center p-6 text-center shadow-inner group">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#5B7F71_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

        {/* Floating elements */}
        <div className="relative z-10 max-w-md mx-auto space-y-4">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-2xl bg-[#E5A93C] text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-[#E5A93C]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Reproducir contenido"
          >
            <Play className="w-7 h-7 fill-slate-950 ml-0.5" />
          </button>

          <div>
            <h4 className="font-title text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] text-amber-300 font-semibold border border-white/10 backdrop-blur-sm">
            <Sparkles size={13} />
            <span>Espacio reservado para video formativo</span>
          </div>
        </div>

        {/* Progress indicator at bottom */}
        <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>00:00</span>
          <div className="flex-1 mx-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[#E5A93C] rounded-full"></div>
          </div>
          <span>01:45</span>
        </div>
      </div>

      {/* Supportive text and proceed button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          💡 {helperText}
        </p>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto py-3 px-6 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          style={{ backgroundColor: accentColor }}
        >
          <span>{nextButtonLabel}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
