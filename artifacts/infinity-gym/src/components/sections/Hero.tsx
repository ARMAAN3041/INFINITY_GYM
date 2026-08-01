import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

import slide1 from "@assets/66666_1785401718706.jpeg";
import slide2 from "@assets/777777_1785401728470.jpeg";
import slide3 from "@assets/000000_1785401735409.jpeg";
import slide4 from "@assets/88888_1785401741841.jpeg";
import slide5 from "@assets/11111_1785409846075.jpeg";

const slides = [slide1, slide2, slide3, slide4, slide5];
const INTERVAL = 4500;

export default function Hero() {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500],  [1, 0]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] min-h-[580px] flex items-center justify-center overflow-hidden">

      {/* ── Slideshow background ── */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={slides[current]}
            alt={`Infinity Gym – slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1,  scale: 1    }}
            exit={{    opacity: 0,  scale: 0.97 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Ambient blobs — hidden on small mobile to save paint */}
      <div className="hidden sm:block absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-purple/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* ── Content — pad top enough for fixed navbar (70px) + badge bar (~36px) ── */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 pt-[115px] sm:pt-[120px] text-center flex flex-col items-center w-full">

        {/* Headline */}
        <h1
          className="font-display font-bold uppercase tracking-tight leading-[0.88] mb-4 w-full overflow-hidden"
          style={{
            perspective: "900px",
            fontSize: "clamp(2rem, 10vw, 9rem)",
          }}
        >
          {/* Line 1: "Forged In" */}
          <span className="text-white block" style={{ display: "block", perspective: "900px" }}>
            {"Forged In".split("").map((ch, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block", transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, rotateX: -90, y: -20 }}
                animate={{ opacity: 1, rotateX: 0,   y: 0   }}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotateY: 15, scale: 1.12, color: "hsl(46,100%,65%)", transition: { duration: 0.2 } }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </span>

          {/* Line 2: "Iron & Sweat" */}
          <motion.span
            className="text-gradient-gold block mt-1 sm:mt-2"
            style={{ display: "block", transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: 25, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, rotateX: 0,  y: 0,  scale: 1    }}
            transition={{ duration: 0.85, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateX: -6, scale: 1.03, transition: { duration: 0.25 } }}
          >
            Iron &amp; Sweat
          </motion.span>
        </h1>

        {/* Accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-16 sm:w-24 h-1 gradient-accent mb-4 sm:mb-6 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl text-sm sm:text-base md:text-xl text-muted-foreground font-medium mb-6 sm:mb-10 px-2"
        >
          Serious athletes, dedicated beginners, and everyone in between. Welcome to the undisputed powerhouse of Kaithal. Push your limits. Break your boundaries.
        </motion.p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
          style={{ perspective: "800px" }}
        >
          <motion.a
            href="#pricing"
            className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-5 bg-primary text-background font-display font-bold text-sm sm:text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-primary-dark transition-all overflow-hidden glow-gold"
            style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: 60, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0,  y: 0,  scale: 1   }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotateX: -4, transition: { duration: 0.2 } }}
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-shimmer" />
            <div className="skew-x-[10deg] flex items-center gap-2">
              Start Your Journey <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          <motion.a
            href="#programs"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-purple text-white font-display font-bold text-sm sm:text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-purple hover:text-white transition-all glow-purple"
            style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: -60, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0,   y: 0,   scale: 1   }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotateX: 4, transition: { duration: 0.2 } }}
          >
            <div className="skew-x-[10deg]">Explore Programs</div>
          </motion.a>
        </div>

        {/* 24/7 badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 border border-purple/50 bg-purple/15 text-purple text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_18px_rgba(139,92,246,0.25)]"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple animate-pulse" />
          24 / 7 Fitness Community
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple animate-pulse" />
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="hidden sm:flex absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-20 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          {current + 1} / {slides.length}
        </span>
        <div className="w-px h-8 sm:h-10 bg-border relative overflow-hidden">
          <motion.div
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-full gradient-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
