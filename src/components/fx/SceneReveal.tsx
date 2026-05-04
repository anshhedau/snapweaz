import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SceneRevealProps {
  children: ReactNode;
  className?: string;
  /** Strength of the depth/scale effect (0-1) */
  depth?: number;
}

/**
 * Wraps a section to give it cinematic scroll behavior:
 * fade + slight scale + subtle z-axis depth as it enters/leaves the viewport.
 * Intentionally non-invasive — does not change layout.
 */
export const SceneReveal = ({ children, className, depth = 1 }: SceneRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduce ? [1, 1, 1, 1] : [0.35, 1, 1, 0.4],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce ? [1, 1, 1, 1] : [0.965, 1, 1, 0.97],
  );
  const blur = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduce ? ["0px", "0px", "0px", "0px"] : ["6px", "0px", "0px", "4px"],
  );
  const filter = useTransform(blur, (b) => `blur(${b})`);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter, willChange: "opacity, transform, filter" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
