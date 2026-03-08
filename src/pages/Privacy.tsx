import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import stamp from "@/assets/stamp.png";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-[780px] mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-[32px] md:text-[42px] font-semibold text-foreground mb-2 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Last Updated: January 2026
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Information We Collect
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    We may collect personal and business information such as name, email address,
                    phone number, company details, and project-related data.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Use of Information
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Collected information is used solely to provide services, communicate updates,
                    manage projects, and improve user experience. We do not sell or trade personal data.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    International Users
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    By using our services, you consent to the transfer and processing of your data
                    across international borders in compliance with applicable data protection laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Cookies & Analytics
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    We may use cookies and analytics tools to analyze website performance and usage.
                    You may disable cookies via your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Data Security
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    We implement reasonable technical and organizational safeguards to protect your data.
                    However, no online transmission or storage method is completely secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Your Rights
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    You may request access, correction, or deletion of your personal data by contacting us
                    at info@snapweaz.in. We will respond to valid requests within a reasonable timeframe.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Third-Party Links
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Our website may contain links to third-party websites. We are not responsible for
                    the privacy practices or content of those external sites.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Children's Privacy
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Our services are not directed to individuals under the age of 16. We do not knowingly
                    collect personal information from children.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Policy Updates
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    This Privacy Policy may be updated periodically. Continued use of the website
                    constitutes acceptance of the revised policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Contact Us
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    For any questions about this Privacy Policy or our data practices, please contact us at{" "}
                    <a href="mailto:info@snapweaz.in" className="text-accent hover:underline">
                      info@snapweaz.in
                    </a>
                  </p>
                </section>

                {/* Signature */}
                <div className="mt-16 text-right">
                  <p className="text-sm text-muted-foreground mb-1">For SnapWeaz</p>
                  <img src={stamp} alt="SnapWeaz Stamp" className="w-28 h-auto ml-auto my-2" />
                  <p className="text-sm text-muted-foreground">Authorized Signatory</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
