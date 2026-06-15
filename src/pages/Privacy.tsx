import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import stamp from "@/assets/stamp.png";
import { SEO } from "@/components/seo/SEO";

const sections = [
  {
    title: "Information We Collect",
    text: "We may collect personal and business information such as name, email address, phone number, company details, and project-related information you share when contacting us, requesting a proposal, applying for a role, or subscribing to updates. We also collect technical information automatically, including IP address, browser type, device identifiers, referring URLs, and pages visited.",
  },
  {
    title: "Use of Information",
    text: "Collected information is used to provide and improve our services, respond to inquiries, deliver projects, send relevant updates, run analytics, maintain security, and comply with legal obligations. We do not sell your personal data to third parties.",
  },
  {
    title: "Cookies and Similar Technologies",
    text: "We use cookies, local storage, pixels, and similar technologies to remember preferences, understand how the site is used, measure performance, and support advertising. Cookies fall into a few categories: strictly necessary cookies that make the site work, analytics cookies that help us understand usage, and advertising cookies that may be set by us or our partners to show more relevant ads. You can control or disable cookies through your browser settings, though some parts of the site may not function as intended without them.",
  },
  {
    title: "Analytics",
    text: "We may use analytics providers such as Google Analytics to understand how visitors interact with our website. These providers may set cookies and collect information including pages viewed, time on site, device type, and approximate location derived from IP. The data is processed in aggregate to help us improve content and performance.",
  },
  {
    title: "Advertising and Google AdSense",
    text: "We may use third-party advertising services, including Google AdSense, to serve ads on this website. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to our sites and other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings at https://www.google.com/settings/ads, or opt out of a third-party vendor's use of cookies for personalized advertising by visiting https://www.aboutads.info. Where required, we will request your consent before setting non-essential advertising cookies.",
  },
  {
    title: "Legal Basis and Your Choices",
    text: "Depending on your location, we rely on consent, legitimate interest, or contractual necessity to process your personal data. You can withdraw consent, object to processing, request access, correction, deletion, or portability of your data, and lodge a complaint with your local data protection authority.",
  },
  {
    title: "International Users",
    text: "By using our services, you consent to the transfer and processing of your data across international borders in compliance with applicable data protection laws, including the GDPR for users in the European Economic Area and the UK.",
  },
  {
    title: "Data Security",
    text: "We implement reasonable technical and organizational safeguards to protect your data, including encryption in transit, access controls, and regular reviews. However, no online transmission or storage method is completely secure.",
  },
  {
    title: "Data Retention",
    text: "We retain personal information only for as long as needed to fulfil the purposes described in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "Third-Party Links",
    text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites. We recommend reviewing the privacy policies of any third-party services you visit.",
  },
  {
    title: "Children's Privacy",
    text: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.",
  },
  {
    title: "Policy Updates",
    text: "This Privacy Policy may be updated periodically. Material changes will be reflected by an updated date at the top of this page. Continued use of the website constitutes acceptance of the revised policy.",
  },
  {
    title: "Contact Us",
    text: "For any questions about this Privacy Policy, our data practices, or to exercise your rights, please contact us at info@snapweaz.com.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
            <SEO
        title="Privacy Policy"
        description="How SnapWeaz collects, uses, and protects your information."
        path="/privacy"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative flex items-end overflow-hidden section-dark">
          <div className="container-wide relative z-10 pb-12 md:pb-16 pt-36 md:pt-40">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Legal</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95]">Privacy Policy</h1>
              <p className="text-foreground/50 mt-4 text-sm">Last Updated: June 2026</p>
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

export default Privacy;
