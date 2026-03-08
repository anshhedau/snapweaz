import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProjects, getOtherWork, getClients } from "@/lib/content";

const Work = () => {
  const projects = getProjects();
  const otherWork = getOtherWork();
  const clients = getClients();

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
                Real projects, real results. Websites and brands we've crafted for clients across industries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-10">
              {projects.map((project, index) => (
                <motion.a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group block cursor-pointer"
                >
                  <div className="bg-background rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl border border-border/30 group-hover:border-accent/20">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                        <div className="aspect-[16/10] overflow-hidden bg-secondary/30">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                      <div className={`p-10 md:p-14 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <span className="text-xs text-accent uppercase tracking-[0.2em] mb-5 block font-medium">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300 flex items-start gap-3">
                          {project.title}
                          <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 mt-2 shrink-0" />
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-8 text-[0.95rem]">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 text-xs font-medium bg-secondary/60 text-foreground/60 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Other Work */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">And Many More</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-2xl">
                Landing pages, campaigns & <span className="text-accent italic">beyond</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-lg">
                Beyond featured projects, we've delivered dozens of landing pages, marketing sites,
                and brand assets for clients worldwide.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherWork.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-background rounded-2xl p-8 border border-border/30 hover:border-accent/30 transition-all duration-300 group"
                >
                  <span className="font-serif text-4xl text-accent mb-3 block">{item.count}</span>
                  <h3 className="font-serif text-xl text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">Client Portfolio</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Trusted by <span className="text-accent italic">ambitious</span> brands
              </h2>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {clients.map((client, index) => (
                <motion.span
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3 rounded-full border border-border/40 text-foreground/80 hover:border-accent hover:text-accent transition-colors duration-300 text-sm font-medium"
                >
                  {client.name}
                </motion.span>
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
