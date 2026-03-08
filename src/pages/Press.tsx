import { motion } from "framer-motion";
import { ArrowUpRight, Download, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const pressReleases = [
  {
    date: "January 2025",
    title: "SnapWeaz Expands Global Operations",
    excerpt: "SnapWeaz announces expansion of services to new markets in Europe and North America, strengthening its global presence.",
    category: "Company News",
  },
  {
    date: "December 2024",
    title: "SnapWeaz Ventures Launches Startup Incubator",
    excerpt: "New initiative to support early-stage startups with design, development, and go-to-market strategies.",
    category: "Product Launch",
  },
  {
    date: "October 2024",
    title: "SnapWeaz Partners with Leading Tech Firms",
    excerpt: "Strategic partnerships formed to deliver enterprise-grade solutions for Fortune 500 clients.",
    category: "Partnership",
  },
  {
    date: "August 2024",
    title: "SnapWeaz Recognized as Top Design Agency",
    excerpt: "Industry recognition for excellence in UI/UX design and brand identity work.",
    category: "Award",
  },
];

const mediaFeatures = [
  {
    outlet: "TechCrunch",
    title: "How SnapWeaz is Redefining Digital Agency Standards",
    date: "November 2024",
  },
  {
    outlet: "Forbes India",
    title: "Rising Design Studios Shaping India's Tech Landscape",
    date: "September 2024",
  },
  {
    outlet: "Product Hunt",
    title: "Top Design Agencies for Startups in 2024",
    date: "July 2024",
  },
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Press & Media
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                News &
                <span className="text-accent"> announcements</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Stay updated with the latest news, press releases, and media
                coverage about SnapWeaz and our work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Press Kit */}
        <section className="py-16 bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-background rounded-2xl p-8 border border-border/50"
            >
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Press Kit
                </h3>
                <p className="text-muted-foreground">
                  Download logos, brand assets, and company information.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full group"
                onClick={() => window.open('mailto:info@snapweaz.in?subject=Press Kit Request', '_blank')}
              >
                <Download size={18} className="mr-2" />
                Request Press Kit
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-16"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Press Releases
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Latest announcements
              </h2>
            </motion.div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-secondary/30 hover:bg-secondary/50 rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-medium text-accent uppercase tracking-wider">
                          {release.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          {release.date}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 group-hover:text-accent transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {release.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-accent font-medium">
                      Read more
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Features */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-16"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                In The Media
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Featured coverage
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {mediaFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-background rounded-2xl p-8 border border-border/50 cursor-pointer hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">
                      {feature.outlet}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Media inquiries
              </h2>
              <p className="text-lg text-background/70 mb-8">
                For press inquiries, interview requests, or media opportunities,
                please reach out to our communications team.
              </p>
              <a
                href="mailto:info@snapweaz.in"
                className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-full font-medium hover:bg-accent hover:text-background transition-all duration-300"
              >
                info@snapweaz.in
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

export default Press;
