import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, X, Dumbbell } from "lucide-react";
import botAvatar from "@assets/download_(1)_1785998958070.jpg";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-8b-8192";

const SYSTEM_PROMPT = `You are the AI fitness assistant for Infinity Fitness Gym Kaithal — Kaithal's #1 fitness destination.
You help users with:
- Gym membership plans and pricing
- Workout programs and fitness advice
- Trainer information
- Gym timings and facilities
- Diet and nutrition tips
- Motivation and fitness goals

Gym details:
- Location: Kaithal, Haryana 136027
- Phone: +91 90348 32951
- Email: join@infinitygym.in
- Services: Bodybuilding, CrossFit, Yoga, Aerobics, Cardio, Personal Training

Keep answers short, friendly, motivating, and in the same language the user writes in (Hindi or English).
If asked something unrelated to fitness or the gym, politely redirect to fitness topics.`;

type Message = { role: "user" | "assistant"; content: string };

export default function GymChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "💪 Namaste! Main Infinity Fitness Gym ka AI Trainer hoon.\n\nMembership, workout plans, diet tips — kuch bhi poochho, main help karunga!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...updated],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Maafi, kuch gadbad ho gayi. Dobara try karo!";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Connection error. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Right-side 3D trigger tab ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="tab"
            onClick={() => setOpen(true)}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ scale: 1.04, x: -4 }}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              padding: "18px 10px",
              background: "linear-gradient(180deg, rgba(8,6,22,0.97) 0%, rgba(14,10,36,0.97) 100%)",
              border: "1px solid rgba(202,169,37,0.35)",
              borderRight: "none",
              borderRadius: "16px 0 0 16px",
              cursor: "pointer",
              boxShadow: "-6px 0 40px rgba(202,169,37,0.18), -2px 0 12px rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Avatar */}
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              overflow: "hidden", border: "2px solid hsl(46,100%,50%)",
              boxShadow: "0 0 14px rgba(202,169,37,0.45)",
            }}>
              <img src={botAvatar} alt="AI Trainer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Vertical text */}
            <div style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <Dumbbell style={{ width: 11, height: 11, color: "hsl(46,100%,55%)" }} />
              AI Trainer
            </div>

            {/* Online dot */}
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.8)",
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── 3D Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ x: 480, opacity: 0, rotateY: 25, scale: 0.92 }}
            animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ x: 480, opacity: 0, rotateY: 25, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 9999,
              width: "400px",
              height: "600px",
              display: "flex",
              flexDirection: "column",
              /* 3D card effect */
              perspective: "1000px",
              transformStyle: "preserve-3d",
              borderRadius: "20px 0 0 20px",
              background: "linear-gradient(160deg, rgba(10,8,28,0.98) 0%, rgba(16,11,40,0.98) 50%, rgba(8,6,20,0.98) 100%)",
              border: "1px solid rgba(202,169,37,0.3)",
              borderRight: "none",
              boxShadow: `
                -8px 0 60px rgba(202,169,37,0.18),
                -4px 0 20px rgba(0,0,0,0.7),
                inset 1px 0 0 rgba(202,169,37,0.08),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
              backdropFilter: "blur(20px)",
              overflow: "hidden",
            }}
          >
            {/* Top gold accent line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent 0%, hsl(46,100%,50%) 40%, hsl(270,72%,55%) 100%)",
              zIndex: 2,
            }} />

            {/* Background glow blobs */}
            <div style={{
              position: "absolute", top: "-60px", right: "-60px",
              width: "200px", height: "200px",
              background: "radial-gradient(circle, rgba(202,169,37,0.08) 0%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "-40px", left: "-40px",
              width: "180px", height: "180px",
              background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />

            {/* ── Header ── */}
            <div style={{
              padding: "18px 20px 14px",
              background: "linear-gradient(135deg, rgba(202,169,37,0.1) 0%, rgba(139,92,246,0.08) 100%)",
              borderBottom: "1px solid rgba(202,169,37,0.14)",
              display: "flex", alignItems: "center", gap: "14px",
              flexShrink: 0, position: "relative", zIndex: 1,
            }}>
              {/* 3D Avatar */}
              <motion.div
                whileHover={{ scale: 1.08, rotateY: 10, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                style={{
                  width: "54px", height: "54px", borderRadius: "14px",
                  overflow: "hidden", border: "2px solid hsl(46,100%,50%)",
                  boxShadow: "0 0 20px rgba(202,169,37,0.4), 0 6px 20px rgba(0,0,0,0.5)",
                  flexShrink: 0, transformStyle: "preserve-3d",
                }}
              >
                <img src={botAvatar} alt="AI Trainer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "0.9rem", fontWeight: 900, color: "#fff",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <Dumbbell style={{ width: 15, height: 15, color: "hsl(46,100%,55%)" }} />
                  Infinity AI Trainer
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.8)",
                    display: "inline-block",
                  }} />
                  <span style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                    Online • Powered by Groq AI
                  </span>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}
              >
                <X style={{ width: 15, height: 15, color: "rgba(255,255,255,0.6)" }} />
              </motion.button>
            </div>

            {/* ── Messages ── */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px 16px 8px",
              display: "flex", flexDirection: "column", gap: "12px",
              scrollbarWidth: "thin", scrollbarColor: "rgba(202,169,37,0.2) transparent",
              position: "relative", zIndex: 1,
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end", gap: "8px",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "9px",
                      overflow: "hidden", border: "1.5px solid hsl(46,100%,50%)",
                      flexShrink: 0,
                      boxShadow: "0 0 10px rgba(202,169,37,0.3)",
                    }}>
                      <img src={botAvatar} alt="bot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.01, rotateX: msg.role === "user" ? -1 : 1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      maxWidth: "76%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, hsl(46,100%,48%) 0%, hsl(46,100%,34%) 100%)"
                        : "rgba(255,255,255,0.06)",
                      border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: msg.role === "user"
                        ? "0 4px 16px rgba(202,169,37,0.25), 0 2px 6px rgba(0,0,0,0.3)"
                        : "0 2px 10px rgba(0,0,0,0.25)",
                      fontSize: "0.82rem", lineHeight: 1.6,
                      color: msg.role === "user" ? "#000" : "rgba(255,255,255,0.88)",
                      fontWeight: msg.role === "user" ? 600 : 400,
                      wordBreak: "break-word", whiteSpace: "pre-wrap",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {msg.content}
                  </motion.div>
                  {msg.role === "user" && (
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "9px",
                      background: "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,40%) 100%)",
                      flexShrink: 0, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "0.72rem",
                      fontWeight: 800, color: "#fff",
                      boxShadow: "0 0 10px rgba(139,92,246,0.35)",
                    }}>U</div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "9px",
                    overflow: "hidden", border: "1.5px solid hsl(46,100%,50%)",
                    flexShrink: 0, boxShadow: "0 0 10px rgba(202,169,37,0.3)",
                  }}>
                    <img src={botAvatar} alt="bot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{
                    padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                  }}>
                    <Loader2 style={{ width: 14, height: 14, color: "hsl(46,100%,55%)", animation: "spin 1s linear infinite" }} />
                    <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.4)" }}>Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div style={{
              padding: "12px 16px 16px",
              borderTop: "1px solid rgba(202,169,37,0.12)",
              background: "rgba(0,0,0,0.3)",
              display: "flex", gap: "10px", alignItems: "center",
              flexShrink: 0, position: "relative", zIndex: 1,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Apna sawaal likho..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(202,169,37,0.2)",
                  borderRadius: "12px",
                  padding: "11px 16px",
                  color: "#fff", fontSize: "0.84rem",
                  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(202,169,37,0.6)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202,169,37,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(202,169,37,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                whileHover={input.trim() && !loading ? { scale: 1.1, rotateZ: -5 } : {}}
                whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
                style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, hsl(46,100%,50%) 0%, hsl(46,100%,36%) 100%)"
                    : "rgba(255,255,255,0.06)",
                  border: "none",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.22s",
                  boxShadow: input.trim() && !loading ? "0 4px 16px rgba(202,169,37,0.3)" : "none",
                }}
              >
                <Send style={{ width: 18, height: 18, color: input.trim() && !loading ? "#000" : "rgba(255,255,255,0.25)" }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
