import type { RefObject } from "react";
import { QuestionStepScreen } from "../components/QuestionStepScreen";

const CONSENT_OPTION = "Yes, I agree!";

interface ConsentScreenProps {
  consent: boolean;
  onConsentChange: (consent: boolean) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onNext: () => void;
}

export function ConsentScreen({
  consent,
  onConsentChange,
  onBack,
  onNext,
  ...rest
}: ConsentScreenProps) {
  return (
    <QuestionStepScreen
      title="Lastly!"
      question="Allow OrbitIQ to analyze AI usage patterns in your browser?*"
      options={[CONSENT_OPTION]}
      selected={consent ? [CONSENT_OPTION] : []}
      onToggle={() => onConsentChange(!consent)}
      onBack={onBack}
      onNext={onNext}
      nextLabel="Create account"
      {...rest}
    />
  );
}
