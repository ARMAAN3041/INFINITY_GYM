import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Iron Basic",
    price: "1,500",
    period: "month",
    description: "For the self-guided lifter.",
    features: [
      "Access to cardio & weights",
      "Standard locker room access",
      "Open hours access (5 AM - 10 PM)",
      "Free initial fitness assessment",
    ],
    isPopular: false,
    accent: "gold",
  },
  {
    name: "Infinity Premium",
    price: "2,500",
    period: "month",
    description: "The complete gym experience.",
    features: [
      "All Iron Basic features",
      "Unlimited group classes (Yoga, Zumba)",
      "CrossFit zone access",
      "Premium locker with towel service",
      "1 PT session per month",
    ],
    isPopular: true,
    accent: "dual",
  },
  {
    name: "Titan Elite",
    price: "5,000",
    period: "month",
    description: "For serious transformations.",
    features: [
      "All Premium features",
      "Unlimited Personal Training",
      "Customized diet & nutrition plan",
      "Priority equipment booking",
      "Free Infinity Gym merch",
    ],
    isPopular: false,
    accent: "purple",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background relative border-y border-border overflow-hidden">
      {/* Ambient glows */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-purple/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
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
            Choose Your <span className="text-gradient-gold">Weapon</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-muted-foreground text-lg"
          >
            No hidden fees. No complicated contracts. Just straightforward pricing for serious results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.14, duration: 0.55 }}
              /* Popular card floats; others lift on hover */
              animate={plan.isPopular ? { y: [0, -10, 0] } : undefined}
              whileHover={plan.isPopular ? undefined : { y: -8, scale: 1.01 }}
              {...(plan.isPopular
                ? { transition: { y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } } }
                : {})}
              className={`relative flex flex-col p-6 sm:p-8 bg-card border rounded-sm ${
                plan.isPopular
                  ? "border-primary/60 glow-dual md:scale-[1.03]"
                  : plan.accent === "purple"
                  ? "border-purple/30 hover:border-purple/60 transition-colors"
                  : "border-border hover:border-primary/40 transition-colors"
              }`}
            >
              {/* Top accent strip */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${
                plan.accent === "dual" ? "gradient-accent" : plan.accent === "gold" ? "bg-primary" : "bg-purple"
              }`} />

              {/* Shimmer sweep on popular */}
              {plan.isPopular && (
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm"
                  initial={false}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-1/3 h-full bg-white/[0.04] skew-x-[-20deg]"
                    animate={{ x: ["-100%", "350%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: 1 }}
                  />
                </motion.div>
              )}

              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 text-xs font-bold uppercase tracking-widest gradient-accent text-background">
                  Most Popular
                </div>
              )}

              <div className="mb-8 pt-2">
                <h3 className={`font-display text-2xl font-bold mb-1 uppercase tracking-wide ${
                  plan.accent === "gold" ? "text-primary" : plan.accent === "purple" ? "text-purple" : "text-white"
                }`}>{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                <motion.div
                  className="flex items-baseline gap-1"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  <span className={`text-2xl font-bold ${plan.isPopular ? "text-gradient-gold" : "text-white"}`}>₹</span>
                  <span className={`font-display text-6xl font-bold tracking-tight ${plan.isPopular ? "text-gradient-gold" : "text-white"}`}>{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </motion.div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <motion.li
                    key={fIndex}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + fIndex * 0.07 + 0.3, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + fIndex * 0.07 + 0.35, type: "spring", stiffness: 300 }}
                    >
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.accent === "purple" ? "text-purple" : "text-primary"}`} />
                    </motion.div>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 font-display font-bold text-lg uppercase tracking-wider text-center transition-all duration-300 block ${
                  plan.isPopular
                    ? "bg-primary text-background hover:bg-primary-dark glow-gold"
                    : plan.accent === "purple"
                    ? "bg-background border border-purple text-purple hover:bg-purple hover:text-white"
                    : "bg-background border border-border text-white hover:border-primary hover:text-primary"
                }`}
              >
                Select Plan
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
