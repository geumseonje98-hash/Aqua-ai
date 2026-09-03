import React, { useEffect, useRef, useState } from "react";
import MizukiMascot from "./AquaMascot";
import { Send, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SESSION_KEY = "aqua_ai_session_id";

const PROMPTS = [
  "What are 3 easy ways to save water at home?",
  "Tell me a fun fact about jellyfish 🌊",
  "Is a pH of 6.4 safe for drinking water?",
  "How does bioluminescence work?",
];

function getSessionId() {
  let s = localStorage.getItem(SESSION_KEY);
  if (!s) {
    s = "aq-" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem(SESSION_KEY, s);
  }
  return s;
}

export default function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const sessionId = useRef(getSessionId());
  const listRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/chat/history/${sessionId.current}`);
        const data = await r.json();
        setMessages(data);
      } catch { /* ignore */ }
    })();
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "user", content: msg, id: Math.random().toString(36) }]);
    setStreaming("");

    try {
      const resp = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId.current, message: msg }),
      });
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let assistant = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() || "";
        for (const p of parts) {
          if (!p.trim()) continue;
          if (p.startsWith("event: done")) continue;
          if (p.startsWith("event: error")) {
            toast.error("Stream error");
            continue;
          }
          const line = p.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          const chunk = line.replace(/^data:\s?/, "").replace(/\\n/g, "\n");
          assistant += chunk;
          setStreaming(assistant);
        }
      }
      setMessages((m) => [...m, { role: "assistant", content: assistant, id: Math.random().toString(36) }]);
      setStreaming("");
    } catch (e) {
      toast.error("Mizuki got splashed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    await fetch(`${API}/chat/history/${sessionId.current}`, { method: "DELETE" });
    setMessages([]);
    toast.success("Cleared this ocean of thoughts 🌊");
  };

  const renderContent = (t) => (
    <div className="chat-content whitespace-pre-wrap leading-relaxed">{t}</div>
  );

  return (
    <section id="chat" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs tracking-[0.24em] uppercase text-cyan-300 mb-3">AquaSafe Chatbot</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ask <span className="text-shimmer">Aqua</span> anything aquatic.
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl">
              Powered by Gemini 3.1 Pro. Streaming answers with heart, hydration and hydrology.
            </p>
          </div>
          <button
            onClick={clearAll}
            data-testid="chat-clear-button"
            className="aqua-btn-ghost text-sm"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Chat panel */}
          <div className="lg:col-span-8 glass-strong rounded-3xl p-4 md:p-6 flex flex-col" style={{ minHeight: 520 }}>
            <div
              ref={listRef}
              data-testid="chat-message-list"
              className="flex-1 overflow-y-auto pr-2 space-y-4"
              style={{ maxHeight: 520 }}
            >
              {messages.length === 0 && !streaming && (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 text-slate-300">
                  <MizukiMascot size={140} expression="guiding" />
                  <p className="mt-4 font-mascot text-lg">Say hi to Aqua! Or pick a splash prompt →</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={m.id || i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="shrink-0">
                      <MizukiMascot size={44} expression="happy" />
                    </div>
                  )}
                  <div
                    className={
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-[15px] " +
                      (m.role === "user"
                        ? "bg-gradient-to-br from-cyan-500 to-teal-400 text-slate-900 rounded-br-sm"
                        : "bg-slate-900/70 border border-cyan-400/20 text-slate-100 rounded-bl-sm")
                    }
                    data-testid={`chat-msg-${m.role}-${i}`}
                  >
                    {renderContent(m.content)}
                  </div>
                </div>
              ))}
              {streaming && (
                <div className="flex gap-3 justify-start">
                  <MizukiMascot size={44} expression="thinking" />
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-[15px] bg-slate-900/70 border border-cyan-400/20 text-slate-100 rounded-bl-sm">
                    {renderContent(streaming)}
                    <span className="inline-block w-2 h-4 bg-cyan-300 align-middle animate-pulse ml-1" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-cyan-400/15 pt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => send(p)}
                    data-testid={`chat-prompt-chip-${i}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 hover:bg-cyan-400/15 text-cyan-100 transition"
                  >
                    <Sparkles size={12} className="inline mr-1" /> {p}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-end gap-2"
              >
                <textarea
                  data-testid="chat-input-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  placeholder="Ask about oceans, water quality, hydration..."
                  rows={1}
                  className="flex-1 resize-none bg-slate-900/60 border border-cyan-400/25 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20"
                />
                <button
                  type="submit"
                  data-testid="chat-submit-button"
                  disabled={loading || !input.trim()}
                  className="aqua-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} /> Send
                </button>
              </form>
            </div>
          </div>

          {/* Mascot side card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="glass rounded-3xl p-6 card-hover">
              <div className="flex items-center gap-3">
                <MizukiMascot size={60} expression={loading ? "thinking" : "guiding"} />
                <div>
                  <div className="font-display text-lg font-bold">Aqua</div>
                  <div className="text-xs text-cyan-300">Gemini 3.1 Pro · online</div>
                </div>
              </div>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                I remember what we talk about in this session, so feel free to keep asking follow-ups.
                Try quizzes, water tips, or ocean trivia!
              </p>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-cyan-300 mb-2">Aqua loves</div>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Marine biology deep dives 🐠</li>
                <li>• Sustainability & conservation 🌱</li>
                <li>• Water chemistry (pH, TDS) 🧪</li>
                <li>• Hydration coaching 💧</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
