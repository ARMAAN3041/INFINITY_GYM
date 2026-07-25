import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-card border-y border-border relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-purple/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1 gradient-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Forged By <span className="text-gradient-gold">Results</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the people who put in the work every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`group bg-background border p-8 relative hover:scale-[1.02] transition-all duration-300 rounded-sm ${
                t.accent === "gold"
                  ? "border-border hover:border-primary/50"
                  : "border-border hover:border-purple/50"
              }`}
            >
              {/* Top accent strip */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                t.accent === "gold" ? "bg-primary" : "bg-purple"
              }`} />

              {/* Quote icon */}
              <Quote className={`absolute top-6 right-6 w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity ${
                t.accent === "gold" ? "text-primary" : "text-purple"
              }`} />

              <p className="text-muted-foreground text-base leading-relaxed mb-8 relative z-10 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 border flex items-center justify-center font-display font-bold text-xl ${
                  t.accent === "gold"
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-purple/10 border-purple/40 text-purple"
                }`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-lg uppercase tracking-wide">{t.name}</h4>
                  <p className={`text-xs uppercase tracking-widest ${t.accent === "gold" ? "text-primary" : "text-purple"}`}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
