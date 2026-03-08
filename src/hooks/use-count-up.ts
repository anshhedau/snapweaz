import { useEffect, useState, useRef } from "react";

/**
 * Animates a number from 0 to `end` when the element is in view.
 * Supports values like "50+", "3x", "100%", "24/7" — extracts the leading number.
 */
export function useCountUp(end: number, duration = 1500, inView = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return count;
}

/**
 * Parse a stat value string like "50+", "3x", "100%" into
 * { number, suffix } so we can animate the number part.
 */
export function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)/);
  if (match) {
    return { number: parseInt(match[1], 10), suffix: match[2] };
  }
  return { number: 0, suffix: value };
}
