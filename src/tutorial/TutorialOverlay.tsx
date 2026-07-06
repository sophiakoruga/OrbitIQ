import { useEffect, useRef, useState } from "react";
import { PillButton } from "../onboarding/components/PillButton";
import type { TutorialStep } from "./tutorialSteps";

interface TutorialOverlayProps {
  steps: TutorialStep[];
  onFinish: () => void;
}

const TOOLTIP_WIDTH = 288;
const TOOLTIP_ESTIMATED_HEIGHT = 180;
const VIEWPORT_MARGIN = 16;

export function TutorialOverlay({ steps, onFinish }: TutorialOverlayProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const step = steps[index];

  useEffect(() => {
    const target = document.getElementById(step.targetId);
    target?.scrollIntoView({ block: "center", behavior: "smooth" });

    const measure = () => setRect(target?.getBoundingClientRect() ?? null);
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [step.targetId]);

  useEffect(() => {
    tooltipRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFinish();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handleBack();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleNext() {
    if (index < steps.length - 1) setIndex(index + 1);
    else onFinish();
  }

  function handleBack() {
    if (index > 0) setIndex(index - 1);
  }

  if (!rect) return null;

  const spotlightPadding = 6;
  const fitsBelow =
    rect.bottom + VIEWPORT_MARGIN + TOOLTIP_ESTIMATED_HEIGHT < window.innerHeight;
  const tooltipTop = fitsBelow
    ? rect.bottom + 12
    : Math.max(VIEWPORT_MARGIN, rect.top - TOOLTIP_ESTIMATED_HEIGHT - 12);
  const tooltipLeft = Math.min(
    Math.max(rect.left, VIEWPORT_MARGIN),
    window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN,
  );

  return (
    <>
      <div className="fixed inset-0 z-40" aria-hidden="true" />
      <div
        className="pointer-events-none fixed z-40 rounded-xl transition-all duration-200 ease-out"
        style={{
          top: rect.top - spotlightPadding,
          left: rect.left - spotlightPadding,
          width: rect.width + spotlightPadding * 2,
          height: rect.height + spotlightPadding * 2,
          boxShadow: "0 0 0 9999px rgba(18, 29, 38, 0.65)",
        }}
        aria-hidden="true"
      />
      <div
        ref={tooltipRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-step-title"
        aria-describedby="tutorial-step-description"
        tabIndex={-1}
        className="fixed z-50 rounded-2xl bg-exosphere p-5 shadow-2xl outline-none animate-step-in motion-reduce:animate-none"
        style={{ top: tooltipTop, left: tooltipLeft, width: TOOLTIP_WIDTH }}
      >
        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wide text-boysenberry/70">
          Step {index + 1} of {steps.length}
        </p>
        <h2
          id="tutorial-step-title"
          className="mb-2 font-display text-xl font-bold leading-tight text-dark-matter"
        >
          {step.title}
        </h2>
        <p id="tutorial-step-description" className="mb-4 font-body text-sm text-dark-matter/80">
          {step.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onFinish}
            className="font-body text-sm font-medium text-dark-matter/50 transition-colors hover:text-dark-matter
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
          >
            Skip
          </button>
          <div className="flex gap-2">
            {index > 0 && (
              <PillButton variant="secondary" onClick={handleBack}>
                Back
              </PillButton>
            )}
            <PillButton variant="primary" onClick={handleNext}>
              {index === steps.length - 1 ? "Done" : "Next"}
            </PillButton>
          </div>
        </div>
      </div>
    </>
  );
}
