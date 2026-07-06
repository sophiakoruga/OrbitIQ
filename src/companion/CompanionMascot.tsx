import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ASTRONAUT_IMAGES } from "./astronautAssets";
import type { CompanionConfig } from "./companion";

interface CompanionMascotProps {
  config: CompanionConfig;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  lg: { width: 144, height: 198 },
  // ~11% smaller than lg — used where the mascot sits alongside the
  // companion picker so it doesn't dominate the row.
  md: { width: 128, height: 176 },
  sm: { width: 78, height: 107 },
};

export function CompanionMascot({ config, size = "lg" }: CompanionMascotProps) {
  const dims = SIZES[size];
  const shouldReduceMotion = useReducedMotion();
  const suitImage = ASTRONAUT_IMAGES[config.suit] ?? ASTRONAUT_IMAGES.blue;

  return (
    <div className="relative shrink-0 overflow-hidden" style={{ width: dims.width, height: dims.height }}>
      {/* Each suit is a complete, finished export — selecting one swaps the
          whole image (crossfading briefly), it's never recolored. */}
      <AnimatePresence initial={false}>
        <motion.img
          key={config.suit}
          src={suitImage}
          alt=""
          className="absolute inset-0 size-full object-contain"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        />
      </AnimatePresence>
    </div>
  );
}
