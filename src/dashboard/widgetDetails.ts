import type { OnboardingData } from "../onboarding/types";
import {
  AI_SESSIONS_TOTAL,
  buildWidgets,
  FOCUS_STREAK_CURRENT_DAYS,
  seedFrom,
  TIME_SAVED_WEEK_HOURS,
  type WidgetTrend,
} from "./widgets";

// Every getter below reuses buildWidgets() for the numbers already shown on
// the tile (score, trend, hours, streak, session count) so a modal can never
// disagree with the tile that opened it — the extra detail is layered on
// top of that single source of truth, not recomputed separately.

export interface OrbitScoreDetails {
  score: number;
  trend: WidgetTrend;
  breakdown: { label: string; value: number; max: number }[];
  history: { label: string; value: number }[];
}

function buildScoreHistory(score: number, trend: WidgetTrend, seedKey: string) {
  const weeksBack = 5;
  const priorWeek = trend.direction === "up" ? score - trend.delta : score + trend.delta;
  const points: number[] = [priorWeek];

  for (let i = 1; i < weeksBack; i++) {
    const wobble = (seedFrom(`${seedKey}-score-history-${i}`) % 7) - 3;
    const step = trend.direction === "up" ? -2 : 2;
    const prev = points[points.length - 1] + step + wobble;
    points.push(Math.max(20, Math.min(96, prev)));
  }

  points.reverse();
  points.push(score);
  return points.map((value, index) => ({ label: `W${index + 1}`, value: Math.round(value) }));
}

export function getOrbitScoreDetails(data: OnboardingData): OrbitScoreDetails {
  const widget = buildWidgets(data).find((w) => w.id === "orbitScore")!;
  const usageCount = data.aiUsage.length || 1;
  const platformCount = data.platforms.length || 1;
  const goalCount = data.goals.length || 1;
  const score = Number(widget.value);
  const trend = widget.trend!;

  return {
    score,
    trend,
    breakdown: [
      { label: "Usage frequency", value: Math.min(10, 4 + usageCount * 2), max: 10 },
      { label: "Tool diversity", value: Math.min(10, 3 + platformCount * 2), max: 10 },
      { label: "Goal clarity", value: Math.min(10, 3 + goalCount * 2), max: 10 },
    ],
    history: buildScoreHistory(score, trend, data.name + data.email),
  };
}

export interface TimeSavedDetails {
  today: number;
  thisWeek: number;
  thisMonth: number;
  yearlyEstimate: number;
  dailyChart: { label: string; value: number }[];
  trend: { label: string; value: number }[];
}

function buildTimeSavedTrend(thisWeek: number, seedKey: string) {
  const weeks = 6;
  const points: number[] = [];
  for (let i = 0; i < weeks; i++) {
    const progress = i / (weeks - 1);
    const base = thisWeek * (0.55 + progress * 0.45);
    const wobble = ((seedFrom(`${seedKey}-time-trend-${i}`) % 5) - 2) * 0.1;
    points.push(Math.max(0.5, Math.round((base + wobble) * 10) / 10));
  }
  points[points.length - 1] = thisWeek;
  return points.map((value, index) => ({ label: `W${index + 1}`, value }));
}

export function getTimeSavedDetails(data: OnboardingData): TimeSavedDetails {
  const seed = seedFrom(data.name + "time-saved");
  const today = Math.round((0.2 + (seed % 5) * 0.1) * 10) / 10;

  return {
    today,
    thisWeek: TIME_SAVED_WEEK_HOURS,
    thisMonth: Math.round(TIME_SAVED_WEEK_HOURS * 4.3 * 10) / 10,
    yearlyEstimate: Math.round(TIME_SAVED_WEEK_HOURS * 52),
    dailyChart: [
      { label: "Mon", value: 20 },
      { label: "Tue", value: 35 },
      { label: "Wed", value: 15 },
      { label: "Thu", value: 45 },
      { label: "Fri", value: 30 },
      { label: "Sat", value: 10 },
      { label: "Sun", value: 8 },
    ],
    trend: buildTimeSavedTrend(TIME_SAVED_WEEK_HOURS, data.name + data.email),
  };
}

export interface FocusStreakDetails {
  current: number;
  longest: number;
  /** Last 28 days, oldest first, each 0-3 (none -> heavy focus). */
  heatmap: number[];
  tips: string[];
}

export function getFocusStreakDetails(data: OnboardingData): FocusStreakDetails {
  const seed = seedFrom(data.name + "streak");
  const heatmap = Array.from({ length: 28 }, (_, day) => seedFrom(`${data.name}-day-${day}`) % 4);

  return {
    current: FOCUS_STREAK_CURRENT_DAYS,
    longest: FOCUS_STREAK_CURRENT_DAYS + 2 + (seed % 15),
    heatmap,
    tips: [
      "Set a daily check-in reminder to keep your streak alive.",
      "Batch similar AI tasks together so you stay in one train of thought.",
      "Take a short break between long sessions — it resets your focus, not your streak.",
    ],
  };
}

export interface AiSessionsDetails {
  weeklyChart: { label: string; value: number }[];
  dailyAverage: number;
  platforms: { label: string; percent: number }[];
}

const PLATFORM_WEIGHTS = [0.5, 0.3, 0.13, 0.07];
const PLATFORM_COLORS = ["#003A6C", "#FFAA96", "#2FB8A6", "#F4B740"];

export function getAiSessionsDetails(data: OnboardingData): AiSessionsDetails {
  const platformSource = data.platforms.length > 0 ? data.platforms : ["ChatGPT"];
  const chosen = platformSource.slice(0, 4);
  const weights = PLATFORM_WEIGHTS.slice(0, chosen.length);
  const weightSum = weights.reduce((sum, w) => sum + w, 0);

  let allocated = 0;
  const platforms = chosen.map((label, index) => {
    if (index === chosen.length - 1) return { label, percent: 100 - allocated };
    const percent = Math.round((weights[index] / weightSum) * 100);
    allocated += percent;
    return { label, percent };
  });

  return {
    weeklyChart: [
      { label: "Mon", value: 2 },
      { label: "Tue", value: 3 },
      { label: "Wed", value: 1 },
      { label: "Thu", value: 4 },
      { label: "Fri", value: 2 },
      { label: "Sat", value: 1 },
      { label: "Sun", value: 1 },
    ],
    dailyAverage: Math.round((AI_SESSIONS_TOTAL / 7) * 10) / 10,
    platforms,
  };
}

export function getPlatformPieData(data: OnboardingData) {
  const { platforms } = getAiSessionsDetails(data);
  return platforms.map((platform, index) => ({
    label: platform.label,
    value: platform.percent,
    color: PLATFORM_COLORS[index % PLATFORM_COLORS.length],
  }));
}

export interface WeeklyInsightDetails {
  summary: string;
  recommendations: string[];
}

const PLATFORM_STRENGTHS: Record<string, string> = {
  ChatGPT: "brainstorming and quick drafts",
  Claude: "longer documents and technical detail",
  Gemini: "research and summarization",
  Perplexity: "fact-checking and citations",
  Other: "specialized workflows",
};

function buildInsightSummary(data: OnboardingData, magnitude: number): string {
  const [firstPlatform, secondPlatform] = data.platforms;
  const [firstUsage, secondUsage] = data.aiUsage;

  let platformClause: string;
  if (firstPlatform && secondPlatform) {
    const secondaryTask = (secondUsage ?? firstUsage ?? "technical work").toLowerCase();
    const primaryTask = (firstUsage ?? "brainstorming").toLowerCase();
    platformClause = `You relied on ${secondPlatform} for ${secondaryTask} while ${firstPlatform} was primarily used for ${primaryTask}.`;
  } else if (firstPlatform) {
    const task = (firstUsage ?? "everyday tasks").toLowerCase();
    platformClause = `You leaned on ${firstPlatform} for ${task} this week.`;
  } else {
    platformClause = "You explored a mix of AI tools this week.";
  }

  return `${platformClause} Your prompts became ${magnitude}% shorter this week, saving approximately ${TIME_SAVED_WEEK_HOURS} hours.`;
}

function buildRecommendations(data: OnboardingData): string[] {
  const [firstPlatform, secondPlatform] = data.platforms;
  const recommendations: string[] = ["Try using reusable prompt templates for repeat tasks."];

  if (firstPlatform) {
    recommendations.push(`Use ${firstPlatform} for ${PLATFORM_STRENGTHS[firstPlatform] ?? "quick, iterative tasks"}.`);
  }
  if (secondPlatform && secondPlatform !== firstPlatform) {
    recommendations.push(`Use ${secondPlatform} for ${PLATFORM_STRENGTHS[secondPlatform] ?? "more involved work"}.`);
  }
  recommendations.push("Reduce prompt length — shorter, focused prompts tend to get better first answers.");

  return recommendations.slice(0, 4);
}

export function getWeeklyInsightDetails(data: OnboardingData): WeeklyInsightDetails {
  const seed = seedFrom(data.name + (data.goals[0] ?? ""));
  const magnitude = 10 + (seed % 21);

  return {
    summary: buildInsightSummary(data, magnitude),
    recommendations: buildRecommendations(data),
  };
}
