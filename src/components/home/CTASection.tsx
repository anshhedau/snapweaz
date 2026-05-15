import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden section-dark noise-overlay">
      {/* Orbs */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-accent/[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-400/[0.04] blur-[100px] pointer-events-none" />

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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 glass-card-dark rounded-full px-5 py-2.5 mb-10"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-sm text-foreground/60">Get in Touch</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.05] mb-8">
            Let's create something
            <br />
            <span className="text-accent italic">extraordinary</span>
          </h2>
          <p className="text-lg text-foreground/40 max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you're launching a startup, scaling a product, or reimagining
            your brand, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-full px-10 h-14 text-base font-medium group transition-all duration-500 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link to="/contact">
                Start a project
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <a
              href="mailto:info@snapweaz.com"
              className="glass-card-dark inline-flex items-center gap-2 px-8 h-14 rounded-full text-foreground/60 hover:text-accent transition-all duration-300"
            >
              <Mail size={18} />
              info@snapweaz.com
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 flex flex-wrap justify-center items-center gap-8 text-sm text-foreground/30"
          >
            {["Free consultation", "Quick response", "No obligations"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
