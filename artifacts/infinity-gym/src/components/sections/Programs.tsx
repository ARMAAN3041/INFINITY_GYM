import { motion } from "framer-motion";
import { Dumbbell, Activity, Flame, Heart, Music, Users } from "lucide-react";
import weightsImg from "@assets/generated_images/prog-weights.jpg";
import cardioImg from "@assets/generated_images/prog-cardio.jpg";
import crossfitImg from "@assets/generated_images/prog-crossfit.jpg";
import yogaImg from "@assets/generated_images/prog-yoga.jpg";
import zumbaImg from "@assets/generated_images/prog-zumba.jpg";
import ptImg from "@assets/generated_images/prog-pt.jpg";

const programs = [
  {
    title: "Weight Training",
    description: "Build raw power and muscle with our extensive free weights and elite resistance machines.",
    icon: Dumbbell,
    image: weightsImg,
    accent: "gold",
  },
  {
    title: "Cardio Zone",
    description: "Melt fat and build endurance with top-tier treadmills, stair climbers, and rowers.",
    icon: Activity,
    image: cardioImg,
    accent: "purple",
  },
  {
    title: "CrossFit",
    description: "High-intensity functional movements designed to push your cardiovascular capacity.",
    icon: Flame,
    image: crossfitImg,
    accent: "gold",
  },
  {
    title: "Yoga & Core",
    description: "Enhance flexibility, core strength, and mental focus in our dedicated quiet studio.",
    icon: Heart,
    image: yogaImg,
    accent: "purple",
  },
  {
    title: "Zumba",
    description: "Burn calories to high-energy beats in our vibrant group fitness classes.",
    icon: Music,
    image: zumbaImg,
    accent: "gold",
  },
  {
    title: "Personal Training",
    description: "1-on-1 expert guidance tailored completely to your specific goals and body.",
    icon: Users,
    image: ptImg,
    accent: "purple",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="w-16 h-1 gradient-accent mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4"
            >
              Dominate Your <span className="text-gradient-gold">Discipline</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              From heavy lifting to mindful mobility — the space, gear, and atmosphere to excel.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#pricing"
            className="group inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            View Pricing <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
          </motion.a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`group relative overflow-hidden bg-card border rounded-sm transition-all duration-300 ${
                prog.accent === "gold"
                  ? "border-border hover:border-primary/50"
                  : "border-border hover:border-purple/50"
              }`}
            >
              {/* Top accent strip */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] z-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                prog.accent === "gold" ? "bg-primary" : "bg-purple"
              }`} />

              <div className="h-60 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent z-10" />
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Icon bubble */}
                <div className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ${
                  prog.accent === "gold" ? "bg-primary text-background" : "bg-purple text-white"
                }`}>
                  <prog.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="p-6 relative z-20 -mt-10">
                <h3 className={`font-display text-2xl font-bold uppercase tracking-wide mb-2 ${
                  prog.accent === "gold" ? "text-primary" : "text-purple"
                }`}>
                  {prog.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {prog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
