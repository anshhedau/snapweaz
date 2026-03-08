import { motion } from "framer-motion";
import { ArrowRight, Check, Palette, Code2, Megaphone, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Palette,
    title: "Brand & Identity Design",
    description: "We create distinctive brand identities that capture your essence and resonate with your audience.",
    problem: "Your brand doesn't stand out in a crowded market",
    solution: "Strategic brand positioning with cohesive visual systems",
    deliverables: ["Logo & Visual Identity", "Brand Guidelines", "Marketing Collateral", "Packaging Design"],
    color: "from-rose-500 to-orange-400",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "User-centered design that transforms complex workflows into intuitive, delightful experiences.",
    problem: "Users struggle to navigate your product",
    solution: "Research-driven design focused on user needs",
    deliverables: ["User Research", "Wireframes & Prototypes", "Visual Design", "Design Systems"],
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Code2,
    title: "Web & Software Development",
    description: "Full-stack development that brings your ideas to life with clean, scalable, and maintainable code.",
    problem: "Your tech stack isn't keeping up with your growth",
    solution: "Modern architecture built for scale and performance",
    deliverables: ["Web Applications", "Mobile Apps", "API Development", "Cloud Infrastructure"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Megaphone,
    title: "Growth & Marketing",
    description: "Data-driven strategies to expand your reach, acquire customers, and accelerate business growth.",
    problem: "You're not reaching the right audience",
    solution: "Targeted campaigns with measurable results",
    deliverables: ["Digital Marketing", "SEO & Content", "Analytics", "Campaign Management"],
    color: "from-emerald-500 to-teal-400",
  },
];

const Services = () => {
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
                Our Services
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                Solutions that solve
                <span className="text-gradient"> real problems</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                We don't just deliver services — we understand your challenges
                and craft solutions that drive meaningful impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                      <service.icon size={32} className="text-white" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      {service.description}
                    </p>

                    {/* Problem / Solution */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-medium text-destructive uppercase tracking-wider mt-1">
                          Problem
                        </span>
                        <p className="text-foreground">{service.problem}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-medium text-accent uppercase tracking-wider mt-1">
                          Solution
                        </span>
                        <p className="text-foreground">{service.solution}</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="rounded-full group"
                      asChild
                    >
                      <Link to="/contact">
                        Discuss your project
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Deliverables Card */}
                  <div className={`bg-card rounded-3xl p-8 md:p-10 border border-border/50 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
                      What you'll get
                    </h3>
                    <ul className="space-y-4">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-accent" />
                          </div>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                Not sure what you need?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's have a conversation. We'll help you identify the right
                solutions for your unique challenges.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 group"
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
