import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amit K.",
    role: "Member for 2 years",
    text: "Infinity Gym changed my life. The equipment is top-notch, but it's the environment that keeps you coming back. The trainers actually care about your form and progress.",
  },
  {
    name: "Neha S.",
    role: "CrossFit Enthusiast",
    text: "I've been to every gym in Kaithal, and nothing compares to this. The energy hits you as soon as you walk in. It's raw, authentic, and exactly what I needed.",
  },
  {
    name: "Deepak B.",
    role: "Powerlifter",
    text: "Finally, a gym in Haryana that understands serious lifting. Heavy dumbbells, solid squat racks, and no judgment when you drop the weight. Best decision I've made.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Forged By <span className="text-primary">Results</span>
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
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background border border-border p-8 relative group hover:border-primary/50 transition-colors"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-border group-hover:text-primary/20 transition-colors" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center font-display font-bold text-xl text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-lg uppercase tracking-wide">{t.name}</h4>
                  <p className="text-primary text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
