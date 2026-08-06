import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
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

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function GymChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "💪 Namaste! Main Infinity Fitness Gym ka AI trainer hoon. Fitness, membership, ya gym ke baare mein kuch bhi poochho!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
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
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Maafi, kuch gadbad ho gayi. Dobara try karo!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 10000,
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          border: "2.5px solid hsl(46,100%,50%)",
          background: "#0a0a0a",
          boxShadow: open
            ? "0 0 0 4px rgba(202,169,37,0.2), 0 8px 32px rgba(0,0,0,0.6)"
            : "0 0 20px rgba(202,169,37,0.35), 0 8px 24px rgba(0,0,0,0.5)",
          cursor: "pointer",
          overflow: "hidden",
          padding: 0,
          transition: "box-shadow 0.3s",
        }}
        aria-label="Open fitness chatbot"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
            >
              <X style={{ color: "hsl(46,100%,55%)", width: 26, height: 26 }} />
            </motion.div>
          ) : (
            <motion.img
              key="avatar"
              src={botAvatar}
              alt="AI Trainer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "24px",
              zIndex: 9999,
              width: "min(360px, calc(100vw - 32px))",
              height: "480px",
              borderRadius: "20px",
              background: "rgba(8,7,20,0.97)",
              border: "1px solid rgba(202,169,37,0.25)",
              boxShadow: "0 0 40px rgba(202,169,37,0.12), 0 20px 60px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "14px 16px",
              background: "linear-gradient(135deg, rgba(202,169,37,0.15) 0%, rgba(139,92,246,0.1) 100%)",
              borderBottom: "1px solid rgba(202,169,37,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "50%",
                border: "2px solid hsl(46,100%,50%)",
                overflow: "hidden", flexShrink: 0,
              }}>
                <img src={botAvatar} alt="AI Trainer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>
                  Infinity AI Trainer
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Online • Infinity Fitness Gym</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(202,169,37,0.2) transparent",
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      border: "1.5px solid hsl(46,100%,50%)",
                      overflow: "hidden", flexShrink: 0,
                    }}>
                      <img src={botAvatar} alt="bot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "75%",
                    padding: "9px 13px",
                    borderRadius: msg.role === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, hsl(46,100%,45%) 0%, hsl(46,100%,35%) 100%)"
                      : "rgba(255,255,255,0.06)",
                    border: msg.role === "user"
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    color: msg.role === "user" ? "#000" : "rgba(255,255,255,0.9)",
                    fontWeight: msg.role === "user" ? 600 : 400,
                    wordBreak: "break-word",
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    border: "1.5px solid hsl(46,100%,50%)",
                    overflow: "hidden", flexShrink: 0,
                  }}>
                    <img src={botAvatar} alt="bot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    <Loader2 style={{ width: 14, height: 14, color: "hsl(46,100%,55%)", animation: "spin 1s linear infinite" }} />
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Typing...</span>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(202,169,37,0.12)",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Kuch poochho..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(202,169,37,0.2)",
                  borderRadius: "12px",
                  padding: "9px 14px",
                  color: "#fff",
                  fontSize: "0.82rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,169,37,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(202,169,37,0.2)")}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: "38px", height: "38px",
                  borderRadius: "10px",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, hsl(46,100%,50%) 0%, hsl(46,100%,38%) 100%)"
                    : "rgba(255,255,255,0.06)",
                  border: "none",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <Send style={{ width: 16, height: 16, color: input.trim() && !loading ? "#000" : "rgba(255,255,255,0.3)" }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
