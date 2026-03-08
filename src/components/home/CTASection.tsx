import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-accent/5">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[20vw] text-foreground/[0.02] whitespace-nowrap">
          Let's Talk
        </span>
      </div>

      <div className="container-wide section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-accent" />
            <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
              Get in Touch
            </p>
            <div className="w-8 h-px bg-accent" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.05] mb-8">
            Let's create something
            <br />
            <span className="text-accent italic">extraordinary</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you're launching a startup, scaling a product, or reimagining
            your brand, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-accent rounded-full px-10 h-14 text-base font-medium group transition-all duration-500"
              asChild
            >
              <Link to="/contact">
                Start a project
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <a
              href="mailto:info@snapweaz.in"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-full border border-border text-foreground/70 hover:border-accent hover:text-accent transition-all duration-300"
            >
              <Mail size={18} />
              info@snapweaz.in
            </a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
          >
            {["Free consultation", "Quick response", "No obligations"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
