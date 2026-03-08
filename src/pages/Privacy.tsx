import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import stamp from "@/assets/stamp.png";

const sections = [
  { title: "Information We Collect", text: "We may collect personal and business information such as name, email address, phone number, company details, and project-related data." },
  { title: "Use of Information", text: "Collected information is used solely to provide services, communicate updates, manage projects, and improve user experience. We do not sell or trade personal data." },
  { title: "International Users", text: "By using our services, you consent to the transfer and processing of your data across international borders in compliance with applicable data protection laws." },
  { title: "Cookies & Analytics", text: "We may use cookies and analytics tools to analyze website performance and usage. You may disable cookies via your browser settings." },
  { title: "Data Security", text: "We implement reasonable technical and organizational safeguards to protect your data. However, no online transmission or storage method is completely secure." },
  { title: "Your Rights", text: "You may request access, correction, or deletion of your personal data by contacting us at info@snapweaz.in. We will respond within a reasonable timeframe." },
  { title: "Third-Party Links", text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites." },
  { title: "Children's Privacy", text: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children." },
  { title: "Policy Updates", text: "This Privacy Policy may be updated periodically. Continued use of the website constitutes acceptance of the revised policy." },
  { title: "Contact Us", text: "For any questions about this Privacy Policy or our data practices, please contact us at info@snapweaz.in." },
];

const Privacy = () => {
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
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95]">Privacy Policy</h1>
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
                <p className="text-sm text-muted-foreground mb-2">For SnapWeaz</p>
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

export default Privacy;
