import { SUIT_PRESETS, type CompanionConfig } from "./companion";

interface CompanionCustomizerProps {
  config: CompanionConfig;
  onChange: (patch: Partial<CompanionConfig>) => void;
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
  color: string;
}

function SwatchButton({ selected, onClick, label, color }: SwatchButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative flex size-9 shrink-0 items-center justify-center rounded-full text-boysenberry
        ring-1 ring-black/10 transition-all duration-200
        hover:scale-110 hover:shadow-md active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boysenberry
        ${selected ? "ring-2 ring-boysenberry ring-offset-2 ring-offset-exosphere" : ""}`}
      style={{ backgroundColor: color }}
    >
      {selected && (
        <span className="flex size-full items-center justify-center rounded-full bg-black/25">
          <CheckIcon className="size-4 text-white" />
        </span>
      )}
    </button>
  );
}

export function CompanionCustomizer({ config, onChange }: CompanionCustomizerProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-dark-matter/60">
        Suit Color
      </span>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Suit Color">
        {SUIT_PRESETS.map((preset) => (
          <SwatchButton
            key={preset.id}
            label={preset.label}
            color={preset.swatch}
            selected={config.suit === preset.id}
            onClick={() => onChange({ suit: preset.id })}
          />
        ))}
      </div>
    </div>
  );
}
