import type { RefObject } from "react";
import { QuestionStepScreen } from "../components/QuestionStepScreen";
import { AI_USAGE_OPTIONS } from "../types";

interface AiUsageScreenProps {
  selected: string[];
  onToggle: (option: string) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onNext: () => void;
}

export function AiUsageScreen(props: AiUsageScreenProps) {
  return (
    <QuestionStepScreen
      title="AI Usage"
      question="How do you use AI?*"
      options={AI_USAGE_OPTIONS}
      {...props}
    />
  );
}
