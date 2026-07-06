import { motion, useReducedMotion } from "framer-motion";

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
}

export function PieChart({ data, size = 112 }: PieChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const strokeWidth = size * 0.28;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="flex items-center gap-4">
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: size, height: size }}
        className="-rotate-90 shrink-0"
        role="img"
        aria-label={data.map((d) => `${d.label}: ${Math.round((d.value / total) * 100)}%`).join(", ")}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EDF1F3"
          strokeWidth={strokeWidth}
        />
        {data.map((slice) => {
          const fraction = slice.value / total;
          const dashLength = fraction * circumference;
          const dashOffset = -((cumulative / total) * circumference);
          cumulative += slice.value;
          return (
            <circle
              key={slice.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </motion.svg>
      <ul className="flex flex-col gap-1.5">
        {data.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2 font-body text-sm text-dark-matter/80">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: slice.color }}
              aria-hidden="true"
            />
            {slice.label}
            <span className="text-dark-matter/50">{Math.round((slice.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
