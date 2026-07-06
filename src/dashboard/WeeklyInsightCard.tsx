import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { OnboardingData } from "../onboarding/types";
import { LightbulbIcon } from "./LightbulbIcon";
import { getWeeklyInsightRecommendations, pickRandomWeeklyInsight } from "./widgetDetails";

interface WeeklyInsightCardProps {
  id: string;
  data: OnboardingData;
  animationDelayMs?: number;
}

export function WeeklyInsightCard({ id, data, animationDelayMs = 0 }: WeeklyInsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  // Picked once per mount (i.e. once per page load) so it doesn't change
  // out from under the user on every unrelated re-render.
  const [insight] = useState(() => pickRandomWeeklyInsight(data));
  const recommendations = getWeeklyInsightRecommendations(data);

  return (
    <motion.div
      layout="position"
      id={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: animationDelayMs / 1000 }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className={`flex cursor-pointer flex-col justify-between gap-2 rounded-xl border border-stratosphere
        bg-white/70 p-4 shadow-sm transition-shadow duration-[180ms] hover:shadow-md
        ${expanded ? "col-span-2" : "min-h-[128px]"}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        className="flex w-full items-start justify-between gap-3 rounded-lg text-left
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
      >
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-boysenberry/70">
            <LightbulbIcon className="size-3.5 text-boysenberry" />
            Weekly Insight
          </span>
          <span className="font-body text-sm font-semibold leading-snug text-dark-matter">
            {insight.sentence}
          </span>
        </div>
        <motion.svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mt-1 size-4 shrink-0 text-boysenberry"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border-t border-stratosphere pt-3">
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/50">
                  Summary
                </span>
                <p className="mt-1 font-body text-sm text-dark-matter/80">{insight.detail}</p>
              </div>
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/50">
                  Recommendations
                </span>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {recommendations.map((recommendation) => (
                    <li
                      key={recommendation}
                      className="flex gap-2 font-body text-sm text-dark-matter/80"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-boysenberry"
                        aria-hidden="true"
                      />
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
