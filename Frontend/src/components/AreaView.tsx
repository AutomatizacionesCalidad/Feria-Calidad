"use client";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  HelpCircle,
  Droplets,
  Search,
  CheckSquare,
} from "lucide-react";
import { Area } from "@/types/feria";
import { useFairSession } from "@/context/FairSessionContext";

interface AreaViewProps { 
  area: Area;
}

export default function AreaView({
  area,
}: AreaViewProps) {
  const router = useRouter();

  const { session } =
    useFairSession();

  if (!session) {
    return null;
  }

  // ICONOS DE LOS TEMAS
  const getTopicIcon = (
    topicId: string
  ) => {
    switch (topicId) {
      case "higiene-manos":
        return (
          <div className="flex items-center justify-center p-1 bg-teal-50 border border-teal-100 rounded-lg">
            <Droplets className="w-6 h-6 text-[#60A491]" />
          </div>
        );

      case "material-extrano":
        return (
          <div className="flex items-center justify-center p-1 bg-[#F2917E]/10 border border-[#F2917E]/20 rounded-lg">
            <Search className="w-6 h-6 text-[#F2917E]" />
          </div>
        );

      case "registros":
        return (
          <div className="flex items-center justify-center p-1 bg-[#40647E]/10 border border-[#40647E]/20 rounded-lg">
            <CheckSquare className="w-6 h-6 text-[#40647E]" />
          </div>
        );

      default:
        return (
          <HelpCircle className="w-6 h-6 text-gray-400" />
        );
    }
  };

  // ESTADO DEL TEMA
  const getTopicStatus = (
    topicId: string
  ) => {
    const activityCompleted =
      session.actividadesCompletadas.includes(
        topicId
      );

    const quizResult =
      session.evaluaciones[
        topicId
      ];

    if (
      activityCompleted &&
      quizResult?.approved
    ) {
      return {
        label: "Completado",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        isDone: true,
        inProgress: false,
      };
    }

    if (
      session.progreso[
        topicId
      ] === "in_progress" ||
      activityCompleted
    ) {
      return {
        label: "En proceso",
        bg: "bg-amber-50 text-amber-600 border-amber-200",
        isDone: false,
        inProgress: true,
      };
    }

    return {
      label: "Pendiente",
      bg: "bg-slate-50 text-slate-500 border-slate-200",
      isDone: false,
      inProgress: false,
    };
  };

  const topics =
    area.topics ?? [];

  // UI
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      {/* CABECERA */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <button
          onClick={() =>
            router.push("/feria")
          }
          className="w-fit py-2 px-4 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer"
          id="btn-volver-pabellon"
        >
          <ArrowLeft
            size={14}
          />

          Volver al recorrido
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-md w-fit">
          Área seleccionada:{" "}
          <strong className="text-slate-800">
            {area.name}
          </strong>
        </span>

      </div>

      {/* PRESENTACIÓN DEL ÁREA */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-lg"
        style={{
          backgroundColor:
            area.color,
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/70">
          Stand activo
        </span>

        <h1 className="text-2xl sm:text-3xl font-black mt-2">
          {area.name}
        </h1>

        <p className="text-sm sm:text-base text-white/85 leading-relaxed mt-3 max-w-3xl">
          {area.description}
        </p>
      </div>

      {/* MÓDULOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {topics.map(
          (topic) => {
            const status =
              getTopicStatus(
                topic.id
              );

            const isDone =
              status.isDone;

            const isStarted =
              status.inProgress;

            return (
              <div
                key={
                  topic.id
                }
                id={`topic-card-${topic.id}`}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200/80 p-6 transition-all duration-200 flex flex-col justify-between ${
                  isDone
                    ? "border-emerald-200 ring-2 ring-emerald-500/5 bg-emerald-50/5"
                    : ""
                }`}
              >

                <div>

                  {/* ICONO + ESTADO */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="p-1 leading-none">
                      {getTopicIcon(
                        topic.id
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${status.bg}`}
                    >
                      {
                        status.label
                      }
                    </span>

                  </div>

                  {/* INFORMACIÓN */}
                  <h3 className="text-base font-bold text-slate-800 leading-snug">
                    {topic.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold mt-2.5">
                    {
                      topic.description
                    }
                  </p>

                  {/* INSIGNIA */}

                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1.5">

                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2A597A] block">
                      Insignia del módulo
                    </span>

                    <div className="flex items-center gap-2.5 bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-lg border border-slate-200 select-none">

                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[#2A597A] shrink-0 border border-white shadow-sm">

                        <Award
                          size={18}
                        />

                      </div>

                      <div>

                        <span className="text-xs sm:text-sm font-black text-slate-800 tracking-tight block leading-snug uppercase">

                          {
                            topic.badge
                              .name
                          }

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ACCIONES */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">

                  <div>

                    {isDone && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">

                        <CheckCircle2
                          size={15}
                        />

                        <span>
                          {
                            session
                              .evaluaciones[
                              topic.id
                            ]?.score
                          }
                          % Aprobado
                        </span>

                      </div>
                    )}

                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/feria/${area.id}/${topic.id}`
                      )
                    }
                    className={`py-2 px-5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDone
                        ? "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300"
                        : isStarted
                        ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                        : "bg-[#40647E] hover:bg-[#345369] text-white shadow-sm"
                    }`}
                    id={`btn-comenzar-tema-${topic.id}`}
                  >

                    {isDone
                      ? "Ver / Repetir"
                      : isStarted
                      ? "Continuar Stand"
                      : "Iniciar Módulo"}

                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>
    </div>
  );
}