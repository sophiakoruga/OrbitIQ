import { useCallback, useMemo, useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../lib/storage";
import {
  INITIAL_ONBOARDING_DATA,
  QUESTION_STEPS,
  type MultiSelectField,
  type OnboardingData,
  type OnboardingStep,
} from "./types";

// Persisted as the user goes (not just on final completion) so a reload
// mid-flow resumes where they left off instead of restarting from scratch.
export function useOnboardingState() {
  const [step, setStep] = useState<OnboardingStep>(() =>
    readStorage<OnboardingStep>(STORAGE_KEYS.onboardingStep, "welcome"),
  );
  const [data, setData] = useState<OnboardingData>(() =>
    readStorage(STORAGE_KEYS.onboardingData, INITIAL_ONBOARDING_DATA),
  );

  const goTo = useCallback((next: OnboardingStep) => {
    setStep(next);
    writeStorage(STORAGE_KEYS.onboardingStep, next);
  }, []);

  const updateField = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((current) => {
        const next = { ...current, [key]: value };
        writeStorage(STORAGE_KEYS.onboardingData, next);
        return next;
      });
    },
    [],
  );

  const toggleOption = useCallback((field: MultiSelectField, option: string) => {
    setData((current) => {
      const selected = current[field];
      const nextSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      const next = { ...current, [field]: nextSelected };
      writeStorage(STORAGE_KEYS.onboardingData, next);
      return next;
    });
  }, []);

  const questionStepIndex = useMemo(() => QUESTION_STEPS.indexOf(step), [step]);

  return {
    step,
    goTo,
    data,
    updateField,
    toggleOption,
    /** 1-based position within the 5-step question sequence, or null outside it. */
    questionStepNumber: questionStepIndex === -1 ? null : questionStepIndex + 1,
  };
}
