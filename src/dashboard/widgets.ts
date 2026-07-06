import type { OnboardingData } from "../onboarding/types";

export type WidgetId = "orbitScore" | "timeSaved" | "focusStreak" | "aiSessions" | "weeklyInsight";

export interface WidgetTrend {
  direction: "up" | "down";
  delta: number;
  label: string;
}

export interface WidgetContent {
  id: WidgetId;
  label: string;
  value: string;
  caption: string;
  detail: string;
  trend?: WidgetTrend;
  chartData?: { label: string; value: number }[];
}

export const ALL_WIDGET_IDS: WidgetId[] = [
  "orbitScore",
  "timeSaved",
  "focusStreak",
  "aiSessions",
  "weeklyInsight",
];

export interface DashboardLayout {
  order: WidgetId[];
  hidden: WidgetId[];
}

export const DEFAULT_DASHBOARD_LAYOUT: DashboardLayout = {
  order: [...ALL_WIDGET_IDS],
  hidden: [],
};

const CHART_SHAPE = [72, 58, 44, 30];

// Shared with widgetDetails.ts so the tile and its detail modal never disagree.
export const TIME_SAVED_WEEK_HOURS = 2.4;
export const FOCUS_STREAK_CURRENT_DAYS = 6;
export const AI_SESSIONS_TOTAL = 14;

// Deterministic (not random) so a given user sees stable numbers across
// reloads, but different users see different demo values.
export function seedFrom(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

interface InsightResult {
  sentence: string;
  detail: string;
}

const INSIGHT_TEMPLATES: Array<
  (topUsage: string, topPlatform: string, magnitude: number) => InsightResult
> = [
  (_topUsage, _topPlatform, m) => ({
    sentence: `You reduced prompt length by ${m}% this week.`,
    detail: `You shortened your prompts by ${m}% this week — a sign you're getting more precise about what you ask for.`,
  }),
  (topUsage, topPlatform, m) => ({
    sentence: `${topPlatform} answered ${m + 70}% of your questions on the first try.`,
    detail: `${topPlatform} got it right on the first try ${m + 70}% of the time this week, mostly on ${topUsage.toLowerCase()} tasks — fewer follow-ups needed.`,
  }),
  (topUsage, _topPlatform, m) => ({
    sentence: `Your sessions stayed on-topic ${m}% more often this week.`,
    detail: `Your sessions stayed on-topic ${m}% more often this week, especially around ${topUsage.toLowerCase()}.`,
  }),
  (_topUsage, topPlatform, m) => ({
    sentence: `Your first drafts with ${topPlatform} needed ${m}% less editing.`,
    detail: `Your first drafts with ${topPlatform} landed closer to what you needed — about ${m}% less editing this week.`,
  }),
];

/**
 * All values here are mocked (no real tracking or backend), but are
 * templated and seeded from the user's actual onboarding answers so the
 * dashboard reads as personalized rather than static placeholder copy.
 */
export function buildWidgets(data: OnboardingData): WidgetContent[] {
  const usageCount = data.aiUsage.length || 1;
  const topUsage = data.aiUsage[0] ?? "everyday tasks";
  const topGoal = data.goals[0] ?? "using AI more intentionally";
  const topPlatform = data.platforms[0] ?? "your favorite AI tool";
  const orbitScore = Math.min(96, 48 + usageCount * 6 + data.goals.length * 4);

  const usageChartSource = data.aiUsage.length > 0 ? data.aiUsage : ["Usage"];

  const seed = seedFrom(data.name + data.email);
  const trendDelta = 2 + (seed % 9);
  const trendDirection: WidgetTrend["direction"] = seed % 5 === 0 ? "down" : "up";

  const insightSeed = seedFrom(data.name + topGoal);
  const insight = INSIGHT_TEMPLATES[insightSeed % INSIGHT_TEMPLATES.length](
    topUsage,
    topPlatform,
    10 + (insightSeed % 21),
  );

  return [
    {
      id: "orbitScore",
      label: "Orbit Score",
      value: String(orbitScore),
      caption: "out of 100",
      trend: {
        direction: trendDirection,
        delta: trendDelta,
        label: "this week",
      },
      detail: `Your Orbit Score blends how often you use AI, how many tools you rely on, and how clear your goals are. It's ${orbitScore}/100 right now — goals like "${topGoal}" from setup helped push it up.`,
      chartData: usageChartSource
        .slice(0, 4)
        .map((usage, index) => ({ label: usage, value: CHART_SHAPE[index] ?? 25 })),
    },
    {
      id: "timeSaved",
      label: "Estimated Time Saved",
      value: `${TIME_SAVED_WEEK_HOURS} hrs`,
      caption: "this week",
      detail: `Based on typical time savings for ${topUsage.toLowerCase()} tasks with tools like ${topPlatform}, we estimate you've saved about ${TIME_SAVED_WEEK_HOURS} hours this week.`,
      chartData: [
        { label: "Mon", value: 20 },
        { label: "Tue", value: 35 },
        { label: "Wed", value: 15 },
        { label: "Thu", value: 45 },
        { label: "Fri", value: 30 },
      ],
    },
    {
      id: "focusStreak",
      label: "Focus Streak",
      value: `${FOCUS_STREAK_CURRENT_DAYS} days`,
      caption: "current streak",
      detail: `You've stayed within your intentional-use goals for ${FOCUS_STREAK_CURRENT_DAYS} days in a row. Keep it going — a streak resets if a day passes with no check-in.`,
      chartData: [
        { label: "M", value: 1 },
        { label: "T", value: 1 },
        { label: "W", value: 1 },
        { label: "T", value: 1 },
        { label: "F", value: 1 },
        { label: "S", value: 1 },
        { label: "S", value: 0 },
      ],
    },
    {
      id: "aiSessions",
      label: "AI Sessions",
      value: String(AI_SESSIONS_TOTAL),
      caption: "this week",
      detail: `You've had about ${AI_SESSIONS_TOTAL} AI sessions this week, mostly centered around ${topUsage.toLowerCase()}. That's roughly ${Math.round((AI_SESSIONS_TOTAL / 7) * 10) / 10} sessions a day.`,
    },
    {
      id: "weeklyInsight",
      label: "Weekly Insight",
      value: insight.sentence,
      caption: "",
      detail: insight.detail,
    },
  ];
}

export const WIDGET_LABELS: Record<WidgetId, string> = {
  orbitScore: "Orbit Score",
  timeSaved: "Estimated Time Saved",
  focusStreak: "Focus Streak",
  aiSessions: "AI Sessions",
  weeklyInsight: "Weekly Insight",
};
