"use client";
import React, { useState } from 'react';
import { 
  Megaphone, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface Estacion04LineaEticaProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Estacion04LineaEtica({ onNext, onPrev }: Estacion04LineaEticaProps) {
  const [selectedAction, setSelectedAction] = useState<'ignorar' | 'reportar' | null>(null);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const handleCopy = (text: string, channelKey: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedChannel(channelKey);
    setTimeout(() => setCopiedChannel(null), 2500);
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
            Estación 04 / 06
          </span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#D6684D] via-[#E07A5F] to-[#2A597A] text-white p-6 sm:p-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
            ESTACIÓN 04
          </span>
          <h2 className="font-title text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            ¿Y si veo algo incorrecto?
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold mt-1">
            Línea Ética Prebel: Tu canal confidencial y seguro
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Real Work Situation */}
          <div className="p-5 bg-slate-50 border-l-4 border-[#E07A5F] rounded-r-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#D6684D] block">
              Situación de ejemplo:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              Un operario observa que un compañero está <strong className="text-slate-900 underline">sacando productos de la bodega sin autorización</strong> o <strong className="text-slate-900 underline">modificando registros de inventario</strong>.
            </p>
          </div>

          {/* Core Decision: Callar o Reportar */}
          <div className="p-6 bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl text-center space-y-4">
            <h3 className="font-title text-base sm:text-xl font-extrabold text-slate-800 uppercase tracking-tight">
              ¿Callar o reportar?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              
              {/* Option: Ignorar */}
              <button
                onClick={() => setSelectedAction('ignorar')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedAction === 'ignorar'
                    ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-3xl">🤐</span>
                <span className="font-title text-sm font-extrabold uppercase">
                  Ignorar
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Dejar pasar la situación
                </span>
                {selectedAction === 'ignorar' && (
                  <span className="text-[10px] font-bold text-rose-600 mt-1">
                    ✗ Ignorar permite que la irregularidad continúe y pone en riesgo a la empresa.
                  </span>
                )}
              </button>

              {/* Option: Reportar (Correct) */}
              <button
                onClick={() => setSelectedAction('reportar')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedAction === 'reportar'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-3xl">📢</span>
                <span className="font-title text-sm font-extrabold uppercase text-emerald-800">
                  Reportar
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Utilizar los canales establecidos
                </span>
                {selectedAction === 'reportar' && (
                  <span className="text-[10px] font-black uppercase text-emerald-700 mt-1">
                    ✓ ¡Decisión Correcta!
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* Feedback & Reveal Linea Etica Section */}
          {selectedAction === 'reportar' && (
            <div className="space-y-6 fade-in">
              
              {/* Validation Message */}
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Actuaste correctamente
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  Cuando identificamos una situación inusual o contraria a las políticas de PREBEL, debemos utilizar los canales establecidos.
                </p>
              </div>

              {/* Línea Ética Container */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-[#2A597A] text-white rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-300">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-title text-lg sm:text-xl font-black uppercase tracking-wide text-white">
                        LÍNEA ÉTICA PREBEL
                      </h4>
                      <p className="text-xs text-orange-200 font-medium">
                        Canal seguro y confidencial para reportar sin miedo a represalias
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold text-emerald-300 border border-white/10 shrink-0 self-start sm:self-center">
                    <ShieldCheck size={14} />
                    <span>100% Confidencial</span>
                  </div>
                </div>

                {/* 4 Clickable / Copyable Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Channel 1: Web */}
                  <div className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Globe className="w-5 h-5 text-orange-300 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-white/70 block">Página Web</span>
                        <a 
                          href="https://www.prebel.com.co" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-bold text-white hover:text-orange-200 underline truncate block"
                        >
                          www.prebel.com.co
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('https://www.prebel.com.co', 'web')}
                      className="p-2 hover:bg-white/20 rounded-lg text-white/80 transition-colors shrink-0"
                      title="Copiar dirección web"
                    >
                      {copiedChannel === 'web' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Channel 2: Email */}
                  <div className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-5 h-5 text-orange-300 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-white/70 block">Correo Electrónico</span>
                        <a 
                          href="mailto:linea.etica@prebel.com.co" 
                          className="text-xs font-bold text-white hover:text-orange-200 underline truncate block"
                        >
                          linea.etica@prebel.com.co
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('linea.etica@prebel.com.co', 'email')}
                      className="p-2 hover:bg-white/20 rounded-lg text-white/80 transition-colors shrink-0"
                      title="Copiar correo"
                    >
                      {copiedChannel === 'email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Channel 3: Telephone */}
                  <div className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone className="w-5 h-5 text-orange-300 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-white/70 block">Teléfono Corporativo</span>
                        <a 
                          href="tel:+576043656000" 
                          className="text-xs font-bold text-white hover:text-orange-200 truncate block"
                        >
                          +57 604 365 60 00 Ext. 333
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('+57 604 365 60 00 Ext. 333', 'phone')}
                      className="p-2 hover:bg-white/20 rounded-lg text-white/80 transition-colors shrink-0"
                      title="Copiar teléfono"
                    >
                      {copiedChannel === 'phone' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Channel 4: WhatsApp */}
                  <div className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-white/70 block">Línea WhatsApp</span>
                        <a 
                          href="https://wa.me/573102956434" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-bold text-emerald-300 hover:text-emerald-200 underline truncate block"
                        >
                          +57 310 295 64 34
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('+57 310 295 64 34', 'whatsapp')}
                      className="p-2 hover:bg-white/20 rounded-lg text-white/80 transition-colors shrink-0"
                      title="Copiar WhatsApp"
                    >
                      {copiedChannel === 'whatsapp' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                </div>

                {/* Closing Integrity Messages */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-orange-200">
                    “Reportar de buena fe también es actuar con integridad.”
                  </p>
                  <p className="text-[11px] text-white/80">
                    Recuerda: actuar correctamente no solo protege a PREBEL, también nos protege a todos.
                  </p>
                </div>

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
              onClick={onNext}
              disabled={selectedAction !== 'reportar'}
              className={`w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedAction === 'reportar'
                  ? 'bg-[#E07A5F] hover:bg-[#D6684D] text-white shadow-md shadow-[#E07A5F]/20 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              id="btn-continuar-estacion-reto"
            >
              <span>Ir al Reto: ¿Qué harías?</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
