/**
 * Character customization for the "Orbit Companion" (the astronaut mascot).
 *
 * Suit color is the only control: a set of finished, Figma-exported PNGs
 * (one full pose per color). Selecting a color swaps the displayed image —
 * it never recolors pixels with a CSS/JS filter.
 */

import type { AstronautSuitId } from "./astronautAssets";

export interface SuitPreset {
  id: AstronautSuitId;
  label: string;
  swatch: string;
}

// Swatch colors are sampled from each exported image so the picker dot
// matches the actual art rather than an approximate brand color.
export const SUIT_PRESETS: SuitPreset[] = [
  { id: "blue", label: "Blue Suit", swatch: "#1E3A5F" },
  { id: "green", label: "Green Suit", swatch: "#3F7D4E" },
  { id: "teal", label: "Teal Suit", swatch: "#1E6B64" },
  { id: "brown", label: "Brown Suit", swatch: "#8A5A3B" },
];

export interface CompanionConfig {
  suit: AstronautSuitId;
}

export const DEFAULT_COMPANION: CompanionConfig = {
  suit: "blue",
};

export function getSuitPreset(id: string): SuitPreset {
  return SUIT_PRESETS.find((preset) => preset.id === id) ?? SUIT_PRESETS[0];
}
