import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  titleId: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
}

export function Modal({ titleId, title, onClose, children, actions }: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    cardRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-dark-matter/50"
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-sm overflow-y-auto rounded-2xl bg-exosphere p-6
          shadow-2xl outline-none"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-2xl font-bold leading-tight text-dark-matter">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1 shrink-0 rounded-full p-1 text-dark-matter/50 transition-colors
              hover:bg-black/5 hover:text-dark-matter
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="font-body text-dark-matter">{children}</div>
        {actions && <div className="mt-6 flex justify-end gap-3">{actions}</div>}
      </motion.div>
    </div>
  );
}
