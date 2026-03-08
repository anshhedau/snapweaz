import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import stamp from "@/assets/stamp.png";

const Terms = () => {
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
                Terms & Conditions
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Last Updated: January 2026
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Acceptance
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    By accessing or using SnapWeaz's website or services, you agree to be bound by these Terms & Conditions.
                    If you do not agree, you must discontinue use immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Services
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    SnapWeaz provides design, software development, and technical services based strictly on
                    mutually agreed proposals, quotations, or contracts.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Scope & Payments
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Project scope is limited to what is defined in writing. Any additional requests may incur
                    extra charges. Advance payment is mandatory, and delayed payments may result in suspension
                    of services or withholding of deliverables.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Intellectual Property
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    All work remains the property of SnapWeaz until full payment is received.
                    Ownership of final deliverables is transferred only after complete payment.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Third-Party Services
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    SnapWeaz is not responsible for outages, limitations, pricing, or policies of third-party
                    tools or services used during project execution.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Limitation of Liability
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    SnapWeaz shall not be liable for indirect or consequential damages.
                    Any liability is limited strictly to the amount paid for the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Confidentiality
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    All project-related information shared by the client shall be treated as confidential
                    and will not be disclosed to third parties without prior consent, except as required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Project Modifications
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Any changes to the project scope, timeline, or deliverables must be agreed upon in writing.
                    SnapWeaz reserves the right to adjust pricing and deadlines accordingly.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Termination
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    Either party may terminate the agreement with written notice. Upon termination,
                    the client is responsible for payment for all work completed up to the termination date.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Governing Law
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    These terms are governed by the laws of India, and any disputes shall fall under Indian jurisdiction.
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

export default Terms;
