import { motion } from "framer-motion";
import { QUESTION_STEPS } from "../types";

interface ProgressDotsProps {
  currentStepNumber: number;
}

export function ProgressDots({ currentStepNumber }: ProgressDotsProps) {
  const total = QUESTION_STEPS.length;

  return (
    <div className="flex items-center gap-[7.575px]" role="presentation">
      <span className="sr-only">
        Step {currentStepNumber} of {total}
      </span>
      {QUESTION_STEPS.map((_, index) => {
        const isCurrent = index + 1 === currentStepNumber;
        return (
          <motion.span
            key={index}
            aria-hidden="true"
            className="block size-[9.57px] rounded-full"
            animate={{
              scale: isCurrent ? 1.3 : 1,
              backgroundColor: isCurrent ? "#003A6C" : "#C6D4DC",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
