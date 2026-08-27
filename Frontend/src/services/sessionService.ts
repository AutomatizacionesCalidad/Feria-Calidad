import { UserSession } from "@/types/feria";

const SESSION_KEY = "PREBEL_FAIR_SESSION";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:8000";

type BackendUser = {
  id: number;
  cedula: string;
  nombre?: string | null;
};

type BackendSession = {
  id: number;
  area: string | null;
  fecha_ejecucion: string | null;
  fecha_hora_inicio: string | null;
  fecha_hora_finalizacion: string | null;
  estado: UserSession["estado"];
};

type StartFairSessionResponse = {
  message: string;
  usuario_creado: boolean;
  sesion_creada: boolean;
  sesion_recuperada: boolean;
  usuario: BackendUser;
  sesion: BackendSession;
  modulos_inicializados: number;
  estado_sesion?: BackendSessionState;
};

type FinalizeFairSessionResponse = {
  message: string;
  sesion: Partial<BackendSession> & {
    id: number;
    estado: UserSession["estado"];
  };
};

type StartFairSessionPayload = {
  cedula: string;
  area: string;
  fechaEjecucion: string;
};

type BackendSessionState = {
  progreso_modulos: Array<{
    modulo_codigo: string;
    estado:
      | "PENDIENTE"
      | "EN_PROGRESO"
      | "COMPLETADO";
    fecha_hora_inicio: string | null;
    fecha_hora_finalizacion: string | null;
  }>;
  actividades_completadas: string[];
  insignias_ganadas: Array<{
    codigo: string;
    fecha_hora_obtencion: string | null;
  }>;
};

type RegisterAnswerPayload = {
  preguntaCodigo: string;
  opcionCodigo?: string;
  respuestaTexto?: string;
};

type RegisterAnswerResponse = {
  message: string;
  intento: {
    id: number;
    sesion_id: number;
    pregunta_codigo: string;
    opcion_codigo: string | null;
    respuesta_texto: string | null;
    numero_intento: number;
    es_correcta: boolean;
    fecha_hora_respuesta: string;
  };
};

export type ActivityAttemptPayload = {
  moduloCodigo: string;
  codigoActividad: string;
  respuestaJson?: unknown;
  esCorrecta: boolean;
};

type RegisterActivityAttemptResponse = {
  message: string;
  intento: {
    id: number;
    sesion_id: number;
    modulo_codigo: string;
    codigo_actividad: string;
    numero_intento: number;
    respuesta_json: unknown;
    es_correcta: boolean;
    fecha_hora: string;
  };
};

type RegisterBadgeResponse = {
  message: string;
  creada: boolean;
  insignia: {
    id: number;
    sesion_id: number;
    codigo: string;
    nombre: string;
    fecha_hora_obtencion: string;
  };
};

export type FairSessionSummary = {
  usuario: {
    id: number;
    cedula: string;
    nombre: string | null;
    activo: boolean;
  };
  sesion: BackendSession;
  totales: {
    modulos: number;
    modulos_completados: number;
    porcentaje_avance: number;
    intentos_respuesta: number;
    intentos_actividad: number;
    insignias_ganadas: number;
  };
  progreso_modulos: Array<{
    id: number;
    estado:
      | "PENDIENTE"
      | "EN_PROGRESO"
      | "COMPLETADO";
    fecha_hora_inicio: string | null;
    fecha_hora_finalizacion: string | null;
    modulo: {
      id: number;
      codigo: string;
      nombre: string;
      orden: number;
    };
    stand: {
      id: number;
      codigo: string;
      nombre: string;
      orden: number;
    };
  }>;
  intentos_respuesta: Array<{
    id: number;
    pregunta: {
      id: number;
      codigo: string;
      enunciado: string;
      tipo: string;
      orden: number;
    };
    evaluacion: {
      id: number;
      codigo: string;
      nombre: string;
    };
    modulo: {
      codigo: string;
      nombre: string;
    };
    stand: {
      codigo: string;
      nombre: string;
    };
    opcion: {
      id: number;
      codigo: string;
      texto: string;
    } | null;
    respuesta_texto: string | null;
    numero_intento: number;
    es_correcta: boolean;
    fecha_hora_respuesta: string;
  }>;
  intentos_actividad: Array<{
    id: number;
    modulo: {
      id: number;
      codigo: string;
      nombre: string;
    };
    stand: {
      codigo: string;
      nombre: string;
    };
    codigo_actividad: string;
    numero_intento: number;
    respuesta_json: unknown;
    es_correcta: boolean;
    fecha_hora: string;
  }>;
  insignias_ganadas: Array<{
    id: number;
    codigo: string;
    nombre: string;
    stand: {
      codigo: string;
      nombre: string;
    };
    fecha_hora_obtencion: string;
  }>;
};

function buildApiUrl(path: string): string {
  const baseUrl =
    API_BASE_URL.endsWith("/")
      ? API_BASE_URL.slice(0, -1)
      : API_BASE_URL;

  return `${baseUrl}${path}`;
}

async function parseApiError(
  response: Response
): Promise<string> {
  try {
    const data = await response.json();

    if (
      typeof data?.detail === "string"
    ) {
      return data.detail;
    }

    if (
      typeof data?.message === "string"
    ) {
      return data.message;
    }

    return JSON.stringify(data);
  } catch {
    return response.statusText;
  }
}

export async function startBackendSession(
  payload: StartFairSessionPayload
): Promise<StartFairSessionResponse> {
  const response = await fetch(
    buildApiUrl(
      "/api/feria/sesiones/iniciar/"
    ),
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        cedula: payload.cedula,
        area: payload.area,
        fecha_ejecucion:
          payload.fechaEjecucion,
      }),
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo iniciar la sesión en el backend."
    );
  }

  return (
    (await response.json()) as StartFairSessionResponse
  );
}

export async function finalizeBackendSession(
  sessionId: number
): Promise<FinalizeFairSessionResponse> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/finalizar/`
    ),
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo finalizar la sesión en el backend."
    );
  }

  return (
    (await response.json()) as FinalizeFairSessionResponse
  );
}

type BackendModuleProgress = {
  message: string;
  progreso: {
    modulo: string;
    estado:
      | "PENDIENTE"
      | "EN_PROGRESO"
      | "COMPLETADO";
    fecha_hora_inicio:
      | string
      | null;
    fecha_hora_finalizacion:
      | string
      | null;
  };
};

export async function startBackendModule(
  sessionId: number,
  moduleCode: string
): Promise<BackendModuleProgress> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/modulos/${moduleCode}/iniciar/`
    ),
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo iniciar el módulo en el backend."
    );
  }

  return (
    (await response.json()) as BackendModuleProgress
  );
}

export async function completeBackendModule(
  sessionId: number,
  moduleCode: string
): Promise<BackendModuleProgress> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/modulos/${moduleCode}/completar/`
    ),
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo completar el módulo en el backend."
    );
  }

  return (
    (await response.json()) as BackendModuleProgress
  );
}

export async function registerBackendAnswer(
  sessionId: number,
  payload: RegisterAnswerPayload
): Promise<RegisterAnswerResponse> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/respuestas/`
    ),
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        pregunta_codigo:
          payload.preguntaCodigo,
        opcion_codigo:
          payload.opcionCodigo,
        respuesta_texto:
          payload.respuestaTexto,
      }),
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo registrar la respuesta en el backend."
    );
  }

  return (
    (await response.json()) as RegisterAnswerResponse
  );
}

export async function registerBackendActivityAttempt(
  sessionId: number,
  payload: ActivityAttemptPayload
): Promise<RegisterActivityAttemptResponse> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/actividades/`
    ),
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        modulo_codigo:
          payload.moduloCodigo,
        codigo_actividad:
          payload.codigoActividad,
        respuesta_json:
          payload.respuestaJson,
        es_correcta:
          payload.esCorrecta,
      }),
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo registrar la actividad en el backend."
    );
  }

  return (
    (await response.json()) as RegisterActivityAttemptResponse
  );
}

export async function registerBackendBadge(
  sessionId: number,
  badgeCode: string
): Promise<RegisterBadgeResponse> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/insignias/${badgeCode}/ganar/`
    ),
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo registrar la insignia en el backend."
    );
  }

  return (
    (await response.json()) as RegisterBadgeResponse
  );
}

export async function getBackendSessionSummary(
  sessionId: number
): Promise<FairSessionSummary> {
  const response = await fetch(
    buildApiUrl(
      `/api/feria/sesiones/${sessionId}/resumen/`
    ),
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const message =
      await parseApiError(response);

    throw new Error(
      message ||
        "No se pudo consultar el resumen de la sesión."
    );
  }

  return (
    (await response.json()) as FairSessionSummary
  );
}

export function mergeBackendSession(
  localSession: UserSession,
  backendData: StartFairSessionResponse
): UserSession {
  const backendSession =
    backendData.sesion;

  const backendState =
    backendData.estado_sesion;

  const progreso =
    backendState
      ? backendState.progreso_modulos.reduce<
          UserSession["progreso"]
        >((acc, progresoModulo) => {
          acc[
            progresoModulo.modulo_codigo
          ] =
            progresoModulo.estado ===
            "COMPLETADO"
              ? "completed"
              : progresoModulo.estado ===
                "EN_PROGRESO"
              ? "in_progress"
              : "pending";

          return acc;
        }, {})
      : localSession.progreso;

  const actividadesCompletadas =
    backendState
      ? backendState.actividades_completadas
      : localSession.actividadesCompletadas;

  const insignias =
    backendState
      ? backendState.insignias_ganadas.map(
          (insignia) => insignia.codigo
        )
      : localSession.insignias;

  return {
    ...localSession,

    sessionId:
      backendSession.id,

    usuarioId:
      backendData.usuario.id,

    cedula:
      backendData.usuario.cedula ??
      localSession.cedula,

    area:
      backendSession.area ??
      localSession.area,

    fechaEjecucion:
      backendSession.fecha_ejecucion ??
      localSession.fechaEjecucion,

    fechaInicio:
      backendSession.fecha_hora_inicio ??
      localSession.fechaInicio,

    fechaFinalizacion:
      backendSession.fecha_hora_finalizacion ??
      localSession.fechaFinalizacion,

    estado:
      backendSession.estado ??
      localSession.estado,

    progreso,

    actividadesCompletadas,

    insignias,

    sesionCreada:
      backendData.sesion_creada,

    sesionRecuperada:
      backendData.sesion_recuperada,
  };
}

export function saveLocalSession(
  session: UserSession
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
}

export function loadLocalSession():
  | UserSession
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved =
      localStorage.getItem(
        SESSION_KEY
      );

    if (!saved) {
      return null;
    }

    return JSON.parse(
      saved
    ) as UserSession;
  } catch {
    return null;
  }
}

export function clearLocalSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    SESSION_KEY
  );
}
