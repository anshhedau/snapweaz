import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { getHeroSettings } from "@/lib/content";

export const HeroSection = () => {
  const hero = getHeroSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-background"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        style={{ y }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none"
      />

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
                <div className="w-12 h-px bg-accent" />
                <span className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-medium">
                  {hero.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(3rem,8vw,7.5rem)] text-foreground leading-[0.95] mb-8 tracking-tight"
              >
                {hero.headline_line1}
                <br />
                <span className="text-accent italic">{hero.headline_accent}</span>
                <br />
                {hero.headline_line3}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-5"
              >
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-accent rounded-full px-10 h-14 text-base font-medium group transition-all duration-500"
                  asChild
                >
                  <Link to="/contact">
                    {hero.cta_primary}
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
              transition={{ delay: 0.6, duration: 1 }}
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
                      Design · Engineering · Innovation · 
                    </textPath>
                  </text>
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowDownRight size={24} className="text-accent" />
                </div>
              </div>

              <div className="text-right space-y-4">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="block font-serif text-4xl text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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
              <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">Brand Identity</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">UI/UX Design</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">Web Development</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">Cloud Infrastructure</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.3em]">Growth Marketing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
