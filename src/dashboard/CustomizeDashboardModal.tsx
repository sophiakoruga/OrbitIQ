import { motion } from "framer-motion";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { PillButton } from "../onboarding/components/PillButton";
import {
  DEFAULT_DASHBOARD_LAYOUT,
  WIDGET_LABELS,
  type DashboardLayout,
  type WidgetId,
} from "./widgets";

interface CustomizeDashboardModalProps {
  layout: DashboardLayout;
  onSave: (layout: DashboardLayout) => void;
  onClose: () => void;
}

export function CustomizeDashboardModal({ layout, onSave, onClose }: CustomizeDashboardModalProps) {
  const [order, setOrder] = useState<WidgetId[]>(layout.order);
  const [hidden, setHidden] = useState<WidgetId[]>(layout.hidden);

  function moveUp(index: number) {
    if (index === 0) return;
    setOrder((current) => {
      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    setOrder((current) => {
      if (index === current.length - 1) return current;
      const next = [...current];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  function toggleHidden(id: WidgetId) {
    setHidden((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function resetToDefault() {
    setOrder([...DEFAULT_DASHBOARD_LAYOUT.order]);
    setHidden([...DEFAULT_DASHBOARD_LAYOUT.hidden]);
  }

  const visibleCount = order.length - hidden.length;

  return (
    <Modal
      titleId="customize-dashboard-title"
      title="Customize Dashboard"
      onClose={onClose}
      actions={
        <>
          <PillButton variant="secondary" onClick={onClose}>
            Cancel
          </PillButton>
          <PillButton
            variant="primary"
            onClick={() => onSave({ order, hidden })}
            disabled={visibleCount === 0}
          >
            Save
          </PillButton>
        </>
      }
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="font-body text-sm text-dark-matter/70">
          Show, hide, or reorder the widgets on your dashboard.
        </p>
        <button
          type="button"
          onClick={resetToDefault}
          className="shrink-0 whitespace-nowrap font-body text-sm font-medium text-boysenberry/70 underline-offset-2
            transition-colors hover:text-boysenberry hover:underline
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
        >
          Reset to default
        </button>
      </div>
      <ul className="flex flex-col gap-3">
        {order.map((id, index) => {
          const isVisible = !hidden.includes(id);
          return (
            <motion.li
              key={id}
              layout="position"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl border border-stratosphere bg-white/70 px-3 py-2.5"
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => toggleHidden(id)}
                aria-label={`Show ${WIDGET_LABELS[id]} on dashboard`}
                className="size-5 shrink-0 accent-boysenberry
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
              />
              <span
                className={`flex-1 font-body text-sm ${isVisible ? "text-boysenberry" : "text-dark-matter/40"}`}
              >
                {WIDGET_LABELS[id]}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  aria-label={`Move ${WIDGET_LABELS[id]} up`}
                  className="flex size-7 items-center justify-center rounded-full text-boysenberry transition-all duration-150
                    hover:bg-boysenberry/10 active:scale-90 disabled:pointer-events-none disabled:opacity-25
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
                    <path
                      d="M8 12V4M4 7.5 8 4l4 3.5"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === order.length - 1}
                  aria-label={`Move ${WIDGET_LABELS[id]} down`}
                  className="flex size-7 items-center justify-center rounded-full text-boysenberry transition-all duration-150
                    hover:bg-boysenberry/10 active:scale-90 disabled:pointer-events-none disabled:opacity-25
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
                    <path
                      d="M8 4v8M4 8.5 8 12l4-3.5"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Modal>
  );
}
