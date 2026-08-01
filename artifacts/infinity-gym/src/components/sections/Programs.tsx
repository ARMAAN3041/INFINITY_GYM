import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceModal from "./ServiceModal";
import { ALL_SERVICES } from "./services-data";
import type { ServiceData } from "./services-data";

// Alternating yellow / purple per row
const ROW_COLORS = [
  { num: "text-yellow-400", name: "text-yellow-400", bar: "bg-yellow-400", hover: "hover:border-yellow-400/50", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]" },
  { num: "text-purple-400", name: "text-purple-400", bar: "bg-purple-400", hover: "hover:border-purple-400/50", glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]" },
  { num: "text-yellow-400", name: "text-yellow-400", bar: "bg-yellow-400", hover: "hover:border-yellow-400/50", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]" },
  { num: "text-purple-400", name: "text-purple-400", bar: "bg-purple-400", hover: "hover:border-purple-400/50", glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]" },
  { num: "text-yellow-400", name: "text-yellow-400", bar: "bg-yellow-400", hover: "hover:border-yellow-400/50", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]" },
];

export default function Programs() {
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [activeAccent, setActiveAccent] = useState<"gold" | "purple">("gold");

  return (
    <>
      <section id="programs" className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }} className="w-16 h-1 gradient-accent mb-6" />
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold uppercase tracking-tight text-white mb-4" style={{ fontSize: "clamp(1.8rem,6vw,3.75rem)" }}>
                Dominate Your <span className="text-gradient-gold">Discipline</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg">
                Click any service to explore full details, benefits and programs.
              </motion.p>
            </div>
            <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              href="#pricing"
              className="group inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest hover:text-white transition-colors shrink-0">
              View Pricing <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </motion.a>
          </div>

          {/* Line-wise service list */}
          <div className="flex flex-col divide-y divide-border/60">
            {ALL_SERVICES.map((service, i) => {
              const c = ROW_COLORS[i % ROW_COLORS.length];
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                  onClick={() => { setActiveService(service); setActiveAccent(c.num.includes("yellow") ? "gold" : "purple"); }}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group w-full text-left py-4 sm:py-7 px-3 sm:px-6 flex items-center gap-3 sm:gap-6 border border-transparent transition-all duration-300 rounded-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${c.hover} ${c.glow}`}
                >
                  {/* Index number */}
                  <span className={`hidden xs:block font-display font-black leading-none w-10 sm:w-12 shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-300 ${c.num}`} style={{ fontSize: "clamp(1.5rem,4vw,3rem)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Color bar */}
                  <span className={`hidden sm:inline-block w-1 h-10 sm:h-14 rounded-full shrink-0 transition-all duration-300 group-hover:h-16 ${c.bar}`} />

                  {/* Icon */}
                  <span className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 opacity-60 group-hover:opacity-100
                    ${c.name === "text-yellow-400"
                      ? "border-yellow-400/20 bg-yellow-400/5 group-hover:bg-yellow-400/15 group-hover:border-yellow-400/50"
                      : "border-purple-400/20 bg-purple-400/5 group-hover:bg-purple-400/15 group-hover:border-purple-400/50"
                    }`}>
                    <Icon className={`w-5 h-5 ${c.name}`} />
                  </span>

                  {/* Name + tagline + mobile explore */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display font-black uppercase tracking-wide transition-colors duration-200 ${c.name}`} style={{ fontSize: "clamp(1rem,3.5vw,1.875rem)" }}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5 truncate">{service.tagline}</p>
                    {/* Always-visible explore hint on mobile */}
                    <span className={`md:hidden inline-flex items-center gap-1 mt-2 text-xs font-bold uppercase tracking-widest ${c.name}`}>
                      Tap to Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Arrow — desktop hover only */}
                  <span className={`hidden md:flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 ${c.name}`}>
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceModal service={activeService} accentOverride={activeAccent} onClose={() => setActiveService(null)} />
    </>
  );
}
