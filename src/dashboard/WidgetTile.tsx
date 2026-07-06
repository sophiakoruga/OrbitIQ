import { motion } from "framer-motion";
import { TrendBadge } from "./TrendBadge";
import { useAnimatedValue } from "./useAnimatedValue";
import type { WidgetTrend } from "./widgets";

interface WidgetTileProps {
  id: string;
  label: string;
  value: string;
  caption: string;
  trend?: WidgetTrend;
  animationDelayMs?: number;
  onClick: () => void;
}

export function WidgetTile({
  id,
  label,
  value,
  caption,
  trend,
  animationDelayMs = 0,
  onClick,
}: WidgetTileProps) {
  const animatedValue = useAnimatedValue(value);

  return (
    <motion.button
      id={id}
      type="button"
      onClick={onClick}
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: animationDelayMs / 1000 }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.98 }}
      className="flex min-h-[128px] cursor-pointer flex-col items-start justify-between gap-1 rounded-xl
        border border-stratosphere bg-white/70 p-4 text-left shadow-sm transition-shadow duration-[180ms]
        hover:border-boysenberry/40 hover:shadow-md
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
    >
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-boysenberry/70">
        {label}
      </span>
      <span className="font-display text-2xl font-bold leading-tight text-dark-matter">
        {animatedValue}
      </span>
      {(caption || trend) && (
        <div className="flex flex-col gap-0.5">
          {caption && <span className="font-body text-xs text-dark-matter/60">{caption}</span>}
          {trend && <TrendBadge trend={trend} />}
        </div>
      )}
    </motion.button>
  );
}
