"use client";
import { useState } from "react";
import {
  Check,
  ArrowRight,
  AlertTriangle,
  Lock,
  CheckCircle,
  X,
  Footprints,
} from "lucide-react";

interface RutaIngresoSeguroProps {
  onComplete: (
    score: number,
    feedback: string
  ) => void;
}

// ESTACIÓN 1 - TIPOS
type LuggageZone =
  | "bolso"
  | "locker"
  | "restaurante"
  | "no_ingresa";

interface LuggageItem {
  id: string;
  name: string;
  emoji: string;
  correctZone: LuggageZone;
  description: string;
  note?: string;
}

// ESTACIÓN 1 - OBJETOS
const LUGGAGE_ITEMS: LuggageItem[] = [
  {
    id: "uniforme2",
    name: "Uniforme 2",
    emoji: "👕",
    correctZone: "bolso",
    description:
      "Debe transportarse en el bolso de dotación para proteger su limpieza.",
  },
  {
    id: "polainas",
    name: "Polainas",
    emoji: "🥾",
    correctZone: "bolso",
    description:
      "En el bolso de dotación, pero en un bolsillo separado de las demás prendas.",
  },
  {
    id: "aretes",
    name: "Aretes y Joyas",
    emoji: "💎",
    correctZone: "locker",
    description:
      "Retirarse y guardarse en el locker antes de colocarse el uniforme.",
  },
  {
    id: "celular",
    name: "Celular personal",
    emoji: "📱",
    correctZone: "locker",
    description:
      "No se debe portar ni usar en procesos productivos. Se almacena en el locker.",
  },
  {
    id: "comida",
    name: "Alimentos / Snacks",
    emoji: "🥪",
    correctZone: "restaurante",
    description:
      "Bajo ninguna circunstancia en el locker ni en planta. Se almacena en el restaurante.",
  },
  {
    id: "cigarrillos",
    name: "Cigarrillos / Tabaco",
    emoji: "🚬",
    correctZone: "no_ingresa",
    description:
      "Restringido. Fumar solo en áreas habilitadas de calle y fuera de zonas productivas.",
  },
  {
    id: "maquillaje",
    name: "Maquillaje de calle",
    emoji: "💄",
    correctZone: "no_ingresa",
    description:
      "No permitido en zonas negras y grises.",
  },
];

// COMPONENTE
export default function RutaIngresoSeguro({
  onComplete,
}: RutaIngresoSeguroProps) {
  // 0 = Inicio
  // 1 = Equipaje
  // 2 = Vestimenta
  // 3 = Plagas
  // 4 = Final
  const [station, setStation] =
    useState<number>(0);

  // ESTACIÓN 1
  const [
    luggagePlacements,
    setLuggagePlacements,
  ] = useState<
    Record<string, LuggageZone>
  >({});

  const [
    selectedLuggageId,
    setSelectedLuggageId,
  ] =
    useState<string | null>(
      null
    );

  const [
    lockerFoodAlert,
    setLockerFoodAlert,
  ] = useState(false);

  const [
    estacion1Finished,
    setEstacion1Finished,
  ] = useState(false);

  // ESTACIÓN 2
  const [
    selectedZone,
    setSelectedZone,
  ] =
    useState<
      "negra" | "gris" | null
    >(null);

  const [
    negraGarments,
    setNegraGarments,
  ] = useState<string[]>([]);

  const [
    grisGarments,
    setGrisGarments,
  ] = useState<string[]>([]);

  const [
    negraCheckAretes,
    setNegraCheckAretes,
  ] =
    useState<boolean | null>(
      null
    );

  const [
    negraCheckMaquillaje,
    setNegraCheckMaquillaje,
  ] =
    useState<boolean | null>(
      null
    );

  const [
    grisSelectedPallet,
    setGrisSelectedPallet,
  ] =
    useState<string | null>(
      null
    );

  // ESTACIÓN 3
  const [
    cleanedHazards,
    setCleanedHazards,
  ] = useState<string[]>([]);

  const [
    foodDecision,
    setFoodDecision,
  ] =
    useState<string | null>(
      null
    );

  // ESTACIÓN 1 - HANDLERS
  const handlePlaceItem = (
    itemId: string,
    zone: LuggageZone
  ) => {
    if (
      itemId === "comida" &&
      zone === "locker"
    ) {
      setLockerFoodAlert(true);
      return;
    }

    setLockerFoodAlert(false);

    const newPlacements = {
      ...luggagePlacements,
      [itemId]: zone,
    };

    setLuggagePlacements(
      newPlacements
    );

    setSelectedLuggageId(
      null
    );

    const allPlaced =
      LUGGAGE_ITEMS.every(
        (item) =>
          newPlacements[
            item.id
          ] ===
          item.correctZone
      );

    setEstacion1Finished(
      allPlaced
    );
  };

  const handleRemovePlacedItem =
    (itemId: string) => {
      const newPlacements = {
        ...luggagePlacements,
      };

      delete newPlacements[
        itemId
      ];

      setLuggagePlacements(
        newPlacements
      );

      setEstacion1Finished(
        false
      );
    };

  // ESTACIÓN 2 - HANDLERS
  const toggleNegraGarment = (
    id: string
  ) => {
    setNegraGarments(
      (current) =>
        current.includes(id)
          ? current.filter(
              (garmentId) =>
                garmentId !== id
            )
          : [
              ...current,
              id,
            ]
    );
  };

  const toggleGrisGarment = (
    id: string
  ) => {
    setGrisGarments(
      (current) =>
        current.includes(id)
          ? current.filter(
              (garmentId) =>
                garmentId !== id
            )
          : [
              ...current,
              id,
            ]
    );
  };

  const isNegraComplete =
    () => {
      const required = [
        "gorro",
        "bata_corta",
        "pantalon",
        "zapatos",
        "epp",
      ];

      const hasAllRequired =
        required.every(
          (id) =>
            negraGarments.includes(
              id
            )
        );

      const noBanned =
        !negraGarments.includes(
          "aretes"
        ) &&
        !negraGarments.includes(
          "maquillaje"
        );

      return (
        hasAllRequired &&
        noBanned &&
        negraCheckAretes ===
          false &&
        negraCheckMaquillaje ===
          false
      );
    };

  const isGrisComplete =
    () => {
      const required = [
        "uniforme1",
        "bata_larga",
        "tapabocas",
        "polainas",
        "epp",
      ];

      const hasAllRequired =
        required.every(
          (id) =>
            grisGarments.includes(
              id
            )
        );

      const noBanned =
        !grisGarments.includes(
          "aretes"
        ) &&
        !grisGarments.includes(
          "maquillaje"
        );

      return (
        hasAllRequired &&
        noBanned &&
        grisSelectedPallet ===
          "plastica"
      );
    };

  // ESTACIÓN 3
  const handleCleanHazard = (
    hazardId: string
  ) => {
    if (
      cleanedHazards.includes(
        hazardId
      )
    ) {
      return;
    }

    setCleanedHazards(
      (current) => [
        ...current,
        hazardId,
      ]
    );
  };

  const handleSelectFoodDecision =
    (option: string) => {
      setFoodDecision(
        option
      );
    };

  // FINAL
  const handleFinishAll =
    () => {
      setStation(4);

      onComplete(
        100,
        "🏆 ¡Ruta de Ingreso Seguro completada con éxito! Controlaste equipaje, vestimenta y prevención de plagas con total rigor."
      );
    };

  return (
    <div className="space-y-6 animate-fade-in font-sans">

      {/* TRACKER */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-3">

          <div className="flex items-center gap-2.5">

            <span className="text-xl">
              🚪
            </span>

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                RETO INTERACTIVO
              </span>

              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Misión: Llega al proceso sin llevar riesgos contigo
              </h3>

            </div>

          </div>

          <span className="text-xs text-slate-400 font-mono">

            {station === 0 &&
              "Inicio de Ruta"}

            {station === 1 &&
              "Estación 1 de 3"}

            {station === 2 &&
              "Estación 2 de 3"}

            {station === 3 &&
              "Estación 3 de 3"}

            {station === 4 &&
              "¡Completado!"}

          </span>

        </div>

        <div className="grid grid-cols-3 gap-2 pt-3">

          {/* PASO 1 */}
          <div
            className={`p-2.5 rounded-xl border text-center transition-all ${
              station === 1
                ? "bg-teal-500/20 border-teal-400 text-teal-300 font-bold"
                : station > 1
                ? "bg-emerald-500/15 border-emerald-400 text-emerald-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
            }`}
          >
            <div className="text-base sm:text-lg">
              🎒
            </div>

            <div className="text-[11px] font-semibold mt-0.5 truncate">
              1. Prepara ingreso
            </div>
          </div>

          {/* PASO 2 */}
          <div
            className={`p-2.5 rounded-xl border text-center transition-all ${
              station === 2
                ? "bg-teal-500/20 border-teal-400 text-teal-300 font-bold"
                : station > 2
                ? "bg-emerald-500/15 border-emerald-400 text-emerald-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
            }`}
          >
            <div className="text-base sm:text-lg">
              👕
            </div>

            <div className="text-[11px] font-semibold mt-0.5 truncate">
              2. Vístete por zona
            </div>
          </div>

          {/* PASO 3 */}
          <div
            className={`p-2.5 rounded-xl border text-center transition-all ${
              station === 3
                ? "bg-teal-500/20 border-teal-400 text-teal-300 font-bold"
                : station > 3
                ? "bg-emerald-500/15 border-emerald-400 text-emerald-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
            }`}
          >
            <div className="text-base sm:text-lg">
              🐜
            </div>

            <div className="text-[11px] font-semibold mt-0.5 truncate">
              3. Cierra a plagas
            </div>
          </div>

        </div>

      </div>

      {/* INICIO */}
      {station === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-6 shadow-sm">

          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-teal-100">
            🚪
          </div>

          <div className="space-y-2 max-w-lg mx-auto">

            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              Tu ruta de ingreso seguro
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Supera las 3 estaciones y demuestra que sabes controlar la contaminación antes de iniciar tu trabajo en planta.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">

              <span className="text-2xl block">
                🎒
              </span>

              <h5 className="text-xs font-bold text-slate-800">
                Estación 1
              </h5>

              <p className="text-[11px] text-slate-600 leading-snug">
                Clasifica objetos personales y dotación en su lugar exacto.
              </p>

            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">

              <span className="text-2xl block">
                👕
              </span>

              <h5 className="text-xs font-bold text-slate-800">
                Estación 2
              </h5>

              <p className="text-[11px] text-slate-600 leading-snug">
                Viste al colaborador según la zona y cruza la esclusa.
              </p>

            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">

              <span className="text-2xl block">
                🐜
              </span>

              <h5 className="text-xs font-bold text-slate-800">
                Estación 3
              </h5>

              <p className="text-[11px] text-slate-600 leading-snug">
                Elimina atrayentes y ciérrale la puerta a las plagas.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setStation(1)
            }
            className="py-3.5 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            id="btn-iniciar-ruta-segura"
          >
            <span>
              Iniciar Ruta de Ingreso
            </span>

            <ArrowRight
              size={16}
            />
          </button>

        </div>
      )}

      {/* ESTACIÓN 1 */}
      {station === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">

          <div className="text-center space-y-1 border-b border-slate-100 pb-4">

            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
              ESTACIÓN 1
            </span>

            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              🎒 ¿Qué llevo y dónde lo dejo?
            </h3>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Ubica cada objeto en su lugar reglamentario. Puedes arrastrarlo o tocar un elemento y luego seleccionar su destino.
            </p>

          </div>

          {/* ALERTA COMIDA EN LOCKER */}
          {lockerFoodAlert && (
            <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl text-center space-y-2 shadow-md">

              <div className="text-sm font-black text-rose-700 flex items-center justify-center gap-2">

                <AlertTriangle
                  size={18}
                />

                <span>
                  ¡El locker no es una despensa!
                </span>

              </div>

              <p className="text-xs text-rose-800 font-medium max-w-md mx-auto">
                Los alimentos deben almacenarse en el restaurante antes de ingresar a la zona de lockers.
              </p>

              <button
                type="button"
                onClick={() =>
                  setLockerFoodAlert(
                    false
                  )
                }
                className="text-[11px] font-bold text-rose-700 underline cursor-pointer"
              >
                Entendido, reubicar comida
              </button>

            </div>
          )}

          {/* DESTINOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              {
                id: "bolso" as const,
                emoji: "🎒",
                title:
                  "Bolso de dotación",
                description:
                  "Prendas y polainas separadas.",
              },
              {
                id: "locker" as const,
                emoji: "🔐",
                title:
                  "Locker",
                description:
                  "Accesorios personales y celular.",
              },
              {
                id: "restaurante" as const,
                emoji: "🍽️",
                title:
                  "Restaurante",
                description:
                  "Alimentos y bebidas del día.",
              },
              {
                id: "no_ingresa" as const,
                emoji: "⛔",
                title:
                  "No ingresa",
                description:
                  "Elementos que deben quedar fuera del proceso.",
              },
            ].map(
              (destination) => (
                <div
                  key={
                    destination.id
                  }
                  onDragOver={(
                    event
                  ) =>
                    event.preventDefault()
                  }
                  onDrop={(
                    event
                  ) => {
                    event.preventDefault();

                    const id =
                      event.dataTransfer.getData(
                        "luggageId"
                      ) ||
                      selectedLuggageId;

                    if (id) {
                      handlePlaceItem(
                        id,
                        destination.id
                      );
                    }
                  }}
                  onClick={() => {
                    if (
                      selectedLuggageId
                    ) {
                      handlePlaceItem(
                        selectedLuggageId,
                        destination.id
                      );
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all min-h-[160px] flex flex-col justify-between ${
                    selectedLuggageId
                      ? "border-teal-400 bg-teal-50/30 cursor-pointer hover:bg-teal-50"
                      : "border-slate-200 bg-slate-50/50"
                  }`}
                >

                  <div>

                    <div className="flex items-center gap-2 text-xs font-black text-slate-800 border-b border-slate-200 pb-2">

                      <span className="text-xl">
                        {
                          destination.emoji
                        }
                      </span>

                      <span>
                        {
                          destination.title
                        }
                      </span>

                    </div>

                    <p className="text-[10px] text-slate-500 mt-1">
                      {
                        destination.description
                      }
                    </p>

                  </div>

                  <div className="space-y-1.5 pt-2">

                    {Object.entries(
                      luggagePlacements
                    )
                      .filter(
                        ([
                          ,
                          zone,
                        ]) =>
                          zone ===
                          destination.id
                      )
                      .map(
                        ([
                          itemId,
                        ]) => {
                          const item =
                            LUGGAGE_ITEMS.find(
                              (
                                luggageItem
                              ) =>
                                luggageItem.id ===
                                itemId
                            );

                          return (
                            <button
                              key={
                                itemId
                              }
                              type="button"
                              onClick={(
                                event
                              ) => {
                                event.stopPropagation();

                                handleRemovePlacedItem(
                                  itemId
                                );
                              }}
                              className="w-full bg-white p-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between shadow-sm cursor-pointer hover:border-rose-300 group"
                            >

                              <span className="flex items-center gap-1.5">

                                <span>
                                  {
                                    item?.emoji
                                  }
                                </span>

                                <span>
                                  {
                                    item?.name
                                  }
                                </span>

                              </span>

                              <X
                                size={12}
                                className="text-slate-400 group-hover:text-rose-500"
                              />

                            </button>
                          );
                        }
                      )}

                  </div>

                </div>
              )
            )}

          </div>

          {/* OBJETOS */}
          <div className="space-y-3 pt-2">

            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block text-center">

              Objetos por ubicar (
              {
                LUGGAGE_ITEMS.filter(
                  (item) =>
                    !luggagePlacements[
                      item.id
                    ]
                ).length
              }{" "}
              pendientes):

            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">

              {LUGGAGE_ITEMS.map(
                (item) => {
                  const isPlaced =
                    Boolean(
                      luggagePlacements[
                        item.id
                      ]
                    );

                  const isSelected =
                    selectedLuggageId ===
                    item.id;

                  if (
                    isPlaced
                  ) {
                    return (
                      <div
                        key={
                          item.id
                        }
                        className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center opacity-40 select-none flex flex-col items-center justify-center gap-1"
                      >

                        <span className="text-2xl">
                          {
                            item.emoji
                          }
                        </span>

                        <span className="text-[10px] font-bold text-slate-600 max-w-full">
                          Ubicado
                        </span>

                      </div>
                    );
                  }

                  return (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      draggable
                      onDragStart={(
                        event
                      ) => {
                        event.dataTransfer.setData(
                          "luggageId",
                          item.id
                        );

                        setSelectedLuggageId(
                          item.id
                        );
                      }}
                      onClick={() => {
                        setLockerFoodAlert(
                          false
                        );

                        setSelectedLuggageId(
                          isSelected
                            ? null
                            : item.id
                        );
                      }}
                      className={`p-3 rounded-xl border-2 text-center cursor-pointer select-none transition-all flex flex-col items-center justify-center gap-1 shadow-sm hover:scale-105 active:scale-95 ${
                        isSelected
                          ? "border-teal-600 bg-teal-50 ring-2 ring-teal-500/20"
                          : "border-slate-200 bg-white hover:border-teal-400"
                      }`}
                    >

                      <span className="text-2xl">
                        {
                          item.emoji
                        }
                      </span>

                      <span className="text-[11px] font-bold text-slate-800 leading-tight">
                        {
                          item.name
                        }
                      </span>

                    </button>
                  );
                }
              )}

            </div>

          </div>

          {estacion1Finished && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3 shadow-sm">

              <div className="text-sm font-black text-emerald-900 flex items-center justify-center gap-2">

                <CheckCircle
                  size={18}
                />

                <span>
                  ¡Equipaje bajo control!
                </span>

              </div>

              <p className="text-xs text-emerald-800 max-w-md mx-auto font-medium">
                Lo personal se queda fuera del proceso. Lleva únicamente lo necesario y ubica cada elemento en el lugar correcto.
              </p>

              <button
                type="button"
                onClick={() =>
                  setStation(2)
                }
                className="py-3 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md inline-flex items-center gap-2 cursor-pointer"
              >

                Continuar a Estación 2

                <ArrowRight
                  size={16}
                />

              </button>

            </div>
          )}

        </div>
      )}

      {/* ESTACIÓN 2 */}
      {station === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">

          <div className="text-center space-y-1 border-b border-slate-100 pb-4">

            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
              ESTACIÓN 2
            </span>

            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              👕 Vísteme para entrar
            </h3>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              ¿A dónde vas? Selecciona la zona y viste al personaje correctamente con su dotación y controles reglamentarios.
            </p>

          </div>

          {/* ZONAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() =>
                setSelectedZone(
                  "negra"
                )
              }
              className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                selectedZone ===
                "negra"
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-slate-300 bg-slate-50 hover:border-slate-800 text-slate-800"
              }`}
            >

              <span className="text-3xl block mb-1">
                ⚫
              </span>

              <h4 className="text-sm font-black uppercase">
                ZONA NEGRA
              </h4>

              <p
                className={`text-[11px] mt-1 ${
                  selectedZone ===
                  "negra"
                    ? "text-slate-300"
                    : "text-slate-500"
                }`}
              >
                Requiere{" "}
                <strong>
                  Uniforme 1
                </strong>
                . Restricciones de maquillaje y accesorios aplicables.
              </p>

            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedZone(
                  "gris"
                )
              }
              className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                selectedZone ===
                "gris"
                  ? "border-teal-600 bg-teal-600 text-white shadow-md"
                  : "border-slate-300 bg-slate-50 hover:border-teal-500 text-slate-800"
              }`}
            >

              <span className="text-3xl block mb-1">
                ⚪
              </span>

              <h4 className="text-sm font-black uppercase">
                ZONA GRIS (CON ESCLUSA)
              </h4>

              <p
                className={`text-[11px] mt-1 ${
                  selectedZone ===
                  "gris"
                    ? "text-teal-100"
                    : "text-slate-500"
                }`}
              >
                Transición por esclusa. Requiere{" "}
                <strong>
                  Uniforme 2
                </strong>{" "}
                y control de materiales.
              </p>

            </button>

          </div>

          {/* ZONA NEGRA */}
          {selectedZone ===
            "negra" && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">

              <div className="border-b border-slate-200 pb-3">

                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                  PROTOCOLO ZONA NEGRA
                </span>

                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                  Viste al colaborador con el UNIFORME 1
                </h4>

                <p className="text-xs text-slate-600">
                  Selecciona todas las prendas que consideres necesarias.
                </p>

              </div>

              {/* PRENDAS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">

                {[
                  {
                    id: "gorro",
                    name:
                      "Gorro / Cofia",
                    emoji: "🧢",
                  },
                  {
                    id: "bata_corta",
                    name:
                      "Bata manga corta",
                    emoji: "🥼",
                  },
                  {
                    id: "pantalon",
                    name:
                      "Pantalón de dotación",
                    emoji: "👖",
                  },
                  {
                    id: "zapatos",
                    name:
                      "Calzado industrial cerrado",
                    emoji: "👞",
                  },
                  {
                    id: "epp",
                    name:
                      "Implementos de seguridad",
                    emoji: "🦺",
                  },
                  {
                    id: "barbuquero",
                    name:
                      "Barbuquero (si aplica)",
                    emoji: "🧔",
                  },
                  {
                    id: "aretes",
                    name:
                      "Aretes decorativos",
                    emoji: "💎",
                  },
                  {
                    id: "maquillaje",
                    name:
                      "Maquillaje de calle",
                    emoji: "💄",
                  },
                ].map(
                  (garment) => {
                    const isChecked =
                      negraGarments.includes(
                        garment.id
                      );

                    return (
                      <button
                        key={
                          garment.id
                        }
                        type="button"
                        onClick={() =>
                          toggleNegraGarment(
                            garment.id
                          )
                        }
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? "bg-[#40647E]/10 border-[#40647E] text-slate-900"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                        }`}
                      >

                        <span className="flex items-center gap-2">

                          <span>
                            {
                              garment.emoji
                            }
                          </span>

                          <span>
                            {
                              garment.name
                            }
                          </span>

                        </span>

                        {isChecked && (
                          <Check
                            size={14}
                            className="text-[#40647E]"
                          />
                        )}

                      </button>
                    );
                  }
                )}

              </div>

              {/* PREGUNTAS */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">

                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                  Comprobación rápida de ingreso a Zona Negra:
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* ARETES */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">

                    <p className="text-xs text-slate-700 font-semibold">
                      ¿Puede ingresar con aretes?
                    </p>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setNegraCheckAretes(
                            true
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          negraCheckAretes ===
                          true
                            ? "bg-[#40647E] border-[#40647E] text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                        }`}
                      >
                        Sí
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setNegraCheckAretes(
                            false
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          negraCheckAretes ===
                          false
                            ? "bg-[#40647E] border-[#40647E] text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                        }`}
                      >
                        No
                      </button>

                    </div>

                  </div>

                  {/* MAQUILLAJE */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">

                    <p className="text-xs text-slate-700 font-semibold">
                      ¿Puede ingresar maquillado?
                    </p>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setNegraCheckMaquillaje(
                            true
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          negraCheckMaquillaje ===
                          true
                            ? "bg-[#40647E] border-[#40647E] text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                        }`}
                      >
                        Sí
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setNegraCheckMaquillaje(
                            false
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          negraCheckMaquillaje ===
                          false
                            ? "bg-[#40647E] border-[#40647E] text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                        }`}
                      >
                        No
                      </button>

                    </div>

                  </div>

                </div>

                <p className="text-[11px] text-slate-500 italic">
                  💡 Evalúa cada elemento de acuerdo con las condiciones de ingreso establecidas para la zona.
                </p>

              </div>

              {isNegraComplete() && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-1">

                  <span className="text-xs font-extrabold text-emerald-900">
                    ✅ ¡Uniforme 1 verificado correctamente!
                  </span>

                  <p className="text-[11px] text-emerald-800">
                    Ahora explora el ingreso hacia la Zona Gris.
                  </p>

                </div>
              )}

            </div>
          )}

          {/* ZONA GRIS */}
          {selectedZone ===
            "gris" && (
            <div className="space-y-6">

              {/* ESCLUSA */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-teal-200 rounded-2xl space-y-1">

                <div className="flex items-center gap-2 text-teal-900 text-xs sm:text-sm font-black">

                  <Footprints
                    size={16}
                  />

                  <span>
                    🚪 Zona de Transición (Esclusa)
                  </span>

                </div>

                <p className="text-xs text-slate-600">
                  Aquí realizas el cambio del Uniforme 1 al Uniforme 2. La esclusa es un lugar de paso.
                </p>

              </div>

              {/* PRENDAS GRIS */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">

                <div className="border-b border-slate-200 pb-2">

                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    UNIFORME 2 (ZONA GRIS)
                  </span>

                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                    Selecciona las prendas que consideres necesarias
                  </h4>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">

                  {[
                    {
                      id: "uniforme1",
                      name:
                        "Uniforme 1 (base)",
                      emoji: "👕",
                    },
                    {
                      id: "bata_larga",
                      name:
                        "Bata manga larga / Overol",
                      emoji: "🥼",
                    },
                    {
                      id: "tapabocas",
                      name:
                        "Tapabocas sellado",
                      emoji: "😷",
                    },
                    {
                      id: "polainas",
                      name:
                        "Polainas protectoras",
                      emoji: "🥾",
                    },
                    {
                      id: "epp",
                      name:
                        "Elementos de seguridad EPP",
                      emoji: "🛡️",
                    },
                    {
                      id: "barbuquero",
                      name:
                        "Barbuquero (si aplica)",
                      emoji: "🧔",
                    },
                    {
                      id: "aretes",
                      name:
                        "Aretes decorativos",
                      emoji: "💎",
                    },
                    {
                      id: "maquillaje",
                      name:
                        "Maquillaje de calle",
                      emoji: "💄",
                    },
                  ].map(
                    (garment) => {
                      const isChecked =
                        grisGarments.includes(
                          garment.id
                        );

                      return (
                        <button
                          key={
                            garment.id
                          }
                          type="button"
                          onClick={() =>
                            toggleGrisGarment(
                              garment.id
                            )
                          }
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? "bg-[#40647E]/10 border-[#40647E] text-slate-900"
                              : "bg-white border-slate-200 text-slate-700 hover:border-[#40647E]"
                          }`}
                        >

                          <span className="flex items-center gap-2">

                            <span>
                              {
                                garment.emoji
                              }
                            </span>

                            <span>
                              {
                                garment.name
                              }
                            </span>

                          </span>

                          {isChecked && (
                            <Check
                              size={14}
                              className="text-[#40647E]"
                            />
                          )}

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* ESTIBAS */}
              <div className="bg-amber-50/70 border border-amber-300 p-5 rounded-2xl space-y-3">

                <div className="space-y-1">

                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                    MINI RETO — DESPEJE Y MATERIALES
                  </span>

                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    ¿Cuál de estos elementos puede acompañarte hacia la zona gris?
                  </h4>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  {[
                    {
                      id: "carton",
                      name:
                        "Caja de cartón común",
                      emoji: "📦",
                    },
                    {
                      id: "madera",
                      name:
                        "Estiba de madera",
                      emoji: "🪵",
                    },
                    {
                      id: "plastica",
                      name:
                        "Estiba plástica sanitaria",
                      emoji: "🟦",
                    },
                  ].map(
                    (pallet) => {
                      const isSelected =
                        grisSelectedPallet ===
                        pallet.id;

                      return (
                        <button
                          key={
                            pallet.id
                          }
                          type="button"
                          onClick={() =>
                            setGrisSelectedPallet(
                              pallet.id
                            )
                          }
                          className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#40647E] bg-[#40647E]/10 text-slate-900"
                              : "border-slate-200 bg-white hover:border-[#40647E] text-slate-800"
                          }`}
                        >

                          <span className="text-3xl block mb-1">
                            {
                              pallet.emoji
                            }
                          </span>

                          <span className="text-xs font-bold block">
                            {
                              pallet.name
                            }
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                {/* FEEDBACK SOLO DESPUÉS DE RESPONDER */}
                {grisSelectedPallet ===
                  "plastica" && (
                  <p className="text-[11px] text-emerald-800 font-medium bg-emerald-100/60 p-2.5 rounded-lg">
                    ✅ Correcto. En zona gris se utilizan recipientes y estibas plásticas autorizadas.
                  </p>
                )}

                {grisSelectedPallet &&
                  grisSelectedPallet !==
                    "plastica" && (
                    <p className="text-[11px] text-rose-800 font-medium bg-rose-100/60 p-2.5 rounded-lg">
                      ⚠️ Revisa tu selección. Ese material puede representar un riesgo de contaminación.
                    </p>
                  )}

              </div>

            </div>
          )}

          {/* VALIDACIÓN */}
          {(isNegraComplete() ||
            isGrisComplete()) && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3 shadow-sm">

              <div className="text-sm font-black text-emerald-900 flex items-center justify-center gap-2">

                <CheckCircle
                  size={18}
                />

                <span>
                  ¡Ingreso autorizado!
                </span>

              </div>

              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Cada zona tiene sus barreras. Usar el uniforme y los elementos correctos evita transportar contaminación entre zonas.
              </p>

              <button
                type="button"
                onClick={() =>
                  setStation(3)
                }
                className="py-3 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md inline-flex items-center gap-2 cursor-pointer"
              >

                Continuar a Estación 3

                <ArrowRight
                  size={16}
                />

              </button>

            </div>
          )}

        </div>
      )}

      {/* ESTACIÓN 3 */}
      {station === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">

          <div className="text-center space-y-1 border-b border-slate-100 pb-4">

            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
              ESTACIÓN 3
            </span>

            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              🐜 No alimentes la plaga
            </h3>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Identifica los elementos que pueden favorecer la presencia de plagas.
            </p>

          </div>

          {/* SIMULADOR */}
          <div className="bg-amber-50/40 border-2 border-amber-200 rounded-2xl p-6 min-h-[220px] shadow-inner">

            <div className="flex items-center justify-between pb-4 border-b border-amber-200/60 mb-4">

              <div className="flex items-center gap-2">

                <span className="text-2xl animate-pulse">
                  🐜
                </span>

                <span className="text-xs font-extrabold text-amber-900">

                  {cleanedHazards.length <
                  3
                    ? "Revisa el área y elimina los atrayentes."
                    : "¡Área despejada de atrayentes!"}

                </span>

              </div>

              <span className="text-xs font-bold text-slate-500">
                Neutralizados:{" "}
                {
                  cleanedHazards.length
                }{" "}
                / 3
              </span>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              {[
                {
                  id: "galletas",
                  name:
                    "Paquete de galletas abierto",
                  emoji: "🍪",
                  isHazard:
                    true,
                },
                {
                  id: "bebida",
                  name:
                    "Vaso con residuo de bebida",
                  emoji: "🥤",
                  isHazard:
                    true,
                },
                {
                  id: "desecho",
                  name:
                    "Residuo de comida orgánico",
                  emoji: "🗑️",
                  isHazard:
                    true,
                },
                {
                  id: "uniforme",
                  name:
                    "Uniforme limpio doblado",
                  emoji: "👕",
                  isHazard:
                    false,
                },
                {
                  id: "celular",
                  name:
                    "Celular en locker",
                  emoji: "📱",
                  isHazard:
                    false,
                },
                {
                  id: "llaves",
                  name:
                    "Llaves personales",
                  emoji: "🔑",
                  isHazard:
                    false,
                },
              ].map(
                (item) => {
                  const isCleaned =
                    cleanedHazards.includes(
                      item.id
                    );

                  if (
                    isCleaned
                  ) {
                    return (
                      <div
                        key={
                          item.id
                        }
                        className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center flex items-center justify-center"
                      >
                        <span className="text-xs font-bold text-emerald-800">
                          ✓ Retirado
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      onClick={() => {
                        if (
                          item.isHazard
                        ) {
                          handleCleanHazard(
                            item.id
                          );
                        }
                      }}
                      className="p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm hover:scale-105 active:scale-95 bg-white border-slate-200 hover:border-teal-400"
                    >

                      <span className="text-3xl">
                        {
                          item.emoji
                        }
                      </span>

                      <span className="text-xs font-bold text-slate-800">
                        {
                          item.name
                        }
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            {cleanedHazards.length ===
              3 && (
              <div className="mt-4 p-3.5 bg-white border border-teal-200 rounded-xl text-center text-xs text-teal-900 font-medium">
                💡 Las plagas buscan alimento, humedad y refugio. El saneamiento y la vigilancia reducen el riesgo de infestación.
              </div>
            )}

          </div>

          {/* PREGUNTA FINAL */}
          {cleanedHazards.length ===
            3 && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">

              <h4 className="text-xs sm:text-sm font-black text-slate-900 text-center">
                Decisión Final: ¿Dónde guardarías tu comida antes de entrar?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {[
                  {
                    id: "A",
                    text:
                      "En el locker",
                  },
                  {
                    id: "B",
                    text:
                      "En el bolso del uniforme",
                  },
                  {
                    id: "C",
                    text:
                      "En el restaurante",
                  },
                ].map(
                  (option) => {
                    const isSelected =
                      foodDecision ===
                      option.id;

                    return (
                      <button
                        key={
                          option.id
                        }
                        type="button"
                        onClick={() =>
                          handleSelectFoodDecision(
                            option.id
                          )
                        }
                        className={`p-4 rounded-xl border-2 text-center text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#40647E]/10 border-[#40647E] text-slate-900"
                            : "bg-white border-slate-200 hover:border-[#40647E] text-slate-700"
                        }`}
                      >
                        <span>
                          {
                            option.id
                          }
                          .{" "}
                          {
                            option.text
                          }
                        </span>
                      </button>
                    );
                  }
                )}

              </div>

              {/* FEEDBACK DESPUÉS DE RESPONDER */}
              {foodDecision ===
                "C" && (
                <div className="space-y-3 pt-2">

                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-900 font-medium">
                    ✅ ¡Correcto! Los alimentos se almacenan y consumen únicamente en los espacios establecidos.
                  </div>

                  <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-2 shadow-lg">

                    <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center mx-auto">

                      <Lock
                        size={22}
                      />

                    </div>

                    <h3 className="text-base sm:text-lg font-black text-amber-300">
                      RECUERDA: EN EL LOCKER NO VAN ALIMENTOS.
                    </h3>

                  </div>

                  <div className="flex justify-center pt-2">

                    <button
                      type="button"
                      onClick={
                        handleFinishAll
                      }
                      className="py-3.5 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >

                      Finalizar Ruta y Ver Logro

                      <ArrowRight
                        size={16}
                      />

                    </button>

                  </div>

                </div>
              )}

              {foodDecision &&
                foodDecision !==
                  "C" && (
                  <p className="text-xs text-rose-700 font-bold text-center bg-rose-50 p-2.5 rounded-lg">
                    ⚠️ Esa no es la opción correcta. Revisa dónde deben almacenarse los alimentos antes de ingresar al proceso.
                  </p>
                )}

            </div>
          )}

        </div>
      )}

      {/* FINAL */}
      {station === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-6 shadow-md">

          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-4xl border border-emerald-100">
            🏆
          </div>

          <div className="space-y-2 max-w-lg mx-auto">

            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              ¡RUTA COMPLETADA!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600">
              Controlar la contaminación empieza antes de entrar al proceso. Lleva solo lo permitido, usa el uniforme correspondiente y evita condiciones que puedan comprometer la operación.
            </p>

          </div>

          <div className="p-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-900 text-white rounded-2xl shadow-xl space-y-2">

            <span className="text-[10px] font-black uppercase tracking-widest text-teal-200 bg-white/10 px-3 py-1 rounded-full">
              FRASE INSIGNIA
            </span>

            <h2 className="text-lg sm:text-2xl font-black pt-1">
              “Lo que no pertenece al proceso, se queda fuera del proceso.”
            </h2>

          </div>

          <span className="text-xs text-slate-500 font-bold block">
            Puntaje alcanzado: 100/100 • ¡Listo para la Evaluación Técnica!
          </span>

        </div>
      )}
    </div>
  );
}