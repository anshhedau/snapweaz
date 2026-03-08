import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const divisions = [
  {
    id: "design",
    icon: Palette,
    name: "SnapWeaz Design",
    tagline: "Where creativity takes form",
    description: "Our design division crafts visual experiences that captivate, communicate, and convert. From brand identities to digital interfaces, we bring your vision to life with precision and artistry.",
    services: ["Brand Identity", "UI/UX Design", "Motion Graphics", "Campaign Design", "Illustration", "Packaging"],
    color: "from-rose-500 to-orange-400",
    bgColor: "bg-rose-50",
  },
  {
    id: "software",
    icon: Code2,
    name: "SnapWeaz Software",
    tagline: "Engineering excellence",
    description: "We build robust, scalable software solutions using modern technologies and best practices. Our engineering team turns complex requirements into elegant, maintainable code.",
    services: ["Web Applications", "Mobile Apps", "Custom Software", "API Development", "E-commerce", "SaaS Platforms"],
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "ventures",
    icon: Rocket,
    name: "SnapWeaz Ventures",
    tagline: "Launching tomorrow's leaders",
    description: "We partner with ambitious founders to transform ideas into successful products. From validation to launch, we provide the support startups need to thrive.",
    services: ["Startup Incubation", "MVP Development", "Go-to-Market Strategy", "Pitch Deck Design", "Investor Readiness", "Product Strategy"],
    color: "from-violet-500 to-purple-400",
    bgColor: "bg-violet-50",
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "SnapWeaz Cloud",
    tagline: "Infrastructure that scales",
    description: "Modern cloud solutions that grow with your business. We design, deploy, and manage infrastructure that's secure, reliable, and cost-effective.",
    services: ["Cloud Architecture", "DevOps & CI/CD", "SaaS Development", "Database Design", "Security & Compliance", "Performance Optimization"],
    color: "from-sky-500 to-indigo-400",
    bgColor: "bg-sky-50",
  },
  {
    id: "growth",
    icon: TrendingUp,
    name: "SnapWeaz Growth",
    tagline: "Accelerating your reach",
    description: "Data-driven marketing that delivers results. We help you find, engage, and convert your ideal customers through strategic digital campaigns.",
    services: ["Digital Marketing", "SEO & Content", "Social Media", "Email Marketing", "Analytics", "Conversion Optimization"],
    color: "from-emerald-500 to-teal-400",
    bgColor: "bg-emerald-50",
  },
  {
    id: "ops",
    icon: Shield,
    name: "SnapWeaz Ops",
    tagline: "Reliable delivery, always",
    description: "Behind every great product is a solid operational foundation. We ensure your projects are delivered on time, on budget, and with exceptional quality.",
    services: ["Project Management", "Quality Assurance", "Security Audits", "Documentation", "Maintenance & Support", "Process Optimization"],
    color: "from-amber-500 to-yellow-400",
    bgColor: "bg-amber-50",
  },
];

const Divisions = () => {
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
                Our Divisions
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                Six expert teams,
                <span className="text-gradient"> one vision</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Specialized divisions working in harmony to deliver comprehensive
                solutions. Each team brings deep expertise while sharing a unified
                commitment to excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Divisions Grid */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-16 lg:space-y-24">
              {divisions.map((division, index) => (
                <motion.div
                  key={division.id}
                  id={division.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual */}
                  <div className={`${division.bgColor} rounded-3xl p-12 aspect-square flex items-center justify-center ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}>
                    <div className="text-center">
                      <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-br ${division.color} mb-6`}>
                        <division.icon size={48} className="text-white" />
                      </div>
                      <h3 className="font-serif text-2xl text-foreground">{division.name}</h3>
                      <p className="text-muted-foreground mt-2">{division.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                      {division.name}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {division.description}
                    </p>

                    {/* Services tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {division.services.map((service) => (
                        <span
                          key={service}
                          className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                    >
                      Work with this team
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                The right team for your challenge
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8">
                Not sure which division you need? Let's talk — we'll help you
                find the perfect combination of expertise for your project.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Start a conversation
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Divisions;
