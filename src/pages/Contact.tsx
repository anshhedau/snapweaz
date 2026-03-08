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
    await fetch("/", {
      method: "POST",
      body: formData,
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
        <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-5">
                Contact Us
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-7">
                Let's build something
                <span className="text-accent"> meaningful</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Have a project in mind? We'd love to hear about it. Fill out the
                form below or drop us an email — we'll get back to you within
                24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {isSubmitted ? (
                  <div className="bg-background rounded-3xl p-12 text-center border border-border/30">
                    <div className="inline-flex p-4 rounded-full bg-accent/10 mb-6">
                      <CheckCircle size={48} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-4">
                      Thank you for reaching out!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We've received your message and will get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-full"
                    >
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
                    {/* Netlify required hidden fields */}
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
                          placeholder="John Doe"
                          className="h-13 rounded-xl border-border bg-background focus:border-accent focus:ring-accent"
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
                          placeholder="+xx xxxxxxxxxx"
                          className="h-13 rounded-xl border-border bg-background focus:border-accent focus:ring-accent"
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
                        placeholder="john@example.com"
                        className="h-13 rounded-xl border-border bg-background focus:border-accent focus:ring-accent"
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
                        className="h-13 rounded-xl border-border bg-background focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Tell us about your project in detail
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="What's your vision? What challenges are you facing? What timeline do you have in mind?"
                        className="rounded-xl border-border bg-background focus:border-accent focus:ring-accent resize-none"
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
                        placeholder="Any other information you'd like to share..."
                        className="rounded-xl border-border bg-background focus:border-accent focus:ring-accent resize-none"
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
                      By submitting this form, you agree to our{" "}
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="font-serif text-3xl text-foreground mb-4">
                    Other ways to reach us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Prefer email or a quick call? We're always happy to chat.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email us</h3>
                      <a
                        href="mailto:info@snapweaz.in"
                        className="text-muted-foreground hover:text-accent transition-colors duration-300"
                      >
                        info@snapweaz.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        India · Serving clients globally
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Response time</h3>
                      <p className="text-muted-foreground">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.15em] mb-5">
                    Follow us
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://instagram.com/snapweaz.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Instagram
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="https://linkedin.com/company/snapweaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      LinkedIn
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="https://twitter.com/snapweaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Twitter
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Trusted By */}
                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.15em] mb-5">
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

                {/* FAQ Note */}
                <div className="bg-background rounded-2xl p-7 border border-border/30">
                  <h3 className="font-medium text-foreground mb-2">
                    Have questions first?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Check out our services page for detailed information about
                    what we offer and how we work.
                  </p>
                  <a
                    href="/services"
                    className="text-sm text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                  >
                    View our services
                    <ArrowUpRight size={14} />
                  </a>
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
