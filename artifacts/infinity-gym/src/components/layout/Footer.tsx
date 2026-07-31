import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube } from "lucide-react";
import gymLogo from "@assets/infinity_logo_transparent.png";

const col = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Purple glow blob bottom-left */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      {/* Gold glow blob bottom-right */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* Brand column */}
          <motion.div
            className="sm:col-span-2"
            custom={0}
            variants={col}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <img
                  src={gymLogo}
                  alt="Infinity Fitness Gym"
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              The undisputed powerhouse of Kaithal. Where serious athletes and dedicated beginners come to push their limits and break their boundaries.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, hoverClass: "hover:text-primary hover:border-primary" },
                { Icon: Facebook,  hoverClass: "hover:text-purple hover:border-purple" },
                { Icon: Youtube,   hoverClass: "hover:text-primary hover:border-primary" },
              ].map(({ Icon, hoverClass }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className={`w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground transition-colors ${hoverClass}`}
                  whileHover={{ scale: 1.2, rotate: 6, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={1}
            variants={col}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] gradient-accent inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Programs", "Why Choose Us", "Membership Pricing", "Our Trainers", "Reviews"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                >
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-").replace("why-choose-us", "features").replace("membership-pricing", "pricing").replace("our-trainers", "trainers")}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={2}
            variants={col}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] gradient-accent inline-block" />
              Contact
            </h4>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-8">
              {["Kaithal, Haryana 136027", "+91 90348 32951", "join@infinitygym.in"].map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="leading-relaxed"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Animated gold-purple divider */}
        <motion.div
          className="h-px gradient-accent mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Infinity Fitness Gym, Kaithal. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Forged in <span className="text-primary font-semibold">Gold</span> · Powered by <span className="text-purple font-semibold">Haryana</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
