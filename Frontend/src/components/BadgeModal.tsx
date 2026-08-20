"use client";
import {
  Award,
  Car,
  CheckCircle2,
  Droplets,
  Scale,
  Search,
  Shield,
  Sparkles,
  X,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

import {
  Badge,
} from "@/types/feria";

interface BadgeModalProps {
  badge: Badge;

  onClose: () => void;
}

export default function BadgeModal({
  badge,
  onClose,
}: BadgeModalProps) {
  const renderIcon =
    () => {
      switch (
        badge.id
      ) {
        case "badge-higiene-manos":
          return (
            <Droplets
              size={42}
            />
          );

        case "badge-cero-material-extrano":
          return (
            <Search
              size={42}
            />
          );

        case "badge-transformacion-mejora":
          return (
            <TrendingUp
              size={42}
            />
          );

        case "badge-registro-impecable":
          return (
            <CheckCircle2
              size={42}
            />
          );

        case "badge-pesv":
          return (
            <Car
              size={42}
            />
          );

        case "badge-accidentalidad":
          return (
            <AlertTriangle
              size={42}
            />
          );

        case "badge-epp":
          return (
            <Shield
              size={42}
            />
          );

        case "badge-reglas-oro":
          return (
            <Award
              size={42}
            />
          );

        case "badge-embajador-cumplimiento":
          return (
            <Scale
              size={42}
            />
          );

        default:
          return (
            <Award
              size={42}
            />
          );
      }
    };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center px-4 py-8"
      onClick={
        onClose
      }
    >

      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        onClick={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        {/* CERRAR */}
        <button
          type="button"
          onClick={
            onClose
          }
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center cursor-pointer transition-all"
          aria-label="Cerrar insignia"
        >
          <X
            size={18}
          />
        </button>

        {/* HEADER */}
        <div
          className="text-white text-center px-8 pt-10 pb-16 relative"
          style={{
            background:
              `linear-gradient(135deg, ${badge.color}, #1e293b)`,
          }}
        >

          <Sparkles
            className="absolute top-5 left-6 text-white/30"
            size={30}
          />

          <Sparkles
            className="absolute bottom-5 right-7 text-white/25"
            size={24}
          />

          <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-black/20 px-3 py-1 rounded-full">
            Nueva Insignia Desbloqueada
          </span>

          <h2 className="text-xl sm:text-2xl font-black uppercase mt-4 leading-tight">
            ¡Felicitaciones!
          </h2>

          <p className="text-xs text-white/80 mt-2">
            Has completado exitosamente este reto de aprendizaje.
          </p>

        </div>

        {/* MEDALLA */}
        <div className="-mt-11 relative z-10 flex justify-center">

          <div
            className="w-24 h-24 rounded-full border-[6px] border-white shadow-xl flex items-center justify-center text-white"
            style={{
              backgroundColor:
                badge.color,
            }}
          >
            {
              renderIcon()
            }
          </div>

        </div>

        {/* CONTENIDO */}
        <div className="px-7 pb-7 pt-5 text-center">

          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
            Reconocimiento obtenido
          </span>

          <h3 className="text-base sm:text-lg font-black text-slate-800 uppercase leading-snug mt-2">
            {
              badge.name
            }
          </h3>

          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">

            <div className="flex items-center justify-center gap-2 text-emerald-800">

              <CheckCircle2
                size={18}
              />

              <span className="text-xs font-black uppercase">
                Insignia guardada
              </span>

            </div>

            <p className="text-[11px] text-emerald-700 mt-1">
              Este reconocimiento ya forma parte de tu colección de la Feria Integral.
            </p>

          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            className="w-full mt-6 py-3.5 px-6 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:brightness-95 transition-all cursor-pointer"
            style={{
              backgroundColor:
                badge.color,
            }}
          >
            Continuar recorrido
          </button>

        </div>
      </div>
    </div>
  );
}