import type { RefObject } from "react";
import { OnboardingStepShell } from "../components/OnboardingStepShell";
import { TextField } from "../components/TextField";
import { isValidEmail } from "../validation";

interface ProfileScreenProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  stepNumber: number;
  headingRef?: RefObject<HTMLHeadingElement>;
  onNext: () => void;
}

export function ProfileScreen({
  name,
  email,
  onNameChange,
  onEmailChange,
  stepNumber,
  headingRef,
  onNext,
}: ProfileScreenProps) {
  const emailTouched = email.length > 0;
  const emailError = emailTouched && !isValidEmail(email) ? "Enter a valid email address." : undefined;
  const canContinue = name.trim().length > 0 && isValidEmail(email);

  return (
    <OnboardingStepShell
      title="Let's get to know you!"
      stepNumber={stepNumber}
      headingRef={headingRef}
      onNext={onNext}
      nextDisabled={!canContinue}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <TextField
          label="What is your name?*"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
        <TextField
          label="Email*"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          error={emailError}
          required
        />
      </div>
    </OnboardingStepShell>
  );
}
