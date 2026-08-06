import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ChevronDown, Dumbbell } from "lucide-react";
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
      content:
        "💪 Namaste! Main Infinity Fitness Gym ka AI Trainer hoon. Membership, workout, diet — kuch bhi poochho!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...updated],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ??
        "Maafi, kuch gadbad ho gayi. Dobara try karo!";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "Connection error. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Fixed bottom panel ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "780px",
            pointerEvents: "auto",
            borderRadius: open ? "20px 20px 0 0" : "20px 20px 0 0",
            overflow: "hidden",
            boxShadow: "0 -4px 40px rgba(202,169,37,0.15), 0 -2px 12px rgba(0,0,0,0.5)",
            border: "1px solid rgba(202,169,37,0.22)",
            borderBottom: "none",
            background: "rgba(6,5,18,0.98)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* ── Trigger bar ── */}
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderBottom: open ? "1px solid rgba(202,169,37,0.14)" : "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(202,169,37,0.05)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "transparent")
            }
          >
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1.5px solid hsl(46,100%,50%)",
                flexShrink: 0,
              }}
            >
              <img
                src={botAvatar}
                alt="AI Trainer"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Title */}
            <div style={{ flex: 1, textAlign: "left" }}>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <Dumbbell style={{ width: 14, height: 14, color: "hsl(46,100%,55%)" }} />
                Infinity AI Trainer
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                {open ? "Chat band karne ke liye click karo" : "Fitness ke baare mein poochho — AI se"}
              </div>
            </div>

            {/* Online dot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginRight: "8px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>
                Online
              </span>
            </div>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <ChevronDown style={{ width: 18, height: 18, color: "rgba(255,255,255,0.4)" }} />
            </motion.div>
          </button>

          {/* ── Chat panel ── */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="chatpanel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 380, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* Messages area */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "14px 18px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(202,169,37,0.18) transparent",
                    height: "310px",
                  }}
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        display: "flex",
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        alignItems: "flex-end",
                        gap: "8px",
                      }}
                    >
                      {msg.role === "assistant" && (
                        <div
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1.5px solid hsl(46,100%,50%)",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={botAvatar}
                            alt="bot"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "72%",
                          padding: "8px 13px",
                          borderRadius:
                            msg.role === "user"
                              ? "14px 14px 3px 14px"
                              : "14px 14px 14px 3px",
                          background:
                            msg.role === "user"
                              ? "linear-gradient(135deg, hsl(46,100%,46%) 0%, hsl(46,100%,34%) 100%)"
                              : "rgba(255,255,255,0.055)",
                          border:
                            msg.role === "user"
                              ? "none"
                              : "1px solid rgba(255,255,255,0.07)",
                          fontSize: "0.8rem",
                          lineHeight: 1.55,
                          color: msg.role === "user" ? "#000" : "rgba(255,255,255,0.88)",
                          fontWeight: msg.role === "user" ? 600 : 400,
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "8px",
                            background:
                              "linear-gradient(135deg, hsl(270,72%,55%) 0%, hsl(270,72%,40%) 100%)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            color: "#fff",
                          }}
                        >
                          U
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1.5px solid hsl(46,100%,50%)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={botAvatar}
                          alt="bot"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div
                        style={{
                          padding: "8px 13px",
                          borderRadius: "14px 14px 14px 3px",
                          background: "rgba(255,255,255,0.055)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Loader2
                          style={{
                            width: 13,
                            height: 13,
                            color: "hsl(46,100%,55%)",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                          Typing...
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input bar */}
                <div
                  style={{
                    padding: "10px 16px 12px",
                    borderTop: "1px solid rgba(202,169,37,0.1)",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    background: "rgba(0,0,0,0.25)",
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    placeholder="Apna sawaal likho..."
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(202,169,37,0.18)",
                      borderRadius: "10px",
                      padding: "9px 14px",
                      color: "#fff",
                      fontSize: "0.82rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(202,169,37,0.55)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(202,169,37,0.18)")
                    }
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    whileHover={input.trim() && !loading ? { scale: 1.07 } : {}}
                    whileTap={input.trim() && !loading ? { scale: 0.93 } : {}}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        input.trim() && !loading
                          ? "linear-gradient(135deg, hsl(46,100%,50%) 0%, hsl(46,100%,36%) 100%)"
                          : "rgba(255,255,255,0.06)",
                      border: "none",
                      cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.22s",
                    }}
                  >
                    <Send
                      style={{
                        width: 16,
                        height: 16,
                        color:
                          input.trim() && !loading ? "#000" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
