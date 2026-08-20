"use client";
import { useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  ClipboardCheck,
  CornerDownRight,
  Factory,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { fairData } from "@/data/fairData";
import { useFairSession } from "@/context/FairSessionContext";
import {
  getCalidadProgress,
  getCumplimientoProgress,
  getMejoramientoProgress,
  getSstProgress,
} from "@/utils/progress";

type StandStatus = {
  label: string;
  percent: number;
  colorClass: string;
};

export default function FairMapView() {
  const router = useRouter();

  const {
    session,
  } = useFairSession();

  if (!session) {
    return null;
  }

  const buildStatus = (
    percent: number
  ): StandStatus => {
    if (percent <= 0) {
      return {
        label: "PENDIENTE",
        percent: 0,
        colorClass:
          "bg-gray-100 text-gray-500 border-gray-300",
      };
    }

    if (percent >= 100) {
      return {
        label: "COMPLETADO",
        percent: 100,
        colorClass:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }

    return {
      label: "EN PROCESO",
      percent,
      colorClass:
        "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  const statusByArea: Record<
    string,
    StandStatus
  > = {
    calidad: buildStatus(
      getCalidadProgress(session)
    ),

    sst: buildStatus(
      getSstProgress(session)
    ),

    "mejoramiento-continuo":
      buildStatus(
        getMejoramientoProgress(
          session
        )
      ),

    "cumplimiento-riesgo":
      buildStatus(
        getCumplimientoProgress(
          session
        )
      ),
  };

  const renderAreaIcon = (
    areaId: string
  ) => {
    switch (areaId) {
      case "calidad":
        return (
          <div className="relative flex items-center justify-center">
            <Factory className="w-10 h-10 text-[#2A597A]" />

            <div className="absolute -bottom-1 -right-1.5 bg-[#2A597A] p-0.5 rounded-lg border-2 border-white shadow">
              <ClipboardCheck className="w-4 h-4 text-white" />
            </div>
          </div>
        );

      case "sst":
        return (
          <ShieldCheck className="w-10 h-10 text-[#60A491]" />
        );

      case "mejoramiento-continuo":
        return (
          <TrendingUp className="w-10 h-10 text-[#5B7F71]" />
        );

      case "cumplimiento-riesgo":
        return (
          <Scale className="w-10 h-10 text-[#E07A5F]" />
        );

      default:
        return (
          <Award className="w-10 h-10 text-slate-400" />
        );
    }
  };

  const getStandLabel = (
    areaId: string
  ) => {
    switch (areaId) {
      case "calidad":
        return "STAND 01 · CALIDAD";

      case "sst":
        return "STAND 02 · SST";

      case "mejoramiento-continuo":
        return "STAND 03 · MEJORAMIENTO";

      case "cumplimiento-riesgo":
        return "STAND 04 · CUMPLIMIENTO";

      default:
        return "STAND";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      {/* CABECERA */}
      <div className="text-center mb-10 max-w-3xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A597A] tracking-tight uppercase">
          BIENVENIDO - FERIA INTEGRAL
        </h2>

        <p className="text-slate-700 text-sm sm:text-base mt-4 leading-relaxed font-semibold">
          En este recorrido interactivo visitarás diferentes stands diseñados para fortalecer tus conocimientos sobre temas importantes de la compañía.
        </p>

        <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
          Avanza por cada estación, explora los contenidos y participa en las actividades de entrenamiento que hemos preparado para ti.
        </p>

      </div>

      {/* STANDS */}
      <div className="relative mb-12">

        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-1.5 rounded-full top-1/2 -translate-y-1/2 hidden lg:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

          {fairData.areas.map(
            (area) => {
              const status =
                statusByArea[
                  area.id
                ];

              const isActive =
                !area.isPlaceholder &&
                Boolean(status);

              return (
                <div
                  key={area.id}
                  className={`rounded-2xl overflow-hidden shadow-md border transition-all duration-300 flex flex-col justify-between bg-white ${
                    isActive
                      ? "hover:shadow-xl hover:-translate-y-1.5 border-slate-300"
                      : "border-gray-200 opacity-60"
                  }`}
                >

                  {/* HEADER */}
                  <div
                    className="py-4 px-5 text-white flex items-center justify-between"
                    style={{
                      backgroundColor:
                        area.color,
                    }}
                  >

                    <span className="text-xs font-bold tracking-wider uppercase">
                      {getStandLabel(
                        area.id
                      )}
                    </span>

                    {isActive && (
                      <div className="flex items-center gap-1.5">

                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 inline-block" />

                        <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
                          Activo
                        </span>

                      </div>
                    )}

                  </div>

                  {/* BODY */}
                  <div className="p-6 flex-1 flex flex-col">

                    <div className="flex items-start gap-4 mb-4">

                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-inner shrink-0">
                        {renderAreaIcon(
                          area.id
                        )}
                      </div>

                      <div className="flex-1">

                        <h3 className="text-lg font-bold text-slate-800 leading-snug">
                          {area.name}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-semibold mt-1">
                          {
                            area.description
                          }
                        </p>

                      </div>

                    </div>

                    {isActive &&
                    status ? (
                      <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">

                        <div className="flex items-center justify-between">

                          <span className="text-xs font-bold text-gray-500">
                            Estado
                          </span>

                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-full ${status.colorClass}`}
                          >
                            {
                              status.label
                            }
                          </span>

                        </div>

                        <div className="space-y-1">

                          <div className="flex justify-between text-[11px] font-semibold text-gray-500">

                            <span>
                              Completado
                            </span>

                            <span>
                              {
                                status.percent
                              }
                              %
                            </span>

                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-1.5">

                            <div
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{
                                width: `${status.percent}%`,
                                backgroundColor:
                                  area.color,
                              }}
                            />

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/feria/${area.id}`
                            )
                          }
                          className="w-full py-2.5 px-4 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                          style={{
                            backgroundColor:
                              area.color,
                          }}
                        >

                          <CornerDownRight
                            size={14}
                          />

                          Ingresar al Stand

                        </button>

                      </div>
                    ) : (
                      <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-slate-400">
                        Módulo no disponible.
                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="space-y-2">

          <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">

            <Award className="text-[#60A491]" />

            Tu Progreso de Certificación

          </h4>

          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Completa los cuatro stands de la Feria Integral: Calidad, SST, Mejoramiento Continuo y Cumplimiento y Riesgo.
          </p>

        </div>

        <div className="flex gap-4 shrink-0 w-full md:w-auto">

          <button
            type="button"
            onClick={() =>
              router.push(
                "/resultados"
              )
            }
            className="flex-1 md:flex-none py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all border border-stone-300 flex items-center justify-center gap-2 cursor-pointer"
          >

            <BarChart3
              size={15}
            />

            Ver Reporte Final

          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/feria/calidad"
              )
            }
            className="flex-1 md:flex-none py-3 px-6 bg-[#60A491] hover:bg-[#4E8777] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Comenzar Entrenamiento
          </button>

        </div>
      </div>
    </div>
  );
}