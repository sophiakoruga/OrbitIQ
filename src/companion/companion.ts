/**
 * Character customization for the "Orbit Companion" (the astronaut mascot).
 *
 * The source art is one flat illustrated pose with no layered Figma export
 * (no separate suit/helmet/accessory pieces). That rules out any effect that
 * touches the whole image — a hue-rotate filter, for instance, recolors the
 * face and skin tone right along with the suit, which reads as broken rather
 * than customized. So every control here is either:
 *   - an overlay confined to a transparent-centered region (helmet ring),
 *   - a fully independent element layered on top (accessory badge), or
 *   - not touching the mascot's pixels at all (the glow behind it).
 *
 * True suit recoloring would need an isolated suit layer to recolor against;
 * without one it's disabled rather than faked with a whole-image tint.
 */

export interface HelmetPreset {
  id: string;
  label: string;
  swatch: string;
  ringColor: string | null;
}

export interface AccessoryPreset {
  id: string;
  label: string;
  icon: "none" | "star" | "headphones" | "coffee" | "sparkle";
}

export interface AccentColorPreset {
  id: string;
  label: string;
  value: string;
}

export const HELMET_PRESETS: HelmetPreset[] = [
  { id: "clear", label: "Clear Visor", swatch: "#FFFFFA", ringColor: null },
  { id: "gold", label: "Gold Trim", swatch: "#F4B740", ringColor: "#F4B740" },
  { id: "rose", label: "Rose Trim", swatch: "#FFAA96", ringColor: "#FFAA96" },
  { id: "teal", label: "Teal Trim", swatch: "#4FB6A8", ringColor: "#4FB6A8" },
];

export const ACCESSORY_PRESETS: AccessoryPreset[] = [
  { id: "none", label: "None", icon: "none" },
  { id: "star", label: "Star Badge", icon: "star" },
  { id: "headphones", label: "Headphones", icon: "headphones" },
  { id: "coffee", label: "Coffee", icon: "coffee" },
  { id: "sparkle", label: "Sparkle", icon: "sparkle" },
];

export const ACCENT_COLOR_PRESETS: AccentColorPreset[] = [
  { id: "boysenberry", label: "Boysenberry", value: "#003A6C" },
  { id: "tulip", label: "Tulip", value: "#FFAA96" },
  { id: "teal", label: "Teal", value: "#2FB8A6" },
  { id: "gold", label: "Gold", value: "#F4B740" },
  { id: "violet", label: "Violet", value: "#8B6FD6" },
];

export interface CompanionConfig {
  helmet: string;
  accessory: string;
  accentColor: string;
}

export const DEFAULT_COMPANION: CompanionConfig = {
  helmet: "clear",
  accessory: "none",
  accentColor: "boysenberry",
};

export function getHelmetPreset(id: string): HelmetPreset {
  return HELMET_PRESETS.find((preset) => preset.id === id) ?? HELMET_PRESETS[0];
}

export function getAccessoryPreset(id: string): AccessoryPreset {
  return ACCESSORY_PRESETS.find((preset) => preset.id === id) ?? ACCESSORY_PRESETS[0];
}

export function getAccentColorPreset(id: string): AccentColorPreset {
  return ACCENT_COLOR_PRESETS.find((preset) => preset.id === id) ?? ACCENT_COLOR_PRESETS[0];
}
