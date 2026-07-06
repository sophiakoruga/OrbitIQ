import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type RefObject } from "react";
import { Mascot } from "../components/Mascot";
import { OnboardingHeader } from "../components/OnboardingHeader";
import { PillButton } from "../components/PillButton";

interface LoadingScreenProps {
  headingRef?: RefObject<HTMLHeadingElement>;
  onGoToDashboard: () => void;
}

const AUTO_ADVANCE_MS = 1800;

export function LoadingScreen({ headingRef, onGoToDashboard }: LoadingScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  // Feels like a premium product completing setup on its own — the button
  // stays as a manual skip-ahead for anyone who doesn't want to wait.
  useEffect(() => {
    const timeout = setTimeout(onGoToDashboard, AUTO_ADVANCE_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-exosphere">
      <OnboardingHeader />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
        <Mascot type="dog" />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="max-w-sm text-center font-display text-4xl font-bold leading-tight text-dark-matter outline-none sm:text-5xl"
        >
          Building your personalized dashboard...
        </h1>
        <LoadingDots reduceMotion={Boolean(shouldReduceMotion)} />
        <PillButton variant="neutral" onClick={onGoToDashboard}>
          Go to dashboard
        </PillButton>
      </div>
    </div>
  );
}

function LoadingDots({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex items-center gap-2" role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-2.5 rounded-full bg-boysenberry"
          animate={reduceMotion ? { opacity: [0.4, 1, 0.4] } : { y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}
