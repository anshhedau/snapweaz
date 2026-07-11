import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";

interface SceneRevealProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

/**
 * Cinematic scroll reveal.
 * `filter: blur()` causes severe repaint issues on mobile browsers where content
 * stays visibly blurry until scrolling settles. We disable blur (and heavy scale)
 * on mobile/touch devices and only animate opacity there.
 */
export const SceneReveal = ({ children, className }: SceneRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (hover: none)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduce ? [1, 1, 1, 1] : [0.5, 1, 1, 0.6],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce || isMobile ? [1, 1, 1, 1] : [0.965, 1, 1, 0.97],
  );

  const useBlur = !reduce && !isMobile;
  const blur = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    useBlur ? ["6px", "0px", "0px", "4px"] : ["0px", "0px", "0px", "0px"],
  );
  const filter = useTransform(blur, (b) => `blur(${b})`);

  return (
    <motion.div
      ref={ref}
      style={
        useBlur
          ? { opacity, scale, filter, willChange: "opacity, transform, filter" }
          : { opacity, scale, willChange: "opacity, transform" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};
