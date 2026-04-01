import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, ArrowUpRight, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import clientDesignFlu from "@/assets/client-designflu.png";
import clientLaxmiPrinters from "@/assets/client-laxmiprinters.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const urlEncoded = new URLSearchParams(formData as any).toString();
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncoded,
      });
      setIsSubmitted(true);
      toast.success("Thanks! We'll get back to you within 24 hours.");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[18vw] text-background/[0.03] whitespace-nowrap">Contact</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Contact Us</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6 max-w-4xl">
                Let's build something
                <br />
                <span className="text-accent italic">meaningful</span>
              </h1>
              <p className="text-xl text-background/60 max-w-xl">
                Have a project in mind? We'd love to hear about it. We respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                {isSubmitted ? (
                  <div className="bg-secondary/30 rounded-3xl p-12 text-center border border-border/30">
                    <div className="inline-flex p-4 rounded-full bg-accent/10 mb-6">
                      <CheckCircle size={48} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-4">Thank you!</h3>
                    <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-full">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Your name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="SnapWeaz"
                          className="h-13 rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Contact number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 82750 42440"
                          className="h-13 rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="info@snapweaz.com"
                        className="h-13 rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Estimated budget (optional)
                      </label>
                      <Input
                        id="budget"
                        name="budget"
                        placeholder="₹50,000 - ₹1,00,000"
                        className="h-13 rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Tell us about your project
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What's your vision? What challenges are you facing?"
                        className="rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent resize-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
                        Additional details (optional)
                      </label>
                      <Textarea
                        id="additionalDetails"
                        name="additionalDetails"
                        rows={3}
                        placeholder="Any other information..."
                        className="rounded-xl border-border/50 bg-secondary/30 focus:border-accent focus:ring-accent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-foreground text-background hover:bg-accent rounded-full text-base font-medium transition-all duration-300"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send message
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="text-accent hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="lg:col-span-4 lg:col-start-9 space-y-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-foreground mb-4">
                    Other ways to <span className="text-accent italic">reach us</span>
                  </h2>
                  <p className="text-muted-foreground">Prefer email or a quick call? We're always happy to chat.</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email us",
                      content: (
                        <a
                          href="mailto:info@snapweaz.com"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          info@snapweaz.com
                        </a>
                      ),
                    },
                    {
                      icon: MapPin,
                      title: "Location",
                      content: <span className="text-muted-foreground">India · Serving globally</span>,
                    },
                    {
                      icon: Clock,
                      title: "Response time",
                      content: <span className="text-muted-foreground">Usually within 24 hours</span>,
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                        <item.icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="pt-8 border-t border-border/30">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-5">
                    Follow us
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Instagram", href: "https://instagram.com/snapweaz.com" },
                      { name: "LinkedIn", href: "https://linkedin.com/company/snapweaz" },
                      { name: "Twitter", href: "https://twitter.com/snapweaz" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-secondary/50 border border-border/30 text-sm text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 inline-flex items-center gap-2"
                      >
                        {social.name}
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Trusted By */}
                <div className="pt-8 border-t border-border/30">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-5">
                    Trusted by
                  </h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <img
                      src={clientDesignFlu}
                      alt="Design Flu"
                      className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <img
                      src={clientLaxmiPrinters}
                      alt="Laxmi Printers"
                      className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
