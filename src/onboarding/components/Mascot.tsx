import astronaut from "../../assets/images/mascot-astronaut.png";
import dog from "../../assets/images/mascot-dog.png";

interface MascotProps {
  type?: "astronaut" | "dog";
}

// The source art is a padded canvas with the pose off-center rather than a
// tight crop, so each variant needs its own zoom/offset (values match the
// crop the Figma file itself applies) to isolate just the character.
// Wrapper size is likewise taken directly from Figma (Astronaut is the
// large welcome-screen mascot; Dog is the small one reused on every step).
export const MASCOTS = {
  astronaut: {
    src: astronaut,
    wrapper: "h-[165px] w-[120px]",
    crop: { width: "251.34%", height: "160%", left: "-33.59%", top: "-35.76%" },
  },
  dog: {
    src: dog,
    wrapper: "h-[97px] w-[61px]",
    crop: { width: "494.44%", height: "272.16%", left: "-343.12%", top: "-115.46%" },
  },
} as const;

export function Mascot({ type = "astronaut" }: MascotProps) {
  const mascot = MASCOTS[type];

  return (
    <div className={`relative shrink-0 overflow-hidden ${mascot.wrapper}`}>
      <img src={mascot.src} alt="" className="absolute max-w-none" style={mascot.crop} />
    </div>
  );
}
