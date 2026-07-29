import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceModal from "./ServiceModal";
import { ALL_SERVICES } from "./services-data";
import type { ServiceData } from "./services-data";

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ACCENT = {
  gold:   { border: "hover:border-yellow-400/50", strip: "bg-yellow-400", icon: "bg-yellow-400/10 text-yellow-400", title: "text-yellow-400", cta: "text-yellow-400", hex: "#facc15" },
  purple: { border: "hover:border-purple-400/50", strip: "bg-purple-400", icon: "bg-purple-400/10 text-purple-400", title: "text-purple-400", cta: "text-purple-400", hex: "#a78bfa" },
  lime:   { border: "hover:border-lime-400/50",   strip: "bg-lime-400",   icon: "bg-lime-400/10 text-lime-400",     title: "text-lime-400",   cta: "text-lime-400",   hex: "#a3e635" },
};

export default function Programs() {
  const [activeService, setActiveService] = useState<ServiceData | null>(null);

  return (
    <>
      <section id="programs" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }} className="w-16 h-1 gradient-accent mb-6" />
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
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
              className="group inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest hover:text-white transition-colors">
              View Pricing <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </motion.a>
          </div>

          {/* Grid */}
          <motion.div variants={container} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ALL_SERVICES.map((service) => {
              const ac = ACCENT[service.accent];
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  variants={item}
                  onClick={() => setActiveService(service)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden bg-card border border-border rounded-sm transition-all duration-300 text-left cursor-pointer w-full ${ac.border} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30`}
                >
                  {/* Hover top strip */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] z-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${ac.strip}`} />

                  {/* Image */}
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent z-10" />
                    <img src={service.image} alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                    {/* Icon bubble */}
                    <div className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ${ac.icon}`}
                      style={{ border: `1px solid ${ac.hex}40` }}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Explore badge */}
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black"
                        style={{ background: ac.hex }}>
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6 relative z-20 -mt-10">
                    <h3 className={`font-display text-2xl font-bold uppercase tracking-wide mb-2 ${ac.title}`}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                      {service.description}
                    </p>
                    <div className={`flex items-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-widest ${ac.cta}`}>
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
