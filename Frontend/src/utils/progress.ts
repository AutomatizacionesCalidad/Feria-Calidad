import { UserSession } from "@/types/feria";

// CALIDAD
export const CALIDAD_MODULE_IDS = [
  "higiene-manos",
  "material-extrano",
  "registros",
] as const;

// SST
export const SST_MODULE_IDS = [
  "pesv",
  "accidentalidad",
  "epp",
  "reglas-oro",
] as const;

// MEJORAMIENTO CONTINUO
export const MEJORAMIENTO_MILESTONE_IDS = [
  "mejoramiento-sembrando",
  "mejoramiento-tpm",
  "mejoramiento-6sigma",
  "mejoramiento-formula",
] as const;

// CUMPLIMIENTO
export const CUMPLIMIENTO_MILESTONE_IDS = [
  "cumplimiento-conceptos",
  "cumplimiento-linea-etica",
  "cumplimiento-reto",
  "cumplimiento-evaluacion",
] as const;

// NIVEL DE USUARIO
export function getUserLevel(
  progressPercentage: number
): string {
  if (progressPercentage <= 25) {
    return "Explorador de Feria";
  }

  if (progressPercentage <= 50) {
    return "Aprendiz Integral";
  }

  if (progressPercentage <= 80) {
    return "Embajador de Buenas Prácticas";
  }

  return "Experto Integral Prebel";
}

// CALIDAD
export function getCalidadCompletedCount(
  session: UserSession
): number {
  return CALIDAD_MODULE_IDS.filter(
    (moduleId) => {
      const activityCompleted =
        session.actividadesCompletadas.includes(
          moduleId
        );

      const quizApproved =
        session.evaluaciones[moduleId]
          ?.approved === true;

      return (
        activityCompleted ||
        quizApproved
      );
    }
  ).length;
}

export function getCalidadProgress(
  session: UserSession | null
): number {
  if (!session) {
    return 0;
  }

  return Math.round(
    (getCalidadCompletedCount(
      session
    ) /
      CALIDAD_MODULE_IDS.length) *
      100
  );
}

// SST
export function getSstCompletedCount(
  session: UserSession
): number {
  return SST_MODULE_IDS.filter(
    (moduleId) => {
      const activityCompleted =
        session.actividadesCompletadas.includes(
          moduleId
        );

      const evaluationApproved =
        session.evaluaciones[moduleId]
          ?.approved === true;

      return (
        activityCompleted ||
        evaluationApproved
      );
    }
  ).length;
}

export function getSstProgress(
  session: UserSession | null
): number {
  if (!session) {
    return 0;
  }

  return Math.round(
    (getSstCompletedCount(
      session
    ) /
      SST_MODULE_IDS.length) *
      100
  );
}

// MEJORAMIENTO CONTINUO
export function isMejoramientoCompleted(
  session: UserSession
): boolean {
  return session.actividadesCompletadas.includes(
    "mejoramiento-continuo"
  );
}

export function getMejoramientoCompletedCount(
  session: UserSession
): number {
  if (
    isMejoramientoCompleted(
      session
    )
  ) {
    return MEJORAMIENTO_MILESTONE_IDS.length;
  }

  return MEJORAMIENTO_MILESTONE_IDS.filter(
    (milestoneId) =>
      session.actividadesCompletadas.includes(
        milestoneId
      )
  ).length;
}

export function getMejoramientoProgress(
  session: UserSession | null
): number {
  if (!session) {
    return 0;
  }

  return Math.round(
    (getMejoramientoCompletedCount(
      session
    ) /
      MEJORAMIENTO_MILESTONE_IDS.length) *
      100
  );
}

// CUMPLIMIENTO
export function isCumplimientoCompleted(
  session: UserSession
): boolean {
  return (
    session.actividadesCompletadas.includes(
      "cumplimiento-riesgo"
    ) ||
    session.actividadesCompletadas.includes(
      "cumplimiento-integridad"
    )
  );
}

export function getCumplimientoCompletedCount(
  session: UserSession
): number {
  if (
    isCumplimientoCompleted(
      session
    )
  ) {
    return CUMPLIMIENTO_MILESTONE_IDS.length;
  }

  return CUMPLIMIENTO_MILESTONE_IDS.filter(
    (milestoneId) =>
      session.actividadesCompletadas.includes(
        milestoneId
      )
  ).length;
}

export function getCumplimientoProgress(
  session: UserSession | null
): number {
  if (!session) {
    return 0;
  }

  return Math.round(
    (getCumplimientoCompletedCount(
      session
    ) /
      CUMPLIMIENTO_MILESTONE_IDS.length) *
      100
  );
}

// PROGRESO GLOBAL
export function calculateProgress(
  session: UserSession | null
): number {
  if (!session) {
    return 0;
  }

  const totalMilestones =
    CALIDAD_MODULE_IDS.length +
    SST_MODULE_IDS.length +
    MEJORAMIENTO_MILESTONE_IDS.length +
    CUMPLIMIENTO_MILESTONE_IDS.length;

  const totalCompleted =
    getCalidadCompletedCount(
      session
    ) +
    getSstCompletedCount(
      session
    ) +
    getMejoramientoCompletedCount(
      session
    ) +
    getCumplimientoCompletedCount(
      session
    );

  return Math.min(
    100,
    Math.round(
      (totalCompleted /
        totalMilestones) *
        100
    )
  );
}