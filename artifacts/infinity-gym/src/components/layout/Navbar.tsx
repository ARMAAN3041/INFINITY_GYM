import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gymLogo from "@assets/infinity_logo_transparent.png";

const navLinks = [
  { name: "Home",         href: "#hero" },
  { name: "About",        href: "#features" },
  { name: "Services",     href: "#programs" },
  { name: "Gallery",      href: "#gallery" },
  { name: "Memberships",  href: "#pricing" },
  { name: "Trainers",     href: "#trainers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  const linkStyle = (active: boolean): React.CSSProperties => ({
    position: "relative",
    padding: "5px 8px",
    fontSize: "clamp(0.6rem, 0.9vw, 0.73rem)",
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

          {/* ── Logo ── */}
          <a href="#hero" onClick={(e) => scrollTo(e, "#hero")}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.07, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "#ffffff", display: "flex", alignItems: "center",
                justifyContent: "center", overflow: "hidden", flexShrink: 0,
                boxShadow: "0 0 0 2px rgba(255,255,255,0.15), 0 0 20px rgba(202,169,37,0.3)",
              }}
            >
              <img src={gymLogo} alt="Infinity Gym"
                style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
              />
            </motion.div>
            <div style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ffffff", lineHeight: 1.1, whiteSpace: "nowrap" }}>
              Infinity Gym
            </div>
          </a>

          <div style={{ flex: 1 }} />

          {/* ── Desktop nav: visible on lg+ ── */}
          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "2px" }}>
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
                marginLeft: "10px", padding: "8px 20px", borderRadius: "6px",
                fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none", color: "#ffffff",
                background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,42%) 100%)",
                boxShadow: "0 0 18px rgba(139,92,246,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s", whiteSpace: "nowrap",
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

          {/* ── Hamburger: visible below lg ── */}
          <button className="lg:hidden" onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)", borderRadius: "10px",
              padding: "9px 13px", cursor: "pointer", color: "#ffffff",
              transition: "background 0.2s", flexShrink: 0,
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile/tablet full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden"
            style={{
              position: "fixed", inset: 0, zIndex: 9997,
              background: "rgba(5,4,15,0.97)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "90px 24px 40px",
            }}
          >
            <nav style={{ width: "100%", maxWidth: "400px" }}>
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.a
                    key={link.name} href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "15px 18px", marginBottom: "6px", borderRadius: "10px",
                      textDecoration: "none", fontWeight: 700, fontSize: "1rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: active ? "hsl(46,100%,55%)" : "rgba(255,255,255,0.88)",
                      background: active ? "rgba(202,169,37,0.12)" : "rgba(255,255,255,0.04)",
                      borderLeft: `4px solid ${active ? "hsl(46,100%,50%)" : "transparent"}`,
                    }}
                  >
                    <span>{link.name}</span>
                    {active && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(46,100%,50%)" }} />}
                  </motion.a>
                );
              })}
              <motion.a href="#contact" onClick={(e) => scrollTo(e, "#contact")}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.22 }}
                style={{
                  display: "block", marginTop: "16px", padding: "15px",
                  borderRadius: "10px", textAlign: "center",
                  fontWeight: 800, fontSize: "1rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", textDecoration: "none", color: "#ffffff",
                  background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,42%) 100%)",
                  boxShadow: "0 0 28px rgba(139,92,246,0.5)",
                }}
              >
                Join Now →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
