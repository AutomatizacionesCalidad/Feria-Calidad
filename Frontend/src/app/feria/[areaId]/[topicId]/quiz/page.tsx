"use client";
import {
  use,
  useEffect,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  fairData,
} from "@/data/fairData";
import {
  useFairSession,
} from "@/context/FairSessionContext";
import ProgressDashboard from "@/components/ProgressDashboard";
import QuizView from "@/components/QuizView";

interface QuizPageProps {
  params: Promise<{
    areaId: string;
    topicId: string;
  }>;
}

export default function QuizPage({
  params,
}: QuizPageProps) {
  const {
    areaId,
    topicId,
  } = use(params);

  const router =
    useRouter();

  const {
    session,
    loading,
  } = useFairSession();

  const area =
    fairData.areas.find(
      (areaItem) =>
        areaItem.id ===
        areaId
    );

  const topic =
    area?.topics?.find(
      (topicItem) =>
        topicItem.id ===
        topicId
    );

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

  useEffect(() => {
    if (
      !loading &&
      session &&
      (!area ||
        !topic)
    ) {
      router.replace(
        "/feria"
      );
    }
  }, [
    loading,
    session,
    area,
    topic,
    router,
  ]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">

        <div className="text-center space-y-2">

          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#40647E] rounded-full animate-spin mx-auto" />

          <p className="text-sm font-semibold text-slate-600">
            Cargando evaluación...
          </p>

        </div>

      </main>
    );
  }

  if (
    !session ||
    !area ||
    !topic
  ) {
    return null;
  }

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

            ● EVALUACIÓN EN CURSO

          </span>
        </div>

      </header>

      <ProgressDashboard />

      <main className="py-4 px-2 sm:py-6 sm:px-4">

        <QuizView
          areaId={
            areaId
          }
          topic={
            topic
          }
        />

      </main>
    </div>
  );
}