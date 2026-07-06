import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CompanionMascot } from "../companion/CompanionMascot";
import { useCompanion } from "../companion/useCompanion";
import { OnboardingHeader } from "../onboarding/components/OnboardingHeader";
import type { OnboardingData } from "../onboarding/types";
import { readStorage, writeStorage, STORAGE_KEYS } from "../lib/storage";
import { TutorialOverlay } from "../tutorial/TutorialOverlay";
import { TUTORIAL_STEPS } from "../tutorial/tutorialSteps";
import { CustomizeDashboardModal } from "./CustomizeDashboardModal";
import { CustomizeTile } from "./CustomizeTile";
import { getTimeOfDayGreeting } from "./greeting";
import { AiSessionsModal } from "./modals/AiSessionsModal";
import { FocusStreakModal } from "./modals/FocusStreakModal";
import { OrbitScoreModal } from "./modals/OrbitScoreModal";
import { TimeSavedModal } from "./modals/TimeSavedModal";
import { WeeklyInsightCard } from "./WeeklyInsightCard";
import { WidgetSkeleton, GreetingSkeleton } from "./WidgetSkeleton";
import { WidgetTile } from "./WidgetTile";
import { buildWidgets, DEFAULT_DASHBOARD_LAYOUT, type DashboardLayout, type WidgetId } from "./widgets";

interface DashboardProps {
  data: OnboardingData;
  onOpenProfile: () => void;
}

const SKELETON_DURATION_MS = 500;

export function Dashboard({ data, onOpenProfile }: DashboardProps) {
  const widgets = buildWidgets(data);
  const firstName = data.name.trim().split(" ")[0] || "there";
  const { companion } = useCompanion();

  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<DashboardLayout>(() =>
    readStorage(STORAGE_KEYS.dashboardLayout, DEFAULT_DASHBOARD_LAYOUT),
  );
  const [activeWidgetId, setActiveWidgetId] = useState<WidgetId | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showTutorial, setShowTutorial] = useState(
    () => !readStorage(STORAGE_KEYS.tutorialSeen, false),
  );

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), SKELETON_DURATION_MS);
    return () => clearTimeout(timeout);
  }, []);

  const orderedVisibleWidgets = layout.order
    .filter((id) => !layout.hidden.includes(id))
    .map((id) => widgets.find((widget) => widget.id === id))
    .filter((widget): widget is NonNullable<typeof widget> => Boolean(widget));

  function handleSaveLayout(next: DashboardLayout) {
    setLayout(next);
    writeStorage(STORAGE_KEYS.dashboardLayout, next);
    setShowCustomize(false);
  }

  function finishTutorial() {
    writeStorage(STORAGE_KEYS.tutorialSeen, true);
    setShowTutorial(false);
  }

  return (
    <div className="flex min-h-full w-full flex-col bg-exosphere">
      <OnboardingHeader
        actions={
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowTutorial(true)}
              aria-label="Replay tutorial"
              title="Replay tutorial"
              className="flex size-8 items-center justify-center rounded-full text-exosphere/80 transition-colors
                hover:bg-white/10 hover:text-exosphere
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-exosphere"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth={1.5} />
                <path
                  d="M7.8 7.6a2.2 2.2 0 1 1 3.1 2c-.7.4-1.1.9-1.1 1.6"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <circle cx="10" cy="14" r="0.9" fill="currentColor" />
              </svg>
            </button>
            <button
              id="profile-button"
              type="button"
              onClick={onOpenProfile}
              aria-label="Open profile and settings"
              title="Profile & settings"
              className="flex size-8 items-center justify-center rounded-full text-exosphere/80 transition-colors
                hover:bg-white/10 hover:text-exosphere
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-exosphere"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
                <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth={1.5} />
                <path
                  d="M3.5 16.2c1.3-2.6 3.8-4 6.5-4s5.2 1.4 6.5 4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        }
      />

      <div className="flex w-full flex-1 flex-col gap-6 px-6 py-8">
        {isLoading ? (
          <GreetingSkeleton />
        ) : (
          <motion.div
            id="tutorial-greeting"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4 rounded-2xl border border-stratosphere bg-white/70 p-5 shadow-sm"
          >
            <CompanionMascot config={companion} size="sm" />
            <div>
              <h1 className="font-display text-2xl font-bold leading-tight text-dark-matter">
                {getTimeOfDayGreeting()}, {firstName} 👋
              </h1>
              <p className="mt-1 font-body text-sm text-dark-matter/70">
                Here's your AI usage this week.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-5">
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => <WidgetSkeleton key={index} />)
          ) : (
            <>
              {orderedVisibleWidgets.map((widget, index) => {
                if (widget.id === "weeklyInsight") {
                  return (
                    <WeeklyInsightCard
                      key={widget.id}
                      id={`widget-${widget.id}`}
                      sentence={widget.value}
                      data={data}
                      animationDelayMs={80 + index * 60}
                    />
                  );
                }
                return (
                  <WidgetTile
                    key={widget.id}
                    id={`widget-${widget.id}`}
                    label={widget.label}
                    value={widget.value}
                    caption={widget.caption}
                    trend={widget.trend}
                    animationDelayMs={80 + index * 60}
                    onClick={() => setActiveWidgetId(widget.id)}
                  />
                );
              })}
              <CustomizeTile
                id="widget-customize"
                animationDelayMs={80 + orderedVisibleWidgets.length * 60}
                onClick={() => setShowCustomize(true)}
              />
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeWidgetId === "orbitScore" && (
          <OrbitScoreModal data={data} onClose={() => setActiveWidgetId(null)} />
        )}
        {activeWidgetId === "timeSaved" && (
          <TimeSavedModal data={data} onClose={() => setActiveWidgetId(null)} />
        )}
        {activeWidgetId === "focusStreak" && (
          <FocusStreakModal data={data} onClose={() => setActiveWidgetId(null)} />
        )}
        {activeWidgetId === "aiSessions" && (
          <AiSessionsModal data={data} onClose={() => setActiveWidgetId(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomize && (
          <CustomizeDashboardModal
            layout={layout}
            onSave={handleSaveLayout}
            onClose={() => setShowCustomize(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && showTutorial && (
        <TutorialOverlay steps={TUTORIAL_STEPS} onFinish={finishTutorial} />
      )}
    </div>
  );
}
