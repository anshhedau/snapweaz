import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Heart, Zap, Users, Coffee, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneReveal } from "@/components/fx/SceneReveal";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const openings = [
  { title: "Senior UI/UX Designer", department: "Design", location: "Remote / India", description: "Lead design projects from concept to completion, creating intuitive and beautiful experiences." },
  { title: "Full Stack Developer", department: "Software", location: "Remote / India", description: "Build scalable web applications using React, Node.js, and cloud services." },
  { title: "Brand Strategist", department: "Design", location: "Remote / India", description: "Develop comprehensive brand strategies that help clients stand out." },
  { title: "DevOps Engineer", department: "Cloud", location: "Remote / India", description: "Manage cloud infrastructure, CI/CD pipelines, and ensure high availability." },
  { title: "Digital Marketing Specialist", department: "Growth", location: "Remote / India", description: "Plan and execute digital marketing campaigns with measurable results." },
];

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health coverage and wellness programs for you and your family." },
  { icon: Zap, title: "Flexible Work", description: "Work from anywhere. We trust you to deliver great work on your own terms." },
  { icon: Users, title: "Learning Budget", description: "Annual learning stipend for courses, conferences, and professional development." },
  { icon: Coffee, title: "Team Events", description: "Regular team retreats, virtual hangouts, and celebrations together." },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
            <SEO
        title="Careers"
        description="Join SnapWeaz. Explore open roles across design, software, cloud, and growth — work remotely with a global studio."
        path="/careers"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden section-dark">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[18vw] text-foreground/[0.03] whitespace-nowrap">Careers</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Careers</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6 max-w-4xl">
                Build the future
                <br />
                <span className="text-accent italic">with us</span>
              </h1>
              <p className="text-xl text-foreground/60 max-w-xl">
                Join a team of passionate designers, developers, and strategists shaping the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <SceneReveal>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-8 h-px bg-accent" />
                  <p className="text-sm text-accent uppercase tracking-[0.2em]">Why Join SnapWeaz</p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
                  Work that <span className="text-accent italic">matters</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-px bg-border/30 rounded-3xl overflow-hidden">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background p-10 md:p-14 group"
                  >
                    <div className="inline-flex p-3.5 rounded-2xl bg-accent/10 mb-8 group-hover:bg-accent/20 transition-colors">
                      <benefit.icon size={24} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SceneReveal>

        {/* Open Positions */}
        <SceneReveal>
          <section className="section-padding bg-secondary/30">
            <div className="container-wide">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-8 h-px bg-accent" />
                  <p className="text-sm text-accent uppercase tracking-[0.2em]">Open Positions</p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                  Find your next <span className="text-accent italic">role</span>
                </h2>
              </motion.div>

              <div className="space-y-3">
                {openings.map((job, index) => (
                  <motion.a
                    key={job.title}
                    href="https://docs.google.com/forms/d/e/1FAIpQLScqO3QH7jjqdnazh3DG7WdWFYbjyxKY6O9cgkvip0MtCkSZ2Q/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group block bg-background rounded-2xl p-6 md:p-8 border border-border/30 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em]">{job.department}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={12} />{job.location}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">{job.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2 hidden md:block">{job.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-accent font-medium text-sm shrink-0">
                        Apply <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        </SceneReveal>

        {/* Certificate Verification */}
        <SceneReveal>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-secondary/30 rounded-3xl p-10 md:p-16 border border-border/30 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="flex items-start gap-6">
                  <div className="inline-flex p-4 rounded-2xl bg-accent/10 shrink-0">
                    <ShieldCheck size={28} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">Verify Your Certificate</h2>
                    <p className="text-muted-foreground">Completed an internship at SnapWeaz? Verify your certificate here.</p>
                  </div>
                </div>
                <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 rounded-full px-8 h-14 group shrink-0" asChild>
                  <a href="/verify">
                    Verify <ArrowUpRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>
        </SceneReveal>

        {/* CTA */}
        <SceneReveal>
          <section className="section-padding bg-accent/5">
            <div className="container-wide">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  Don't see your <span className="text-accent italic">role</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-10">We're always looking for talented people.</p>
                <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 rounded-full px-10 h-14 group" asChild>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScqO3QH7jjqdnazh3DG7WdWFYbjyxKY6O9cgkvip0MtCkSZ2Q/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                    Get in touch <ArrowUpRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>
        </SceneReveal>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
