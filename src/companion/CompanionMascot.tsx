import { MASCOTS } from "../onboarding/components/Mascot";
import { AccessoryIcon } from "./CompanionIcons";
import { getAccentColorPreset, getAccessoryPreset, getHelmetPreset, type CompanionConfig } from "./companion";

interface CompanionMascotProps {
  config: CompanionConfig;
  size?: "sm" | "lg";
}

const SIZES = {
  lg: { width: 144, height: 198 },
  sm: { width: 78, height: 107 },
};

export function CompanionMascot({ config, size = "lg" }: CompanionMascotProps) {
  const helmet = getHelmetPreset(config.helmet);
  const accessory = getAccessoryPreset(config.accessory);
  const accent = getAccentColorPreset(config.accentColor);
  const dims = SIZES[size];
  const astronaut = MASCOTS.astronaut;
  const ringWidth = Math.max(2, Math.round(dims.width * 0.03));

  return (
    <div className="relative shrink-0" style={{ width: dims.width, height: dims.height }}>
      <div
        className="absolute -inset-3 -z-10 rounded-full blur-xl transition-colors duration-200"
        style={{ backgroundColor: accent.value, opacity: 0.35 }}
        aria-hidden="true"
      />
      <div className="relative size-full overflow-hidden">
        {/* Base art renders at its natural colors — no filter is ever applied
            here, so the face, skin tone, shadows, and visor never shift. */}
        <img
          src={astronaut.src}
          alt=""
          className="absolute max-w-none"
          style={{
            width: astronaut.crop.width,
            height: astronaut.crop.height,
            left: astronaut.crop.left,
            top: astronaut.crop.top,
          }}
        />
        {helmet.ringColor && (
          // Transparent-centered ring over the helmet's rim only — the face
          // and visor inside it are never covered, so they can't be tinted.
          <div
            className="absolute left-1/2 top-[8%] h-[38%] w-[62%] -translate-x-1/2 rounded-full transition-colors duration-200"
            style={{ border: `${ringWidth}px solid ${helmet.ringColor}` }}
            aria-hidden="true"
          />
        )}
      </div>
      {accessory.icon !== "none" && (
        <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-exosphere text-boysenberry shadow-md ring-1 ring-black/5">
          <AccessoryIcon icon={accessory.icon} />
        </span>
      )}
    </div>
  );
}
