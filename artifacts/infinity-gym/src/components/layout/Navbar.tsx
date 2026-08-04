import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gymLogo from "@assets/infinity_logo_transparent.png";

const navLinks = [
  { name: "Home",         href: "#hero" },
  { name: "About",        href: "#features" },
  { name: "Services",     href: "#programs" },
  { name: "Memberships",  href: "#pricing" },
  { name: "Trainers",     href: "#trainers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled,      setScrolled]      = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const ids = navLinks
          .map((l) => l.href.replace("#", ""))
          .filter((id) => document.getElementById(id));
        let current = ids[0] ?? "hero";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 100) current = id;
        }
        setActiveSection(current);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  const linkStyle = (active: boolean): React.CSSProperties => ({
    position: "relative",
    padding: "5px 8px",
    fontSize: "clamp(0.58rem, 0.9vw, 0.73rem)",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: active ? "hsl(46,100%,55%)" : "rgba(255,255,255,0.82)",
    textDecoration: "none",
    borderRadius: "6px",
    background: active ? "rgba(202,169,37,0.1)" : "transparent",
    transition: "color 0.2s, background 0.2s",
    whiteSpace: "nowrap",
  });

  const renderDot = (active: boolean) => active && (
    <span style={{
      position: "absolute", bottom: "2px", left: "50%",
      transform: "translateX(-50%)", width: "4px", height: "4px",
      borderRadius: "50%", background: "hsl(46,100%,50%)",
    }} />
  );

  const hoverOn = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    if (!active) {
      (e.currentTarget as HTMLAnchorElement).style.color = "hsl(46,100%,60%)";
      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(202,169,37,0.07)";
    }
  };
  const hoverOff = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    if (!active) {
      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.82)";
      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
    }
  };

  return (
    <>
      {/* ── Main navbar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? "rgba(5,4,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.35s, backdrop-filter 0.35s, border-bottom 0.35s",
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 16px",
          height: "70px", display: "flex", alignItems: "center", gap: "8px",
        }}>

          {/* ── LEFT: Logo ── */}
          <a href="#hero" onClick={(e) => scrollTo(e, "#hero")}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.07, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{
                width: "50px", height: "50px", borderRadius: "50%",
                background: "#ffffff", display: "flex", alignItems: "center",
                justifyContent: "center", overflow: "hidden", flexShrink: 0,
                boxShadow: "0 0 0 2px rgba(255,255,255,0.15), 0 0 20px rgba(202,169,37,0.3)",
              }}
            >
              <img src={gymLogo} alt="Infinity Fitness"
                style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
              />
            </motion.div>
            <div style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.95rem)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ffffff", lineHeight: 1.1, whiteSpace: "nowrap" }}>
              Infinity Gym
            </div>
          </a>

          {/* ── Spacer ── */}
          <div style={{ flex: 1 }} />

          {/* ── Nav links — always visible ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2px", flexWrap: "nowrap", overflowX: "auto" }}>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a key={link.name} href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  style={linkStyle(active)}
                  onMouseEnter={(e) => hoverOn(e, active)}
                  onMouseLeave={(e) => hoverOff(e, active)}
                >
                  {link.name}
                  {renderDot(active)}
                </a>
              );
            })}

            <a href="#contact" onClick={(e) => scrollTo(e, "#contact")}
              style={{
                marginLeft: "8px",
                padding: "7px clamp(10px, 1.5vw, 20px)",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "clamp(0.58rem, 0.9vw, 0.78rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none", color: "#ffffff",
                background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,42%) 100%)",
                boxShadow: "0 0 18px rgba(139,92,246,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s", whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-2px) scale(1.04)";
                el.style.boxShadow = "0 0 30px rgba(139,92,246,0.65)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "0 0 18px rgba(139,92,246,0.4)";
              }}
            >
              Join Now
            </a>
          </nav>
        </div>
      </header>

      {/* ── "Kaithal #1 Fitness Destination" bar — drops in from top when site opens ── */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: "70px", left: 0, right: 0,
          zIndex: 9998, display: "flex", justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 18px",
          border: "1px solid rgba(202,169,37,0.45)",
          background: "rgba(5,4,15,0.55)",
          backdropFilter: "blur(8px)",
          color: "hsl(46,100%,55%)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(46,100%,55%)", animation: "pulse 2s infinite" }} />
          Kaithal's #1 Fitness Destination
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(46,100%,55%)", animation: "pulse 2s infinite" }} />
        </div>
      </motion.div>
    </>
  );
}
