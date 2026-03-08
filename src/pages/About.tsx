import { motion } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const values = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every project is an opportunity to create something meaningful. We pour our hearts into every pixel and line of code.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push boundaries, embrace new technologies, and constantly evolve our craft to deliver cutting-edge solutions.",
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description: "Details matter. We obsess over performance, accessibility, and scalability to ensure your product works flawlessly.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "We're not vendors — we're partners. Your success is our success, and we're invested in your journey.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "SnapWeaz was founded with a simple mission: to bridge the gap between exceptional design and robust engineering.",
  },
  {
    year: "2021",
    title: "Growing the Team",
    description: "We expanded our capabilities, bringing together designers, developers, and strategists who share our vision.",
  },
  {
    year: "2022",
    title: "Establishing Divisions",
    description: "Launched specialized divisions to provide deeper expertise in design, software, cloud, and growth.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description: "Extended our services to clients worldwide, working with startups and enterprises across industries.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched SnapWeaz Ventures to support and incubate promising startups with transformative ideas.",
  },
];

const About = () => {
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
                About Us
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                We believe in the power of
                <span className="text-gradient"> great design</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                SnapWeaz is a creative technology studio that helps ambitious
                companies build products, brands, and experiences that matter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  Our story began with a simple belief
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Design and engineering shouldn't exist in silos. The best digital
                    products emerge when creative thinking and technical excellence
                    work hand in hand from day one.
                  </p>
                  <p>
                    We founded SnapWeaz to prove this hypothesis. What started as a
                    small team passionate about beautiful, functional products has
                    grown into a full-service creative technology studio serving
                    clients around the world.
                  </p>
                  <p>
                    Today, our six specialized divisions work in harmony to deliver
                    end-to-end solutions — from brand strategy and design to
                    development, cloud infrastructure, and growth marketing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 to-secondary flex items-center justify-center">
                  <div className="text-center">
                    <img src={logo} alt="SnapWeaz" className="w-40 h-40 mx-auto object-contain" />
                    <p className="text-muted-foreground mt-4">Design · Engineering · Innovation</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our Values
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Principles that guide everything we do
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-border/50"
                >
                  <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-6">
                    <value.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
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
                Our Journey
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Building the future, one milestone at a time
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                      <span className="text-3xl font-serif text-accent">{item.year}</span>
                      <h3 className="font-serif text-2xl text-foreground mt-2 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 rounded-full bg-accent border-4 border-background transform md:-translate-x-1/2" />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
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
              className="max-w-3xl"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Ready to work together?
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8">
                Let's discuss how we can help bring your vision to life.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-14 group"
                asChild
              >
                <Link to="/contact">
                  Get in touch
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

export default About;
