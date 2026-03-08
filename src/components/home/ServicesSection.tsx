import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Palette,
    title: "Design",
    subtitle: "SnapWeaz Design",
    description: "Brand identity, UI/UX design, motion graphics, and campaign visuals that captivate and convert.",
    href: "/divisions#design",
  },
  {
    icon: Code2,
    title: "Software",
    subtitle: "SnapWeaz Software",
    description: "Web applications, mobile apps, and custom software solutions built with cutting-edge technology.",
    href: "/divisions#software",
  },
  {
    icon: Rocket,
    title: "Ventures",
    subtitle: "SnapWeaz Ventures",
    description: "Startup incubation, innovation strategy, and go-to-market support for ambitious founders.",
    href: "/divisions#ventures",
  },
  {
    icon: Cloud,
    title: "Cloud",
    subtitle: "SnapWeaz Cloud",
    description: "Cloud infrastructure, SaaS development, and DevOps solutions for scalable operations.",
    href: "/divisions#cloud",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    subtitle: "SnapWeaz Growth",
    description: "Digital marketing, brand strategy, and performance solutions to accelerate your reach.",
    href: "/divisions#growth",
  },
  {
    icon: Shield,
    title: "Ops",
    subtitle: "SnapWeaz Ops",
    description: "Infrastructure, deployment, security, and project management for reliable delivery.",
    href: "/divisions#ops",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 lg:mb-28"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-5">
            Our Divisions
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
            Expert teams under
            <br />
            one unified vision
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Six specialized divisions working in harmony to deliver end-to-end
            solutions. From first concept to final deployment.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                to={service.href}
                className="group block h-full p-8 md:p-10 rounded-2xl bg-secondary/50 border border-border/30 hover:border-accent/30 hover:bg-secondary transition-all duration-500"
              >
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-7">
                  <service.icon size={24} className="text-accent" />
                </div>

                {/* Content */}
                <div className="mb-8">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2">
                    {service.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Link indicator */}
                <div className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
