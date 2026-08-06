import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, RotateCcw, Dumbbell, Salad, Pill, TrendingUp, BookOpen, HelpCircle } from "lucide-react";
import botMascot from "@assets/download_(1)_1785998958070.jpg";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are the AI fitness assistant "Gym Bot" for Infinity Fitness Gym Kaithal — Kaithal's #1 fitness destination.
Help users with workout plans, diet and nutrition, supplements, progress tracking, exercise technique, membership pricing, and motivation.
Gym: Kaithal, Haryana 136027 | Phone: +91 90348 32951 | Email: join@infinitygym.in
Services: Bodybuilding, CrossFit, Yoga, Aerobics, Cardio, Personal Training.
Keep replies short, friendly, motivating. Use bullet points for plans. Reply in the same language the user uses (Hindi or English).`;

type Message = { role: "user" | "assistant"; content: string; time: string };
const getTime = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const quickActions = [
  { icon: Dumbbell,   label: "Workout Plan",    sub: "Custom workout plans for you",      prompt: "Mujhe ek custom workout plan chahiye." },
  { icon: Salad,      label: "Diet Plan",        sub: "Nutrition plans and meal tips",     prompt: "Mujhe diet plan aur nutrition tips chahiye." },
  { icon: Pill,       label: "Supplements",      sub: "Best supplements guidance",         prompt: "Supplements ke baare mein guide karo." },
  { icon: TrendingUp, label: "Progress Tracker", sub: "Track your workouts and progress",  prompt: "Progress track karne ke tips do." },
  { icon: BookOpen,   label: "Exercise Library", sub: "Learn exercises with videos",       prompt: "Popular exercises aur unki correct form batao." },
  { icon: HelpCircle, label: "General Questions",sub: "Ask anything fitness related",      prompt: "Fitness ke baare mein general tips do." },
];

export default function GymBotSection() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! 👋\nI'm your Gym Buddy.\nHow can I help you today?", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
          model: "llama3-8b-8192",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...updated.map(m => ({ role: m.role, content: m.content }))],
          max_tokens: 300,
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
    <section id="gymbot" className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080614 0%, #0d0b1e 50%, #080614 100%)" }}
    >
      {/* Background glow blobs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(202,169,37,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container mx-auto px-4" style={{ maxWidth: "860px" }}>

        {/* Section heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">AI Powered</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-white">
            Your Personal <span className="text-gradient-gold">Gym Bot</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Ask anything — workout plans, diet tips, supplements & more</p>
        </motion.div>

        {/* ── 3D Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: "24px",
            background: "#0e0c22",
            border: "1px solid rgba(202,169,37,0.25)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(202,169,37,0.1)",
            overflow: "hidden",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Gold top accent line */}
          <div style={{ height: "3px", background: "linear-gradient(90deg, #6228d7 0%, hsl(46,100%,50%) 50%, #ee2a7b 100%)" }} />

          {/* ── HEADER ── */}
          <div style={{
            padding: "14px 20px",
            background: "linear-gradient(135deg, rgba(15,10,38,0.98) 0%, rgba(22,14,50,0.98) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            {/* Logo area */}
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(202,169,37,0.2) 0%, rgba(139,92,246,0.15) 100%)",
              border: "1.5px solid rgba(202,169,37,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Dumbbell style={{ width: 18, height: 18, color: "hsl(46,100%,55%)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff", letterSpacing: "0.07em", lineHeight: 1 }}>GYM BOT</div>
              <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginTop: "3px", textTransform: "uppercase" }}>Your Fitness Partner</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.07em" }}>ONLINE</span>
            </div>
            <motion.button onClick={reset} whileHover={{ rotate: -180 }} transition={{ duration: 0.4 }}
              title="Reset chat"
              style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RotateCcw style={{ width: 14, height: 14, color: "rgba(255,255,255,0.5)" }} />
            </motion.button>
          </div>

          {/* ── BODY: mascot + chat ── */}
          <div style={{ display: "flex", height: "340px" }}>

            {/* Mascot panel */}
            <div style={{
              width: "200px", flexShrink: 0,
              background: "linear-gradient(180deg, #1c0a0a 0%, #0e0c22 100%)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              overflow: "hidden", position: "relative",
            }}>
              {/* Motivational text behind mascot */}
              <div style={{ position: "absolute", top: "16px", left: "14px", zIndex: 0 }}>
                {["DISCIPLINE", "TODAY", "STRENGTH", "TOMORROW"].map((w, i) => (
                  <div key={i} style={{
                    fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.04em",
                    color: i % 2 === 0 ? "rgba(255,255,255,0.08)" : "rgba(202,169,37,0.12)",
                    lineHeight: 1.5,
                  }}>{w}</div>
                ))}
              </div>
              {/* Glow */}
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "180px", height: "200px", background: "radial-gradient(ellipse, rgba(202,169,37,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />
              <motion.img
                src={botMascot}
                alt="Gym Bot Mascot"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                style={{ width: "185px", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 24px rgba(202,169,37,0.35))" }}
              />
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px 16px 10px",
              display: "flex", flexDirection: "column", gap: "12px",
              scrollbarWidth: "thin", scrollbarColor: "rgba(202,169,37,0.15) transparent",
            }}>
              {messages.map((msg, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: "3px" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                    {/* User avatar */}
                    {msg.role === "user" && (
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, hsl(270,72%,55%), hsl(270,72%,38%))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, color: "#fff", flexShrink: 0, boxShadow: "0 0 10px rgba(139,92,246,0.4)" }}>
                        U
                      </div>
                    )}
                    <div style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, hsl(46,100%,46%) 0%, hsl(36,90%,34%) 100%)"
                        : "rgba(255,255,255,0.06)",
                      border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: msg.role === "user" ? "0 4px 16px rgba(202,169,37,0.28)" : "0 2px 10px rgba(0,0,0,0.3)",
                      fontSize: "0.82rem", lineHeight: 1.6,
                      color: msg.role === "user" ? "#000" : "rgba(255,255,255,0.9)",
                      fontWeight: msg.role === "user" ? 700 : 400,
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}>
                      {msg.role === "assistant"
                        ? msg.content.split(/(Gym Buddy|Infinity Fitness Gym|What would you like to know\?)/g).map((part, j) =>
                            ["Gym Buddy", "What would you like to know?"].includes(part)
                              ? <span key={j} style={{ color: "hsl(46,100%,58%)", fontWeight: 700 }}>{part}</span>
                              : part === "Infinity Fitness Gym"
                              ? <span key={j} style={{ color: "hsl(46,100%,58%)", fontWeight: 700 }}>{part}</span>
                              : part
                          )
                        : msg.content}
                    </div>
                  </div>
                  <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.22)", paddingLeft: msg.role === "user" ? 0 : "4px", paddingRight: msg.role === "user" ? "36px" : 0 }}>
                    {msg.time}{msg.role === "user" ? " ✓✓" : ""}
                  </span>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.65, delay: i * 0.14 }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "hsl(46,100%,55%)", display: "inline-block" }}
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
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.3)",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px",
          }}>
            {quickActions.map(({ icon: Icon, label, sub, prompt }) => (
              <motion.button key={label}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 24px rgba(202,169,37,0.18)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "10px 10px 8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "flex-start", gap: "9px", textAlign: "left",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(202,169,37,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(202,169,37,0.12)", border: "1px solid rgba(202,169,37,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 13, height: 13, color: "hsl(46,100%,55%)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, color: "rgba(255,255,255,0.88)", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
                  <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", marginTop: "2px", lineHeight: 1.4 }}>{sub}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* ── INPUT BAR ── */}
          <div style={{
            padding: "10px 16px 14px",
            borderTop: "1px solid rgba(202,169,37,0.1)",
            background: "rgba(0,0,0,0.4)",
            display: "flex", gap: "10px", alignItems: "center",
          }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "rgba(202,169,37,0.1)", border: "1px solid rgba(202,169,37,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Dumbbell style={{ width: 15, height: 15, color: "hsl(46,100%,55%)" }} />
            </div>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                padding: "10px 16px", color: "#fff", fontSize: "0.84rem",
                outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "rgba(202,169,37,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202,169,37,0.07)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
            />
            <motion.button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              whileHover={input.trim() && !loading ? { scale: 1.1 } : {}}
              whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
              style={{
                width: "42px", height: "42px", borderRadius: "12px", border: "none", flexShrink: 0,
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, hsl(46,100%,50%) 0%, hsl(36,90%,36%) 100%)"
                  : "rgba(255,255,255,0.06)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: input.trim() && !loading ? "0 4px 16px rgba(202,169,37,0.35)" : "none",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
            >
              {loading
                ? <Loader2 style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)", animation: "spin 1s linear infinite" }} />
                : <Send style={{ width: 16, height: 16, color: input.trim() && !loading ? "#000" : "rgba(255,255,255,0.25)" }} />
              }
            </motion.button>
          </div>

          {/* ── Footer tagline ── */}
          <div style={{
            padding: "8px 16px 10px",
            background: "rgba(0,0,0,0.5)",
            borderTop: "1px solid rgba(202,169,37,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>⚡ TRAIN HARD.</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", color: "hsl(46,100%,50%)" }}>STAY FOCUSED.</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>BE STRONG. ⚡</span>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
