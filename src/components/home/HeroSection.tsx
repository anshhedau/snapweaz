import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { useRef, lazy, Suspense } from "react";
import { getHeroSettings } from "@/lib/content";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticleScene = lazy(() =>
  import("@/components/three/ParticleScene").then((m) => ({ default: m.ParticleScene }))
);

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const hero = getHeroSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* mesh wash */}
      <div className="absolute inset-0 opacity-80" style={{ background: "var(--gradient-mesh)" }} />

      {/* 3D Scene */}
      {!isMobile ? (
        <Suspense fallback={null}>
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 z-0"
          >
            <ParticleScene className="absolute inset-0" />
          </motion.div>
        </Suspense>
      ) : (
        // mobile fallback: animated CSS orb illusion
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 via-blue-500/30 to-purple-500/30 blur-3xl animate-pulse-glow" />
            <div className="absolute inset-8 rounded-full bg-accent/20 blur-2xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      )}

      {/* edge fades for depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

      <motion.div style={{ opacity, scale, filter }} className="relative z-10 flex-1 flex items-center">
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
                initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3rem,8vw,7.5rem)] text-foreground leading-[0.92] mb-8 tracking-tight"
                style={{ textShadow: "0 0 60px hsl(var(--accent) / 0.25)" }}
              >
                {hero.headline_line1}
                <br />
                <motion.span
                  className="text-gradient italic inline-block"
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
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="flex flex-wrap items-center gap-5"
              >
                <Button
                  size="lg"
                  className="btn-glow bg-accent text-accent-foreground hover:bg-accent rounded-full px-10 h-14 text-base font-medium group"
                  asChild
                >
                  <Link to="/contact">
                    {hero.cta_primary}
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Button>
                <Link
                  to="/work"
                  className="group flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors duration-300 text-base"
                >
                  {hero.cta_secondary}
                  <ArrowDownRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="lg:col-span-4 hidden lg:flex flex-col items-end gap-10 pb-4"
            >
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
                  <text className="fill-foreground/40 text-[14px] uppercase tracking-[0.4em]">
                    <textPath href="#circlePath">
                      Design · Engineering · Innovation ·{" "}
                    </textPath>
                  </text>
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center glow">
                    <ArrowDownRight size={20} className="text-accent" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-[200px]">
                {hero.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
                  <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">{label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
