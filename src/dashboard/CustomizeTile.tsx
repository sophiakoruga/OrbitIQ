import { motion } from "framer-motion";

interface CustomizeTileProps {
  id: string;
  animationDelayMs?: number;
  onClick: () => void;
}

export function CustomizeTile({ id, animationDelayMs = 0, onClick }: CustomizeTileProps) {
  return (
    <motion.button
      id={id}
      type="button"
      onClick={onClick}
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: animationDelayMs / 1000 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex min-h-[128px] flex-col items-start justify-center gap-1 rounded-xl border border-dashed
        border-boysenberry/40 bg-boysenberry/5 p-4 text-left transition-colors duration-200 hover:bg-boysenberry/10
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-boysenberry text-exosphere">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-body text-sm font-semibold text-boysenberry">Customize Dashboard</span>
      <span className="font-body text-xs text-boysenberry/70">Show or hide, reorder widgets</span>
    </motion.button>
  );
}
