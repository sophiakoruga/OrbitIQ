import type { ReactNode } from "react";
import logoMark from "../../assets/images/logo-mark.png";

interface OnboardingHeaderProps {
  actions?: ReactNode;
}

export function OnboardingHeader({ actions }: OnboardingHeaderProps) {
  return (
    <header className="flex w-full items-center gap-2.5 rounded-b-xl bg-boysenberry p-2.5 shadow-sm">
      <img src={logoMark} alt="" className="size-[29px]" />
      <span className="flex-1 font-display text-xl font-bold uppercase leading-tight text-exosphere">
        orbit.iq
      </span>
      {actions}
    </header>
  );
}
