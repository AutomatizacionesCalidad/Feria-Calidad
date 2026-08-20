import { UserSession } from "@/types/feria";
import { getUserLevel } from "@/utils/progress";

export type FinalTrainingPayload = {
  cedula: string;
  area: string;
  fechaEjecucion: string;
  fechaInicio: string;
  fechaFinalizacion: string | null;
  progresoGeneral: number;
  nivel: string;
  insigniasGanadas: string[];
  resultadosEvaluaciones: {
    topicId: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    approved: boolean;
    completedAt: string;
  }[];
  actividadesCompletadas: string[];
  resultadoFinal: "COMPLETADO" | "EN_CURSO";
};

export function getFinalPayload(
  session: UserSession,
  progressPercentage: number
): FinalTrainingPayload {
  return {
    cedula: session.cedula,
    area: session.area,
    fechaEjecucion: session.fechaEjecucion,
    fechaInicio: session.fechaInicio,
    fechaFinalizacion: session.fechaFinalizacion,

    progresoGeneral: Math.round(
      progressPercentage
    ),

    nivel: getUserLevel(
      progressPercentage
    ),

    insigniasGanadas: [
      ...session.insignias,
    ],

    resultadosEvaluaciones:
      Object.values(
        session.evaluaciones
      ).map((evaluation) => ({
        topicId:
          evaluation.topicId,

        score:
          evaluation.score,

        correctAnswers:
          evaluation.correctAnswers,

        totalQuestions:
          evaluation.totalQuestions,

        approved:
          evaluation.approved,

        completedAt:
          evaluation.completedAt,
      })),

    actividadesCompletadas: [
      ...session.actividadesCompletadas,
    ],

    resultadoFinal:
      progressPercentage >= 100
        ? "COMPLETADO"
        : "EN_CURSO",
  };
}