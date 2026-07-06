export interface TutorialStep {
  targetId: string;
  title: string;
  description: string;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    targetId: "tutorial-greeting",
    title: "Welcome to your dashboard",
    description: "This is your home base for understanding how you use AI day to day.",
  },
  {
    targetId: "widget-orbitScore",
    title: "Your Orbit Score",
    description:
      "A single number summarizing your overall AI usage, based on what you told us during setup.",
  },
  {
    targetId: "widget-weeklyInsight",
    title: "Weekly Insight",
    description: "A personalized takeaway generated from your habits, refreshed every week.",
  },
  {
    targetId: "widget-customize",
    title: "Customize your dashboard",
    description: "Show or hide widgets any time to focus on what matters most to you.",
  },
  {
    targetId: "profile-button",
    title: "Your profile",
    description: "Review or update what you told us during onboarding whenever you like.",
  },
];
