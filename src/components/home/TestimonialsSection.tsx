import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SnapWeaz transformed our vision into a stunning reality. Their attention to detail and strategic thinking elevated our brand beyond expectations.",
    author: "Sarah Chen",
    role: "Founder, TechStart",
    avatar: "SC",
  },
  {
    quote: "Working with SnapWeaz felt like having an extended team. They understood our product deeply and delivered solutions that truly resonated with our users.",
    author: "Michael Rodriguez",
    role: "CEO, DesignFlu",
    avatar: "MR",
  },
  {
    quote: "The team's ability to blend creative design with robust engineering is rare. They don't just build products — they craft experiences.",
    author: "Priya Sharma",
    role: "Product Lead, InnovateCo",
    avatar: "PS",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-5">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1]">
            Trusted by founders
            <br />
            and teams worldwide
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-secondary/50 rounded-2xl p-8 md:p-10 border border-border/30 hover:border-accent/20 transition-colors duration-300"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-accent/30 mb-6" />

              {/* Quote text */}
              <p className="text-foreground leading-relaxed mb-8 text-[15px]">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
