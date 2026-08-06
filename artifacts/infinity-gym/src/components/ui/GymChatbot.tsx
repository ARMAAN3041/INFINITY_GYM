import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, X, RotateCcw, Dumbbell, Salad, Pill, TrendingUp, BookOpen, HelpCircle } from "lucide-react";
import botAvatar from "@assets/download_(1)_1785998958070.jpg";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-8b-8192";

const SYSTEM_PROMPT = `You are the AI fitness assistant "Gym Bot" for Infinity Fitness Gym Kaithal — Kaithal's #1 fitness destination.
Help users with:
- Workout plans and exercise guidance
- Diet and nutrition plans
- Supplements advice
- Progress tracking tips
- Exercise library and technique
- Membership plans and pricing
- Gym timings and facilities
- Motivation and fitness goals

Gym: Location: Kaithal, Haryana 136027 | Phone: +91 90348 32951 | Email: join@infinitygym.in

Keep answers short, friendly, and motivating. Respond in the same language the user writes in (Hindi or English).
Use bullet points for plans. End with a motivating line.`;

type Message = { role: "user" | "assistant"; content: string; time: string };

const getTime = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const quickActions = [
  { icon: Dumbbell,    label: "Workout Plan",      sub: "Custom plans for you",        prompt: "Mujhe ek custom workout plan chahiye." },
  { icon: Salad,       label: "Diet Plan",          sub: "Nutrition & meal tips",       prompt: "Mujhe diet plan aur nutrition tips chahiye." },
  { icon: Pill,        label: "Supplements",        sub: "Best supplement guidance",    prompt: "Supplements ke baare mein guide karo." },
  { icon: TrendingUp,  label: "Progress Tracker",   sub: "Track workouts & progress",  prompt: "Progress track karne ke tips do." },
  { icon: BookOpen,    label: "Exercise Library",   sub: "Learn exercises & form",      prompt: "Popular exercises aur unki form batao." },
  { icon: HelpCircle,  label: "General Questions",  sub: "Ask anything fitness",       prompt: "Fitness ke baare mein general tips do." },
];

export default function GymChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! 👋\nI'm your Gym Buddy.\nHow can I help you today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text = input.trim()) => {
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text, time: getTime() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...updated.map(m => ({ role: m.role, content: m.content }))],
          max_tokens: 320,
          temperature: 0.75,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Maafi, kuch gadbad ho gayi. Dobara try karo!";
      setMessages(p => [...p, { role: "assistant", content: reply, time: getTime() }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Connection error. Please try again!", time: getTime() }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([{ role: "assistant", content: "Hey! 👋\nI'm your Gym Buddy.\nHow can I help you today?", time: getTime() }]);
    setInput("");
  };

  return (
    <>
      {/* ── Floating trigger tab (right side) ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="trigger"
            onClick={() => setOpen(true)}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ x: -6, boxShadow: "-8px 0 40px rgba(202,169,37,0.35)" }}
            style={{
              position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
              zIndex: 9999, display: "flex", flexDirection: "column",
              alignItems: "center", gap: "10px", padding: "16px 10px",
              background: "linear-gradient(180deg, #0c0920 0%, #10082e 100%)",
              border: "1px solid rgba(202,169,37,0.4)", borderRight: "none",
              borderRadius: "16px 0 0 16px", cursor: "pointer",
              boxShadow: "-4px 0 30px rgba(202,169,37,0.15), -2px 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              overflow: "hidden", border: "2px solid hsl(46,100%,50%)",
              boxShadow: "0 0 12px rgba(202,169,37,0.5)", flexShrink: 0,
            }}>
              <img src={botAvatar} alt="Gym Bot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{
              writingMode: "vertical-rl", transform: "rotate(180deg)",
              fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
            }}>Gym Bot</span>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 8px #22c55e",
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Main 3D Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="gymbot"
            initial={{ x: 460, opacity: 0, rotateY: 20 }}
            animate={{ x: 0,   opacity: 1, rotateY: 0  }}
            exit={{   x: 460, opacity: 0, rotateY: 20  }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            style={{
              position: "fixed", right: 0, top: "50%",
              transform: "translateY(-50%)",
              zIndex: 9999,
              width: "420px",
              height: "620px",
              display: "flex", flexDirection: "column",
              borderRadius: "20px 0 0 20px",
              background: "#0d0b1e",
              border: "1px solid rgba(202,169,37,0.22)", borderRight: "none",
              boxShadow: `
                -12px 0 80px rgba(202,169,37,0.14),
                -6px 0 30px rgba(0,0,0,0.7),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `,
              overflow: "hidden",
              transformStyle: "preserve-3d",
              perspective: "1200px",
            }}
          >
            {/* Gold top line */}
            <div style={{
              height: "2.5px",
              background: "linear-gradient(90deg, transparent, hsl(46,100%,50%) 40%, hsl(270,72%,55%) 100%)",
              flexShrink: 0,
            }} />

            {/* ── HEADER ── */}
            <div style={{
              padding: "12px 16px",
              background: "linear-gradient(135deg, rgba(15,10,35,0.98) 0%, rgba(20,13,45,0.98) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: "10px",
              flexShrink: 0,
            }}>
              <img src={botAvatar} alt="logo" style={{
                width: "32px", height: "32px", borderRadius: "8px",
                border: "1.5px solid hsl(46,100%,50%)",
                objectFit: "cover", flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>
                  GYM BOT
                </div>
                <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", marginTop: "2px" }}>
                  YOUR FITNESS PARTNER
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "8px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.06em" }}>ONLINE</span>
              </div>
              <motion.button onClick={reset} whileHover={{ rotate: -180 }} transition={{ duration: 0.35 }}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", width: "28px", height: "28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <RotateCcw style={{ width: 13, height: 13, color: "rgba(255,255,255,0.5)" }} />
              </motion.button>
              <motion.button onClick={() => setOpen(false)} whileHover={{ scale: 1.1, rotate: 90 }} transition={{ duration: 0.2 }}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", width: "28px", height: "28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X style={{ width: 13, height: 13, color: "rgba(255,255,255,0.5)" }} />
              </motion.button>
            </div>

            {/* ── BODY: mascot + messages ── */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

              {/* Left mascot panel */}
              <div style={{
                width: "120px", flexShrink: 0,
                background: "linear-gradient(180deg, #1a0a0a 0%, #0d0b1e 100%)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                overflow: "hidden", position: "relative",
              }}>
                {/* Glow behind mascot */}
                <div style={{
                  position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
                  width: "120px", height: "200px",
                  background: "radial-gradient(ellipse, rgba(202,169,37,0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <motion.img
                  src={botAvatar}
                  alt="Gym Mascot"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  style={{
                    width: "110px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 18px rgba(202,169,37,0.4))",
                    position: "relative", zIndex: 1,
                  }}
                />
              </div>

              {/* Right: messages */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "14px 12px 8px",
                display: "flex", flexDirection: "column", gap: "10px",
                scrollbarWidth: "thin", scrollbarColor: "rgba(202,169,37,0.15) transparent",
              }}>
                {messages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}
                  >
                    <div style={{
                      maxWidth: "90%",
                      padding: "9px 12px",
                      borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, hsl(46,100%,44%) 0%, hsl(36,90%,35%) 100%)"
                        : "rgba(255,255,255,0.07)",
                      border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: msg.role === "user"
                        ? "0 4px 14px rgba(202,169,37,0.3)"
                        : "0 2px 8px rgba(0,0,0,0.3)",
                      fontSize: "0.78rem", lineHeight: 1.6,
                      color: msg.role === "user" ? "#000" : "rgba(255,255,255,0.88)",
                      fontWeight: msg.role === "user" ? 700 : 400,
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}>
                      {/* Highlight colored words in assistant messages */}
                      {msg.role === "assistant"
                        ? msg.content.split(/(Gym Buddy|Infinity Fitness Gym|💪)/g).map((part, j) =>
                            ["Gym Buddy", "Infinity Fitness Gym"].includes(part)
                              ? <span key={j} style={{ color: "hsl(46,100%,55%)", fontWeight: 700 }}>{part}</span>
                              : part
                          )
                        : msg.content}
                    </div>
                    <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", marginTop: "3px", paddingLeft: "4px", paddingRight: "4px" }}>
                      {msg.time}{msg.role === "user" ? " ✓✓" : ""}
                    </span>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      padding: "9px 12px", borderRadius: "14px 14px 14px 3px",
                      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      {[0, 1, 2].map(i => (
                        <motion.span key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(46,100%,55%)", display: "inline-block" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div style={{
              padding: "8px 12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.25)",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px",
              flexShrink: 0,
            }}>
              {quickActions.map(({ icon: Icon, label, sub, prompt }) => (
                <motion.button key={label}
                  onClick={() => sendMessage(prompt)}
                  disabled={loading}
                  whileHover={{ scale: 1.04, y: -2, boxShadow: "0 6px 20px rgba(202,169,37,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "10px", padding: "7px 6px",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px",
                    textAlign: "left",
                  }}
                >
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "7px",
                    background: "rgba(202,169,37,0.15)",
                    border: "1px solid rgba(202,169,37,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 12, height: 12, color: "hsl(46,100%,55%)" }} />
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: "0.53rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>{sub}</div>
                </motion.button>
              ))}
            </div>

            {/* ── INPUT BAR ── */}
            <div style={{
              padding: "10px 12px 12px",
              borderTop: "1px solid rgba(202,169,37,0.1)",
              background: "rgba(0,0,0,0.35)",
              display: "flex", gap: "8px", alignItems: "center", flexShrink: 0,
            }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: "rgba(202,169,37,0.1)", border: "1px solid rgba(202,169,37,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Dumbbell style={{ width: 14, height: 14, color: "hsl(46,100%,55%)" }} />
              </div>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(202,169,37,0.18)", borderRadius: "10px",
                  padding: "9px 13px", color: "#fff", fontSize: "0.8rem",
                  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "rgba(202,169,37,0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202,169,37,0.07)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(202,169,37,0.18)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                whileHover={input.trim() && !loading ? { scale: 1.1 } : {}}
                whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
                style={{
                  width: "38px", height: "38px", borderRadius: "10px", border: "none",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, hsl(46,100%,50%) 0%, hsl(36,90%,38%) 100%)"
                    : "rgba(255,255,255,0.06)",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: input.trim() && !loading ? "0 4px 14px rgba(202,169,37,0.35)" : "none",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
              >
                {loading
                  ? <Loader2 style={{ width: 15, height: 15, color: "rgba(255,255,255,0.4)", animation: "spin 1s linear infinite" }} />
                  : <Send style={{ width: 15, height: 15, color: input.trim() ? "#000" : "rgba(255,255,255,0.25)" }} />
                }
              </motion.button>
            </div>

            {/* ── Footer tagline ── */}
            <div style={{
              padding: "7px 16px",
              background: "rgba(0,0,0,0.4)",
              borderTop: "1px solid rgba(202,169,37,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>TRAIN HARD.</span>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "hsl(46,100%,50%)" }}>STAY FOCUSED.</span>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>BE STRONG.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
