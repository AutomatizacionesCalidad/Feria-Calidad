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
import AreaView from "@/components/AreaView";
import StandSSTView from "@/components/sst/StandSSTView";
import StandMejoramientoView from "@/components/mejoramiento/StandMejoramientoView";
import StandCumplimientoView from "@/components/cumplimiento/StandCumplimientoView";

interface AreaPageProps {
  params: Promise<{
    areaId: string;
  }>;
}

export default function AreaPage({
  params,
}: AreaPageProps) {
  const {
    areaId,
  } = use(params);

  const router =
    useRouter();

  const {
    session,
    loading,
  } =
    useFairSession();

  const area =
    fairData.areas.find(
      (
        currentArea
      ) =>
        currentArea.id ===
        areaId
    );

  // PROTECCIÓN DE SESIÓN
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

  // ÁREA INVÁLIDA
  useEffect(() => {
    if (
      !loading &&
      session &&
      !area
    ) {
      router.replace(
        "/feria"
      );
    }
  }, [
    loading,
    session,
    area,
    router,
  ]);

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">

        <div className="text-center space-y-3">

          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#40647E] rounded-full animate-spin mx-auto" />

          <p className="text-sm font-semibold text-slate-600">
            Cargando stand...
          </p>

        </div>

      </main>
    );
  }

  if (
    !session ||
    !area
  ) {
    return null;
  }

  // SST
  if (
    area.id === "sst"
  ) {
    return (
      <div className="min-h-screen bg-[#F9F8F6]">

        <ProgressDashboard />

        <StandSSTView />

      </div>
    );
  }

  // MEJORAMIENTO CONTINUO
  if (
    area.id ===
    "mejoramiento-continuo"
  ) {
    return (
      <div className="min-h-screen bg-[#F9F8F6]">

        <ProgressDashboard />

        <StandMejoramientoView />

      </div>
    );
  }

  // CUMPLIMIENTO
  if (
    area.id ===
    "cumplimiento-riesgo"
  ) {
    return (
      <div className="min-h-screen bg-[#F9F8F6]">

        <ProgressDashboard />

        <StandCumplimientoView />

      </div>
    );
  }

  // CALIDAD
  return (
    <div className="min-h-screen bg-[#F9F8F6]">

      <ProgressDashboard />

      <AreaView
        area={
          area
        }
      />

    </div>
  );
}