import { useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit K.",
    role: "Member for 2 years",
    text: "Infinity Gym changed my life. The equipment is top-notch, but it's the environment that keeps you coming back. The trainers actually care about your form and progress.",
    accent: "gold",
  },
  {
    name: "Neha S.",
    role: "CrossFit Enthusiast",
    text: "I've been to every gym in Kaithal, and nothing compares to this. The energy hits you as soon as you walk in. It's raw, authentic, and exactly what I needed.",
    accent: "purple",
  },
  {
    name: "Deepak B.",
    role: "Powerlifter",
    text: "Finally, a gym in Haryana that understands serious lifting. Heavy dumbbells, solid squat racks, and no judgment when you drop the weight. Best decision I've made.",
    accent: "gold",
  },
  {
    name: "Riya M.",
    role: "Yoga & Zumba Member",
    text: "The yoga studio is a sanctuary. I come here three times a week and each session leaves me refreshed and stronger. The instructors know their craft inside out.",
    accent: "purple",
  },
  {
    name: "Sandeep R.",
    role: "Personal Training Client",
    text: "My PT at Infinity Gym got me competition-ready in 3 months. The programming is scientific, the coaching is relentless, and the results speak for themselves.",
    accent: "gold",
  },
  {
    name: "Pooja V.",
    role: "Member for 1 year",
    text: "As a beginner I was nervous, but the team made me feel like a champion from day one. Down 18 kg and counting — this gym is genuinely life-changing.",
    accent: "purple",
  },
];

/* Duplicate for seamless loop */
const doubled = [...testimonials, ...testimonials];

function TestimonialCard({ t, idx }: { t: typeof testimonials[0]; idx: number }) {
  const isGold = t.accent === "gold";
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative flex-shrink-0 w-[calc(100vw-3rem)] max-w-[320px] sm:max-w-[360px] bg-background border p-5 sm:p-7 rounded-sm group ${
        isGold ? "border-border hover:border-primary/50" : "border-border hover:border-purple/50"
      }`}
      style={{ transition: "border-color 0.3s" }}
    >
      {/* Top accent strip */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isGold ? "bg-primary" : "bg-purple"}`} />

      {/* Animated quote icon */}
      <motion.div
        className={`absolute top-5 right-5 ${isGold ? "text-primary" : "text-purple"}`}
        animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3 + idx * 0.3, ease: "easeInOut" }}
      >
        <Quote className="w-9 h-9" />
      </motion.div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * si + idx * 0.04, type: "spring", stiffness: 300 }}
          >
            <Star className={`w-3.5 h-3.5 fill-current ${isGold ? "text-primary" : "text-purple"}`} />
          </motion.div>
        ))}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-7 italic">
        "{t.text}"
      </p>

      <div className="flex items-center gap-4">
        <motion.div
          className={`w-11 h-11 border flex items-center justify-center font-display font-bold text-xl ${
            isGold ? "bg-primary/10 border-primary/40 text-primary" : "bg-purple/10 border-purple/40 text-purple"
          }`}
          whileHover={{ rotate: 5 }}
        >
          {t.name.charAt(0)}
        </motion.div>
        <div>
          <h4 className="font-display font-bold text-white text-base uppercase tracking-wide">{t.name}</h4>
          <p className={`text-xs uppercase tracking-widest ${isGold ? "text-primary" : "text-purple"}`}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card border-y border-border relative overflow-hidden">
      {/* Ambient glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-64 bg-purple/5 blur-[100px] rounded-full pointer-events-none"
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1 gradient-accent mx-auto mb-6"
          />
          <h2 className="font-display font-bold uppercase tracking-tight text-white mb-4" style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}>
            Forged By <span className="text-gradient-gold">Results</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the people who put in the work every single day.
          </p>
        </motion.div>
      </div>

      {/* ── Infinite marquee (full-bleed) ── */}
      <div className="relative overflow-hidden">
        {/* Left/right fade masks */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex gap-6 py-4 px-6"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} idx={i % testimonials.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
