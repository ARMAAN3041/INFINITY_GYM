import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gymLogo from "@assets/infinity_logo_transparent.png";

const navLinks = [
  { name: "Home",         href: "#hero" },
  { name: "About",        href: "#features" },
  { name: "Services",     href: "#programs" },
  { name: "Membership",   href: "#pricing" },
  { name: "Trainers",     href: "#trainers" },
  { name: "Gallery",      href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState("hero");
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);

        // Active-section detection
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

  const isActive = (href: string) =>
    activeSection === href.replace("#", "");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: scrolled
          ? "rgba(4, 4, 4, 0.88)"
          : "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.55)"
          : "none",
      }}
    >
      {/* Accent strip */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, hsl(270,72%,60%), hsl(46,100%,50%), hsl(270,72%,60%))",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Main row ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          height: "76px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* ── LEFT: Logo ── */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.07)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 16px rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 2px rgba(255,255,255,0.15)";
            }}
          >
            <img
              src={gymLogo}
              alt="Infinity Fitness"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </a>

        {/* ── CENTER: Desktop nav ── */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  position: "relative",
                  padding: "6px 12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: active
                    ? "hsl(46,100%,55%)"
                    : "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  borderRadius: "6px",
                  background: active
                    ? "rgba(202,169,37,0.1)"
                    : "transparent",
                  transition: "color 0.25s, background 0.25s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "hsl(46,100%,60%)";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(202,169,37,0.07)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.72)";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent";
                  }
                }}
              >
                {link.name}
                {/* Active underline dot */}
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

        {/* ── RIGHT: Join Now + hamburger ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Join Now — desktop */}
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="hidden lg:inline-flex"
            style={{
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
              transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-2px) scale(1.04)";
              el.style.boxShadow = "0 0 30px rgba(139,92,246,0.65)";
              el.style.filter = "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow = "0 0 18px rgba(139,92,246,0.4)";
              el.style.filter = "brightness(1)";
            }}
          >
            Join Now
          </a>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "hsl(270,72%,65%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                transition={{ duration: 0.18 }}
              >
                {mobileOpen ? (
                  <X style={{ width: 22, height: 22 }} />
                ) : (
                  <Menu style={{ width: 22, height: 22 }} />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ padding: "12px 20px 20px" }}>
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "13px 14px",
                      borderRadius: "8px",
                      marginBottom: "4px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: active ? "hsl(46,100%,55%)" : "rgba(255,255,255,0.78)",
                      background: active
                        ? "rgba(202,169,37,0.1)"
                        : "transparent",
                      borderLeft: active
                        ? "3px solid hsl(46,100%,50%)"
                        : "3px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {link.name}
                  </motion.a>
                );
              })}

              {/* Mobile Join Now */}
              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 + 0.05, duration: 0.22 }}
                style={{
                  display: "block",
                  marginTop: "12px",
                  padding: "13px",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#ffffff",
                  background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,42%) 100%)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                }}
              >
                Join Now →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
