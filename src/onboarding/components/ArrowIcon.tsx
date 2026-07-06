interface ArrowIconProps {
  direction: "left" | "right";
  className?: string;
}

export function ArrowIcon({ direction, className }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
