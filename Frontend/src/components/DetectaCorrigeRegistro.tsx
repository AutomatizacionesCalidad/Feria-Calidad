"use client";
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  FileEdit, 
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface DetectaCorrigeRegistroProps {
  onComplete: (score: number, feedback: string) => void;
}

interface FormErrorItem {
  id: string;
  fieldLabel: string;
  displayValue: string;
  isError: boolean;
  title: string;
  wrongReason: string;
  correctRule: string;
  sourceDocNote?: string;
  visualTag?: string;
}

export const DetectaCorrigeRegistro: React.FC<DetectaCorrigeRegistroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'detect' | 'correct' | 'completed'>('detect');
  
  // Phase 1 State
  const [discoveredErrors, setDiscoveredErrors] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<FormErrorItem | null>(null);
  const [tappedValidField, setTappedValidField] = useState(false);

  // Phase 2 State
  const [selectedCorrectionOption, setSelectedCorrectionOption] = useState<string | null>(null);
  const [correctionFeedback, setCorrectionFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const formItems: FormErrorItem[] = [
    {
      id: 'fecha',
      fieldLabel: 'Fecha de Registro',
      displayValue: '08/18/26',
      isError: true,
      visualTag: '08/18/26',
      title: '1. Fecha incorrecta',
      wrongReason: 'En Prebel se registra primero el día, luego el mes y el año.',
      correctRule: 'Ejemplo: 18/08/2026',
      sourceDocNote: 'El procedimiento establece formato día/mes/año (DD/MM/AAAA).'
    },
    {
      id: 'hora',
      fieldLabel: 'Hora de Control',
      displayValue: '2:30 p.m.',
      isError: true,
      visualTag: '2:30 p.m.',
      title: '2. Hora incorrecta',
      wrongReason: 'No usamos a.m. ni p.m.',
      correctRule: 'Usa formato militar: 14:30',
      sourceDocNote: 'El procedimiento define el uso obligatorio de hora militar (HH:mm).'
    },
    {
      id: 'resultado',
      fieldLabel: 'Resultado de Pesada (g)',
      displayValue: '50.0',
      isError: false,
      title: 'Resultado de Pesada',
      wrongReason: '',
      correctRule: 'Este campo está correctamente diligenciado con valor numérico y unidad exacta.',
      sourceDocNote: 'Dato conforme y legible.'
    },
    {
      id: 'observacion',
      fieldLabel: 'Observaciones de Turno',
      displayValue: '“ Igual al anterior ”',
      isError: true,
      visualTag: '“Igual al anterior”',
      title: '3. “Igual al anterior”',
      wrongReason: 'Si un dato se repite, debe escribirse nuevamente completo. No se permiten comillas (“ ”), flechas (↓) ni símbolos para indicar repetición.',
      correctRule: 'Escribir el texto descriptivo completo en cada fila o evento.',
      sourceDocNote: 'Esto aparece además ejemplificado visualmente en el Gráfico 2 de la página 4 del procedimiento.'
    },
    {
      id: 'campo_adicional',
      fieldLabel: 'Campo Adicional / Lote Referencia',
      displayValue: '____________________ (En blanco)',
      isError: true,
      visualTag: 'Espacio vacío',
      title: '4. Campo en blanco',
      wrongReason: 'No dejes espacios sin diligenciar.',
      correctRule: 'Si no aplica, escribe NO APLICA o N/A (o traza una línea diagonal para anular el espacio).',
      sourceDocNote: 'Evita inserciones no autorizadas posteriores.'
    },
    {
      id: 'firma',
      fieldLabel: 'Firma de Responsable',
      displayValue: 'firma de otro compañero (P. Gómez)',
      isError: true,
      visualTag: 'Firma delegada',
      title: '5. Firma de otra persona',
      wrongReason: 'La firma es personal y no se debe firmar en nombre de otra persona.',
      correctRule: 'El registro debe estar respaldado por quien ejecutó la actividad.',
      sourceDocNote: 'La firma debe corresponder a la registrada y autorizada ante Gestión de Calidad.'
    },
    {
      id: 'corrector',
      fieldLabel: 'Corrección de Volumen Lote',
      displayValue: '[ █ █ █ Borrado con corrector líquido █ █ █ ]',
      isError: true,
      visualTag: 'Uso de corrector',
      title: '6. Uso de corrector',
      wrongReason: 'No se permite corrector líquido, cinta correctora, borrador ni lápiz de grafito.',
      correctRule: 'Los registros en papel deben diligenciarse exclusivamente con tinta negra indeleble.',
      sourceDocNote: 'Las alteraciones ocultas invalidan la integridad del lote.'
    }
  ];

  const totalErrors = formItems.filter(i => i.isError).length; // 6 errors

  const handleTapItem = (item: FormErrorItem) => {
    setActiveItem(item);
    if (item.isError) {
      if (!discoveredErrors.includes(item.id)) {
        setDiscoveredErrors(prev => [...prev, item.id]);
      }
      setTappedValidField(false);
    } else {
      setTappedValidField(true);
    }
  };

  const handleSelectCorrection = (optId: string) => {
    setSelectedCorrectionOption(optId);
    if (optId === 'C') {
      setCorrectionFeedback({
        isCorrect: true,
        text: '¡Correcto! Se traza una línea sobre el error (manteniéndolo legible), se registra la información correcta y se respalda la corrección con firma y fecha. Si no hay espacio, se puede usar un símbolo y hacer la corrección en otra zona de la hoja.'
      });
    } else if (optId === 'A') {
      setCorrectionFeedback({
        isCorrect: false,
        text: '❌ Incorrecto. No se debe borrar ni destruir el dato original. Toda corrección debe mantener la trazabilidad de lo registrado previamente.'
      });
    } else if (optId === 'B') {
      setCorrectionFeedback({
        isCorrect: false,
        text: '❌ Incorrecto. El corrector líquido está estrictamente prohibido en las Buenas Prácticas de Documentación de PREBEL.'
      });
    }
  };

  const finishEntireActivity = () => {
    setPhase('completed');
    onComplete(
      100,
      '¡Felicitaciones! Has detectado los 6 errores críticos en el registro y aplicado la corrección oficial según las Buenas Prácticas de Documentación.'
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto font-sans">
      
      {/* PHASE 1: DETECTA LOS ERRORES */}
      {phase === 'detect' && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-md space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                Parte 1 de 2 • Inspección Documental
              </span>
              <span className="text-xs font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Errores detectados: {discoveredErrors.length} / {totalErrors}
              </span>
            </div>
            <h3 className="font-title text-base sm:text-lg font-bold flex items-center gap-2 pt-1">
              <span>📝</span> RETO: ¿ESTE REGISTRO ESTÁ BIEN DILIGENCIADO?
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Encuentra y toca los errores presentes en el formato antes de guardarlo en el archivo técnico.
            </p>
          </div>

          {/* Form Record Sheet Layout */}
          <div className="bg-amber-50/70 border-2 border-amber-200/90 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5 relative">
            
            {/* Top Sheet Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-amber-200 pb-3 gap-2">
              <div>
                <span className="text-[10px] font-black tracking-widest text-prebel-blue uppercase bg-white px-2 py-0.5 rounded border border-amber-200">
                  PREBEL S.A.S BIC
                </span>
                <h4 className="font-bold text-slate-800 text-sm mt-1 uppercase">
                  REGISTRO DE CONTROL DE PROCESO Y ENVASADO
                </h4>
              </div>
              <div className="text-[10px] font-mono text-slate-500 sm:text-right">
                <div>CÓD: PR-REG-018</div>
                <div>VERSIÓN: 03</div>
              </div>
            </div>

            {/* List of interactive fields */}
            <div className="grid grid-cols-1 gap-3">
              {formItems.map((item) => {
                const isFound = discoveredErrors.includes(item.id);
                const isSelected = activeItem?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTapItem(item)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      isFound
                        ? 'bg-rose-50/90 border-rose-400 shadow-sm'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400/20'
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-xs hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {item.fieldLabel}
                      </span>
                      {isFound ? (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-300">
                          <XCircle size={12} className="text-rose-600" /> Error detectado
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                          Tocar para auditar
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-xs sm:text-sm font-bold p-2 bg-stone-900 text-stone-100 rounded-lg flex items-center justify-between">
                      <span className={item.id === 'corrector' ? 'text-amber-300' : isFound ? 'text-rose-300' : 'text-stone-200'}>
                        {item.displayValue}
                      </span>
                      {isFound && (
                        <span className="text-rose-400 text-xs font-sans">❌ No conforme</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation box for selected item */}
            {activeItem && (
              <div className="p-4 rounded-xl border animate-fade-in transition-all bg-white shadow-md border-blue-200">
                {activeItem.isError ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-600 font-bold text-sm flex items-center gap-1">
                        <AlertTriangle size={16} /> {activeItem.title}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                      <p className="font-semibold text-rose-900">
                        ❌ {activeItem.wrongReason}
                      </p>
                      <p className="font-semibold text-emerald-800">
                        ✅ {activeItem.correctRule}
                      </p>
                      {activeItem.sourceDocNote && (
                        <p className="text-[11px] text-slate-500 italic pt-1 border-t border-rose-100">
                          📖 {activeItem.sourceDocNote}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <CheckCircle2 size={15} className="text-emerald-600" /> Campo Correcto
                    </p>
                    <p>
                      Este campo no contiene desviaciones. El valor está registrado de forma numérica y clara. Continúa buscando los otros campos.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action to proceed to part 2 when all 6 errors found */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-200">
              <div className="text-xs text-slate-600">
                {discoveredErrors.length === totalErrors ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={16} /> ¡Has descubierto los {totalErrors} errores del formato!
                  </span>
                ) : (
                  <span>
                    Faltan por descubrir <strong>{totalErrors - discoveredErrors.length}</strong> errores.
                  </span>
                )}
              </div>

              {discoveredErrors.length === totalErrors && (
                <button
                  onClick={() => setPhase('correct')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-prebel-blue hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-bounce"
                >
                  <span>Continuar a Parte 2: Corrige correctamente</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PHASE 2: CORRIGE CORRECTAMENTE */}
      {phase === 'correct' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Banner */}
          <div className="p-5 bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl shadow-md space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                Parte 2 de 2 • Corrección Oficial
              </span>
              <span className="text-xs font-mono font-bold bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Aplicación de Protocolo
              </span>
            </div>
            <h3 className="font-title text-base sm:text-lg font-bold flex items-center gap-2 pt-1">
              <span>✍️</span> SEGUNDA PARTE: “CORRIGE CORRECTAMENTE”
            </h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              Aprende el procedimiento oficial para enmendar un dato erróneo sin violar la integridad documental.
            </p>
          </div>

          {/* Scenario Box */}
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900">
                ⚠️ Situación en la línea de producción:
              </p>
              <p>
                Durante el control de llenado de frascos, el operario registró por equivocación el dato:
              </p>
              <div className="p-3 bg-stone-900 text-red-400 font-mono text-base font-bold rounded-lg text-center tracking-widest">
                153.4
              </div>
              <p className="text-slate-600">
                El valor real medido fue <strong>154.3</strong>. ¿Cómo debe corregirse este dato en el formato oficial de papel?
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Selecciona la opción correcta:
              </p>

              <button
                onClick={() => handleSelectCorrection('A')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedCorrectionOption === 'A'
                    ? 'bg-rose-50 border-rose-400 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Borrarlo completamente.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Raspar con cuchilla o usar borrador de tinta hasta no dejar rastro.</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectCorrection('B')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedCorrectionOption === 'B'
                    ? 'bg-rose-50 border-rose-400 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  B
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Usar corrector líquido.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Cubrir el error con pintura blanca y escribir el nuevo dato encima.</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectCorrection('C')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedCorrectionOption === 'C'
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400/20'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedCorrectionOption === 'C' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  C
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Trazar una línea sobre el error, escribir el dato correcto, firmar y fechar.
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Garantiza que el valor anterior permanezca legible y la modificación quede respaldada con firma y fecha autorizadas.
                  </p>
                </div>
              </button>
            </div>

            {/* Feedback & Animated Demonstration */}
            {correctionFeedback && (
              <div className={`p-4 rounded-xl border space-y-4 animate-fade-in ${
                correctionFeedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <p className="text-xs font-semibold leading-relaxed">
                  {correctionFeedback.text}
                </p>

                {/* Visual diagram of how standard correction looks */}
                {correctionFeedback.isCorrect && (
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                      👁️ Así se ve una corrección oficial según el procedimiento de PREBEL:
                    </p>
                    <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-lg flex flex-wrap items-center justify-center gap-4 text-center font-mono">
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-500 block">Dato anterior tachado</span>
                        <span className="text-base font-bold text-rose-700 line-through decoration-2 decoration-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                          153.4
                        </span>
                      </div>
                      <span className="text-stone-400 text-lg">➔</span>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-500 block">Dato correcto</span>
                        <span className="text-base font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                          154.3
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-500 block">Firma autorizada</span>
                        <span className="text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 italic font-serif">
                          M. Rueda
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-500 block">Fecha (DD/MM/AAAA)</span>
                        <span className="text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">
                          18/08/2026
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Finish Button */}
            {selectedCorrectionOption === 'C' && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={finishEntireActivity}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-bounce"
                >
                  <Sparkles size={16} />
                  <span>Completar Reto Documental</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* PHASE 3: COMPLETED SUMMARY */}
      {phase === 'completed' && (
        <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-scale-up">
          
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              ¡RETO SUPERADO CON ÉXITO!
            </span>
            <h3 className="font-title text-xl sm:text-2xl font-black text-slate-900">
              ✅ ¡Registro confiable!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Recuerda: todo registro debe ser <strong>legible, exacto, puntual, claro, completo y real</strong>.
            </p>
          </div>

          {/* Core Formula Box */}
          <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-2xl shadow-lg space-y-2">
            <p className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
              Fórmula Clave de Calidad:
            </p>
            <p className="font-title text-xs sm:text-sm font-black tracking-wide text-white leading-relaxed">
              REGISTRA EN EL MOMENTO + ESCRIBE CLARO + NO BORRES + FIRMA LO QUE HACES
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                setPhase('detect');
                setDiscoveredErrors([]);
                setActiveItem(null);
                setSelectedCorrectionOption(null);
                setCorrectionFeedback(null);
              }}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5 cursor-pointer underline font-medium"
            >
              <RotateCcw size={13} /> Repetir reto documental
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetectaCorrigeRegistro;
