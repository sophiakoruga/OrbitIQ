import { motion } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}

export function Toast({ message, onDismiss, durationMs = 2500 }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timeout);
  }, [onDismiss, durationMs]);

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <span className="rounded-full bg-boysenberry px-4 py-2 font-body text-sm font-medium text-exosphere shadow-lg">
        {message}
      </span>
    </motion.div>
  );
}
