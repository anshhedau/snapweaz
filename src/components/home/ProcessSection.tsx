import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket } from "lucide-react";
import { getProcessSteps } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Search, Lightbulb, PenTool, Rocket,
};

export const ProcessSection = () => {
  const steps = getProcessSteps();

  return (
    <section className="section-padding section-dark relative overflow-hidden noise-overlay">
      {/* Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-accent" />
              <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">Process</p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
              From <span className="text-accent italic">concept</span>
              <br />
              to launch
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 flex items-end"
          >
            <p className="text-foreground/40 leading-relaxed">
              A proven methodology that turns complex challenges into elegant,
              scalable solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative"
              >
                <div className="glass-card-dark rounded-3xl p-8 md:p-10 h-full flex flex-col relative overflow-hidden">
                  {/* Large faded number */}
                  <span className="absolute top-4 right-4 font-serif text-8xl text-foreground/[0.03] select-none leading-none">
                    {step.number}
                  </span>
                  <div className="inline-flex p-3.5 rounded-2xl bg-accent/10 mb-8 w-fit group-hover:bg-accent/20 transition-colors duration-300 relative z-10">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <span className="text-[10px] text-foreground/30 uppercase tracking-[0.3em] mb-3 block font-mono relative z-10">
                    Step {step.number}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-foreground/40 leading-relaxed text-[15px] flex-grow relative z-10">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
