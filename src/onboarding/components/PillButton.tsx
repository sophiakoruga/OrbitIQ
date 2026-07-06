import type { ButtonHTMLAttributes } from "react";
import { ArrowIcon } from "./ArrowIcon";

type PillButtonVariant = "primary" | "secondary" | "neutral";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<PillButtonVariant, string> = {
  primary: "bg-boysenberry text-tulip",
  secondary: "bg-tulip text-boysenberry",
  neutral: "bg-tulip text-dark-matter",
};

export function PillButton({
  variant = "neutral",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...buttonProps
}: PillButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-6 py-2.5
        font-body text-base leading-normal transition-all duration-150
        hover:brightness-95 hover:shadow-md active:scale-[0.97] active:brightness-90
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40
        ${fullWidth ? "w-full" : ""}
        ${VARIANT_CLASSES[variant]}
        ${className}`}
      {...buttonProps}
    >
      {variant === "secondary" && <ArrowIcon direction="left" className="size-[18px]" />}
      {children}
      {variant === "primary" && <ArrowIcon direction="right" className="size-[18px]" />}
    </button>
  );
}
