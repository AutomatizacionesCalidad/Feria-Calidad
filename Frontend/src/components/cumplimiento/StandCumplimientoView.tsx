"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StandCumplimientoWelcome from "./StandCumplimientoWelcome";
import Estacion01Protegemos from "./Estacion01Protegemos";
import Estacion02Sagrilaft from "./Estacion02Sagrilaft";
import Estacion03Ptee from "./Estacion03Ptee";
import Estacion04LineaEtica from "./Estacion04LineaEtica";
import Estacion05RetoQueHarias from "./Estacion05RetoQueHarias";
import Estacion06Evaluacion from "./Estacion06Evaluacion";
import StandCumplimientoInsignia from "./StandCumplimientoInsignia";
import { useFairSession } from "@/context/FairSessionContext";
import { getCumplimientoProgress } from "@/utils/progress";

type SubViewType =
  | "welcome"
  | "estacion-01"
  | "estacion-02"
  | "estacion-03"
  | "estacion-04"
  | "estacion-05"
  | "estacion-06"
  | "insignia";

export default function StandCumplimientoView() {
  const router = useRouter();

  const {
    session,
    completeCumplimientoMilestone,
    completeCumplimientoStand,
  } = useFairSession();

  const [subView, setSubView] =
    useState<SubViewType>("welcome");

  if (!session) {
    return null;
  }

  const localProgress =
    getCumplimientoProgress(session);

  // NAVEGACIÓN
  const handleBackToFair = () => {
    router.push("/feria");
  };

  // FINALIZAR STAND
  const handleFinishStand = () => {
    completeCumplimientoStand();

    setSubView("insignia");
  };

  // MENÚ SUPERIOR DE ESTACIONES
  const stationSteps: {
    id: SubViewType;
    label: string;
  }[] = [
    {
      id: "estacion-01",
      label: "01. Política",
    },
    {
      id: "estacion-02",
      label: "02. SAGRILAFT",
    },
    {
      id: "estacion-03",
      label: "03. PTEE",
    },
    {
      id: "estacion-04",
      label: "04. Línea Ética",
    },
    {
      id: "estacion-05",
      label: "05. Reto",
    },
    {
      id: "estacion-06",
      label: "06. Evaluación",
    },
  ];

  return (
    <div className="w-full pb-12">

      {/* SUBNAVEGACIÓN */}
      {subView !== "welcome" &&
        subView !== "insignia" && (
          <div className="max-w-4xl mx-auto px-4 mb-4">

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">

              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">

                {stationSteps.map(
                  (step) => {
                    const isActive =
                      subView ===
                      step.id;

                    return (
                      <button
                        key={
                          step.id
                        }
                        type="button"
                        onClick={() =>
                          setSubView(
                            step.id
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-[#E07A5F] text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {
                          step.label
                        }
                      </button>
                    );
                  }
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setSubView(
                    "welcome"
                  )
                }
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 hover:underline shrink-0 ml-2 cursor-pointer"
              >
                Menú Stand
              </button>

            </div>

          </div>
        )}

      {/* BIENVENIDA */}
      {subView ===
        "welcome" && (
        <StandCumplimientoWelcome
          onStartRoute={() =>
            setSubView(
              "estacion-01"
            )
          }
          onBackToFair={
            handleBackToFair
          }
          progressPercent={
            localProgress
          }
        />
      )}

      {/* ESTACIÓN 01 */}
      {subView ===
        "estacion-01" && (
        <Estacion01Protegemos
          onPrev={() =>
            setSubView(
              "welcome"
            )
          }
          onNext={() =>
            setSubView(
              "estacion-02"
            )
          }
        />
      )}

      {/* ESTACIÓN 02 */}
      {subView ===
        "estacion-02" && (
        <Estacion02Sagrilaft
          onPrev={() =>
            setSubView(
              "estacion-01"
            )
          }
          onNext={() => {
            completeCumplimientoMilestone(
              "cumplimiento-conceptos"
            );

            setSubView(
              "estacion-03"
            );
          }}
        />
      )}

      {/* ESTACIÓN 03 */}
      {subView ===
        "estacion-03" && (
        <Estacion03Ptee
          onPrev={() =>
            setSubView(
              "estacion-02"
            )
          }
          onNext={() =>
            setSubView(
              "estacion-04"
            )
          }
        />
      )}

      {/* ESTACIÓN 04 */}
      {subView ===
        "estacion-04" && (
        <Estacion04LineaEtica
          onPrev={() =>
            setSubView(
              "estacion-03"
            )
          }
          onNext={() => {
            completeCumplimientoMilestone(
              "cumplimiento-linea-etica"
            );

            setSubView(
              "estacion-05"
            );
          }}
        />
      )}

      {/* ESTACIÓN 05 */}
      {subView ===
        "estacion-05" && (
        <Estacion05RetoQueHarias
          onPrev={() =>
            setSubView(
              "estacion-04"
            )
          }
          onComplete={() => {
            completeCumplimientoMilestone(
              "cumplimiento-reto"
            );

            setSubView(
              "estacion-06"
            );
          }}
          alreadyCompleted={
            session.actividadesCompletadas.includes(
              "cumplimiento-reto"
            )
          }
        />
      )}

      {/* ESTACIÓN 06 */}
      {subView ===
        "estacion-06" && (
        <Estacion06Evaluacion
          onPrev={() =>
            setSubView(
              "estacion-05"
            )
          }
          onPassed={() => {
            completeCumplimientoMilestone(
              "cumplimiento-evaluacion"
            );

            handleFinishStand();
          }}
        />
      )}

      {/* INSIGNIA */}
      {subView ===
        "insignia" && (
        <StandCumplimientoInsignia
          participantName={`C.C. ${session.cedula} (${session.area})`}
          onFinish={
            handleBackToFair
          }
          onReview={() =>
            setSubView(
              "welcome"
            )
          }
        />
      )}

    </div>
  );
}