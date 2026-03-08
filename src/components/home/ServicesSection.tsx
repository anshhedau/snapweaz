import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Palette,
    title: "Design",
    subtitle: "SnapWeaz Design",
    description: "Brand identity, UI/UX, motion graphics, and campaign visuals that captivate.",
    href: "/divisions#design",
    number: "01",
  },
  {
    icon: Code2,
    title: "Software",
    subtitle: "SnapWeaz Software",
    description: "Web apps, mobile apps, and custom software built with cutting-edge tech.",
    href: "/divisions#software",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Ventures",
    subtitle: "SnapWeaz Ventures",
    description: "Startup incubation, MVP development, and go-to-market strategy.",
    href: "/divisions#ventures",
    number: "03",
  },
  {
    icon: Cloud,
    title: "Cloud",
    subtitle: "SnapWeaz Cloud",
    description: "Cloud infrastructure, SaaS platforms, and DevOps for scale.",
    href: "/divisions#cloud",
    number: "04",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    subtitle: "SnapWeaz Growth",
    description: "Digital marketing, SEO, and performance campaigns that convert.",
    href: "/divisions#growth",
    number: "05",
  },
  {
    icon: Shield,
    title: "Ops",
    subtitle: "SnapWeaz Ops",
    description: "QA, security, project management, and reliable delivery.",
    href: "/divisions#ops",
    number: "06",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide">
        {/* Section Header - Asymmetric */}
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

        {/* Services - List style for more editorial feel */}
        <div className="border-t border-border/50">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                to={service.href}
                className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-border/50 items-center hover:bg-secondary/30 -mx-5 px-5 md:-mx-8 md:px-8 transition-colors duration-500"
              >
                {/* Number */}
                <span className="col-span-2 md:col-span-1 text-sm text-muted-foreground/50 font-mono">
                  {service.number}
                </span>

                {/* Icon + Title */}
                <div className="col-span-10 md:col-span-3 flex items-center gap-4">
                  <service.icon size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Subtitle */}
                <span className="hidden md:block col-span-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">
                  {service.subtitle}
                </span>

                {/* Description */}
                <p className="hidden md:block col-span-4 text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="hidden md:flex col-span-2 justify-end">
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
