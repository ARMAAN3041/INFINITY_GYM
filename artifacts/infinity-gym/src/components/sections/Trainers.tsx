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
    <section id="trainers" className="py-24 bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
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
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            >
              Meet The <span className="text-gradient-gold">Experts</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Learn from the best. Our certified trainers have the knowledge and intensity to push you past your plateaus.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`group relative overflow-hidden bg-card border transition-all duration-500 ${
                trainer.accent === "gold"
                  ? "border-border hover:border-primary/60 hover:glow-gold"
                  : "border-border hover:border-purple/60 hover:glow-purple"
              }`}
            >
              {/* Top accent strip */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] z-20 ${trainer.accent === "gold" ? "bg-primary" : "bg-purple"}`} />

              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-600"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <h3 className="font-display text-3xl font-bold text-white uppercase tracking-wide mb-1">
                    {trainer.name}
                  </h3>
                  <p className={`font-semibold text-sm uppercase tracking-widest mb-4 ${trainer.accent === "gold" ? "text-primary" : "text-purple"}`}>
                    {trainer.role}
                  </p>
                  <p className={`text-white/80 italic text-sm border-l-2 pl-3 ${trainer.accent === "gold" ? "border-primary" : "border-purple"}`}>
                    "{trainer.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
