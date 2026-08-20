"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressDashboard from "@/components/ProgressDashboard";
import FinalResultsView from "@/components/FinalResultsView";
import { useFairSession } from "@/context/FairSessionContext";

export default function ResultsPage() {
  const router =
    useRouter();

  const {
    session,
    loading,
    progressPercentage,
    finalizeSession,
    resetTraining,
  } =
    useFairSession();

  useEffect(() => {
    if (
      !loading &&
      !session
    ) {
      router.replace(
        "/registro"
      );
    }
  }, [
    loading,
    session,
    router,
  ]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">

        <div className="text-center space-y-2">

          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#40647E] rounded-full animate-spin mx-auto" />

          <p className="text-sm font-semibold text-slate-600">
            Cargando reporte...
          </p>

        </div>

      </main>
    );
  }

  if (!session) {
    return null;
  }

  const handleRepeatTraining =
    () => {
      resetTraining();

      router.replace(
        "/registro"
      );
    };

  const handleFinalize =
    () => {
      finalizeSession();
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F8F6] via-white to-[#F2EFEA] text-stone-800">

      <header className="bg-gradient-to-r from-stone-900 to-slate-800 text-white py-4 px-6 border-b border-stone-950 shadow-md">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <h1 className="text-sm sm:text-base font-black uppercase tracking-widest">
            PREBEL{" "}
            <span className="text-[#60A491]">
              Feria Integral
            </span>
          </h1>

          <span className="hidden sm:inline-block text-[10.5px] font-black uppercase tracking-widest bg-blue-500/15 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
            ● REPORTE DEL RECORRIDO
          </span>

        </div>

      </header>

      <ProgressDashboard />

      <main>
        <FinalResultsView
          session={
            session
          }
          progressPercentage={
            progressPercentage
          }
          onFinalize={
            handleFinalize
          }
          onRepeatTraining={
            handleRepeatTraining
          }
          onBackToFair={() =>
            router.push(
              "/feria"
            )
          }
        />
      </main>
    </div>
  );
}