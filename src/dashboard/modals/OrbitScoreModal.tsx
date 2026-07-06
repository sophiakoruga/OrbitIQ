import { LineChart } from "../../components/LineChart";
import { Modal } from "../../components/Modal";
import { RadialProgress } from "../../components/RadialProgress";
import { PillButton } from "../../onboarding/components/PillButton";
import type { OnboardingData } from "../../onboarding/types";
import { TrendBadge } from "../TrendBadge";
import { getOrbitScoreDetails } from "../widgetDetails";

interface OrbitScoreModalProps {
  data: OnboardingData;
  onClose: () => void;
}

export function OrbitScoreModal({ data, onClose }: OrbitScoreModalProps) {
  const { score, trend, breakdown, history } = getOrbitScoreDetails(data);

  return (
    <Modal
      titleId="orbit-score-modal-title"
      title="Orbit Score"
      onClose={onClose}
      actions={
        <PillButton variant="primary" onClick={onClose}>
          Got it
        </PillButton>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <RadialProgress value={score} max={100} label={`Orbit Score ${score} out of 100`} />
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-sm text-dark-matter/70">Overall score</span>
            <TrendBadge trend={trend} />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-dark-matter/80">
          Your Orbit Score blends how often you use AI, how many tools you rely on, and how clear
          your goals are.
        </p>

        <div className="flex flex-col gap-3">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Contributing factors
          </span>
          {breakdown.map((factor) => (
            <div key={factor.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between font-body text-sm text-dark-matter/80">
                <span>{factor.label}</span>
                <span className="text-dark-matter/50">
                  {factor.value}/{factor.max}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-stratosphere/50">
                <div
                  className="h-full rounded-full bg-boysenberry transition-[width] duration-700 ease-out"
                  style={{ width: `${(factor.value / factor.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Orbit Score trend
          </span>
          <LineChart data={history} />
        </div>
      </div>
    </Modal>
  );
}
