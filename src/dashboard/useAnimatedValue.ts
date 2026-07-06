import { useEffect, useState } from "react";

const LEADING_NUMBER = /^(-?\d+(?:\.\d+)?)(.*)$/;

/**
 * Counts up from 0 to the numeric lead-in of a value string (e.g. "64",
 * "2.4 hrs", "18%"), preserving whatever text follows the number. Values
 * with no leading number pass through unchanged.
 */
export function useAnimatedValue(rawValue: string, durationMs = 900): string {
  const match = rawValue.match(LEADING_NUMBER);
  const target = match ? parseFloat(match[1]) : null;
  const decimals = match && match[1].includes(".") ? 1 : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target === null ? rawValue : `0${suffix}`);

  useEffect(() => {
    if (target === null) {
      setDisplay(rawValue);
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(rawValue);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      if (progress < 1) {
        setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(rawValue);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawValue]);

  return display;
}
