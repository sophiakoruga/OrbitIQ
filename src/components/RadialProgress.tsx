import { motion, useReducedMotion } from "framer-motion";

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}

export function RadialProgress({
  value,
  max = 100,
  size = 96,
  strokeWidth = 9,
  color = "#003A6C",
  trackColor = "#C6D4DC",
  label,
}: RadialProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value / max));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={label ?? `${value} out of ${max}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut", delay: 0.1 }
          }
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold leading-none text-dark-matter">
          {value}
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-dark-matter/50">
          / {max}
        </span>
      </div>
    </div>
  );
}
