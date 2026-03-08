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
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-accent" />
            <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
              Testimonials
            </p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] max-w-2xl">
            Trusted by founders
            <br />
            <span className="text-accent italic">& teams</span> worldwide
          </h2>
        </motion.div>

        {/* Large featured testimonial + smaller ones */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-background rounded-3xl p-10 md:p-14 border border-border/30 relative overflow-hidden"
          >
            <Quote size={60} className="text-accent/10 absolute top-8 right-8" />
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug mb-10">
              "{testimonials[0].quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                {testimonials[0].avatar}
              </div>
              <div>
                <p className="font-medium text-foreground text-lg">{testimonials[0].author}</p>
                <p className="text-muted-foreground">{testimonials[0].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Smaller */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {testimonials.slice(1).map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-background rounded-3xl p-8 border border-border/30 flex-1 flex flex-col justify-between"
              >
                <p className="text-foreground leading-relaxed mb-6 text-[15px]">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-medium">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
