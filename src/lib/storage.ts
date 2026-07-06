export const STORAGE_KEYS = {
  onboardingData: "orbitiq.onboardingData",
  onboardingStep: "orbitiq.onboardingStep",
  onboardingComplete: "orbitiq.onboardingComplete",
  tutorialSeen: "orbitiq.tutorialSeen",
  dashboardLayout: "orbitiq.dashboardLayout",
  companion: "orbitiq.companion",
} as const;

// Wrapped because localStorage can throw (private browsing, quota, disabled
// storage) — persistence here is a nice-to-have, never something to crash over.
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function clearStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
