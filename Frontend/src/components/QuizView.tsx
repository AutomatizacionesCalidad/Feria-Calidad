"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  RotateCcw,
  FileCheck,
} from "lucide-react";
import {
  QuizQuestion,
  QuizResult,
  Topic,
} from "@/types/feria";
import { useFairSession } from "@/context/FairSessionContext";

interface QuizViewProps {
  topic: Topic;
  areaId: string;
}

export default function QuizView({
  topic,
  areaId,
}: QuizViewProps) {
  const router = useRouter();

  const { completeQuiz } =
    useFairSession();

  const [currentQuestionIdx, setCurrentQuestionIdx] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState<
      Record<string, string | boolean>
    >({});

  const [quizFinished, setQuizFinished] =
    useState(false);

  const [quizResult, setQuizResult] =
    useState<QuizResult | null>(null);

  const questions =
    topic.quiz;

  const totalQuestions =
    questions.length;

  const currentQuestion:
    QuizQuestion =
    questions[currentQuestionIdx];

  // RESPUESTAS
  const handleSelectAnswer = (
    answer: string | boolean
  ) => {
    if (quizFinished) {
      return;
    }

    setSelectedAnswers(
      (previous) => ({
        ...previous,
        [currentQuestion.id]:
          answer,
      })
    );
  };

  // NAVEGACIÓN ENTRE PREGUNTAS
  const handleNext = () => {
    if (
      currentQuestionIdx <
      totalQuestions - 1
    ) {
      setCurrentQuestionIdx(
        (previous) =>
          previous + 1
      );
    }
  };

  const handlePrevious = () => {
    if (
      currentQuestionIdx >
      0
    ) {
      setCurrentQuestionIdx(
        (previous) =>
          previous - 1
      );
    }
  };

  // CALCULAR RESULTADO
  const calculateResults = () => {
    let correctAnswers = 0;

    questions.forEach(
      (question) => {
        const userAnswer =
          selectedAnswers[
            question.id
          ];

        if (
          userAnswer ===
          question.correctAnswer
        ) {
          correctAnswers++;
        }
      }
    );

    const score =
      totalQuestions > 0
        ? Math.round(
            (correctAnswers /
              totalQuestions) *
              100
          )
        : 0;

    const approved =
      score >= 80;

    const result: QuizResult = {
      topicId: topic.id,
      score,
      totalQuestions,
      correctAnswers,
      approved,
      answers:
        selectedAnswers,
      completedAt:
        new Date().toISOString(),
    };

    // IMPORTANTE:
    // Aquí solo mostramos el resultado.
    // TODAVÍA NO guardamos en la sesión.
    setQuizResult(
      result
    );

    setQuizFinished(
      true
    );
  };

  // REINTENTAR
  const handleRetry = () => {
    setCurrentQuestionIdx(
      0
    );

    setSelectedAnswers(
      {}
    );

    setQuizFinished(
      false
    );

    setQuizResult(
      null
    );
  };

  // FINALIZAR Y CANJEAR INSIGNIA
  const handleFinishQuiz =
    () => {
      if (
        !quizResult ||
        !quizResult.approved
      ) {
        return;
      }

      completeQuiz(
        quizResult,
        topic.badge.id
      );

      router.push(
        `/feria/${areaId}`
      );
    };

  // VOLVER A ACTIVIDAD
  const handleBackToActivity =
    () => {
      router.push(
        `/feria/${areaId}/${topic.id}/actividad`
      );
    };

  // VALIDACIÓN
  const hasAnsweredCurrent =
    currentQuestion &&
    selectedAnswers[
      currentQuestion.id
    ] !== undefined;

  // SEGURIDAD SI NO HAY PREGUNTAS
  if (
    totalQuestions === 0
  ) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl border border-slate-200 shadow p-8 text-center">

          <h2 className="text-lg font-bold text-slate-800">
            Evaluación no disponible
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Este módulo todavía no tiene preguntas configuradas.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/feria/${areaId}`
              )
            }
            className="mt-6 px-6 py-3 bg-[#40647E] text-white rounded-xl text-xs font-bold"
          >
            Volver al Stand
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">

      {/* CABECERA */}
      <div className="flex items-center justify-between mb-6 gap-3">

        <button
          onClick={
            handleBackToActivity
          }
          className="py-1.5 px-3 text-stone-600 hover:text-stone-900 bg-white rounded-lg text-xs font-bold border border-stone-200 transition-all cursor-pointer"
          id="btn-quiz-regresar-act"
        >
          Volver al Reto
        </button>

        <span className="text-[11px] font-bold text-slate-500 uppercase">
          EVALUACIÓN DE CALIDAD PREBEL
        </span>

      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* BANNER */}
        <div className="bg-[#40647E] text-white px-8 py-5 flex items-center justify-between gap-4">

          <div>

            <span className="text-[9px] bg-white/20 px-2.5 py-0.5 rounded-full font-black text-white/90 uppercase">
              Paso 2: Cuestionario Técnico
            </span>

            <h3 className="text-lg font-bold mt-1.5">
              {topic.name}
            </h3>

          </div>

          {!quizFinished && (

            <div className="text-right font-mono text-xs shrink-0">

              Pregunta{" "}

              <span className="text-[#86C9B8] font-bold">
                {currentQuestionIdx +
                  1}
              </span>{" "}

              de{" "}

              {
                totalQuestions
              }

            </div>

          )}

        </div>

        {/* CUERPO */}
        <div className="p-6 sm:p-8">

          {!quizFinished ? (

            <div className="space-y-6">

              {/* PREGUNTA */}
              <div className="space-y-3">

                <div className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider">

                  {currentQuestion.type ===
                    "multiple-choice" &&
                    "Selección Múltiple"}

                  {currentQuestion.type ===
                    "true-false" &&
                    "Falso o Verdadero"}

                  {currentQuestion.type ===
                    "situational" &&
                    "Caso Situacional"}

                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug">

                  {
                    currentQuestion.question
                  }

                </h4>

              </div>

              {/* OPCIONES */}
              <div className="grid grid-cols-1 gap-3 py-2">

                {currentQuestion.options?.map(
                  (
                    option,
                    index
                  ) => {
                    const isSelected =
                      selectedAnswers[
                        currentQuestion
                          .id
                      ] === option;

                    return (
                      <button
                        key={
                          index
                        }
                        type="button"
                        onClick={() =>
                          handleSelectAnswer(
                            option
                          )
                        }
                        className={`p-4 border rounded-xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#40647E] bg-[#40647E]/5 text-[#40647E] shadow-sm ring-1 ring-[#40647E]/10"
                            : "border-gray-200 hover:bg-stone-50 bg-white text-slate-700"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <span
                            className={`w-7 h-7 rounded-full border text-[11px] font-bold flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#40647E] text-white border-transparent"
                                : "border-gray-300 text-gray-500 bg-slate-50"
                            }`}
                          >
                            {String.fromCharCode(
                              65 +
                                index
                            )}
                          </span>

                          <span className="leading-normal">
                            {
                              option
                            }
                          </span>

                        </div>

                      </button>
                    );
                  }
                )}

                {/* TRUE / FALSE */}
                {currentQuestion.type ===
                  "true-false" &&
                  !currentQuestion.options && (

                    <div className="grid grid-cols-2 gap-4">

                      {[
                        true,
                        false,
                      ].map(
                        (
                          optionValue
                        ) => {
                          const isSelected =
                            selectedAnswers[
                              currentQuestion
                                .id
                            ] ===
                            optionValue;

                          return (
                            <button
                              key={String(
                                optionValue
                              )}
                              type="button"
                              onClick={() =>
                                handleSelectAnswer(
                                  optionValue
                                )
                              }
                              className={`p-4 border rounded-xl text-center text-sm font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? "border-[#40647E] bg-[#40647E]/5 text-[#40647E]"
                                  : "border-gray-200 hover:bg-stone-50 bg-white text-slate-700"
                              }`}
                            >
                              {optionValue
                                ? "Verdadero"
                                : "Falso"}
                            </button>
                          );
                        }
                      )}

                    </div>

                  )}

              </div>

              {/* NAVEGACIÓN */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 gap-4">

                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  disabled={
                    currentQuestionIdx ===
                    0
                  }
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    currentQuestionIdx ===
                    0
                      ? "text-gray-350 bg-gray-50 border border-gray-100 cursor-not-allowed"
                      : "text-stone-600 bg-white hover:bg-stone-100 border border-stone-200 cursor-pointer"
                  }`}
                >

                  <ArrowLeft
                    size={13}
                  />

                  Anterior

                </button>

                {currentQuestionIdx <
                totalQuestions -
                  1 ? (

                  <button
                    type="button"
                    onClick={
                      handleNext
                    }
                    disabled={
                      !hasAnsweredCurrent
                    }
                    className={`py-2 px-5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      hasAnsweredCurrent
                        ? "bg-[#40647E] hover:bg-[#345369] text-white shadow cursor-pointer"
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                    }`}
                  >

                    Siguiente

                    <ArrowRight
                      size={13}
                    />

                  </button>

                ) : (

                  <button
                    type="button"
                    onClick={
                      calculateResults
                    }
                    disabled={
                      !hasAnsweredCurrent
                    }
                    className={`py-2.5 px-6 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      hasAnsweredCurrent
                        ? "bg-[#60A491] hover:bg-[#558F7E] text-white shadow-md cursor-pointer"
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                    }`}
                    id="btn-entregar-examen"
                  >

                    <FileCheck
                      size={14}
                    />

                    Entregar Examen

                  </button>

                )}

              </div>

            </div>

          ) : (

            /* RESULTADOS */
            <div className="space-y-8">

              {/* NOTA */}
              <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto">

                <div
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white mb-4 shadow ${
                    quizResult?.approved
                      ? "bg-[#60A491]"
                      : "bg-[#F2917E]"
                  }`}
                >

                  <div className="text-2xl font-black">

                    {
                      quizResult?.score ??
                      0
                    }
                    %

                  </div>

                </div>

                <h4 className="text-base font-extrabold text-slate-800">

                  {quizResult?.approved
                    ? "🎉 ¡Examen Aprobado!"
                    : "⚠️ Examen No Aprobado"}

                </h4>

                <p className="text-xs text-slate-500 mt-1">

                  Has respondido correctamente{" "}

                  <strong>
                    {
                      quizResult?.correctAnswers
                    }
                  </strong>{" "}

                  de{" "}

                  <strong>
                    {
                      totalQuestions
                    }
                  </strong>{" "}

                  preguntas.

                </p>

                <p className="text-xs text-stone-500 italic mt-3 leading-snug">
                  Puntaje mínimo requerido:{" "}
                  <strong>
                    80%
                  </strong>
                  .
                </p>

              </div>

              {/* REVISIÓN */}
              <div className="space-y-4">

                <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-100">
                  Revisión detallada
                </h5>

                {questions.map(
                  (
                    question,
                    index
                  ) => {
                    const userAnswer =
                      selectedAnswers[
                        question.id
                      ];

                    const isCorrect =
                      userAnswer ===
                      question.correctAnswer;

                    return (
                      <div
                        key={
                          question.id
                        }
                        className={`p-4 border rounded-xl space-y-2 text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-50/45 border-emerald-200"
                            : "bg-red-50/45 border-red-200"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-3">

                          <span className="font-bold text-slate-800">

                            Q
                            {String(
                              index +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                            .{" "}

                            {
                              question.question
                            }

                          </span>

                          {isCorrect ? (

                            <span className="text-emerald-700 font-bold uppercase text-[9px] bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">

                              <CheckCircle2
                                size={
                                  10
                                }
                              />

                              Correcto

                            </span>

                          ) : (

                            <span className="text-red-700 font-bold uppercase text-[9px] bg-red-100 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">

                              <XCircle
                                size={
                                  10
                                }
                              />

                              Incorrecto

                            </span>

                          )}

                        </div>

                        <div className="space-y-1 pl-4 border-l-2 border-stone-200">

                          <div className="text-slate-600 font-medium">

                            Tu respuesta:{" "}

                            <strong className="text-slate-800">
                              {String(
                                userAnswer
                              )}
                            </strong>

                          </div>

                          {!isCorrect && (

                            <div className="font-medium text-emerald-800">

                              Respuesta correcta:{" "}

                              <strong>
                                {String(
                                  question.correctAnswer
                                )}
                              </strong>

                            </div>

                          )}

                          <p className="text-[11px] text-slate-600 mt-1 p-2 bg-white rounded border border-gray-150 leading-relaxed">

                            <strong>
                              Explicación:
                            </strong>{" "}

                            {
                              question.explanation
                            }

                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* ACCIONES */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">

                {!quizResult?.approved ? (

                  <button
                    type="button"
                    onClick={
                      handleRetry
                    }
                    className="w-full sm:w-auto py-3 px-6 bg-[#F2917E] hover:bg-[#E47F6B] text-white font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    id="btn-reintentar-examen"
                  >

                    <RotateCcw
                      size={14}
                    />

                    Reiniciar Evaluación

                  </button>

                ) : (

                  <button
                    type="button"
                    onClick={
                      handleFinishQuiz
                    }
                    className="w-full sm:w-auto py-3 px-8 bg-[#40647E] hover:bg-[#345369] text-white font-extrabold rounded-lg text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="btn-finalizar-pase"
                  >

                    <Award
                      size={15}
                    />

                    Canjear Insignia y Volver al Stand

                  </button>

                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}