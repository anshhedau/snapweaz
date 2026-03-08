import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { getAboutSectionSettings, parseAccentText } from "@/lib/content";

export const AboutSection = () => {
  const content = getAboutSectionSettings();
  const headline = parseAccentText(content.headline);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      {/* Mesh gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />

      <motion.div
        style={{ y: bgY }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
                {content.eyebrow}
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-8">
              {headline.before}
              {headline.accent && <span className="text-accent italic">{headline.accent}</span>}
              {headline.after}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {content.description}
            </p>
            <p className="text-muted-foreground/60 leading-relaxed mb-10">
              {content.secondary_text}
            </p>
            <Button
              variant="outline"
              className="rounded-full px-8 h-12 border-border hover:border-accent hover:text-accent hover:bg-accent/5 group transition-all duration-300"
              asChild
            >
              <Link to="/about">
                {content.cta_text}
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {content.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-center"
              >
                <AnimatedStat value={stat.value} className="font-serif text-5xl md:text-6xl text-foreground mb-3 block" />
                <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
