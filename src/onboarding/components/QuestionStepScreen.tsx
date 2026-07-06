import type { RefObject } from "react";
import { CheckboxGroup } from "./CheckboxGroup";
import { CheckboxOption } from "./CheckboxOption";
import { OnboardingStepShell } from "./OnboardingStepShell";

interface QuestionStepScreenProps {
  title: string;
  question: string;
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

/**
 * The shared shape behind AI Usage, Preferred Platforms, Goals, and Consent:
 * a headline, one multi-select checkbox question, and back/next actions.
 */
export function QuestionStepScreen({
  title,
  question,
  options,
  selected,
  onToggle,
  stepNumber,
  headingRef,
  onBack,
  onNext,
  nextLabel,
}: QuestionStepScreenProps) {
  return (
    <OnboardingStepShell
      title={title}
      stepNumber={stepNumber}
      headingRef={headingRef}
      onBack={onBack}
      onNext={onNext}
      nextLabel={nextLabel}
      nextDisabled={selected.length === 0}
    >
      <CheckboxGroup legend={question}>
        {options.map((option) => (
          <CheckboxOption
            key={option}
            label={option}
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
        ))}
      </CheckboxGroup>
    </OnboardingStepShell>
  );
}
