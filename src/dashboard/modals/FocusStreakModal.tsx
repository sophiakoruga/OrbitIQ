import { Modal } from "../../components/Modal";
import { PillButton } from "../../onboarding/components/PillButton";
import type { OnboardingData } from "../../onboarding/types";
import { CalendarHeatmap } from "../CalendarHeatmap";
import { getFocusStreakDetails } from "../widgetDetails";

interface FocusStreakModalProps {
  data: OnboardingData;
  onClose: () => void;
}

export function FocusStreakModal({ data, onClose }: FocusStreakModalProps) {
  const { current, longest, heatmap, tips } = getFocusStreakDetails(data);

  return (
    <Modal
      titleId="focus-streak-modal-title"
      title="Focus Streak"
      onClose={onClose}
      actions={
        <PillButton variant="primary" onClick={onClose}>
          Got it
        </PillButton>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-0.5 rounded-xl border border-stratosphere bg-white/60 p-3">
            <span className="font-body text-xs font-medium uppercase tracking-wide text-dark-matter/50">
              Current streak
            </span>
            <span className="font-display text-xl font-bold text-dark-matter">{current} days</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-xl border border-stratosphere bg-white/60 p-3">
            <span className="font-body text-xs font-medium uppercase tracking-wide text-dark-matter/50">
              Longest streak
            </span>
            <span className="font-display text-xl font-bold text-dark-matter">{longest} days</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Last 4 weeks
          </span>
          <CalendarHeatmap values={heatmap} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Tips to keep it going
          </span>
          <ul className="flex flex-col gap-2">
            {tips.map((tip) => (
              <li key={tip} className="flex gap-2 font-body text-sm text-dark-matter/80">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-boysenberry" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
