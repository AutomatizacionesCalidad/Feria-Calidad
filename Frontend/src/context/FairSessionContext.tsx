"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { QuizResult, UserSession } from "@/types/feria";
import {
  ActivityAttemptPayload,
  clearLocalSession,
  completeBackendModule,
  finalizeBackendSession,
  loadLocalSession,
  mergeBackendSession,
  registerBackendActivityAttempt,
  registerBackendBadge,
  saveLocalSession,
  startBackendModule,
  startBackendSession,
} from "@/services/sessionService";
import { calculateProgress } from "@/utils/progress";

// CONTEXT TYPE
type FairSessionContextType = {
  session: UserSession | null;

  loading: boolean;

  progressPercentage: number;

  unlockedBadgeId: string | null;

  startSession: (
    session: UserSession
  ) => Promise<UserSession>;

  markTopicInProgress: (
    topicId: string
  ) => void;

  completeActivity: (
    topicId: string,
    score?: number
  ) => void;

  completeQuiz: (
    result: QuizResult,
    badgeId?: string
  ) => void;

  completeSstModule: (
    moduleId: string,
    badgeId?: string
  ) => void;

  completeMejoramientoMilestone: (
    milestoneId: string
  ) => void;

  completeMejoramientoStand:
    () => void;

  completeCumplimientoMilestone: (
    milestoneId: string
  ) => void;

  completeCumplimientoStand:
    () => void;

  registerActivityAttempt: (
    payload: ActivityAttemptPayload
  ) => void;

  finalizeSession:
    () => Promise<void>;

  closeBadgeModal:
    () => void;

  updateSession: (
    updater:
      | UserSession
      | ((
          current: UserSession
        ) => UserSession)
  ) => void;

  logout: () => void;

  resetTraining: () => void;
};

// CONTEXT
const FairSessionContext =
  createContext<
    FairSessionContextType | undefined
  >(undefined);

// PROVIDER
type FairSessionProviderProps = {
  children: ReactNode;
};

export function FairSessionProvider({
  children,
}: FairSessionProviderProps) {
  const [
    session,
    setSession,
  ] =
    useState<UserSession | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    unlockedBadgeId,
    setUnlockedBadgeId,
  ] =
    useState<string | null>(
      null
    );

  // CARGAR SESIÓN LOCAL COMO CACHÉ
  useEffect(() => {
    const storedSession =
      loadLocalSession();

    if (storedSession) {
      setSession(
        storedSession
      );
    }

    setLoading(false);
  }, []);

  // ACTUALIZADOR CENTRAL
  const updateSession:
    FairSessionContextType["updateSession"] =
    (updater) => {
      setSession(
        (
          currentSession
        ) => {
          if (
            !currentSession
          ) {
            return currentSession;
          }

          const updatedSession =
            typeof updater ===
            "function"
              ? updater(
                  currentSession
                )
              : updater;

          saveLocalSession(
            updatedSession
          );

          return updatedSession;
        }
      );
    };

  // INSIGNIA GLOBAL
  const announceBadge = (
    badgeId?: string
  ) => {
    if (!badgeId) {
      return;
    }

    const alreadyOwned =
      session?.insignias.includes(
        badgeId
      );

    if (!alreadyOwned) {
      setUnlockedBadgeId(
        badgeId
      );
    }

    if (session?.sessionId) {
      void registerBackendBadge(
        session.sessionId,
        badgeId
      ).catch((error) => {
        console.error(
          `Error registrando insignia ${badgeId} en backend:`,
          error
        );
      });
    }
  };

  const closeBadgeModal =
    () => {
      setUnlockedBadgeId(
        null
      );
    };

  // INICIAR O RECUPERAR SESIÓN EN DJANGO
  const startSession = async (
    newSession: UserSession
  ) => {
    setUnlockedBadgeId(
      null
    );

    const backendSession =
      await startBackendSession({
        cedula:
          newSession.cedula,

        area:
          newSession.area,

        fechaEjecucion:
          newSession.fechaEjecucion,
      });

    const localCache =
      loadLocalSession();

    const canReuseLocalProgress =
      localCache?.cedula ===
        newSession.cedula &&
      (localCache.sessionId ===
        backendSession.sesion.id ||
        backendSession.sesion_recuperada);

    const baseSession =
      canReuseLocalProgress
        ? {
            ...newSession,

            progreso:
              localCache.progreso,

            actividadesCompletadas:
              localCache.actividadesCompletadas,

            insignias:
              localCache.insignias,

            evaluaciones:
              localCache.evaluaciones,

            score:
              localCache.score,
          }
        : newSession;

    const updatedSession =
      mergeBackendSession(
        baseSession,
        backendSession
      );

    setSession(
      updatedSession
    );

    saveLocalSession(
      updatedSession
    );

    return updatedSession;
  };

  const completeModuleInBackend = (
    sessionId: number | null | undefined,
    moduleId: string
  ) => {
    if (!sessionId) {
      return;
    }

    void completeBackendModule(
      sessionId,
      moduleId
    ).catch((error) => {
      console.error(
        `Error completando módulo ${moduleId} en backend:`,
        error
      );
    });
  };

  const registerActivityAttempt = (
    payload: ActivityAttemptPayload
  ) => {
    const currentSessionId =
      session?.sessionId;

    if (!currentSessionId) {
      return;
    }

    void registerBackendActivityAttempt(
      currentSessionId,
      payload
    ).catch((error) => {
      console.error(
        `Error registrando actividad ${payload.codigoActividad} en backend:`,
        error
      );
    });
  };

  // MARCAR TEMA EN PROGRESO
  const markTopicInProgress = (
    topicId: string
  ) => {
    const currentSessionId =
      session?.sessionId;

    updateSession(
      (current) => ({
        ...current,

        progreso: {
          ...current.progreso,

          [topicId]:
            "in_progress",
        },
      })
    );

    if (currentSessionId) {
      void startBackendModule(
        currentSessionId,
        topicId
      ).catch((error) => {
        console.error(
          `Error iniciando módulo ${topicId} en backend:`,
          error
        );
      });
    }
  };

  // COMPLETAR ACTIVIDAD CALIDAD
  const completeActivity = (
    topicId: string,
    score?: number
  ) => {
    updateSession(
      (current) => {
        const actividadesCompletadas =
          current.actividadesCompletadas.includes(
            topicId
          )
            ? current.actividadesCompletadas
            : [
                ...current.actividadesCompletadas,
                topicId,
              ];

        return {
          ...current,

          actividadesCompletadas,

          progreso: {
            ...current.progreso,

            [topicId]:
              "in_progress",
          },

          score:
            typeof score ===
            "number"
              ? score
              : current.score,
        };
      }
    );
  };

  // COMPLETAR QUIZ CALIDAD
  const completeQuiz = (
    result: QuizResult,
    badgeId?: string
  ) => {
    if (
      result.approved
    ) {
      announceBadge(
        badgeId
      );
    }

    const currentSessionId =
      session?.sessionId;

    updateSession(
      (current) => {
        const insignias = [
          ...current.insignias,
        ];

        if (
          result.approved &&
          badgeId &&
          !insignias.includes(
            badgeId
          )
        ) {
          insignias.push(
            badgeId
          );
        }

        return {
          ...current,

          evaluaciones: {
            ...current.evaluaciones,

            [result.topicId]:
              result,
          },

          insignias,

          progreso: {
            ...current.progreso,

            [result.topicId]:
              result.approved
                ? "completed"
                : "in_progress",
          },
        };
      }
    );

    if (
      currentSessionId &&
      result.approved
    ) {
      void completeBackendModule(
        currentSessionId,
        result.topicId
      ).catch((error) => {
        console.error(
          `Error completando módulo ${result.topicId} en backend:`,
          error
        );
      });
    }
  };

  // COMPLETAR MÓDULO SST
  const completeSstModule = (
    moduleId: string,
    badgeId?: string
  ) => {
    announceBadge(
      badgeId
    );

    const currentSessionId =
      session?.sessionId;

    updateSession(
      (current) => {
        const actividadesCompletadas =
          current.actividadesCompletadas.includes(
            moduleId
          )
            ? current.actividadesCompletadas
            : [
                ...current.actividadesCompletadas,
                moduleId,
              ];

        const insignias = [
          ...current.insignias,
        ];

        if (
          badgeId &&
          !insignias.includes(
            badgeId
          )
        ) {
          insignias.push(
            badgeId
          );
        }

        const evaluation: QuizResult =
          {
            topicId:
              moduleId,

            score:
              100,

            totalQuestions:
              1,

            correctAnswers:
              1,

            approved:
              true,

            answers: {
              [`${moduleId}-resultado`]:
                true,
            },

            completedAt:
              new Date().toISOString(),
          };

        return {
          ...current,

          actividadesCompletadas,

          insignias,

          progreso: {
            ...current.progreso,

            [moduleId]:
              "completed",
          },

          evaluaciones: {
            ...current.evaluaciones,

            [moduleId]:
              evaluation,
          },
        };
      }
    );

    completeModuleInBackend(
      currentSessionId,
      moduleId
    );
  };

  // MEJORAMIENTO - HITO
  const completeMejoramientoMilestone =
    (
      milestoneId: string
    ) => {
      const currentSessionId =
        session?.sessionId;

      updateSession(
        (current) => {
          if (
            current.actividadesCompletadas.includes(
              milestoneId
            )
          ) {
            return current;
          }

          return {
            ...current,

            actividadesCompletadas:
              [
                ...current.actividadesCompletadas,
                milestoneId,
              ],

            progreso: {
              ...current.progreso,

              [milestoneId]:
                "completed",
            },
          };
        }
      );

      completeModuleInBackend(
        currentSessionId,
        milestoneId
      );
    };

  // MEJORAMIENTO - FINALIZAR STAND
  const completeMejoramientoStand =
    () => {
      const badgeId =
        "badge-transformacion-mejora";

      const currentSessionId =
        session?.sessionId;

      announceBadge(
        badgeId
      );

      updateSession(
        (current) => {
          const completed =
            new Set(
              current.actividadesCompletadas
            );

          completed.add(
            "mejoramiento-sembrando"
          );

          completed.add(
            "mejoramiento-tpm"
          );

          completed.add(
            "mejoramiento-6sigma"
          );

          completed.add(
            "mejoramiento-formula"
          );

          completed.add(
            "mejoramiento-continuo"
          );

          const insignias =
            new Set(
              current.insignias
            );

          insignias.add(
            badgeId
          );

          const evaluation: QuizResult =
            {
              topicId:
                "mejoramiento-formula",

              score:
                100,

              totalQuestions:
                1,

              correctAnswers:
                1,

              approved:
                true,

              answers: {
                slot1:
                  "6sigma",

                slot2:
                  "sembrando",

                slot3:
                  "tpm",
              },

              completedAt:
                new Date().toISOString(),
            };

          return {
            ...current,

            actividadesCompletadas:
              Array.from(
                completed
              ),

            insignias:
              Array.from(
                insignias
              ),

            progreso: {
              ...current.progreso,

              "mejoramiento-sembrando":
                "completed",

              "mejoramiento-tpm":
                "completed",

              "mejoramiento-6sigma":
                "completed",

              "mejoramiento-formula":
                "completed",

              "mejoramiento-continuo":
                "completed",
            },

            evaluaciones: {
              ...current.evaluaciones,

              "mejoramiento-formula":
                evaluation,
            },
          };
        }
      );

      [
        "mejoramiento-sembrando",
        "mejoramiento-tpm",
        "mejoramiento-6sigma",
        "mejoramiento-formula",
      ].forEach((moduleId) => {
        completeModuleInBackend(
          currentSessionId,
          moduleId
        );
      });
    };

  // CUMPLIMIENTO - HITO
  const completeCumplimientoMilestone =
    (
      milestoneId: string
    ) => {
      const currentSessionId =
        session?.sessionId;

      updateSession(
        (current) => {
          if (
            current.actividadesCompletadas.includes(
              milestoneId
            )
          ) {
            return current;
          }

          return {
            ...current,

            actividadesCompletadas:
              [
                ...current.actividadesCompletadas,
                milestoneId,
              ],

            progreso: {
              ...current.progreso,

              [milestoneId]:
                "completed",
            },
          };
        }
      );

      completeModuleInBackend(
        currentSessionId,
        milestoneId
      );
    };

  // CUMPLIMIENTO - FINALIZAR STAND
  const completeCumplimientoStand =
    () => {
      const badgeId =
        "badge-embajador-cumplimiento";

      const currentSessionId =
        session?.sessionId;

      announceBadge(
        badgeId
      );

      updateSession(
        (current) => {
          const completed =
            new Set(
              current.actividadesCompletadas
            );

          completed.add(
            "cumplimiento-conceptos"
          );

          completed.add(
            "cumplimiento-linea-etica"
          );

          completed.add(
            "cumplimiento-reto"
          );

          completed.add(
            "cumplimiento-evaluacion"
          );

          completed.add(
            "cumplimiento-integridad"
          );

          completed.add(
            "cumplimiento-riesgo"
          );

          const insignias =
            new Set(
              current.insignias
            );

          insignias.add(
            badgeId
          );

          const evaluation: QuizResult =
            {
              topicId:
                "cumplimiento-integridad",

              score:
                100,

              totalQuestions:
                1,

              correctAnswers:
                1,

              approved:
                true,

              answers: {
                q_cr_1:
                  "Seguir los procedimientos, actuar con honestidad y reportar cualquier situación inusual o indebida.",
              },

              completedAt:
                new Date().toISOString(),
            };

          return {
            ...current,

            actividadesCompletadas:
              Array.from(
                completed
              ),

            insignias:
              Array.from(
                insignias
              ),

            progreso: {
              ...current.progreso,

              "cumplimiento-integridad":
                "completed",

              "cumplimiento-riesgo":
                "completed",
            },

            evaluaciones: {
              ...current.evaluaciones,

              "cumplimiento-integridad":
                evaluation,
            },
          };
        }
      );

      [
        "cumplimiento-conceptos",
        "cumplimiento-linea-etica",
        "cumplimiento-reto",
        "cumplimiento-evaluacion",
      ].forEach((moduleId) => {
        completeModuleInBackend(
          currentSessionId,
          moduleId
        );
      });
    };

  // FINALIZAR FERIA EN DJANGO
  const finalizeSession =
    async () => {
      if (
        !session ||
        session.fechaFinalizacion
      ) {
        return;
      }

      if (!session.sessionId) {
        updateSession(
          (current) => ({
            ...current,

            fechaFinalizacion:
              new Date().toISOString(),

            estado:
              "FINALIZADA",
          })
        );

        return;
      }

      const backendResponse =
        await finalizeBackendSession(
          session.sessionId
        );

      updateSession(
        (current) => ({
          ...current,

          estado:
            backendResponse.sesion.estado ??
            "FINALIZADA",

          fechaFinalizacion:
            backendResponse.sesion
              .fecha_hora_finalizacion ??
            current.fechaFinalizacion ??
            new Date().toISOString(),
        })
      );
    };

  // LOGOUT
  const logout = () => {
    clearLocalSession();

    setUnlockedBadgeId(
      null
    );

    setSession(null);
  };

  // REINICIAR
  const resetTraining =
    () => {
      clearLocalSession();

      setUnlockedBadgeId(
        null
      );

      setSession(null);
    };

  // PROGRESO
  const progressPercentage =
    useMemo(
      () =>
        calculateProgress(
          session
        ),
      [session]
    );

  // PROVIDER
  return (
    <FairSessionContext.Provider
      value={{
        session,

        loading,

        progressPercentage,

        unlockedBadgeId,

        startSession,

        markTopicInProgress,

        completeActivity,

        completeQuiz,

        completeSstModule,

        completeMejoramientoMilestone,

        completeMejoramientoStand,

        completeCumplimientoMilestone,

        completeCumplimientoStand,

        registerActivityAttempt,

        finalizeSession,

        closeBadgeModal,

        updateSession,

        logout,

        resetTraining,
      }}
    >
      {children}
    </FairSessionContext.Provider>
  );
}

// HOOK
export function useFairSession() {
  const context =
    useContext(
      FairSessionContext
    );

  if (!context) {
    throw new Error(
      "useFairSession debe usarse dentro de FairSessionProvider"
    );
  }

  return context;
}
