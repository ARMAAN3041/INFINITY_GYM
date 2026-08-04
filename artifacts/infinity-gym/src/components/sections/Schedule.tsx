import { motion } from "framer-motion";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SLOTS = [
  { time: "5:30 – 6:30 AM", sub: "7:00 – 8:00 AM", tag: "" },
  { time: "12:00 – 1:00 PM", sub: "", tag: "Only Girls" },
  { time: "5:00 – 6:00 PM", sub: "7:00 – 8:00 PM", tag: "" },
];

// For each day, what class per slot
const CLASSES: Record<string, string[]> = {
  Monday:    ["Aerobics", "Aerobics", "Aerobics"],
  Tuesday:   ["Cross Fit", "Cross Fit", "Cross Fit"],
  Wednesday: ["Aerobics", "Aerobics", "Aerobics"],
  Thursday:  ["Aerobics", "Aerobics", "Aerobics"],
  Friday:    ["Cross Fit", "Cross Fit", "Cross Fit"],
  Saturday:  ["Aerobics", "Aerobics", "Aerobics"],
};

const CLASS_STYLE: Record<string, string> = {
  "Aerobics":  "text-primary  bg-primary/10  border-primary/30",
  "Cross Fit": "text-purple   bg-purple/10   border-purple/30",
};

export default function Schedule() {
  return (
    <section id="schedule" className="py-12 md:py-24 bg-card/40 relative overflow-hidden">
      {/* ambient blobs */}
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
            Class <span className="text-gradient-gold">Schedule</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto"
          >
            Pick your batch — morning, afternoon, or evening. We train every day.
          </motion.p>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-6 mb-10 flex-wrap"
        >
          {[
            { label: "Aerobics",  cls: "text-primary  bg-primary/10  border-primary/30" },
            { label: "Cross Fit", cls: "text-purple   bg-purple/10   border-purple/30"  },
          ].map(({ label, cls }) => (
            <div key={label} className={`flex items-center gap-2 px-4 py-1.5 border rounded-full text-sm font-bold tracking-wide ${cls}`}>
              <span className={`w-2 h-2 rounded-full ${label === "Aerobics" ? "bg-primary" : "bg-purple"}`} />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-1.5 border border-pink-400/40 rounded-full text-sm font-bold tracking-wide text-pink-300 bg-pink-400/10">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            Only Girls (12 PM)
          </div>
        </motion.div>

        {/* Mobile scroll hint */}
        <p className="md:hidden text-center text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1">
          <span>←</span> Scroll to see full schedule <span>→</span>
        </p>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto rounded-sm border border-border"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-background/60">
                {/* Day column header */}
                <th className="p-4 text-left font-display text-xs uppercase tracking-widest text-muted-foreground border-b border-border w-[150px]">
                  Day
                </th>
                {SLOTS.map((slot, si) => (
                  <th
                    key={si}
                    className={`p-4 text-center border-b border-l border-border ${
                      slot.tag ? "bg-pink-400/10" : ""
                    }`}
                  >
                    <div className={`font-display font-bold text-sm uppercase tracking-wide ${slot.tag ? "text-pink-300" : "text-white"}`}>
                      {slot.time}
                    </div>
                    {slot.sub && (
                      <div className="text-muted-foreground text-xs mt-0.5">{slot.sub}</div>
                    )}
                    {slot.tag && (
                      <div className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-pink-300 border border-pink-400/40 bg-pink-400/10 px-2 py-0.5 rounded-full">
                        {slot.tag}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, di) => (
                <motion.tr
                  key={day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * di, duration: 0.4 }}
                  className="group border-b border-border last:border-b-0 hover:bg-white/[0.03] transition-colors"
                >
                  {/* Day name */}
                  <td className="p-4 font-display font-bold text-sm uppercase tracking-wider text-white border-r border-border">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-1.5 h-8 rounded-full transition-all duration-300 group-hover:h-10 ${
                          CLASSES[day][0] === "Aerobics" ? "bg-primary" : "bg-purple"
                        }`}
                      />
                      {day}
                    </div>
                  </td>

                  {/* Class per slot */}
                  {SLOTS.map((_, si) => {
                    const cls = CLASSES[day][si];
                    return (
                      <td key={si} className="p-4 text-center border-l border-border">
                        <motion.div
                          whileHover={{ scale: 1.07 }}
                          className={`inline-block px-4 py-1.5 border rounded-sm text-sm font-bold uppercase tracking-wide ${CLASS_STYLE[cls]}`}
                        >
                          {cls}
                        </motion.div>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-6"
        >
          * Sunday — Rest Day &nbsp;|&nbsp; Schedule subject to change. Contact us for latest updates.
        </motion.p>
      </div>
    </section>
  );
}
