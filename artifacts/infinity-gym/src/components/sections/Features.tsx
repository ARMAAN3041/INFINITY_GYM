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
    description: "Open 5 AM to 11 PM. Train when it fits your relentless schedule.",
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
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/4 blur-[100px] rounded-full pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple/5 blur-[100px] rounded-full pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1 gradient-accent mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
          >
            Why We Are <span className="text-gradient-gold">Different</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-muted-foreground text-lg"
          >
            We didn't build just another gym. We built an arena for those who refuse to be average.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, i) => {
            const isGold = feature.accent === "gold";
            /* Alternate: even from left, odd from right */
            const xDir = i % 2 === 0 ? -40 : 40;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: xDir, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className={`group flex items-start gap-5 p-6 bg-background border border-border hover:border-primary/40 transition-colors duration-300 rounded-sm relative overflow-hidden cursor-pointer`}
                style={{ boxShadow: "none" }}
              >
                {/* Hover glow top border */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isGold ? "bg-primary" : "bg-purple"}`} />

                {/* Corner accent */}
                <div className={`absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isGold ? "bg-primary/5" : "bg-purple/5"} blur-xl rounded-full`} />

                {/* Icon box */}
                <motion.div
                  className={`shrink-0 w-14 h-14 border flex items-center justify-center rounded-sm transition-all duration-300 ${
                    isGold
                      ? "bg-background border-border group-hover:bg-primary/10 group-hover:border-primary text-primary"
                      : "bg-background border-border group-hover:bg-purple/10 group-hover:border-purple text-purple"
                  }`}
                  animate={{
                    boxShadow: isGold
                      ? ["0 0 0px rgba(250,204,21,0)", "0 0 18px rgba(250,204,21,0.25)", "0 0 0px rgba(250,204,21,0)"]
                      : ["0 0 0px rgba(167,139,250,0)", "0 0 18px rgba(167,139,250,0.25)", "0 0 0px rgba(167,139,250,0)"],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: "easeInOut", delay: i * 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + i * 0.4, ease: "easeInOut", delay: i * 0.3 }}
                  >
                    <feature.icon className="w-7 h-7" />
                  </motion.div>
                </motion.div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
