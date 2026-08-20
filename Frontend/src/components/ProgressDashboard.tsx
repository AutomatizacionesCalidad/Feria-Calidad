"use client";
import {
  Award,
  Calendar,
  LogOut,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFairSession } from "@/context/FairSessionContext";
import {
  getUserLevel,
} from "@/utils/progress";

const TOTAL_BADGES = 9;

export default function ProgressDashboard() {
  const router =
    useRouter();

  const {
    session,
    progressPercentage,
    logout,
  } =
    useFairSession();

  if (!session) {
    return null;
  }

  const level =
    getUserLevel(
      progressPercentage
    );

  const badgeCount =
    session.insignias.length;

  const handleLogout =
    () => {
      logout();

      router.replace(
        "/registro"
      );
    };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">

      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* PARTICIPANTE */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-full bg-[#40647E]/10 flex items-center justify-center text-[#40647E]">
                <User size={20} />
              </div>

              <div>

                <div className="text-xs text-slate-500 font-semibold">
                  PARTICIPANTE
                </div>

                <div className="text-sm font-bold text-gray-800">
                  C.C. {
                    session.cedula
                  }
                </div>

              </div>

            </div>

            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">

              <Calendar
                size={16}
                className="text-slate-500"
              />

              <div>

                <div className="text-[10px] text-gray-400 font-semibold uppercase leading-none">
                  FECHA
                </div>

                <div className="text-xs font-semibold text-gray-700">
                  {
                    session.fechaEjecucion
                  }
                </div>

              </div>

            </div>

          </div>

          {/* ESTADÍSTICAS */}
          <div className="flex flex-1 md:max-w-lg items-center gap-4 justify-between md:justify-end">

            <div className="flex-1 max-w-xs">

              <div className="flex justify-between items-center text-xs mb-1">

                <span className="font-semibold text-slate-500">
                  Progreso General
                </span>

                <span className="font-bold text-[#40647E]">
                  {
                    progressPercentage
                  }
                  %
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">

                <div
                  className="bg-[#60A491] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="text-right hidden sm:block">

                <div className="text-[10px] text-gray-400 font-semibold uppercase leading-none">
                  NIVEL FERIA
                </div>

                <div className="text-xs font-bold text-[#60A491]">
                  {level}
                </div>

              </div>

              <div className="bg-[#60A491]/10 text-[#4E8777] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">

                <Award size={16} />

                <span className="text-sm font-extrabold">
                  {badgeCount} /{" "}
                  {TOTAL_BADGES}
                </span>

              </div>

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="p-1.5 text-gray-400 hover:text-[#E07A5F] hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200 cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut
                  size={18}
                />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}