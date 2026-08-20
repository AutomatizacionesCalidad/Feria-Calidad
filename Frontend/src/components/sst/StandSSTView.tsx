"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StandSSTWelcome from "./StandSSTWelcome";
import StandSSTRoutes from "./StandSSTRoutes";
import ModulePESV from "./ModulePESV";
import ModuleAccidentalidad from "./ModuleAccidentalidad";
import ModuleEPP from "./ModuleEPP";
import ModuleReglasOro from "./ModuleReglasOro";
import StandSSTCompleted from "./StandSSTCompleted";
import { useFairSession } from "@/context/FairSessionContext";

type SSTSubView =
  | "welcome"
  | "routes"
  | "module-pesv"
  | "module-accidentalidad"
  | "module-epp"
  | "module-reglas-oro"
  | "completed";

export default function StandSSTView() {
  const router = useRouter();

  const {
    session,
    completeSstModule,
  } = useFairSession();

  const [subView, setSubView] =
    useState<SSTSubView>(
      "welcome"
    );

  if (!session) {
    return null;
  }

  // MÓDULOS SST
  const sstModuleIds = [
    "pesv",
    "accidentalidad",
    "epp",
    "reglas-oro",
  ];

  const completedModules =
    sstModuleIds.filter(
      (moduleId) =>
        session.actividadesCompletadas.includes(
          moduleId
        ) ||
        session.evaluaciones[
          moduleId
        ]?.approved === true
    );

  const sstProgress =
    Math.round(
      (completedModules.length /
        sstModuleIds.length) *
        100
    );

  // SELECCIONAR MÓDULO
  const handleSelectModule = (
    moduleId: string
  ) => {
    switch (moduleId) {
      case "pesv":
        setSubView(
          "module-pesv"
        );
        break;

      case "accidentalidad":
        setSubView(
          "module-accidentalidad"
        );
        break;

      case "epp":
        setSubView(
          "module-epp"
        );
        break;

      case "reglas-oro":
        setSubView(
          "module-reglas-oro"
        );
        break;

      default:
        setSubView(
          "routes"
        );
    }
  };

  // COMPLETAR MÓDULO
  const handleCompleteModule =
    (
      moduleId: string,
      badgeId: string
    ) => {
      completeSstModule(
        moduleId,
        badgeId
      );

      const completedSet =
        new Set([
          ...completedModules,
          moduleId,
        ]);

      if (
        completedSet.size ===
        sstModuleIds.length
      ) {
        setSubView(
          "completed"
        );
      }
  };

  // VOLVER A FERIA
  const handleBackToFair =
    () => {
      router.push(
        "/feria"
      );
    };

  // RENDER
  return (
    <div className="w-full">

      {/* BIENVENIDA */}
      {subView ===
        "welcome" && (
        <StandSSTWelcome
          onStartRoute={() =>
            setSubView(
              "routes"
            )
          }
          onBackToFair={
            handleBackToFair
          }
          sstProgress={
            sstProgress
          }
        />
      )}

      {/* RUTA */}
      {subView ===
        "routes" && (
        <StandSSTRoutes
          session={
            session
          }
          onSelectModule={
            handleSelectModule
          }
          onBackToWelcome={() =>
            setSubView(
              "welcome"
            )
          }
          onGoToCompleted={() =>
            setSubView(
              "completed"
            )
          }
        />
      )}

      {/* PESV */}
      {subView ===
        "module-pesv" && (
        <ModulePESV
          onComplete={() =>
            handleCompleteModule(
              "pesv",
              "badge-pesv"
            )
          }
          onBackToRoute={() =>
            setSubView(
              "routes"
            )
          }
          alreadyCompleted={
            session.actividadesCompletadas.includes(
              "pesv"
            )
          }
        />
      )}

      {/* ACCIDENTALIDAD */}
      {subView ===
        "module-accidentalidad" && (
        <ModuleAccidentalidad
          onComplete={() =>
            handleCompleteModule(
              "accidentalidad",
              "badge-accidentalidad"
            )
          }
          onBackToRoute={() =>
            setSubView(
              "routes"
            )
          }
          alreadyCompleted={
            session.actividadesCompletadas.includes(
              "accidentalidad"
            )
          }
        />
      )}

      {/* EPP */}
      {subView ===
        "module-epp" && (
        <ModuleEPP
          onComplete={() =>
            handleCompleteModule(
              "epp",
              "badge-epp"
            )
          }
          onBackToRoute={() =>
            setSubView(
              "routes"
            )
          }
          alreadyCompleted={
            session.actividadesCompletadas.includes(
              "epp"
            )
          }
        />
      )}

      {/* REGLAS DE ORO */}
      {subView ===
        "module-reglas-oro" && (
        <ModuleReglasOro
          onComplete={() =>
            handleCompleteModule(
              "reglas-oro",
              "badge-reglas-oro"
            )
          }
          onBackToRoute={() =>
            setSubView(
              "routes"
            )
          }
          alreadyCompleted={
            session.actividadesCompletadas.includes(
              "reglas-oro"
            )
          }
        />
      )}

      {/* FINAL */}
      {subView ===
        "completed" && (
        <StandSSTCompleted
          onBackToRoute={() =>
            setSubView(
              "routes"
            )
          }
          onFinishStand={
            handleBackToFair
          }
        />
      )}

    </div>
  );
}