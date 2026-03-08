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
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide">
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Specialized divisions working in harmony to deliver end-to-end
              solutions. From first concept to final deployment.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-border/50">
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
                  className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-border/50 items-center hover:bg-secondary/30 -mx-5 px-5 md:-mx-8 md:px-8 transition-colors duration-500"
                >
                  <span className="col-span-2 md:col-span-1 text-sm text-muted-foreground/50 font-mono">
                    {division.number}
                  </span>
                  <div className="col-span-10 md:col-span-3 flex items-center gap-4">
                    <Icon size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                      {division.name.replace('SnapWeaz ', '')}
                    </h3>
                  </div>
                  <span className="hidden md:block col-span-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">
                    {division.name}
                  </span>
                  <p className="hidden md:block col-span-4 text-muted-foreground text-sm leading-relaxed">
                    {division.description}
                  </p>
                  <div className="hidden md:flex col-span-2 justify-end">
                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
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
