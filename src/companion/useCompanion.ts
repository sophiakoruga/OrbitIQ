import { useCallback, useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../lib/storage";
import { DEFAULT_COMPANION, type CompanionConfig } from "./companion";

export function useCompanion() {
  const [companion, setCompanion] = useState<CompanionConfig>(() =>
    readStorage(STORAGE_KEYS.companion, DEFAULT_COMPANION),
  );

  const updateCompanion = useCallback((patch: Partial<CompanionConfig>) => {
    setCompanion((current) => {
      const next = { ...current, ...patch };
      writeStorage(STORAGE_KEYS.companion, next);
      return next;
    });
  }, []);

  return { companion, updateCompanion };
}
