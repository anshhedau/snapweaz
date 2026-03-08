import { motion } from "framer-motion";
import clientDesignFlu from "@/assets/client-designflu.png";
import clientLaxmiPrinters from "@/assets/client-laxmiprinters.png";

const clients = [
  { name: "Design Flu", logo: clientDesignFlu },
  { name: "Laxmi Printers", logo: clientLaxmiPrinters },
];

export const ClientsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-background border-y border-border/30">
      <div className="container-wide">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-muted-foreground uppercase tracking-[0.2em] mb-12"
        >
          Trusted by global brands
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-24">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
