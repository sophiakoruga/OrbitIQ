import { useEffect, useState } from "react";
import { Badge } from "../components/Badge";
import { SectionCard } from "../components/SectionCard";
import { CompanionCustomizer } from "../companion/CompanionCustomizer";
import { CompanionMascot } from "../companion/CompanionMascot";
import { useCompanion } from "../companion/useCompanion";
import { OnboardingHeader } from "../onboarding/components/OnboardingHeader";
import { PillButton } from "../onboarding/components/PillButton";
import { TextField } from "../onboarding/components/TextField";
import type { OnboardingData } from "../onboarding/types";
import { isValidEmail } from "../onboarding/validation";

interface ProfilePageProps {
  data: OnboardingData;
  onSave: (data: OnboardingData) => void;
  onBack: () => void;
  onRestartOnboarding: () => void;
}

export function ProfilePage({ data, onSave, onBack, onRestartOnboarding }: ProfilePageProps) {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [justSaved, setJustSaved] = useState(false);
  const { companion, updateCompanion } = useCompanion();

  useEffect(() => {
    if (!justSaved) return;
    const timeout = setTimeout(() => setJustSaved(false), 2000);
    return () => clearTimeout(timeout);
  }, [justSaved]);

  const emailTouched = email.length > 0;
  const emailError =
    emailTouched && !isValidEmail(email) ? "Enter a valid email address." : undefined;
  const canSave = name.trim().length > 0 && isValidEmail(email);

  function handleSave() {
    if (!canSave) return;
    onSave({ ...data, name: name.trim(), email: email.trim() });
    setJustSaved(true);
  }

  return (
    <div className="flex min-h-full w-full flex-col bg-exosphere">
      <OnboardingHeader
        actions={
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-sm font-medium text-exosphere/80
              transition-colors hover:bg-white/10 hover:text-exosphere
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-exosphere"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
              <path
                d="M12 4 6 10l6 6"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dashboard
          </button>
        }
      />

      <div className="flex w-full flex-1 flex-col gap-5 px-6 py-8">
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight text-dark-matter">
            Your Profile
          </h1>
          <p className="mt-1 font-body text-sm text-dark-matter/70">
            What you told us during setup.
          </p>
        </div>

        <SectionCard title="Personal information">
          <div className="flex flex-col gap-5">
            <TextField
              label="Name"
              name="profile-name"
              autoComplete="name"
              align="left"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Email"
              name="profile-email"
              type="email"
              autoComplete="email"
              align="left"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={emailError}
            />
            <div className="flex items-center gap-3">
              <PillButton variant="primary" onClick={handleSave} disabled={!canSave}>
                Save changes
              </PillButton>
              {justSaved && (
                <span role="status" className="font-body text-sm text-dark-matter/60">
                  Saved!
                </span>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Your Orbit Companion"
          description="Customize your companion — it shows up on your dashboard and throughout the app."
        >
          {/* Always a row, never stacked — this card only ever renders at the
              ~440px panel width, which is narrower than Tailwind's `sm`
              breakpoint, so a viewport-based breakpoint here would silently
              stack the two columns instead of sitting side by side. */}
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <CompanionMascot config={companion} size="lg" />
            </div>
            <div className="min-w-0 flex-1">
              <CompanionCustomizer config={companion} onChange={updateCompanion} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="How you use AI">
          <div className="flex flex-wrap gap-2">
            {data.aiUsage.length > 0 ? (
              data.aiUsage.map((usage) => <Badge key={usage}>{usage}</Badge>)
            ) : (
              <p className="font-body text-sm text-dark-matter/50">
                No AI usage preferences selected yet.
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Preferred platforms">
          <div className="flex flex-wrap gap-2">
            {data.platforms.length > 0 ? (
              data.platforms.map((platform) => <Badge key={platform}>{platform}</Badge>)
            ) : (
              <p className="font-body text-sm text-dark-matter/50">
                Choose your favorite AI platforms.
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Goals">
          <div className="flex flex-wrap gap-2">
            {data.goals.length > 0 ? (
              data.goals.map((goal) => <Badge key={goal}>{goal}</Badge>)
            ) : (
              <p className="font-body text-sm text-dark-matter/50">No goals configured.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Preferences">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-sm text-dark-matter/80">Usage analytics</span>
              <Badge>{data.analyticsConsent ? "Enabled" : "Not enabled"}</Badge>
            </div>
            <button
              type="button"
              onClick={onRestartOnboarding}
              className="self-start font-body text-sm font-medium text-dark-matter/50 underline-offset-2 transition-colors
                hover:text-dark-matter hover:underline
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry"
            >
              Restart onboarding
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
