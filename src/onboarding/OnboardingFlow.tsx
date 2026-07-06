import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { AiUsageScreen } from "./screens/AiUsageScreen";
import { ConsentScreen } from "./screens/ConsentScreen";
import { GoalsScreen } from "./screens/GoalsScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { PlatformsScreen } from "./screens/PlatformsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import type { OnboardingData } from "./types";
import { useOnboardingState } from "./useOnboardingState";

interface OnboardingFlowProps {
  /** Called once the user finishes the flow and lands on "Go to dashboard". */
  onComplete: (data: OnboardingData) => void;
  /** Called from the welcome screen's "Sign in" action (existing-user path, out of scope here). */
  onSignIn: () => void;
}

export function OnboardingFlow({ onComplete, onSignIn }: OnboardingFlowProps) {
  const { step, goTo, data, updateField, toggleOption, questionStepNumber } =
    useOnboardingState();
  const headingRef = useRef<HTMLHeadingElement>(null);

  function renderStep() {
    switch (step) {
      case "welcome":
        return (
          <WelcomeScreen
            headingRef={headingRef}
            onSignIn={onSignIn}
            onCreateAccount={() => goTo("profile")}
          />
        );

      case "profile":
        return (
          <ProfileScreen
            headingRef={headingRef}
            stepNumber={questionStepNumber ?? 1}
            name={data.name}
            email={data.email}
            onNameChange={(value) => updateField("name", value)}
            onEmailChange={(value) => updateField("email", value)}
            onNext={() => goTo("ai-usage")}
          />
        );

      case "ai-usage":
        return (
          <AiUsageScreen
            headingRef={headingRef}
            stepNumber={questionStepNumber ?? 2}
            selected={data.aiUsage}
            onToggle={(option) => toggleOption("aiUsage", option)}
            onBack={() => goTo("profile")}
            onNext={() => goTo("platforms")}
          />
        );

      case "platforms":
        return (
          <PlatformsScreen
            headingRef={headingRef}
            stepNumber={questionStepNumber ?? 3}
            selected={data.platforms}
            onToggle={(option) => toggleOption("platforms", option)}
            onBack={() => goTo("ai-usage")}
            onNext={() => goTo("goals")}
          />
        );

      case "goals":
        return (
          <GoalsScreen
            headingRef={headingRef}
            stepNumber={questionStepNumber ?? 4}
            selected={data.goals}
            onToggle={(option) => toggleOption("goals", option)}
            onBack={() => goTo("platforms")}
            onNext={() => goTo("consent")}
          />
        );

      case "consent":
        return (
          <ConsentScreen
            headingRef={headingRef}
            stepNumber={questionStepNumber ?? 5}
            consent={data.analyticsConsent}
            onConsentChange={(value) => updateField("analyticsConsent", value)}
            onBack={() => goTo("goals")}
            onNext={() => goTo("loading")}
          />
        );

      case "loading":
        return <LoadingScreen headingRef={headingRef} onGoToDashboard={() => onComplete(data)} />;
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        // Move focus to the new screen's heading once it's actually in the DOM
        // and settled — screen readers and keyboard users get the same
        // "you're on a new step" cue sighted users get from the animation.
        onAnimationComplete={() => headingRef.current?.focus()}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}
