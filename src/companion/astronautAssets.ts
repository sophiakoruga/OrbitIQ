import blue from "../assets/images/astronaut-blue.png";
import brown from "../assets/images/astronaut-brown.png";
import green from "../assets/images/astronaut-green.png";
import teal from "../assets/images/astronaut-teal.png";

// Finished, Figma-exported astronaut art — one full image per suit color.
// These are swapped wholesale, never recolored with CSS/JS.
export const ASTRONAUT_IMAGES = { blue, green, teal, brown } as const;

export type AstronautSuitId = keyof typeof ASTRONAUT_IMAGES;
