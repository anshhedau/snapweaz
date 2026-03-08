import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
  { value: "6", label: "Divisions" },
  { value: "∞", label: "Commitment" },
];

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground text-background">
      {/* Parallax accent shape */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Large statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
                About SnapWeaz
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-8">
              Where{" "}
              <span className="text-accent italic">creativity</span>
              <br />
              meets engineering
            </h2>
            <p className="text-background/60 text-lg leading-relaxed mb-6">
              SnapWeaz blends bold creativity with advanced technology to craft
              solutions that redefine industries. From startups to enterprises, we
              build future-ready brands and products.
            </p>
            <p className="text-background/40 leading-relaxed mb-10">
              Design with love. Engineer with precision. Build for the future.
              Every pixel, every line of code — crafted with intentionality.
            </p>
            <Button
              variant="outline"
              className="rounded-full px-8 h-12 border-background/30 text-background hover:border-accent hover:text-accent hover:bg-accent/10 group transition-all duration-300"
              asChild
            >
              <Link to="/about">
                Read our story
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Right: Stats with big numbers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-px bg-background/10 rounded-3xl overflow-hidden"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-foreground p-8 md:p-12 flex flex-col justify-center"
              >
                <span className="font-serif text-5xl md:text-6xl text-background mb-2 block">
                  {stat.value}
                </span>
                <span className="text-xs text-background/40 uppercase tracking-[0.2em]">
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
