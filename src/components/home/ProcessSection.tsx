import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "Deep-dive into your vision, goals, and challenges to lay a solid foundation.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategize",
    description: "Collaborative workshops to craft a roadmap aligning creativity with feasibility.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design & Build",
    description: "Designing interfaces while engineering robust, scalable solutions in tandem.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    description: "Deploy, monitor, iterate. Our partnership continues as you evolve.",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
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
            <p className="text-muted-foreground leading-relaxed">
              A proven methodology that turns complex challenges into elegant,
              scalable solutions.
            </p>
          </motion.div>
        </div>

        {/* Steps - horizontal scroll on mobile, grid on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative"
            >
              <div className="relative bg-secondary/50 rounded-3xl p-8 md:p-10 border border-border/30 hover:border-accent/30 transition-all duration-500 h-full flex flex-col">
                {/* Large number watermark */}
                <span className="absolute top-6 right-6 font-serif text-7xl text-foreground/[0.04] select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="inline-flex p-3.5 rounded-2xl bg-accent/10 mb-8 w-fit group-hover:bg-accent/20 transition-colors duration-300">
                  <step.icon size={22} className="text-accent" />
                </div>

                {/* Number label */}
                <span className="text-xs text-muted-foreground/50 uppercase tracking-[0.2em] mb-3 block font-mono">
                  Step {step.number}
                </span>

                <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px] flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
