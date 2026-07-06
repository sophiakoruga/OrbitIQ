import { LineChart } from "../../components/LineChart";
import { Modal } from "../../components/Modal";
import { PieChart } from "../../components/PieChart";
import { PillButton } from "../../onboarding/components/PillButton";
import type { OnboardingData } from "../../onboarding/types";
import { getAiSessionsDetails, getPlatformPieData } from "../widgetDetails";

interface AiSessionsModalProps {
  data: OnboardingData;
  onClose: () => void;
}

export function AiSessionsModal({ data, onClose }: AiSessionsModalProps) {
  const { weeklyChart, dailyAverage } = getAiSessionsDetails(data);
  const platformPieData = getPlatformPieData(data);

  return (
    <Modal
      titleId="ai-sessions-modal-title"
      title="AI Sessions"
      onClose={onClose}
      actions={
        <PillButton variant="primary" onClick={onClose}>
          Got it
        </PillButton>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold text-dark-matter">{dailyAverage}</span>
          <span className="text-sm text-dark-matter/60">sessions per day, on average</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Weekly usage
          </span>
          <LineChart data={weeklyChart} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
            Platform usage
          </span>
          <PieChart data={platformPieData} />
        </div>
      </div>
    </Modal>
  );
}
