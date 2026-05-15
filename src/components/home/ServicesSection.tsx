import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { getDivisions } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette, Code2, Rocket, Cloud, TrendingUp, Shield,
};

export const ServicesSection = () => {
  const divisions = getDivisions();

  return (
    <section className="section-padding section-dark relative overflow-hidden noise-overlay">
      {/* Orbs */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/[0.04] blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-accent" />
              <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
                Our Divisions
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
              Six expert
              <br />
              <span className="text-accent italic">teams</span>, one
              <br />
              unified vision
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-8 flex items-end"
          >
            <p className="text-lg text-foreground/50 leading-relaxed">
              Specialized divisions working in harmony to deliver end-to-end
              solutions. From first concept to final deployment.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-background/10">
          {divisions.map((division, index) => {
            const Icon = iconMap[division.icon] || Palette;
            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={`/divisions#${division.id}`}
                  className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-background/10 items-center hover:bg-background/5 -mx-5 px-5 md:-mx-8 md:px-8 transition-all duration-500 rounded-xl"
                >
                  <span className="col-span-2 md:col-span-1 text-sm text-foreground/30 font-mono">
                    {division.number}
                  </span>
                  <div className="col-span-10 md:col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 glass-card-dark rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                      {division.name.replace("SnapWeaz ", "")}
                    </h3>
                  </div>
                  <span className="hidden md:block col-span-2 text-xs text-foreground/30 uppercase tracking-[0.15em]">
                    {division.name}
                  </span>
                  <p className="hidden md:block col-span-4 text-foreground/40 text-sm leading-relaxed">
                    {division.description}
                  </p>
                  <div className="hidden md:flex col-span-2 justify-end">
                    <div className="w-10 h-10 rounded-full border border-background/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                      <ArrowUpRight
                        size={16}
                        className="text-foreground/20 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
