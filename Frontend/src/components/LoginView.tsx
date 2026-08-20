"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Sparkles, Tent } from "lucide-react";
import Image from "next/image";
import { UserSession } from "@/types/feria";
import { fairData } from "@/data/fairData";
import { useFairSession } from "@/context/FairSessionContext";

// LOGIN VIEW
export default function LoginView() {
  const router = useRouter();

  const { startSession } =
    useFairSession();

  const [cedula, setCedula] =
    useState("");

  const [area] =
    useState("General");

  const [fechaEjecucion, setFechaEjecucion] =
    useState(() => {
      const today = new Date();

      const year =
        today.getFullYear();

      const month = String(
        today.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        today.getDate()
      ).padStart(2, "0");

      return `${year}-${month}-${day}`;
    });

  const [errorMsg, setErrorMsg] =
    useState("");

  // INGRESO A LA FERIA
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const cedulaLimpia =
      cedula.trim();

    // Validar cédula
    if (!cedulaLimpia) {
      setErrorMsg(
        "Por favor ingrese su número de cédula."
      );

      return;
    }

    if (
      !/^\d+$/.test(
        cedulaLimpia
      )
    ) {
      setErrorMsg(
        "La cédula debe ser únicamente numérica."
      );

      return;
    }

    // Validar área
    if (!area) {
      setErrorMsg(
        "Por favor seleccione su área de trabajo."
      );

      return;
    }

    // Validar fecha
    if (!fechaEjecucion) {
      setErrorMsg(
        "Por favor seleccione la fecha de ejecución."
      );

      return;
    }

    setErrorMsg("");

    // CREAR PROGRESO DINÁMICAMENTE
    const progresoInicial:
      UserSession["progreso"] = {};

    fairData.areas.forEach(
      (areaData) => {
        areaData.topics?.forEach(
          (topic) => {
            progresoInicial[
              topic.id
            ] = "pending";
          }
        );
      }
    );

    // CREAR SESIÓN
    const newSession: UserSession = {
      cedula: cedulaLimpia,

      area,

      fechaEjecucion,

      progreso:
        progresoInicial,

      actividadesCompletadas:
        [],

      insignias: [],

      evaluaciones: {},

      fechaInicio:
        new Date().toISOString(),

      fechaFinalizacion:
        null,

      score: 0,
    };

    // Guardar sesión en Context
    startSession(
      newSession
    );

    // Navegar a feria
    router.push(
      "/feria"
    );
  };

  // UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2EFEA] via-[#E8E3DC] to-[#DAD9C9] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden font-sans select-none">

      {/* DECORACIÓN DE FONDO */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-prebel-mint/25 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-prebel-coral/20 blur-[130px] pointer-events-none" />

      <div className="absolute top-[40%] right-[-15%] w-[35vw] h-[45vw] rounded-full bg-prebel-lavender/25 blur-[100px] pointer-events-none" />

      {/* Partículas */}

      <div
        className="absolute top-12 left-[15%] text-prebel-coral/45 animate-bounce pointer-events-none"
        style={{
          animationDuration:
            "4s",
        }}
      >
        <Sparkles size={36} />
      </div>

      <div
        className="absolute bottom-[20%] left-[8%] text-prebel-blue/35 animate-pulse pointer-events-none"
        style={{
          animationDuration:
            "3.5s",
        }}
      >
        <Tent size={40} />
      </div>

      <div
        className="absolute top-24 right-[12%] text-prebel-mint/40 animate-pulse pointer-events-none"
        style={{
          animationDuration:
            "5s",
        }}
      >
        <Award size={44} />
      </div>

      {/* TARJETA PRINCIPAL */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-white/80 overflow-hidden transform transition-all duration-300 hover:shadow-indigo-100/50 relative z-10">

        {/* Banderines */}

        <div className="absolute top-0 left-0 right-0 h-4 flex justify-around pointer-events-none overflow-hidden z-25">

          <div className="w-10 h-6 bg-prebel-coral rounded-b-xl shadow-sm transform -translate-y-1" />
          <div className="w-10 h-6 bg-prebel-mint rounded-b-xl shadow-sm transform -translate-y-2" />
          <div className="w-10 h-6 bg-prebel-blue rounded-b-xl shadow-sm transform -translate-y-1" />
          <div className="w-10 h-6 bg-prebel-lavender rounded-b-xl shadow-sm transform -translate-y-2" />
          <div className="w-10 h-6 bg-prebel-petroleum rounded-b-xl shadow-sm transform -translate-y-1" />
          <div className="w-10 h-6 bg-prebel-coral rounded-b-xl shadow-sm transform -translate-y-2" />
          <div className="w-10 h-6 bg-prebel-mint rounded-b-xl shadow-sm transform -translate-y-1" />
          <div className="w-10 h-6 bg-prebel-blue rounded-b-xl shadow-sm transform -translate-y-2" />

        </div>

        {/* CABECERA */}
        <div className="bg-gradient-to-b from-[#F9F9F7] to-white pt-14 pb-8 px-8 text-center border-b border-gray-150 flex flex-col items-center justify-center relative">
          <div className="absolute top-10 w-44 h-44 rounded-full bg-yellow-100/40 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex justify-center mb-6 transform hover:scale-[1.03] transition-transform duration-300 drop-shadow-md">
            <Image
                src="/image/logo-tagline-azul.png"
                alt="Logo Prebel"
                width={420}
                height={110}
                priority
                className="h-auto w-full max-w-[360px] object-contain"
            />
          </div>

          <h1 className="font-title text-3xl sm:text-4xl font-black tracking-tight text-slate-800 drop-shadow-sm uppercase">
            FERIA INTEGRAL
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-prebel-coral via-prebel-mint to-prebel-blue rounded-full mt-3.5" />

        </div>

        {/* FORMULARIO */}
        <div className="p-8 sm:p-10 bg-white/70">
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >

            {/* ERROR */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl font-bold animate-pulse flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 block shrink-0 shadow-sm" />
                {
                  errorMsg
                }
              </div>
            )}

            {/* CÉDULA */}
            <div className="relative group">
              <label
                htmlFor="input-cedula"
                className="block text-xs font-black text-slate-600 mb-2 uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-prebel-coral" />
                Número de Cédula
                <span className="text-prebel-coral font-bold">
                  *
                </span>
              </label>

              <div className="relative">
                <input
                  id="input-cedula"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Ingrese su número de documento"
                  value={
                    cedula
                  }
                  onChange={(
                    e
                  ) =>
                    setCedula(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-350 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-prebel-blue focus:border-transparent outline-none transition-all placeholder-stone-400 bg-white/90 hover:bg-white shadow-sm"
                  required
                />
              </div>
            </div>

            {/* FECHA */}
            <div>
              <label
                htmlFor="input-fecha"
                className="block text-xs font-black text-slate-600 mb-2 uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-prebel-mint" />
                Fecha de Ejecución
                <span className="text-prebel-coral font-bold">
                  *
                </span>
              </label>

              <div className="relative">

                <input
                  id="input-fecha"
                  type="date"
                  value={
                    fechaEjecucion
                  }
                  onChange={(
                    e
                  ) =>
                    setFechaEjecucion(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-350 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-prebel-blue focus:border-transparent outline-none transition-all bg-white/90 hover:bg-white shadow-sm"
                  required
                />
              </div>
            </div>

            {/* BOTÓN */}
            <button
              id="btn-ingresar-feria"
              type="submit"
              className="w-full relative overflow-hidden bg-gradient-to-r from-prebel-blue to-[#2B5A7B] hover:from-[#345369] hover:to-[#1E435E] text-white font-black py-4.5 px-6 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-prebel-blue focus:ring-offset-2 transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest mt-6 group"
            >

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                ¡Ingresar a la Feria!
                <Sparkles
                  size={
                    16
                  }
                  className="text-prebel-coral animate-bounce"
                />
              </span>

            </button>
          </form>
        </div>
      </div>
    </div>
  );
}