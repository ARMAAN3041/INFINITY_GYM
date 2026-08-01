import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gymLogo from "@assets/infinity_logo_transparent.png";

const navLinks = [
  { name: "Home",         href: "#hero" },
  { name: "About",        href: "#features" },
  { name: "Services",     href: "#programs" },
  { name: "Memberships",  href: "#pricing" },
  { name: "Trainers",     href: "#trainers" },
  { name: "Schedule",     href: "#schedule" },
  { name: "Hours",        href: "#gym-hours" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
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

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      {/* ── Navbar bar ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            >
              <img
                src={gymLogo}
                alt="Infinity Fitness"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </a>

          {/* ── Desktop nav (≥1024px) ── */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "4px" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    style={{
                      position: "relative",
                      padding: "6px 11px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: active ? "hsl(46,100%,55%)" : "rgba(255,255,255,0.80)",
                      textDecoration: "none",
                      borderRadius: "6px",
                      background: active ? "rgba(202,169,37,0.1)" : "transparent",
                      transition: "color 0.2s, background 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "hsl(46,100%,60%)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(202,169,37,0.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.80)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      }
                    }}
                  >
                    {link.name}
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "hsl(46,100%,50%)",
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Join Now */}
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              style={{
                marginLeft: "10px",
                padding: "9px 22px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#ffffff",
                background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,42%) 100%)",
                boxShadow: "0 0 18px rgba(139,92,246,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
                whiteSpace: "nowrap",
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
          </div>

          {/* ── Hamburger (mobile + tablet, hidden on desktop) ── */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              padding: "10px 14px",
              cursor: "pointer",
              color: "#ffffff",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s",
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
                {mobileOpen
                  ? <X style={{ width: 24, height: 24 }} />
                  : <Menu style={{ width: 24, height: 24 }} />
                }
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(5, 4, 15, 0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px 24px 40px",
            }}
          >
            {/* Nav links list */}
            <nav style={{ width: "100%", maxWidth: "420px" }}>
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      marginBottom: "6px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: active ? "hsl(46,100%,55%)" : "rgba(255,255,255,0.88)",
                      background: active
                        ? "rgba(202,169,37,0.12)"
                        : "rgba(255,255,255,0.04)",
                      borderLeft: `4px solid ${active ? "hsl(46,100%,50%)" : "transparent"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "hsl(46,100%,50%)",
                      }} />
                    )}
                  </motion.a>
                );
              })}

              {/* Join Now */}
              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.22 }}
                style={{
                  display: "block",
                  marginTop: "18px",
                  padding: "16px",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#ffffff",
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
