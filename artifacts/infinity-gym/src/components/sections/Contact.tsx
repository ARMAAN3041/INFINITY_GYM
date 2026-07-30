import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Kaithal - Dhand Rd, opp. Maharaja Palace", "Rishi Nagar, Kaithal, Haryana 136027"],
    accent: "gold",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Mon – Sat: 5:00 AM – 10:00 PM", "Sunday: 6:00 AM – 12:00 PM"],
    accent: "purple",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 98765 43210"],
    accent: "gold",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["join@infinitygym.in"],
    accent: "purple",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Glow blobs */}
      <motion.div
        className="absolute top-1/4 left-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple/6 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Info Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-16 h-1 gradient-accent mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6"
            >
              Step Into The <span className="text-gradient-gold">Arena</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="text-muted-foreground text-lg mb-12"
            >
              Ready to start? Drop by for a free tour. The hardest lift of all is lifting your ass off the couch.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {contactItems.map((item, i) => {
                const isGold = item.accent === "gold";
                /* Alternate: left cards from left, right cards from right */
                const xDir = i % 2 === 0 ? -30 : 30;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: xDir, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group flex items-start gap-4 p-5 bg-card border rounded-sm transition-colors duration-300 relative overflow-hidden cursor-default ${
                      isGold ? "border-border hover:border-primary/50" : "border-border hover:border-purple/50"
                    }`}
                  >
                    {/* Top border accent on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ${isGold ? "bg-primary" : "bg-purple"}`} />

                    {/* Pulsing glow on icon */}
                    <motion.div
                      className={`shrink-0 w-12 h-12 border flex items-center justify-center rounded-sm transition-all duration-300 ${
                        isGold
                          ? "border-border group-hover:border-primary group-hover:bg-primary/10 text-primary"
                          : "border-border group-hover:border-purple group-hover:bg-purple/10 text-purple"
                      }`}
                      animate={{
                        boxShadow: isGold
                          ? ["0 0 0px rgba(250,204,21,0)", "0 0 12px rgba(250,204,21,0.3)", "0 0 0px rgba(250,204,21,0)"]
                          : ["0 0 0px rgba(167,139,250,0)", "0 0 12px rgba(167,139,250,0.3)", "0 0 0px rgba(167,139,250,0)"],
                      }}
                      transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>

                    <div>
                      <h4 className="font-display text-base font-bold text-white uppercase tracking-wide mb-1">{item.title}</h4>
                      {item.lines.map((line, li) => (
                        <p key={li} className="text-muted-foreground text-sm">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="inline-block px-8 py-4 bg-primary text-background font-display font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:bg-primary-dark transition-colors glow-gold"
              >
                <div className="skew-x-[10deg]">Call Us Now</div>
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="inline-block px-8 py-4 bg-transparent border-2 border-purple text-purple font-display font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:bg-purple hover:text-white transition-all"
              >
                <div className="skew-x-[10deg]">View Plans</div>
              </motion.a>
            </motion.div>
          </div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-[450px] lg:h-full min-h-[450px] bg-card border border-border rounded-sm overflow-hidden relative glow-dual"
          >
            <iframe
              src="https://maps.google.com/maps?q=Kaithal+Dhand+Road+opp+Maharaja+Palace+Rishi+Nagar+Kaithal+Haryana+136027&output=embed&z=17"
              className="w-full h-full border-0 grayscale invert contrast-[0.8] opacity-75"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Scanning line animation */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none z-10"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />

            {/* Gold + purple corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary pointer-events-none z-20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple pointer-events-none z-20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary pointer-events-none z-20" />

            {/* Pulsing "YOU ARE HERE" marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-[0_0_16px_rgba(250,204,21,0.8)]"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-black/70 px-2 py-0.5 rounded">Infinity Gym</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
