"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useFairSession } from "@/context/FairSessionContext";
import { getMejoramientoProgress } from "@/utils/progress";
import StandMejoramientoWelcome from "@/components/mejoramiento/StandMejoramientoWelcome";
import Tema01SembrandoIdeas from "@/components/mejoramiento/Tema01SembrandoIdeas";
import Tema02Tpm from "@/components/mejoramiento/Tema02Tpm";
import Tema03SeisSigma from "@/components/mejoramiento/Tema03SeisSigma";
import TransicionRetoFinal from "@/components/mejoramiento/TransicionRetoFinal";
import FillFormulaChallenge from "@/components/mejoramiento/FillFormulaChallenge";
import StandMejoramientoInsignia from "@/components/mejoramiento/StandMejoramientoInsignia";

type SubView =
  | "welcome"
  | "sembrando"
  | "tpm"
  | "seis-sigma"
  | "transicion"
  | "formula"
  | "badge";

export default function StandMejoramientoView() {
  const router = useRouter();

  const {
    session,
    completeMejoramientoMilestone,
    completeMejoramientoStand,
  } = useFairSession();

  const [subView, setSubView] =
    useState<SubView>("welcome");

  if (!session) {
    return null;
  }

  // ESTADOS
  const standPercent =
    getMejoramientoProgress(session);

  const isStandCompleted =
    session.actividadesCompletadas.includes(
      "mejoramiento-continuo"
    );

  const isSembrandoDone =
    isStandCompleted ||
    session.actividadesCompletadas.includes(
      "mejoramiento-sembrando"
    );

  const isTpmDone =
    isStandCompleted ||
    session.actividadesCompletadas.includes(
      "mejoramiento-tpm"
    );

  const is6SigmaDone =
    isStandCompleted ||
    session.actividadesCompletadas.includes(
      "mejoramiento-6sigma"
    );

  const isFormulaDone =
    isStandCompleted ||
    session.actividadesCompletadas.includes(
      "mejoramiento-formula"
    );

  // NAVEGACIÓN
  const handleBackToFair = () => {
    router.push("/feria");
  };

  const handleFormulaPassed = () => {
    completeMejoramientoStand();

    setSubView("badge");
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">

      {/* SUB HEADER */}
      {subView !== "welcome" &&
        subView !== "badge" && (
          <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">

            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

              {/* TÍTULO */}
              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setSubView("welcome")
                  }
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  title="Volver a la portada del stand"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-[#5B7F71] block">
                    STAND 03 · MEJORAMIENTO CONTINUO
                  </span>

                  <span className="text-xs sm:text-sm font-bold text-slate-800">

                    {subView === "sembrando" &&
                      "🌱 01. Sembrando Ideas"}

                    {subView === "tpm" &&
                      "⚙️ 02. TPM"}

                    {subView === "seis-sigma" &&
                      "📊 03. 6 Sigma + Lean"}

                    {subView === "transicion" &&
                      "✨ Síntesis de Enfoques"}

                    {subView === "formula" &&
                      "🚀 Reto Final: Completa la Fórmula"}

                  </span>

                </div>

              </div>

              {/* NAVEGACIÓN ESCRITORIO */}
              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold">

                {/* SEMBRANDO */}
                <button
                  type="button"
                  onClick={() =>
                    setSubView("sembrando")
                  }
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === "sembrando"
                      ? "bg-[#5B7F71] text-white"
                      : isSembrandoDone
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isSembrandoDone ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    "01"
                  )}

                  <span>Sembrando</span>
                </button>

                <span className="text-slate-300">
                  →
                </span>

                {/* TPM */}
                <button
                  type="button"
                  onClick={() =>
                    setSubView("tpm")
                  }
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === "tpm"
                      ? "bg-[#5B7F71] text-white"
                      : isTpmDone
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isTpmDone ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    "02"
                  )}

                  <span>TPM</span>
                </button>

                <span className="text-slate-300">
                  →
                </span>

                {/* 6 SIGMA */}
                <button
                  type="button"
                  onClick={() =>
                    setSubView("seis-sigma")
                  }
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === "seis-sigma"
                      ? "bg-[#5B7F71] text-white"
                      : is6SigmaDone
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {is6SigmaDone ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    "03"
                  )}

                  <span>6 Sigma</span>
                </button>

                <span className="text-slate-300">
                  →
                </span>

                {/* FORMULA */}
                <button
                  type="button"
                  onClick={() =>
                    setSubView("formula")
                  }
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    subView === "formula"
                      ? "bg-amber-500 text-slate-950"
                      : isFormulaDone
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isFormulaDone ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Sparkles size={13} />
                  )}

                  <span>Fórmula</span>
                </button>

              </div>

              {/* PROGRESO */}
              <div className="flex items-center gap-2">

                <span className="text-xs font-bold text-slate-500">
                  {standPercent}%
                </span>

                <div className="w-16 sm:w-24 bg-slate-200 rounded-full h-2 overflow-hidden">

                  <div
                    className="bg-[#5B7F71] h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${standPercent}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>
        )}

      {/* ROUTER INTERNO */}
      <main className="pt-2">

        {/* BIENVENIDA */}

        {subView === "welcome" && (
          <StandMejoramientoWelcome
            onStartRoute={() =>
              setSubView("sembrando")
            }
            onBackToFair={
              handleBackToFair
            }
            progressPercent={
              standPercent
            }
          />
        )}

        {/* SEMBRANDO */}
        {subView === "sembrando" && (
          <Tema01SembrandoIdeas
            onPrev={() =>
              setSubView("welcome")
            }
            onNext={() => {
              completeMejoramientoMilestone(
                "mejoramiento-sembrando"
              );

              setSubView("tpm");
            }}
            alreadyCompleted={
              isSembrandoDone
            }
          />
        )}

        {/* TPM */}
        {subView === "tpm" && (
          <Tema02Tpm
            onPrev={() =>
              setSubView("sembrando")
            }
            onNext={() => {
              completeMejoramientoMilestone(
                "mejoramiento-tpm"
              );

              setSubView(
                "seis-sigma"
              );
            }}
            alreadyCompleted={
              isTpmDone
            }
          />
        )}

        {/* 6 SIGMA */}
        {subView === "seis-sigma" && (
          <Tema03SeisSigma
            onPrev={() =>
              setSubView("tpm")
            }
            onNext={() => {
              completeMejoramientoMilestone(
                "mejoramiento-6sigma"
              );

              setSubView(
                "transicion"
              );
            }}
            alreadyCompleted={
              is6SigmaDone
            }
          />
        )}

        {/* TRANSICIÓN */}
        {subView === "transicion" && (
          <TransicionRetoFinal
            onPrev={() =>
              setSubView(
                "seis-sigma"
              )
            }
            onStartFormula={() =>
              setSubView(
                "formula"
              )
            }
          />
        )}

        {/* FÓRMULA */}
        {subView === "formula" && (
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

            <FillFormulaChallenge
              onPassed={
                handleFormulaPassed
              }
              onPrev={() =>
                setSubView(
                  "transicion"
                )
              }
            />

          </div>
        )}

        {/* INSIGNIA */}
        {subView === "badge" && (
          <StandMejoramientoInsignia
            onBackToFair={
              handleBackToFair
            }
            onReviewStand={() =>
              setSubView(
                "welcome"
              )
            }
            participantCedula={
              session.cedula
            }
            participantArea={
              session.area
            }
          />
        )}

      </main>

    </div>
  );
}