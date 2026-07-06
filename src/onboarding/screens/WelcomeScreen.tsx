import type { RefObject } from "react";
import { Mascot } from "../components/Mascot";
import { OnboardingHeader } from "../components/OnboardingHeader";
import { PillButton } from "../components/PillButton";

interface WelcomeScreenProps {
  headingRef?: RefObject<HTMLHeadingElement>;
  onSignIn: () => void;
  onCreateAccount: () => void;
}

export function WelcomeScreen({ headingRef, onSignIn, onCreateAccount }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-full w-full flex-col items-center bg-exosphere">
      <OnboardingHeader />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        <h1 ref={headingRef} tabIndex={-1} className="sr-only">
          Welcome to orbit.iq
        </h1>
        <Mascot type="astronaut" />
        <div className="flex w-full max-w-[12rem] flex-col items-center gap-4">
          <PillButton variant="secondary" icon="none" fullWidth onClick={onSignIn}>
            Sign in
          </PillButton>
          <PillButton variant="primary" icon="none" fullWidth onClick={onCreateAccount}>
            Create an account
          </PillButton>
        </div>
      </div>
    </div>
  );
}
