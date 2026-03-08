import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const marqueeWords = [
  "Brand Strategy",
  "UI/UX Design",
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Creative Direction",
  "Product Design",
  "Innovation",
];

const WordReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 60, rotateX: -40 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.span>
);

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-foreground blur-[200px] pointer-events-none"
      />

      <div className="container-wide relative z-10 pt-36 pb-24">
        <div className="max-w-6xl mx-auto text-center" style={{ perspective: '1000px' }}>
          {/* Main Headline - Word by word reveal */}
          <div className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-foreground leading-[1.02] mb-8 tracking-tight">
            <div className="overflow-hidden">
              <WordReveal delay={0.1}>We</WordReveal>{" "}
              <WordReveal delay={0.17}>craft</WordReveal>{" "}
              <WordReveal delay={0.24}>digital</WordReveal>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="inline-block text-accent"
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.31, ease: [0.22, 1, 0.36, 1] }}
              >
                experiences
              </motion.span>{" "}
              <WordReveal delay={0.38}>that</WordReveal>
            </div>
            <div className="overflow-hidden">
              <WordReveal delay={0.45}>move</WordReveal>{" "}
              <WordReveal delay={0.52}>people</WordReveal>
            </div>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-light"
          >
            A creative technology studio helping startups and enterprises build
            future-ready brands, products, and platforms.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-full px-12 h-16 text-base font-medium group transition-all duration-500 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link to="/contact">
                  Start your project
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
            </MagneticButton>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full px-12 h-16 text-base text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-all duration-500"
              asChild
            >
              <Link to="/work">View our work</Link>
            </Button>
          </motion.div>
        </div>

        {/* Marquee ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-24 md:mt-32 overflow-hidden border-y border-border/30 py-5"
        >
          <div className="marquee-track">
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="marquee-item text-sm md:text-base text-muted-foreground/60 uppercase tracking-[0.25em] font-medium whitespace-nowrap">
                {word}
                <span className="mx-8 md:mx-12 text-accent/40">✦</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border-2 border-border/50 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
