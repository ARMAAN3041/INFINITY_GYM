import { useEffect, useState, useRef } from "react";
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

export default function Stats() {
  const stats = [
    { id: 1, label: "Active Members", value: 1200, suffix: "+" },
    { id: 2, label: "Premium Equipment", value: 150, suffix: "+" },
    { id: 3, label: "Expert Trainers", value: 12, suffix: "" },
    { id: 4, label: "Years of Excellence", value: 5, suffix: "+" },
  ];

  return (
    <section className="py-20 bg-card border-y border-border relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <Counter to={stat.value} suffix={stat.suffix} />
              <p className="text-primary font-semibold tracking-widest uppercase text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
