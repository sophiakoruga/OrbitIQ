import type { RefObject } from "react";
import { QuestionStepScreen } from "../components/QuestionStepScreen";
import { PLATFORM_OPTIONS } from "../types";

interface PlatformsScreenProps {
  selected: string[];
  onToggle: (option: string) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onBack: () => void;
  onNext: () => void;
}

export function PlatformsScreen(props: PlatformsScreenProps) {
  return (
    <QuestionStepScreen
      title="Preferred Platforms"
      question="Which AI tools do you use?*"
      options={PLATFORM_OPTIONS}
      {...props}
    />
  );
}
