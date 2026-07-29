import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CheckCircle2, Clock, Users, Star } from "lucide-react";
import type { ServiceData } from "./services-data";

interface Props {
  service: ServiceData | null;
  onClose: () => void;
}

const ACCENT = {
  gold:   { text: "text-yellow-400", bgLight: "bg-yellow-400/10", hex: "#facc15", glow: "0 0 30px rgba(250,204,21,0.35)" },
  purple: { text: "text-purple-400", bgLight: "bg-purple-400/10", hex: "#a78bfa", glow: "0 0 30px rgba(167,139,250,0.35)" },
  lime:   { text: "text-lime-400",   bgLight: "bg-lime-400/10",   hex: "#a3e635", glow: "0 0 30px rgba(163,230,53,0.35)"  },
};

export default function ServiceModal({ service, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[3%] md:top-[4%] z-[101] overflow-y-auto rounded-t-2xl md:rounded-2xl md:inset-x-4 lg:inset-x-16 xl:inset-x-32"
            style={{ background: "#0a0a0a" }}
          >
            <ModalContent service={service} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalContent({ service, onClose }: { service: ServiceData; onClose: () => void }) {
  const ac = ACCENT[service.accent];
  const Icon = service.icon;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }, 350);
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-t-2xl">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a]" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[80px] opacity-40"
          style={{ background: ac.hex }} />

        <button onClick={onClose}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-all"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-white hover:bg-white/10 transition-all"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
          <X className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ac.bgLight}`}
              style={{ border: `1px solid ${ac.hex}40` }}>
              <Icon className={`h-5 w-5 ${ac.text}`} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${ac.text}`}>Infinity Fitness</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            {service.title}
          </h2>
          <p className={`mt-1 text-sm md:text-base font-medium ${ac.text}`}>{service.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 md:px-10 lg:px-16 pb-20 pt-8 space-y-12">

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Clock, label: "Duration", value: service.duration },
            { icon: Users, label: "Level",    value: service.suitableFor[0] },
            { icon: Star,  label: "Sessions", value: "Daily"              },
          ].map(({ icon: Ic, label, value }) => (
            <div key={label} className={`rounded-xl p-4 text-center ${ac.bgLight}`}
              style={{ border: `1px solid ${ac.hex}20` }}>
              <Ic className={`h-5 w-5 mx-auto mb-2 ${ac.text}`} />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</p>
              <p className="text-sm font-bold text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div>
          <SectionDivider hex={ac.hex} label="Overview" />
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4">{service.description}</p>
        </div>

        {/* Benefits */}
        <div>
          <SectionDivider hex={ac.hex} label="Key Benefits" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {service.benefits.map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${ac.text}`} />
                <div>
                  <p className="font-semibold text-white text-sm">{b.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <SectionDivider hex={ac.hex} label="What's Included" />
          <div className="flex flex-wrap gap-2 mt-4">
            {service.features.map((f, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${ac.bgLight} ${ac.text}`}
                style={{ border: `1px solid ${ac.hex}30` }}>
                {f}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Program levels */}
        {service.programs && (
          <div>
            <SectionDivider hex={ac.hex} label="Program Levels" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {service.programs.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${ac.hex}25` }}>
                  <p className={`text-xs font-black uppercase tracking-[0.15em] ${ac.text} mb-2`}>{p.level}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Suitable for */}
        <div>
          <SectionDivider hex={ac.hex} label="Suitable For" />
          <div className="flex flex-wrap gap-2 mt-4">
            {service.suitableFor.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm text-gray-300 bg-white/5 border border-white/10">{s}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="w-full sm:w-auto px-10 py-4 rounded-xl font-display font-black uppercase tracking-widest text-black text-base"
            style={{ background: `linear-gradient(135deg, ${ac.hex}, ${ac.hex}bb)`, boxShadow: ac.glow }}>
            Book a Free Trial
          </motion.button>
          <button onClick={onClose}
            className="w-full sm:w-auto px-10 py-4 rounded-xl font-display font-bold uppercase tracking-widest text-gray-400 text-base border border-white/10 hover:border-white/30 hover:text-white transition-all">
            Back to Services
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${hex}60, transparent)` }} />
      <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: hex }}>{label}</span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${hex}60)` }} />
    </div>
  );
}
