import type { ReactNode, RefObject } from "react";
import { Mascot } from "./Mascot";
import { OnboardingHeader } from "./OnboardingHeader";
import { PillButton } from "./PillButton";
import { ProgressDots } from "./ProgressDots";

interface OnboardingStepShellProps {
  title: string;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  children: ReactNode;
}

/**
 * Shared chrome for the five question steps (profile through consent):
 * header, mascot, progress dots, headline, question content, then a
 * back/next footer. Individual screens only supply the copy and question.
 */
export function OnboardingStepShell({
  title,
  stepNumber,
  headingRef,
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  children,
}: OnboardingStepShellProps) {
  return (
    <div className="flex min-h-full w-full flex-col items-center bg-exosphere">
      <OnboardingHeader />
      <div className="flex w-full flex-1 flex-col items-center gap-10 px-6 py-8 sm:gap-16 sm:py-10">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <Mascot type="dog" />
          <ProgressDots currentStepNumber={stepNumber} />
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-center font-display text-4xl font-bold leading-tight text-dark-matter outline-none sm:text-5xl"
          >
            {title}
          </h1>
        </div>

        <div className="flex w-full flex-1 flex-col items-center gap-6">{children}</div>

        <div className="flex w-full max-w-sm flex-wrap items-center justify-between gap-3">
          {onBack ? (
            <PillButton variant="secondary" onClick={onBack}>
              Back
            </PillButton>
          ) : (
            <span />
          )}
          <PillButton variant="primary" onClick={onNext} disabled={nextDisabled}>
            {nextLabel}
          </PillButton>
        </div>
      </div>
    </div>
  );
}
