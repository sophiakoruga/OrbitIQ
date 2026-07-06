import { LineChart } from "../../components/LineChart";
import { Modal } from "../../components/Modal";
import { MiniBarChart } from "../../components/MiniBarChart";
import { PillButton } from "../../onboarding/components/PillButton";
import type { OnboardingData } from "../../onboarding/types";
import { getTimeSavedDetails } from "../widgetDetails";

interface TimeSavedModalProps {
  data: OnboardingData;
  onClose: () => void;
}

export function TimeSavedModal({ data, onClose }: TimeSavedModalProps) {
  const { today, thisWeek, thisMonth, yearlyEstimate, dailyChart, trend } =
    getTimeSavedDetails(data);

  const stats = [
    { label: "Today", value: `${today} hrs` },
    { label: "This week", value: `${thisWeek} hrs` },
    { label: "This month", value: `${thisMonth} hrs` },
    { label: "Yearly estimate", value: `${yearlyEstimate} hrs` },
  ];

  return (
    <Modal
      titleId="time-saved-modal-title"
      title="Estimated Time Saved"
      onClose={onClose}
      actions={
        <PillButton variant="primary" onClick={onClose}>
          Got it
        </PillButton>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 rounded-xl border border-stratosphere bg-white/60 p-3"
            >
              <span className="font-body text-xs font-medium uppercase tracking-wide text-dark-matter/50">
                {stat.label}
              </span>
              <span className="font-display text-xl font-bold text-dark-matter">{stat.value}</span>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-dark-matter/80">
          Based on typical time savings for your most common tasks, here's how that adds up day to
          day and across the year.
        </p>
        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            This week, by day
          </span>
          <MiniBarChart data={dailyChart} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Time saved trend
          </span>
          <LineChart data={trend} valueSuffix=" hrs" />
        </div>
      </div>
    </Modal>
  );
}
