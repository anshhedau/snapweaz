import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import stamp from "@/assets/stamp.png";

const sections = [
  {
    title: "Acceptance",
    text: "By accessing or using SnapWeaz's website or services, you agree to be bound by these Terms & Conditions. If you do not agree, you must discontinue use immediately.",
  },
  {
    title: "Services",
    text: "SnapWeaz provides design, software development, and technical services based strictly on mutually agreed proposals, quotations, or contracts.",
  },
  {
    title: "Scope & Payments",
    text: "Project scope is limited to what is defined in writing. Any additional requests may incur extra charges. Advance payment is mandatory, and delayed payments may result in suspension of services.",
  },
  {
    title: "Intellectual Property",
    text: "All work remains the property of SnapWeaz until full payment is received. Ownership of final deliverables is transferred only after complete payment.",
  },
  {
    title: "Third-Party Services",
    text: "SnapWeaz is not responsible for outages, limitations, pricing, or policies of third-party tools or services used during project execution.",
  },
  {
    title: "Limitation of Liability",
    text: "SnapWeaz shall not be liable for indirect or consequential damages. Any liability is limited strictly to the amount paid for the service.",
  },
  {
    title: "Confidentiality",
    text: "All project-related information shared by the client shall be treated as confidential and will not be disclosed to third parties without prior consent.",
  },
  {
    title: "Project Modifications",
    text: "Any changes to the project scope, timeline, or deliverables must be agreed upon in writing. SnapWeaz reserves the right to adjust pricing and deadlines accordingly.",
  },
  {
    title: "Termination",
    text: "Either party may terminate the agreement with written notice. Upon termination, the client is responsible for payment for all work completed.",
  },
  {
    title: "Governing Law",
    text: "These terms are governed by the laws of India, and any disputes shall fall under Indian jurisdiction.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative flex items-end overflow-hidden bg-foreground text-background">
          <div className="container-wide relative z-10 pb-12 md:pb-16 pt-36 md:pt-40">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Legal</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95]">Terms & Conditions</h1>
              <p className="text-background/50 mt-4 text-sm">Last Updated: January 2026</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="max-w-3xl mx-auto px-5">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border/30 pt-8"
                >
                  <h2 className="font-serif text-xl text-foreground mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </motion.div>
              ))}

              <div className="pt-12 text-right">
                <img src={stamp} alt="SnapWeaz Stamp" className="w-28 h-auto ml-auto my-2" />
                <p className="text-sm text-muted-foreground">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
