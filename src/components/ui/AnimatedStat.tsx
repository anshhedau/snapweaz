import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp, parseStatValue } from "@/hooks/use-count-up";

interface AnimatedStatProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedStat = ({ value, className, duration = 1500 }: AnimatedStatProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { number, suffix } = parseStatValue(value);
  const animatedNumber = useCountUp(number, duration, inView);

  return (
    <span ref={ref} className={className}>
      {number > 0 ? `${animatedNumber}${suffix}` : value}
    </span>
  );
};
