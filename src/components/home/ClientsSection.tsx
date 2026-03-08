import { motion } from "framer-motion";
import clientDesignFlu from "@/assets/client-designflu.png";
import clientLaxmiPrinters from "@/assets/client-laxmiprinters.png";

const clients = [
  { name: "Design Flu", logo: clientDesignFlu },
  { name: "Laxmi Printers", logo: clientLaxmiPrinters },
  { name: "Design Flu", logo: clientDesignFlu },
  { name: "Laxmi Printers", logo: clientLaxmiPrinters },
  { name: "Design Flu", logo: clientDesignFlu },
  { name: "Laxmi Printers", logo: clientLaxmiPrinters },
];

export const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/50 overflow-hidden">
      <div className="container-wide mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium"
        >
          Trusted by leading brands
        </motion.p>
      </div>

      <div className="marquee-track">
        {[...clients, ...clients].map((client, index) => (
          <div
            key={index}
            className="marquee-item flex items-center gap-4 px-8 md:px-12 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
