import { UserSession } from "@/types/feria";

const SESSION_KEY = "PREBEL_FAIR_SESSION";

export function saveLocalSession(
  session: UserSession
): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
}

export function loadLocalSession():
  | UserSession
  | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(SESSION_KEY);

    if (!saved) {
      return null;
    }

    return JSON.parse(saved) as UserSession;
  } catch {
    return null;
  }
}

export function clearLocalSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_KEY);
}