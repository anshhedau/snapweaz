import { motion } from "framer-motion";
import { ArrowRight, Check, Palette, Code2, Megaphone, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette, Code2, Megaphone, Layers,
};

const Services = () => {
  const services = getServices();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden section-dark">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[18vw] text-foreground/[0.03] whitespace-nowrap">Services</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Our Services</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6 max-w-4xl">
                Solutions that solve
                <br />
                <span className="text-accent italic">real problems</span>
              </h1>
              <p className="text-xl text-foreground/60 max-w-xl">
                We understand your challenges and craft solutions that drive meaningful impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Palette;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                      <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''}`}>
                        <div className="flex items-center gap-6 mb-8">
                          <span className="font-serif text-6xl text-foreground/[0.08]">{service.number}</span>
                          <div className="inline-flex p-3.5 rounded-2xl bg-accent/10">
                            <Icon size={24} className="text-accent" />
                          </div>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-4 mb-10 p-6 rounded-2xl bg-secondary/50 border border-border/30">
                          <div className="flex items-start gap-4">
                            <span className="text-[10px] font-semibold text-destructive uppercase tracking-[0.2em] mt-1.5 shrink-0 w-16">
                              Problem
                            </span>
                            <p className="text-foreground">{service.problem}</p>
                          </div>
                          <div className="h-px bg-border/30" />
                          <div className="flex items-start gap-4">
                            <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mt-1.5 shrink-0 w-16">
                              Solution
                            </span>
                            <p className="text-foreground">{service.solution}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="rounded-full group" asChild>
                          <Link to="/contact">
                            Discuss your project
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                      <div className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                        <div className="bg-secondary/30 rounded-3xl p-8 md:p-10 border border-border/30 sticky top-32">
                          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
                            What you'll get
                          </h3>
                          <ul className="space-y-5">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                  <Check size={12} className="text-accent" />
                                </div>
                                <span className="text-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-accent/5">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Not sure what you <span className="text-accent italic">need</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Let's have a conversation. We'll help identify the right solutions.
              </p>
              <Button
                size="lg"
                className="section-dark hover:bg-accent rounded-full px-10 h-14 group transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  Schedule a free consultation
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
