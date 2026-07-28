import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gymLogo from "@assets/kkkkk_1785218944846.jpeg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Why Us", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Trainers", href: "#trainers" },
    { name: "Reviews", href: "#testimonials" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-2"
          : "bg-gradient-to-b from-black/70 to-transparent py-4"
      }`}
    >
      {/* Gold + purple top accent strip when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[2px] gradient-accent" />
      )}

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo — real gym logo image */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center group"
        >
          <img
            src={gymLogo}
            alt="Infinity Fitness Gym Logo"
            className="h-12 md:h-14 w-auto object-contain rounded-full transition-all duration-300 group-hover:brightness-110"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="relative px-6 py-2.5 bg-primary text-background font-display font-bold uppercase tracking-wider skew-x-[-10deg] hover:bg-primary-dark transition-colors overflow-hidden animate-pulse-gold"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:animate-shimmer" />
            <div className="skew-x-[10deg]">Join Now</div>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-card border-b border-border shadow-2xl md:hidden"
          >
            {/* Purple-to-gold top accent */}
            <div className="h-[2px] gradient-accent" />
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-6 py-4 border-b border-border text-lg font-display uppercase tracking-wider hover:text-primary hover:bg-muted/50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="px-6 py-4 text-primary text-lg font-display uppercase tracking-wider font-bold hover:bg-muted/50 transition-colors"
              >
                Join Now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
