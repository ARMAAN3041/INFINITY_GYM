import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ from = 0, to, duration = 2, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      if (node) {
        const controls = animate(from, to, {
          duration,
          ease: "easeOut",
          onUpdate(value) {
            node.textContent = Math.round(value).toString() + suffix;
          },
        });
        return () => controls.stop();
      }
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef} className="font-display font-bold text-5xl md:text-7xl text-white">{from}{suffix}</span>;
}

const stats = [
  { id: 1, label: "Active Members",    value: 1200, suffix: "+", accent: "gold"   },
  { id: 2, label: "Premium Equipment", value: 150,  suffix: "+", accent: "purple" },
  { id: 3, label: "Expert Trainers",   value: 12,   suffix: "",  accent: "gold"   },
  { id: 4, label: "Years of Excellence", value: 5,  suffix: "+", accent: "purple" },
];

/* Floating particle config */
const particles = [
  { left: "8%",  top: "20%", gold: true,  dur: 3.2, delay: 0    },
  { left: "18%", top: "70%", gold: false, dur: 4.1, delay: 0.4  },
  { left: "35%", top: "15%", gold: true,  dur: 2.8, delay: 0.8  },
  { left: "52%", top: "75%", gold: false, dur: 3.5, delay: 0.2  },
  { left: "68%", top: "25%", gold: true,  dur: 4.0, delay: 1.0  },
  { left: "80%", top: "60%", gold: false, dur: 3.0, delay: 0.6  },
  { left: "91%", top: "30%", gold: true,  dur: 3.8, delay: 1.4  },
  { left: "44%", top: "50%", gold: false, dur: 2.6, delay: 0.9  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-card border-y border-border relative z-20 overflow-hidden">
      {/* Dual tone glows */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/6 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-purple/6 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            background: p.gold ? "hsl(46,100%,55%)" : "hsl(270,72%,65%)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: p.dur, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ scale: 1.06, y: -4 }}
              className="flex flex-col items-center justify-center text-center space-y-3 cursor-default"
            >
              {/* Accent top line — animates width on view */}
              <motion.div
                className={`h-[3px] mb-1 ${stat.accent === "gold" ? "bg-primary" : "bg-purple"}`}
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
              />

              {/* Pulsing glow around counter */}
              <motion.div
                className="relative"
                animate={{
                  textShadow:
                    stat.accent === "gold"
                      ? ["0 0 0px rgba(250,204,21,0)", "0 0 20px rgba(250,204,21,0.4)", "0 0 0px rgba(250,204,21,0)"]
                      : ["0 0 0px rgba(167,139,250,0)", "0 0 20px rgba(167,139,250,0.4)", "0 0 0px rgba(167,139,250,0)"],
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: index * 0.4 }}
              >
                <Counter to={stat.value} suffix={stat.suffix} />
              </motion.div>

              <p className={`font-semibold tracking-widest uppercase text-xs md:text-sm ${stat.accent === "gold" ? "text-primary" : "text-purple"}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
