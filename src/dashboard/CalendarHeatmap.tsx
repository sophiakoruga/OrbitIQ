import { motion, useReducedMotion } from "framer-motion";

interface CalendarHeatmapProps {
  /** Intensity per day, oldest first, each 0-3. */
  values: number[];
}

const INTENSITY_COLORS = ["#EDF1F3", "#C6D4DC", "#5B85A3", "#003A6C"];

export function CalendarHeatmap({ values }: CalendarHeatmapProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="grid grid-cols-7 gap-1.5"
      role="img"
      aria-label={`Focus activity for the last ${values.length} days`}
    >
      {values.map((intensity, index) => (
        <motion.div
          key={index}
          className="aspect-square rounded-[3px]"
          style={{ backgroundColor: INTENSITY_COLORS[intensity] ?? INTENSITY_COLORS[0] }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : index * 0.012 }}
        />
      ))}
    </div>
  );
}
