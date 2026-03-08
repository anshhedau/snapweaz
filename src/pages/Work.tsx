import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const projects = [
  {
    title: "DesignFlu Rebrand",
    category: "Brand Identity",
    description: "Complete brand transformation for a leading design agency — logo, visual system, and digital presence.",
    image: "DF",
    accent: "bg-accent/10",
  },
  {
    title: "TechStart Platform",
    category: "Web Application",
    description: "Comprehensive startup management platform with investor dashboards and analytics.",
    image: "TS",
    accent: "bg-secondary",
  },
  {
    title: "CloudNine SaaS",
    category: "Product Design & Dev",
    description: "End-to-end cloud storage solution with real-time sync and collaboration.",
    image: "CN",
    accent: "bg-accent/10",
  },
  {
    title: "InnovateCo Mobile",
    category: "Mobile Development",
    description: "Native iOS and Android apps for a productivity suite with offline support.",
    image: "IC",
    accent: "bg-secondary",
  },
  {
    title: "StartupX Growth",
    category: "Growth Strategy",
    description: "Digital marketing campaign that increased user acquisition by 300% in six months.",
    image: "SX",
    accent: "bg-accent/10",
  },
  {
    title: "Laxmi Group Website",
    category: "Web Design",
    description: "Modern corporate website with CMS, multilingual support, and optimized performance.",
    image: "LG",
    accent: "bg-secondary",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[20vw] text-background/[0.03] whitespace-nowrap">Work</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Our Work</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6 max-w-4xl">
                Projects that speak
                <br />
                <span className="text-accent italic">for themselves</span>
              </h1>
              <p className="text-xl text-background/60 max-w-xl">
                A selection of recent work across design, development, and strategy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects - Alternating large/small layout */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <div className={`${project.accent} rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-xl`}>
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image area */}
                      <div className={`aspect-[4/3] md:aspect-auto flex items-center justify-center p-12 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <span className="font-serif text-8xl md:text-9xl text-foreground/10 group-hover:text-accent/20 transition-colors duration-500">
                          {project.image}
                        </span>
                      </div>

                      {/* Content */}
                      <div className={`p-10 md:p-14 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <span className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300 flex items-start gap-3">
                          {project.title}
                          <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Ready to start your <span className="text-accent italic">project</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Let's create something remarkable together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors duration-300 group"
              >
                Get in touch
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
