import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "6", label: "Expert Divisions" },
  { value: "100%", label: "Commitment" },
];

export const AboutSection = () => {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-5">
              About SnapWeaz
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-7">
              Where creativity meets{" "}
              <span className="text-accent">engineering</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              SnapWeaz blends bold creativity with advanced technology to make
              smart solutions and visual experiences that redefine industries.
              From startups to enterprises, we help build future-ready brands
              and products.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Our philosophy is simple: Design with love. Engineer with
              precision. Build for the future. Every pixel, every line of code,
              every strategy is crafted with intentionality and care.
            </p>
            <Button
              variant="outline"
              className="rounded-full px-7 h-12 border-foreground/20 hover:border-accent hover:text-accent group transition-all duration-300"
              asChild
            >
              <Link to="/about">
                Read our story
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                className="bg-background rounded-2xl p-8 md:p-10 border border-border/30 text-center hover:border-accent/30 transition-colors duration-300"
              >
                <span className="block font-serif text-4xl md:text-5xl text-foreground mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
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
