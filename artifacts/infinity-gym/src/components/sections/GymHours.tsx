import { motion } from "framer-motion";
import { Clock, Sun, Sunset, Moon } from "lucide-react";

const DAYS = [
  { day: "Monday",    hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Tuesday",   hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Wednesday", hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Thursday",  hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Friday",    hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Saturday",  hours: "5:00 AM – 10:00 PM", open: true  },
  { day: "Sunday",    hours: "Closed",              open: false },
];

const BATCHES = [
  {
    icon: Sun,
    label: "Morning Batch",
    time: "5:00 AM – 8:00 AM",
    note: "Early risers & working professionals",
    accent: "gold",
  },
  {
    icon: Clock,
    label: "Afternoon Batch",
    time: "12:00 PM – 1:00 PM",
    note: "Girls Only",
    accent: "pink",
  },
  {
    icon: Sunset,
    label: "Evening Batch",
    time: "5:00 PM – 8:00 PM",
    note: "Most popular timing",
    accent: "purple",
  },
  {
    icon: Moon,
    label: "Night Access",
    time: "8:00 PM – 10:00 PM",
    note: "Open gym floor",
    accent: "gold",
  },
];

export default function GymHours() {
  return (
    <section id="schedule" className="py-24 bg-card/40 relative overflow-hidden">
      {/* Ambient blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/6 blur-[140px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/6 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1 gradient-accent mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white"
          >
            Gym <span className="text-gradient-gold">Timings</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto"
          >
            We train 6 days a week — morning to night. Pick the batch that fits your schedule.
          </motion.p>
        </div>

        {/* Batch cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {BATCHES.map((b, i) => {
            const isGold   = b.accent === "gold";
            const isPink   = b.accent === "pink";
            const isPurple = b.accent === "purple";
            const colorCls = isGold
              ? "text-primary border-primary/30 bg-primary/5 group-hover:border-primary/60"
              : isPink
              ? "text-pink-300 border-pink-400/30 bg-pink-400/5 group-hover:border-pink-400/60"
              : "text-purple border-purple/30 bg-purple/5 group-hover:border-purple/60";
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group flex flex-col items-center text-center p-5 rounded-sm border transition-all duration-300 ${colorCls}`}
              >
                <Icon className="w-7 h-7 mb-3" />
                <p className="font-display font-bold text-sm uppercase tracking-widest text-white mb-1">{b.label}</p>
                <p className="font-bold text-base">{b.time}</p>
                {b.note && (
                  <p className="text-xs text-muted-foreground mt-1">{b.note}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Daily hours table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto rounded-sm border border-border"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-background/60">
                <th className="p-4 text-left font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                  Day
                </th>
                <th className="p-4 text-center font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border border-l">
                  Opening Hours
                </th>
                <th className="p-4 text-center font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border border-l">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((row, i) => (
                <motion.tr
                  key={row.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="group border-b border-border last:border-b-0 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="p-4 font-display font-bold text-sm uppercase tracking-wider text-white border-r border-border">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-8 rounded-full transition-all duration-300 group-hover:h-10 ${row.open ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      {row.day}
                    </div>
                  </td>
                  <td className="p-4 text-center border-l border-border">
                    <span className={`font-bold text-sm ${row.open ? "text-white" : "text-muted-foreground"}`}>
                      {row.hours}
                    </span>
                  </td>
                  <td className="p-4 text-center border-l border-border">
                    {row.open ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/20 border border-border">
                        Closed
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-6"
        >
          * Timings may vary on public holidays. Contact us to confirm.
        </motion.p>
      </div>
    </section>
  );
}
