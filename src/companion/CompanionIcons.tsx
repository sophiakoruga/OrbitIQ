import type { AccessoryPreset } from "./companion";

interface AccessoryIconProps {
  icon: AccessoryPreset["icon"];
  className?: string;
}

// All four are stroke-only outlines at the same weight, matching the rest of
// the app's icon language (arrows, close, chevrons) — no mixed filled/outline
// styles within one picker.
const STROKE_WIDTH = 1.5;

export function AccessoryIcon({ icon, className = "size-4" }: AccessoryIconProps) {
  switch (icon) {
    case "star":
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
          <path
            d="M10 1.5l2.47 5.5 6.03.55-4.55 4 1.36 5.95L10 14.6l-5.31 2.9 1.36-5.95-4.55-4 6.03-.55L10 1.5z"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "headphones":
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
          <path
            d="M4 11v-1a6 6 0 0 1 12 0v1"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
          <rect x="2.5" y="10.5" width="3" height="5" rx="1.2" stroke="currentColor" strokeWidth={STROKE_WIDTH} />
          <rect x="14.5" y="10.5" width="3" height="5" rx="1.2" stroke="currentColor" strokeWidth={STROKE_WIDTH} />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
          <path
            d="M4 8h9v4.5A3.5 3.5 0 0 1 9.5 16h-2A3.5 3.5 0 0 1 4 12.5V8Z"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <path d="M13 9h1.2a1.8 1.8 0 0 1 0 3.6H13" stroke="currentColor" strokeWidth={STROKE_WIDTH} />
          <path
            d="M6.5 4.5c0 1-1 1-1 2M9.5 4.5c0 1-1 1-1 2"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
          <path
            d="M10 2c.6 3.2 1.8 4.4 5 5-3.2.6-4.4 1.8-5 5-.6-3.2-1.8-4.4-5-5 3.2-.6 4.4-1.8 5-5Z"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinejoin="round"
          />
          <path
            d="M16 13c.3 1.4.8 1.9 2.2 2.2-1.4.3-1.9.8-2.2 2.2-.3-1.4-.8-1.9-2.2-2.2 1.4-.3 1.9-.8 2.2-2.2Z"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "none":
      return null;
  }
}
