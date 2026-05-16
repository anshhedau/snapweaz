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
          <div className="flex items-center gap-8 md:gap-10 shrink-0">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-3xl p-3 transition-all duration-500"
              >
                <div
                  className="rounded-2xl p-4 flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, hsl(var(--accent) / 0.18) 0%, hsl(350 30% 10%) 60%, hsl(350 35% 6%) 100%)",
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-14 md:h-16 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
