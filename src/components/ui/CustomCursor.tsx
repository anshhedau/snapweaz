import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.5 });

  const addHover = useCallback(() => setIsHovering(true), []);
  const removeHover = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if currently over an interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input[type='submit'], select, .cursor-pointer");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  // Reset on any click (covers navigation)
  useEffect(() => {
    const handleClick = () => {
      // Small delay to let the new page render
      setTimeout(() => setIsHovering(false), 50);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 -m-3 rounded-full"
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle, hsl(9 38% 62% / 0.5) 0%, transparent 70%)",
            width: 40,
            height: 40,
            transform: "translate(-50%, -50%)",
            filter: "blur(6px)",
          }}
        />
        <span className="text-2xl select-none" style={{ lineHeight: 1 }}>🔎</span>
      </motion.div>
    </motion.div>
  );
};
