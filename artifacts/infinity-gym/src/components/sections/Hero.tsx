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
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
        {/* We use a realistic high-quality gym image via a robust external source */}
        <img 
          src={heroBg} 
          alt="Infinity Gym Background" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Kaithal's #1 Fitness Destination
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-[0.85] mb-6"
        >
          Forged In <br />
          <span className="text-primary text-stroke-primary">Iron & Sweat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground font-medium mb-10"
        >
          Serious athletes, dedicated beginners, and everyone in between. Welcome to the undisputed powerhouse of Kaithal. Push your limits. Break your boundaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-orange-600 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
            <div className="skew-x-[10deg] flex items-center gap-2">
              Start Your Journey <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
          <a
            href="#programs"
            className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-white hover:text-background transition-all"
          >
            <div className="skew-x-[10deg]">Explore Programs</div>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
