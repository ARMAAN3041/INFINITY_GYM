import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";

const PHONE = "+919034832951";
const WHATSAPP_MSG = encodeURIComponent("Hi! I'd like to know more about Infinity Gym Kaithal.");

export default function FloatingCallButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[9998] flex flex-col items-end gap-3" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>

      {/* Expanded options */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 16, scale: 0.85 }}
              transition={{ duration: 0.22, delay: 0.04 }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-xl text-sm font-bold uppercase tracking-wider text-white"
              style={{ background: "linear-gradient(135deg,#25d366,#128c49)" }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>

            {/* Call */}
            <motion.a
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 16, scale: 0.85 }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-xl text-sm font-bold uppercase tracking-wider text-black"
              style={{ background: "linear-gradient(135deg,hsl(46,100%,55%),hsl(46,100%,40%))" }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl focus:outline-none"
        style={{
          background: open
            ? "linear-gradient(135deg,hsl(270,72%,55%),hsl(270,72%,38%))"
            : "linear-gradient(135deg,hsl(46,100%,55%),hsl(46,100%,38%))",
          boxShadow: open
            ? "0 0 0 0 transparent, 0 8px 30px rgba(139,92,246,0.55)"
            : "0 0 0 0 transparent, 0 8px 30px rgba(250,204,21,0.5)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
        aria-label="Contact us"
      >
        {/* Ping ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary opacity-30 pointer-events-none" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate:  90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0,  opacity: 1 }}
              exit={{    rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Phone className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
