import type { ReactNode } from "react";
import {
  ACCENT_COLOR_PRESETS,
  ACCESSORY_PRESETS,
  HELMET_PRESETS,
  type CompanionConfig,
} from "./companion";
import { AccessoryIcon } from "./CompanionIcons";

interface CompanionCustomizerProps {
  config: CompanionConfig;
  onChange: (patch: Partial<CompanionConfig>) => void;
}

interface SwatchGroupProps {
  label: string;
  children: ReactNode;
}

function SwatchGroup({ label, children }: SwatchGroupProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
        {label}
      </span>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function CheckIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SwatchButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  color?: string;
  showCheckOnSelect?: boolean;
  children?: ReactNode;
}

function SwatchButton({
  selected,
  onClick,
  label,
  color,
  showCheckOnSelect = false,
  children,
}: SwatchButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative flex size-9 items-center justify-center rounded-full text-boysenberry
        ring-1 ring-black/10 transition-all duration-200
        hover:scale-110 hover:shadow-md active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry
        ${selected ? "ring-2 ring-boysenberry ring-offset-2 ring-offset-exosphere" : ""}`}
      style={{ backgroundColor: color ?? "#FFFFFA" }}
    >
      {selected && showCheckOnSelect ? (
        <span className="flex size-full items-center justify-center rounded-full bg-black/25">
          <CheckIcon className="size-4 text-white" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export function CompanionCustomizer({ config, onChange }: CompanionCustomizerProps) {
  return (
    <div className="flex flex-col gap-6">
      <SwatchGroup label="Helmet">
        {HELMET_PRESETS.map((preset) => (
          <SwatchButton
            key={preset.id}
            label={preset.label}
            color={preset.swatch}
            showCheckOnSelect
            selected={config.helmet === preset.id}
            onClick={() => onChange({ helmet: preset.id })}
          />
        ))}
      </SwatchGroup>

      <SwatchGroup label="Accessory">
        {ACCESSORY_PRESETS.map((preset) => (
          <SwatchButton
            key={preset.id}
            label={preset.label}
            selected={config.accessory === preset.id}
            onClick={() => onChange({ accessory: preset.id })}
          >
            <AccessoryIcon icon={preset.icon} />
          </SwatchButton>
        ))}
      </SwatchGroup>

      <SwatchGroup label="Accent Color">
        {ACCENT_COLOR_PRESETS.map((preset) => (
          <SwatchButton
            key={preset.id}
            label={preset.label}
            color={preset.value}
            showCheckOnSelect
            selected={config.accentColor === preset.id}
            onClick={() => onChange({ accentColor: preset.id })}
          />
        ))}
      </SwatchGroup>
    </div>
  );
}
