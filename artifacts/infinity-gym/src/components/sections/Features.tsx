import { motion } from "framer-motion";
import { Shield, Target, Trophy, Clock, Zap, MapPin } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Kaithal's #1",
    description: "Voted the best fitness center in the region by real members.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "We don't just sell memberships. We forge transformations.",
  },
  {
    icon: Shield,
    title: "Premium Gear",
    description: "Imported, biomechanically superior equipment for maximum gains.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Located in the heart of Kaithal with ample parking space.",
  },
  {
    icon: Clock,
    title: "Extended Hours",
    description: "Open 5 AM to 10 PM. Train when it fits your relentless schedule.",
  },
  {
    icon: Zap,
    title: "High Energy Vibe",
    description: "A community and atmosphere that forces you to push harder.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
          >
            Why We Are <span className="text-primary">Different</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="shrink-0 w-14 h-14 bg-background border border-border flex items-center justify-center rounded-lg text-primary">
                <feature.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
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
