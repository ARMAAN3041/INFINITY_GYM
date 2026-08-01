import { motion } from "framer-motion";
import trainer1 from "@assets/generated_images/trainer-1.jpg";
import trainer2 from "@assets/generated_images/trainer-2.jpg";
import trainer3 from "@assets/generated_images/trainer-3.jpg";

const trainers = [
  {
    name: "Vikram Singh",
    role: "Head Coach & Powerlifting",
    image: trainer1,
    quote: "Excuses don't burn calories.",
    accent: "gold",
  },
  {
    name: "Priya Sharma",
    role: "Yoga & Core Specialist",
    image: trainer2,
    quote: "Strength is mental as much as physical.",
    accent: "purple",
  },
  {
    name: "Rahul Verma",
    role: "CrossFit & Conditioning",
    image: trainer3,
    quote: "Your body can stand almost anything. It's your mind you have to convince.",
    accent: "gold",
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-16 h-1 gradient-accent mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold uppercase tracking-tight text-white mb-4" style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}
            >
              Meet The <span className="text-gradient-gold">Experts</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="text-muted-foreground text-lg"
            >
              Learn from the best. Our certified trainers have the knowledge and intensity to push you past your plateaus.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {trainers.map((trainer, i) => {
            const isGold = trainer.accent === "gold";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.14, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden bg-card border transition-all duration-500 ${
                  isGold
                    ? "border-border hover:border-primary/60 hover:glow-gold"
                    : "border-border hover:border-purple/60 hover:glow-purple"
                }`}
              >
                {/* Top accent strip */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] z-20 ${isGold ? "bg-primary" : "bg-purple"}`} />

                {/* Sweeping shimmer on hover */}
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                  <div className={`absolute top-0 left-[-100%] w-2/3 h-full bg-gradient-to-r from-transparent ${isGold ? "via-primary/10" : "via-purple/10"} to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-[left] duration-700 ease-in-out`} />
                </div>

                <div className="aspect-[3/4] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                  <motion.img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Accent glow behind name on hover */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5] ${isGold ? "bg-primary/10" : "bg-purple/10"} blur-2xl`}
                  />

                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <motion.h3
                      className="font-display font-bold text-white uppercase tracking-wide mb-1" style={{ fontSize: "clamp(1.3rem,3.5vw,1.875rem)" }}
                      initial={{ y: 0 }}
                    >
                      {trainer.name}
                    </motion.h3>

                    <motion.p
                      className={`font-semibold text-sm uppercase tracking-widest mb-4 ${isGold ? "text-primary" : "text-purple"}`}
                      animate={isGold
                        ? { textShadow: ["0 0 0px rgba(250,204,21,0)", "0 0 12px rgba(250,204,21,0.6)", "0 0 0px rgba(250,204,21,0)"] }
                        : { textShadow: ["0 0 0px rgba(167,139,250,0)", "0 0 12px rgba(167,139,250,0.6)", "0 0 0px rgba(167,139,250,0)"] }
                      }
                      transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, ease: "easeInOut", delay: i * 0.5 }}
                    >
                      {trainer.role}
                    </motion.p>

                    {/* Quote — slides up on hover */}
                    <motion.p
                      className={`text-white/80 italic text-sm border-l-2 pl-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ${isGold ? "border-primary" : "border-purple"}`}
                    >
                      "{trainer.quote}"
                    </motion.p>
                  </div>
                </div>

                {/* Number badge */}
                <motion.div
                  className={`absolute top-8 right-4 z-30 font-display font-bold text-7xl opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500 select-none ${isGold ? "text-primary" : "text-purple"}`}
                >
                  0{i + 1}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
