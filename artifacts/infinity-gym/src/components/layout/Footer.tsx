import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const socials = [
  {
    label: "Instagram",
    Icon: Instagram,
    href: "#",
    gradient: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    glow: "rgba(238,42,123,0.75)",
    ring: "rgba(238,42,123,0.55)",
    tooltip: "#Infinity_Gym_Kaithal",
  },
  {
    label: "Facebook",
    Icon: Facebook,
    href: "#",
    gradient: "linear-gradient(135deg, #1877F2 0%, #0a5dc8 100%)",
    glow: "rgba(24,119,242,0.75)",
    ring: "rgba(24,119,242,0.55)",
    tooltip: "Infinity Gym Kaithal",
  },
  {
    label: "YouTube",
    Icon: Youtube,
    href: "#",
    gradient: "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
    glow: "rgba(255,0,0,0.7)",
    ring: "rgba(255,0,0,0.5)",
    tooltip: "@InfinityGymKaithal",
  },
];

function SocialIcon({ label, Icon, href, gradient, glow, ring, tooltip }: typeof socials[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", zIndex: hovered ? 10 : 1 }}>

      {/* Tooltip — appears above on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 14px)",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              background: "rgba(5,4,15,0.96)",
              border: `1px solid ${ring}`,
              borderRadius: "10px",
              padding: "8px 14px",
              pointerEvents: "none",
              zIndex: 200,
              boxShadow: `0 0 20px ${ring}, 0 4px 16px rgba(0,0,0,0.5)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase" }}>
              {label}
            </div>
            <div style={{ fontSize: "0.68rem", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
              {tooltip}
            </div>
            {/* Arrow pointing down */}
            <div style={{
              position: "absolute", bottom: "-7px", left: "50%", transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `7px solid ${ring}`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanding glow ring on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.6, 0.15, 0.6], scale: [1, 1.7, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-10px",
              borderRadius: "20px",
              border: `2px solid ${ring}`,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Main icon card */}
      <motion.a
        href={href}
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={hovered ? {
          y: -8,
          scale: 1.18,
          boxShadow: `0 0 0 2.5px ${ring}, 0 12px 36px ${glow}`,
        } : {
          y: 0,
          scale: 1,
          boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "52px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.10)",
          cursor: "pointer",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        {/* Gradient overlay — fades in on hover */}
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: gradient,
            pointerEvents: "none",
          }}
        />
        {/* Shine sweep on hover */}
        <motion.span
          initial={false}
          animate={hovered ? { x: "150%", opacity: 0.5 } : { x: "-150%", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Icon style={{ width: 24, height: 24, color: "#fff", position: "relative", zIndex: 1 }} />
      </motion.a>

      {/* Platform label below — brightens on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 2 }}
        transition={{ duration: 0.2 }}
        style={{
          marginTop: "8px",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fff",
          pointerEvents: "none",
        }}
      >
        {label}
      </motion.span>
    </div>
  );
}

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
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              {socials.map((s) => (
                <SocialIcon key={s.label} {...s} />
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
            © {new Date().getFullYear()} Infinity Fitness Gym, Kaithal. Designed by <span className="text-primary font-semibold">Armaan</span>
          </p>
          <p className="text-muted-foreground text-sm">
            Forged in <span className="text-primary font-semibold">Gold</span> · Powered by <span className="text-purple font-semibold">Haryana</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
