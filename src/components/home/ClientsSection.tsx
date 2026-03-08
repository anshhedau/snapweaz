import { motion } from "framer-motion";
import clientDesignFlu from "@/assets/client-designflu.png";
import clientLaxmiPrinters from "@/assets/client-laxmiprinters.png";

const clients = [
  { name: "Design Flu", logo: clientDesignFlu },
  { name: "Laxmi Printers", logo: clientLaxmiPrinters },
];

export const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] shrink-0">
            Trusted by
          </p>
          <div className="w-full h-px bg-border/30 hidden md:block" />
          <div className="flex items-center gap-12 md:gap-16 shrink-0">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-4"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
