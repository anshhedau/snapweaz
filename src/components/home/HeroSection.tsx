import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { useRef, useEffect } from "react";
import { getHeroSettings } from "@/lib/content";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const hero = getHeroSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse-follow orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-background noise-overlay"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />

      {/* Subtle grid - hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      )}

      {/* Mouse-following orb - desktop only */}
      {!isMobile && (
        <motion.div
          style={{ x: springX, y: springY }}
          className="hidden lg:block absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        >
          <div className="w-full h-full rounded-full bg-accent/[0.06] blur-[100px]" />
        </motion.div>
      )}

      {/* Static orbs - simplified on mobile */}
      {!isMobile && (
        <>
          <motion.div
            style={{ y }}
            className="absolute top-[15%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/[0.08] blur-[120px] pointer-events-none"
          />
          <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-blue-400/[0.04] blur-[100px] pointer-events-none" />
        </>
      )}

      <motion.div style={{ opacity, scale }} className="relative z-10 flex-1 flex items-center">
        <div className="container-wide w-full pt-32 pb-8">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 mb-8"
              >
                <motion.div
                  className="w-12 h-px bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ originX: 0 }}
                />
                <span className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-medium">
                  {hero.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3rem,8vw,7.5rem)] text-foreground leading-[0.92] mb-8 tracking-tight"
              >
                {hero.headline_line1}
                <br />
                <motion.span
                  className="text-accent italic inline-block"
                  initial={{ opacity: 0, skewY: 3 }}
                  animate={{ opacity: 1, skewY: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  {hero.headline_accent}
                </motion.span>
                <br />
                {hero.headline_line3}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-5"
              >
                <Button
                  size="lg"
                  className="section-dark hover:bg-accent rounded-full px-10 h-14 text-base font-medium group transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-[1.02] pulse-accent glow-accent light-sweep"
                  asChild
                >
                  <Link to="/contact">
                    {hero.cta_primary}
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Button>
                <Link
                  to="/work"
                  className="group flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors duration-300 text-base"
                >
                  {hero.cta_secondary}
                  <ArrowDownRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="lg:col-span-4 hidden lg:flex flex-col items-end gap-10 pb-4"
            >
              {/* Rotating badge */}
              <div className="relative w-32 h-32">
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="fill-foreground/30 text-[14px] uppercase tracking-[0.4em]">
                    <textPath href="#circlePath">
                      Design · Engineering · Innovation ·{" "}
                    </textPath>
                  </text>
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <ArrowDownRight size={20} className="text-accent" />
                  </div>
                </div>
              </div>

              {/* Glass stat cards */}
              <div className="space-y-4 w-full max-w-[200px]">
                {hero.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="glass-card rounded-2xl p-5 text-right"
                  >
                    <AnimatedStat value={stat.value} className="block font-serif text-3xl text-foreground" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 border-t border-border/30 py-5 overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {["Brand Identity", "UI/UX Design", "Web Development", "Cloud Infrastructure", "Growth Marketing"].map((label) => (
                <span key={label} className="flex items-center gap-8">
                  <span className="text-sm text-muted-foreground/40 uppercase tracking-[0.3em]">{label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
