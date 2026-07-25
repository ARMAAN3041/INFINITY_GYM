import { motion } from "framer-motion";
import { Shield, Target, Trophy, Clock, Zap, MapPin } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Kaithal's #1",
    description: "Voted the best fitness center in the region by real members.",
    accent: "gold",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "We don't just sell memberships. We forge transformations.",
    accent: "purple",
  },
  {
    icon: Shield,
    title: "Premium Gear",
    description: "Imported, biomechanically superior equipment for maximum gains.",
    accent: "gold",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Located in the heart of Kaithal with ample parking space.",
    accent: "purple",
  },
  {
    icon: Clock,
    title: "Extended Hours",
    description: "Open 5 AM to 10 PM. Train when it fits your relentless schedule.",
    accent: "gold",
  },
  {
    icon: Zap,
    title: "High Energy Vibe",
    description: "A community and atmosphere that forces you to push harder.",
    accent: "purple",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/4 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 gradient-accent mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
          >
            Why We Are <span className="text-gradient-gold">Different</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            We didn't build just another gym. We built an arena for those who refuse to be average.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex items-start gap-5 p-6 bg-background border border-border hover:border-primary/40 transition-all duration-300 rounded-sm relative overflow-hidden"
            >
              {/* Hover glow top border */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${feature.accent === "gold" ? "bg-primary" : "bg-purple"}`} />

              <div className={`shrink-0 w-14 h-14 border flex items-center justify-center rounded-sm transition-all duration-300 ${
                feature.accent === "gold"
                  ? "bg-background border-border group-hover:bg-primary/10 group-hover:border-primary text-primary"
                  : "bg-background border-border group-hover:bg-purple/10 group-hover:border-purple text-purple"
              }`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
