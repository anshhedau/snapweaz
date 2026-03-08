import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const projects = [
  {
    title: "DesignFlu Rebrand",
    category: "Brand Identity",
    description: "Complete brand transformation for a leading design agency, including logo, visual system, and digital presence.",
    image: "DF",
    color: "bg-rose-100",
  },
  {
    title: "TechStart Platform",
    category: "Web Application",
    description: "A comprehensive startup management platform with investor dashboards, analytics, and collaboration tools.",
    image: "TS",
    color: "bg-blue-100",
  },
  {
    title: "CloudNine SaaS",
    category: "Product Design & Development",
    description: "End-to-end design and development of a cloud storage solution with real-time sync and collaboration features.",
    image: "CN",
    color: "bg-violet-100",
  },
  {
    title: "InnovateCo Mobile App",
    category: "Mobile Development",
    description: "Native iOS and Android apps for a productivity suite, featuring offline support and seamless sync.",
    image: "IC",
    color: "bg-emerald-100",
  },
  {
    title: "StartupX Marketing",
    category: "Growth Strategy",
    description: "Comprehensive digital marketing campaign that increased user acquisition by 300% in six months.",
    image: "SX",
    color: "bg-amber-100",
  },
  {
    title: "Laxmi Group Website",
    category: "Web Design",
    description: "Modern corporate website with CMS integration, multilingual support, and optimized performance.",
    image: "LG",
    color: "bg-sky-100",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero relative overflow-hidden">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Our Work
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                Projects that speak
                <span className="text-gradient"> for themselves</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A selection of our recent work across design, development, and
                strategy. Each project represents a unique challenge solved with
                creativity and precision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  {/* Image placeholder */}
                  <div className={`${project.color} rounded-2xl aspect-[4/3] mb-6 flex items-center justify-center overflow-hidden relative`}>
                    <span className="font-serif text-6xl text-foreground/20">
                      {project.image}
                    </span>
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                  </div>

                  {/* Content */}
                  <p className="text-sm text-accent uppercase tracking-wider mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-2 flex items-center gap-2 group-hover:text-accent transition-colors">
                    {project.title}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Ready to start your project?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's create something remarkable together. We'd love to hear
                about your vision.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Get in touch
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
