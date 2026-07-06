import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PageShell } from "./components/PageShell";
import { Dashboard } from "./dashboard/Dashboard";
import { clearStorage, readStorage, STORAGE_KEYS, writeStorage } from "./lib/storage";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";
import { INITIAL_ONBOARDING_DATA, type OnboardingData } from "./onboarding/types";
import { ProfilePage } from "./profile/ProfilePage";

type View = "onboarding" | "dashboard" | "profile";

export default function App() {
  const [view, setView] = useState<View>(() =>
    readStorage(STORAGE_KEYS.onboardingComplete, false) ? "dashboard" : "onboarding",
  );
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(() =>
    readStorage(STORAGE_KEYS.onboardingData, INITIAL_ONBOARDING_DATA),
  );

  function handleOnboardingComplete(data: OnboardingData) {
    writeStorage(STORAGE_KEYS.onboardingData, data);
    writeStorage(STORAGE_KEYS.onboardingComplete, true);
    clearStorage(STORAGE_KEYS.onboardingStep);
    setOnboardingData(data);
    setView("dashboard");
  }

  function handleProfileSave(data: OnboardingData) {
    writeStorage(STORAGE_KEYS.onboardingData, data);
    setOnboardingData(data);
  }

  function handleRestartOnboarding() {
    clearStorage(STORAGE_KEYS.onboardingComplete);
    clearStorage(STORAGE_KEYS.onboardingData);
    clearStorage(STORAGE_KEYS.onboardingStep);
    clearStorage(STORAGE_KEYS.tutorialSeen);
    clearStorage(STORAGE_KEYS.dashboardLayout);
    clearStorage(STORAGE_KEYS.companion);
    setOnboardingData(INITIAL_ONBOARDING_DATA);
    setView("onboarding");
  }

  return (
    <PageShell>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {view === "onboarding" && (
            <OnboardingFlow
              onComplete={handleOnboardingComplete}
              onSignIn={() => setView("dashboard")}
            />
          )}
          {view === "dashboard" && (
            <Dashboard data={onboardingData} onOpenProfile={() => setView("profile")} />
          )}
          {view === "profile" && (
            <ProfilePage
              data={onboardingData}
              onSave={handleProfileSave}
              onBack={() => setView("dashboard")}
              onRestartOnboarding={handleRestartOnboarding}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </PageShell>
  );
}
