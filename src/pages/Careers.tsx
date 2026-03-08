import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Heart, Zap, Users, Coffee, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const openings = [
  {
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Remote / India",
    description: "Lead design projects from concept to completion, creating intuitive and beautiful user experiences.",
  },
  {
    title: "Full Stack Developer",
    department: "Software",
    location: "Remote / India",
    description: "Build scalable web applications using modern technologies like React, Node.js, and cloud services.",
  },
  {
    title: "Brand Strategist",
    department: "Design",
    location: "Remote / India",
    description: "Develop comprehensive brand strategies that help clients stand out in competitive markets.",
  },
  {
    title: "DevOps Engineer",
    department: "Cloud",
    location: "Remote / India",
    description: "Manage cloud infrastructure, CI/CD pipelines, and ensure high availability of our client solutions.",
  },
  {
    title: "Digital Marketing Specialist",
    department: "Growth",
    location: "Remote / India",
    description: "Plan and execute digital marketing campaigns that drive measurable results for our clients.",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs for you and your family.",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Work from anywhere. We trust you to deliver great work on your own terms.",
  },
  {
    icon: Users,
    title: "Learning Budget",
    description: "Annual learning stipend for courses, conferences, and professional development.",
  },
  {
    icon: Coffee,
    title: "Team Events",
    description: "Regular team retreats, virtual hangouts, and celebrations of our wins together.",
  },
];

const Careers = () => {
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
                Careers
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                Build the future
                <span className="text-accent"> with us</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Join a team of passionate designers, developers, and strategists
                who are shaping the digital landscape for ambitious companies worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Why Join SnapWeaz
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Work that matters, culture that cares
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 border border-border/50"
                >
                  <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-6">
                    <benefit.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
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
                Open Positions
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Find your next role
              </h2>
            </motion.div>

            <div className="space-y-4">
              {openings.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-secondary/30 hover:bg-secondary/50 rounded-2xl p-6 md:p-8 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-accent uppercase tracking-wider">
                          {job.department}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScqO3QH7jjqdnazh3DG7WdWFYbjyxKY6O9cgkvip0MtCkSZ2Q/viewform?usp=dialog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                      >
                        Apply now
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Verification */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex p-4 rounded-2xl bg-accent/10 mb-6">
                <ShieldCheck size={32} className="text-accent" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
                Verify Your Certificate
              </h2>
              <p className="text-muted-foreground mb-8">
                Completed an internship at SnapWeaz? Verify your certificate authenticity here.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-accent hover:text-background rounded-full px-8 h-14 group"
                asChild
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe6RU_WrIqzlyjOJ3rnPYvxVd-VMMlEZ7wGz816cnjRVC8Nqg/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verify Certificate
                  <ArrowUpRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
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
                Don't see your role?
              </h2>
              <p className="text-lg text-background/70 mb-8">
                We're always looking for talented people. Send us your resume
                and tell us how you'd like to contribute.
              </p>
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-accent hover:text-background rounded-full px-8 h-14 group"
                asChild
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScqO3QH7jjqdnazh3DG7WdWFYbjyxKY6O9cgkvip0MtCkSZ2Q/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get in touch
                  <ArrowUpRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
