import { Reorder, useDragControls } from "framer-motion";
import { useRef, useState } from "react";
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
  /** Applied immediately — toggling visibility or dropping a reorder updates
   *  the real dashboard right away, not just on Save. */
  onLiveChange: (layout: DashboardLayout) => void;
  /** Closes and confirms the (already-applied) changes. */
  onConfirm: () => void;
  /** Restores whatever the layout was when the modal opened, then closes. */
  onCancel: (previousLayout: DashboardLayout) => void;
}

function GripIcon() {
  return (
    <svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true" className="size-4">
      <circle cx="2.5" cy="2.5" r="1.3" />
      <circle cx="7.5" cy="2.5" r="1.3" />
      <circle cx="2.5" cy="8" r="1.3" />
      <circle cx="7.5" cy="8" r="1.3" />
      <circle cx="2.5" cy="13.5" r="1.3" />
      <circle cx="7.5" cy="13.5" r="1.3" />
    </svg>
  );
}

export function CustomizeDashboardModal({
  layout,
  onLiveChange,
  onConfirm,
  onCancel,
}: CustomizeDashboardModalProps) {
  const initialLayout = useRef(layout).current;
  const [order, setOrder] = useState<WidgetId[]>(layout.order);
  const [hidden, setHidden] = useState<WidgetId[]>(layout.hidden);

  function commit(nextOrder: WidgetId[], nextHidden: WidgetId[]) {
    setOrder(nextOrder);
    setHidden(nextHidden);
    onLiveChange({ order: nextOrder, hidden: nextHidden });
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...order];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    commit(next, hidden);
  }

  function moveDown(index: number) {
    if (index === order.length - 1) return;
    const next = [...order];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    commit(next, hidden);
  }

  function toggleHidden(id: WidgetId) {
    const nextHidden = hidden.includes(id)
      ? hidden.filter((item) => item !== id)
      : [...hidden, id];
    commit(order, nextHidden);
  }

  function resetToDefault() {
    commit([...DEFAULT_DASHBOARD_LAYOUT.order], [...DEFAULT_DASHBOARD_LAYOUT.hidden]);
  }

  const visibleCount = order.length - hidden.length;

  return (
    <Modal
      titleId="customize-dashboard-title"
      title="Customize Dashboard"
      onClose={() => onCancel(initialLayout)}
      actions={
        <>
          <PillButton variant="secondary" onClick={() => onCancel(initialLayout)}>
            Cancel
          </PillButton>
          <PillButton variant="primary" onClick={onConfirm} disabled={visibleCount === 0}>
            Save
          </PillButton>
        </>
      }
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="font-body text-sm text-dark-matter/70">
          Drag to reorder, or show/hide widgets on your dashboard.
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
      <Reorder.Group
        as="ul"
        axis="y"
        values={order}
        onReorder={(next) => commit(next, hidden)}
        className="flex flex-col gap-3"
      >
        {order.map((id, index) => {
          const isVisible = !hidden.includes(id);
          return (
            <Row
              key={id}
              id={id}
              index={index}
              isLast={index === order.length - 1}
              isVisible={isVisible}
              onToggle={() => toggleHidden(id)}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          );
        })}
      </Reorder.Group>
    </Modal>
  );
}

interface RowProps {
  id: WidgetId;
  index: number;
  isLast: boolean;
  isVisible: boolean;
  onToggle: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function Row({ id, index, isLast, isVisible, onToggle, onMoveUp, onMoveDown }: RowProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-2 rounded-xl border border-stratosphere bg-white/70 px-3 py-2.5"
    >
      <button
        type="button"
        onPointerDown={(event) => dragControls.start(event)}
        aria-label={`Drag to reorder ${WIDGET_LABELS[id]}`}
        className="flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-full
          text-dark-matter/40 transition-colors hover:bg-black/5 hover:text-dark-matter active:cursor-grabbing
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
      >
        <GripIcon />
      </button>
      <input
        type="checkbox"
        checked={isVisible}
        onChange={onToggle}
        aria-label={`Show ${WIDGET_LABELS[id]} on dashboard`}
        className="size-5 shrink-0 accent-boysenberry
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
      />
      <span className={`flex-1 font-body text-sm ${isVisible ? "text-boysenberry" : "text-dark-matter/40"}`}>
        {WIDGET_LABELS[id]}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onMoveUp}
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
          onClick={onMoveDown}
          disabled={isLast}
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
    </Reorder.Item>
  );
}
