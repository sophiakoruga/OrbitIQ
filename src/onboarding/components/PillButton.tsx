import type { ButtonHTMLAttributes } from "react";
import { ArrowIcon } from "./ArrowIcon";

type PillButtonVariant = "primary" | "secondary" | "destructive";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant;
  fullWidth?: boolean;
  /** "auto" (default): primary gets a forward arrow, secondary gets a back
   *  arrow, matching their navigational role. Pass "none" for CTAs that
   *  aren't navigation (e.g. "Sign in", "Create account"). */
  icon?: "auto" | "none";
}

const VARIANT_CLASSES: Record<PillButtonVariant, string> = {
  primary: "border border-transparent bg-coral text-white shadow-sm hover:brightness-95",
  secondary:
    "border border-boysenberry bg-exosphere text-boysenberry hover:bg-boysenberry/[0.06]",
  destructive: "border border-transparent bg-coral-dark text-white shadow-sm hover:brightness-95",
};

export function PillButton({
  variant = "primary",
  fullWidth = false,
  icon = "auto",
  className = "",
  children,
  disabled,
  ...buttonProps
}: PillButtonProps) {
  const showBackArrow = icon === "auto" && variant === "secondary";
  const showForwardArrow = icon === "auto" && variant === "primary";

  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-6 py-2.5
        font-body text-base leading-normal transition-all duration-150
        hover:shadow-md active:scale-[0.97] active:brightness-90
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none
        disabled:border-transparent disabled:bg-stratosphere disabled:text-dark-matter/40
        ${fullWidth ? "w-full" : ""}
        ${VARIANT_CLASSES[variant]}
        ${className}`}
      {...buttonProps}
    >
      {showBackArrow && <ArrowIcon direction="left" className="size-[18px]" />}
      {children}
      {showForwardArrow && <ArrowIcon direction="right" className="size-[18px]" />}
    </button>
  );
}
