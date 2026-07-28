import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <img
          src={heroBg}
          alt="Infinity Gym Background"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gold + purple ambient blobs */}
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-20 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase rounded-none"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Kaithal's #1 Fitness Destination
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tight leading-[0.85] mb-4"
        >
          <span className="text-white block">Forged In</span>
          <span className="text-gradient-gold block mt-2">Iron &amp; Sweat</span>
        </motion.h1>

        {/* Sub-headline with purple accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-24 h-1 gradient-accent mb-6 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground font-medium mb-10"
        >
          Serious athletes, dedicated beginners, and everyone in between. Welcome to the undisputed powerhouse of Kaithal. Push your limits. Break your boundaries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background font-display font-bold text-base sm:text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-primary-dark transition-all overflow-hidden glow-gold"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-shimmer" />
            <div className="skew-x-[10deg] flex items-center gap-2">
              Start Your Journey <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
          <a
            href="#programs"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-purple text-white font-display font-bold text-base sm:text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-purple hover:text-white transition-all glow-purple"
          >
            <div className="skew-x-[10deg]">Explore Programs</div>
          </a>
        </motion.div>

        {/* 24/7 badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-10 inline-flex items-center gap-3 px-5 py-2 border border-purple/30 bg-purple/10 text-purple text-sm font-bold tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
          24 / 7 Fitness Community
          <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
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
