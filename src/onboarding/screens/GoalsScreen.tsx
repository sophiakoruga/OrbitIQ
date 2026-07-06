import type { RefObject } from "react";
import { QuestionStepScreen } from "../components/QuestionStepScreen";
import { GOAL_OPTIONS } from "../types";

interface GoalsScreenProps {
  selected: string[];
  onToggle: (option: string) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onNext: () => void;
}

export function GoalsScreen(props: GoalsScreenProps) {
  return (
    <QuestionStepScreen
      title="Goals"
      question="What are your goals with AI?*"
      options={GOAL_OPTIONS}
      {...props}
    />
  );
}
