import type { Config } from "tailwindcss";

// Color/type tokens pulled directly from the OrbitIQ Figma file so the
// built UI matches the source design instead of guessing at hex values.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        boysenberry: "#003A6C",
        tulip: "#FFAA96",
        exosphere: "#FFFFFA",
        "dark-matter": "#121D26",
        stratosphere: "#C6D4DC",
        // Same hue as tulip, darkened/saturated enough for white text (~5:1
        // contrast) — tulip itself is too light a pastel for that.
        coral: "#C34122",
        "coral-dark": "#9C3016",
      },
      fontFamily: {
        display: ["Altivo", "DM Sans", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        panel: "27.5rem", // ~440px — simulated Chrome side-panel width
      },
      keyframes: {
        "step-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "step-in": "step-in 200ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
