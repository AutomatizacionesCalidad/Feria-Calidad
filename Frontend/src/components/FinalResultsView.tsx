"use client";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Droplets,
  RefreshCw,
  Search,
  Shield,
  Trophy,
  User,
  Car,
  AlertTriangle,
  Scale,
  TrendingUp,
} from "lucide-react";
import { fairData } from "@/data/fairData";
import { UserSession } from "@/types/feria";
import { getUserLevel } from "@/utils/progress";
import { getFinalPayload } from "@/utils/finalResults";

interface FinalResultsViewProps {
  session: UserSession;
  progressPercentage: number;
  onRepeatTraining: () => void;
  onBackToFair: () => void;
  onFinalize: () => void;
}

type BadgeInfo = {
  id: string;
  name: string;
  color: string;
  description: string;
};

export default function FinalResultsView({
  session,
  progressPercentage,
  onRepeatTraining,
  onBackToFair,
  onFinalize,
}: FinalResultsViewProps) {
  const level =
    getUserLevel(
      progressPercentage
    );

  // BADGES DINÁMICOS
  const badges: BadgeInfo[] =
    fairData.areas
      .filter(
        (area) =>
          !area.isPlaceholder
      )
      .flatMap(
        (area) =>
          area.topics?.map(
            (topic) => ({
              id:
                topic.badge.id,

              name:
                topic.badge.name,

              color:
                topic.badge.color,

              description:
                topic.description ??
                topic.name,
            })
          ) ?? []
      );

  const totalBadges =
    badges.length;

  const earnedBadges =
    session.insignias.length;

  // PROMEDIO
  const evaluations =
    Object.values(
      session.evaluaciones
    );

  const averageScore =
    evaluations.length === 0
      ? 0
      : Math.round(
          evaluations.reduce(
            (
              accumulator,
              evaluation
            ) =>
              accumulator +
              evaluation.score,
            0
          ) /
            evaluations.length
        );

  // ICONOS
  const getBadgeIcon = (
    badgeId: string
  ) => {
    switch (badgeId) {
      case "badge-higiene-manos":
        return (
          <Droplets className="w-7 h-7 text-white" />
        );

      case "badge-cero-material-extrano":
        return (
          <Search className="w-7 h-7 text-white" />
        );

      case "badge-registro-impecable":
        return (
          <CheckCircle2 className="w-7 h-7 text-white" />
        );

      case "badge-pesv":
        return (
          <Car className="w-7 h-7 text-white" />
        );

      case "badge-accidentalidad":
        return (
          <AlertTriangle className="w-7 h-7 text-white" />
        );

      case "badge-epp":
        return (
          <Shield className="w-7 h-7 text-white" />
        );

      case "badge-reglas-oro":
        return (
          <Award className="w-7 h-7 text-white" />
        );

      case "badge-embajador-cumplimiento":
        return (
          <Scale className="w-7 h-7 text-white" />
        );

      case "badge-transformacion-mejora":
        return (
          <TrendingUp className="w-7 h-7 text-white" />
        );
      
      default:
        return (
          <Award className="w-7 h-7 text-white" />
        );
    }
  };

  // DESCARGA JSON LOCAL
  const handleDownloadReport =
    () => {
      const payload =
        getFinalPayload(
          session,
          progressPercentage
        );

      const blob =
        new Blob(
          [
            JSON.stringify(
              payload,
              null,
              2
            ),
          ],
          {
            type: "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const anchor =
        document.createElement(
          "a"
        );

      anchor.href =
        url;

      anchor.download =
        `feria-prebel-${session.cedula}.json`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(
        url
      );
    };

  const isCompleted =
    progressPercentage >= 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#2A597A] via-[#40647E] to-slate-900 text-white p-8 sm:p-10 text-center relative">

          <span className="absolute top-4 right-4 bg-white/10 border border-white/20 text-[10px] font-black uppercase px-3 py-1 rounded-full">

            Reporte Integral de Feria

          </span>

          <Trophy className="w-14 h-14 text-[#F2917E] mx-auto mb-3" />

          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight">

            Informe de Entrenamiento Prebel S.A.S BIC

          </h2>

          <p className="text-white/75 text-xs sm:text-sm mt-2">

            Consolidado de participación, avance, evaluaciones e insignias obtenidas.

          </p>

        </div>

        <div className="p-6 sm:p-8 space-y-8">

          {/* PARTICIPANTE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <User
                size={18}
                className="text-[#40647E]"
              />

              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase block">
                  Cédula
                </span>

                <span className="text-xs font-bold text-slate-800">
                  C.C. {session.cedula}
                </span>
              </div>

            </div>

            <div className="flex items-center gap-3 sm:border-l border-slate-200 sm:pl-4">

              <Briefcase
                size={18}
                className="text-[#40647E]"
              />

              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase block">
                  Área
                </span>

                <span className="text-xs font-bold text-slate-800">
                  {session.area}
                </span>
              </div>

            </div>

            <div className="flex items-center gap-3 sm:border-l border-slate-200 sm:pl-4">

              <Calendar
                size={18}
                className="text-[#40647E]"
              />

              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase block">
                  Fecha
                </span>

                <span className="text-xs font-bold text-slate-800">
                  {
                    session.fechaEjecucion
                  }
                </span>
              </div>

            </div>

          </div>

          {/* MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="border border-slate-200 rounded-2xl p-5">

              <span className="text-[10px] font-black uppercase text-slate-400">
                Progreso General
              </span>

              <div className="text-3xl font-black text-[#40647E] mt-2">
                {progressPercentage}%
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">

                <div
                  className="h-full bg-[#60A491] rounded-full"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="border border-slate-200 rounded-2xl p-5">

              <span className="text-[10px] font-black uppercase text-slate-400">
                Insignias
              </span>

              <div className="text-3xl font-black text-[#60A491] mt-2">
                {earnedBadges} / {totalBadges}
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Reconocimientos obtenidos durante el recorrido.
              </p>

            </div>

            <div className="border border-slate-200 rounded-2xl p-5">

              <span className="text-[10px] font-black uppercase text-slate-400">
                Promedio Evaluaciones
              </span>

              <div className="text-3xl font-black text-[#E07A5F] mt-2">
                {averageScore}%
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Promedio de las evaluaciones registradas.
              </p>

            </div>

          </div>

          {/* NIVEL */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#40647E]/5 to-[#60A491]/10 border border-[#40647E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase">
                Nivel alcanzado
              </span>

              <h3 className="text-lg font-black text-[#40647E]">
                {level}
              </h3>
            </div>

            <span
              className={`text-xs font-black uppercase px-4 py-2 rounded-full border ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-amber-50 text-amber-700 border-amber-300"
              }`}
            >
              {isCompleted
                ? "Feria completada"
                : "Recorrido en curso"}
            </span>

          </div>

          {/* BADGES */}
          <div className="space-y-4">

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">

              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                Colección de Insignias
              </h4>

              <span className="text-xs font-bold text-slate-400">
                {earnedBadges} de {totalBadges}
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {badges.map(
                (badge) => {
                  const unlocked =
                    session.insignias.includes(
                      badge.id
                    );

                  return (
                    <div
                      key={
                        badge.id
                      }
                      className={`border rounded-2xl p-4 text-center min-h-[190px] flex flex-col items-center justify-between transition-all ${
                        unlocked
                          ? "bg-white border-emerald-200 shadow-sm"
                          : "bg-slate-50 border-slate-200 opacity-55"
                      }`}
                    >

                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                        style={{
                          backgroundColor:
                            unlocked
                              ? badge.color
                              : "#CBD5E1",
                        }}
                      >
                        {unlocked
                          ? getBadgeIcon(
                              badge.id
                            )
                          : (
                            <Award className="w-6 h-6 text-white" />
                          )}
                      </div>

                      <div className="mt-3">

                        <span className="text-xs font-black text-slate-800 block uppercase leading-snug">
                          {badge.name}
                        </span>

                        <span className="text-[10px] text-slate-500 block mt-2 leading-relaxed">
                          {badge.description}
                        </span>

                      </div>

                      <span
                        className={`text-[9px] font-black uppercase mt-3 px-2.5 py-1 rounded-full border ${
                          unlocked
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {unlocked
                          ? "✓ Obtenida"
                          : "Bloqueada"}
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">
                Inicio de entrenamiento
              </span>

              <p className="text-xs font-bold text-slate-700 mt-1">
                {new Date(
                  session.fechaInicio
                ).toLocaleString(
                  "es-CO"
                )}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">
                Finalización
              </span>

              <p className="text-xs font-bold text-slate-700 mt-1">
                {session.fechaFinalizacion
                  ? new Date(
                      session.fechaFinalizacion
                    ).toLocaleString(
                      "es-CO"
                    )
                  : "Pendiente"}
              </p>
            </div>

          </div>

          {/* ACCIONES */}
          <div className="border-t border-slate-100 pt-6 space-y-4">

            {isCompleted &&
              !session.fechaFinalizacion && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                  <div>
                    <span className="text-xs font-black text-emerald-800 block">
                      Recorrido completo
                    </span>

                    <span className="text-[11px] text-emerald-700">
                      Puedes cerrar oficialmente tu participación en la Feria Integral.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={
                      onFinalize
                    }
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black cursor-pointer"
                  >
                    Finalizar Feria
                  </button>

                </div>
              )}

            <div className="flex flex-col sm:flex-row gap-3 justify-between">

              <button
                type="button"
                onClick={
                  onRepeatTraining
                }
                className="py-3 px-5 text-[#F2917E] hover:bg-rose-50 rounded-xl text-xs font-black border border-[#F2917E]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw
                  size={14}
                />

                Repetir Entrenamiento
              </button>

              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  type="button"
                  onClick={
                    handleDownloadReport
                  }
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black border border-slate-300 cursor-pointer"
                >
                  Descargar Reporte JSON
                </button>

                <button
                  type="button"
                  onClick={
                    onBackToFair
                  }
                  className="py-3 px-6 bg-[#40647E] hover:bg-[#345369] text-white rounded-xl text-xs font-black cursor-pointer"
                >
                  Volver a la Feria
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}