export type OnboardingStep =
  | "welcome"
  | "profile"
  | "ai-usage"
  | "platforms"
  | "goals"
  | "consent"
  | "loading";

export type MultiSelectField = "aiUsage" | "platforms" | "goals";

export interface OnboardingData {
  name: string;
  email: string;
  aiUsage: string[];
  platforms: string[];
  goals: string[];
  analyticsConsent: boolean;
}

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  name: "",
  email: "",
  aiUsage: [],
  platforms: [],
  goals: [],
  analyticsConsent: false,
};

export const AI_USAGE_OPTIONS = [
  "Writing",
  "Research",
  "Coding",
  "Design",
  "School",
  "Work",
  "Other",
] as const;

export const PLATFORM_OPTIONS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "Other",
] as const;

export const GOAL_OPTIONS = [
  "Use AI more intentionally",
  "Track productivity",
  "Reduce overreliance",
  "Improve prompts",
  "Build healthier AI habits",
  "Other",
] as const;

// Steps that share the 5-dot progress indicator, in order.
export const QUESTION_STEPS: OnboardingStep[] = [
  "profile",
  "ai-usage",
  "platforms",
  "goals",
  "consent",
];
