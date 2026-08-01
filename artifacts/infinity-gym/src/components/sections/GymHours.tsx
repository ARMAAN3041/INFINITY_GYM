import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const DAYS = [
  { day: "Monday",    hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Tuesday",   hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Wednesday", hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Thursday",  hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Friday",    hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Saturday",  hours: "5:00 AM – 11:00 PM", open: true,  special: false },
  { day: "Sunday",    hours: "6:00 AM – 9:00 PM",  open: true,  special: true  },
];

const BATCHES = [
  { label: "Morning",   time: "5:00 AM – 8:00 AM",   note: "Early & working pros", accent: "gold"   },
  { label: "Afternoon", time: "12:00 PM – 1:00 PM",  note: "Girls Only",           accent: "pink"   },
  { label: "Evening",   time: "5:00 PM – 8:00 PM",   note: "Most popular",         accent: "purple" },
  { label: "Night",     time: "8:00 PM – 11:00 PM",  note: "Open gym floor",       accent: "gold"   },
];

const ACCENT: Record<string, { text: string; border: string; bg: string; dot: string }> = {
  gold:   { text: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/8",  dot: "bg-yellow-400"  },
  pink:   { text: "text-pink-300",   border: "border-pink-400/40",   bg: "bg-pink-400/8",    dot: "bg-pink-400"    },
  purple: { text: "text-purple-400", border: "border-purple-400/40", bg: "bg-purple-400/8",  dot: "bg-purple-400"  },
};

export default function GymHours() {
  return (
    <section id="schedule" className="py-24 bg-card/40 relative overflow-hidden">
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
            Step Into <span className="text-gradient-gold">The Arena</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto"
          >
            6 days a week, morning to night — the arena is always open for those who show up.
          </motion.p>
        </div>

        {/* Batch pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {BATCHES.map((b, i) => {
            const ac = ACCENT[b.accent];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center text-center p-5 rounded-sm border transition-all duration-300 ${ac.border} ${ac.bg}`}
              >
                <div className={`w-2 h-2 rounded-full mb-3 ${ac.dot}`} />
                <p className="font-display font-bold text-sm uppercase tracking-widest text-white mb-1">{b.label}</p>
                <p className={`font-bold text-sm ${ac.text}`}>{b.time}</p>
                {b.note && <p className="text-xs text-muted-foreground mt-1">{b.note}</p>}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-3">
          {DAYS.map((row, i) => (
            <motion.div
              key={row.day}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className={`flex items-center justify-between px-5 py-4 rounded-sm border ${
                row.special ? "border-purple/40 bg-purple/5" : "border-border bg-background/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-8 rounded-full shrink-0 ${row.special ? "bg-purple" : "bg-primary"}`} />
                <div>
                  <p className="font-display font-bold text-sm uppercase tracking-wider text-white leading-tight">
                    {row.day}
                    {row.special && (
                      <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-purple border border-purple/30 bg-purple/10 px-1.5 py-0.5 rounded-full align-middle">
                        Short
                      </span>
                    )}
                  </p>
                  <p className={`text-sm font-bold mt-0.5 ${row.special ? "text-purple-300" : "text-primary"}`}>
                    {row.hours}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                row.special
                  ? "text-purple-300 bg-purple/10 border border-purple/30"
                  : "text-primary bg-primary/10 border border-primary/30"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${row.special ? "bg-purple" : "bg-primary"}`} />
                Open
              </span>
            </motion.div>
          ))}
        </div>

        {/* Desktop: table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block overflow-x-auto rounded-sm border border-border"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-background/60">
                <th className="p-4 text-left font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                  Day
                </th>
                <th className="p-4 text-center font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border border-l">
                  <Clock className="w-3 h-3 inline mr-1.5 -mt-0.5" />
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
                      <span className={`w-1.5 h-8 rounded-full transition-all duration-300 group-hover:h-10 ${row.special ? "bg-purple" : "bg-primary"}`} />
                      {row.day}
                      {row.special && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple border border-purple/30 bg-purple/10 px-2 py-0.5 rounded-full">
                          Short Day
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center border-l border-border">
                    <span className={`font-bold text-sm ${row.special ? "text-purple-300" : "text-white"}`}>
                      {row.hours}
                    </span>
                  </td>
                  <td className="p-4 text-center border-l border-border">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      row.special
                        ? "text-purple-300 bg-purple/10 border border-purple/30"
                        : "text-primary bg-primary/10 border border-primary/30"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${row.special ? "bg-purple" : "bg-primary"}`} />
                      Open
                    </span>
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
