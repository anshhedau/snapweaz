import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "We dive deep into understanding your vision, goals, audience, and challenges to build a solid foundation.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategize",
    description: "Through collaborative workshops, we craft a roadmap that aligns creative ideas with technical feasibility.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design & Build",
    description: "Our teams work in tandem — designing interfaces while engineering robust, scalable solutions.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    description: "We deploy, monitor, and iterate. Our partnership continues as your product evolves and scales.",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-28"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-5">
            Our Process
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            From concept to
            <br />
            launch, simplified
          </h2>
          <p className="text-lg text-background/60 leading-relaxed">
            A proven methodology that turns complex challenges into elegant solutions.
          </p>
        </motion.div>

        {/* Process Steps - Equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-full"
            >
              <div className="relative bg-background/5 rounded-2xl p-8 md:p-10 border border-background/10 hover:bg-background/10 transition-all duration-500 h-full flex flex-col">
                {/* Number */}
                <span className="text-5xl font-serif text-background/10 mb-5 block">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-accent/20 mb-5 w-fit">
                  <step.icon size={24} className="text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-background/50 leading-relaxed text-[15px] flex-grow">
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
