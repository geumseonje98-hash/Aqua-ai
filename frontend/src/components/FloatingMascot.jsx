import React, { useEffect, useState } from "react";
import AquaMascot from "./AquaMascot";
import { MessageCircleHeart } from "lucide-react";

const TIPS = [
  "Hey there! I'm Aqua 💧 — your water safety buddy!",
  "Drink a glass of water right now, your future self will thank you 🌊",
  "Curious about your tap water? Try Check My Water!",
  "3% of Earth's water is fresh — let's save every drop.",
  "Ask me anything about pH, TDS, chloramines or oceans ✨",
];

export default function FloatingMascot({ onOpenChat }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3 select-none">
      {open && (
        <div
          data-testid="anime-mascot-speech-bubble"
          className="relative max-w-[260px] p-3 pr-4 rounded-2xl bg-white/95 text-slate-800 shadow-xl speech font-mascot text-sm animate-bob"
          style={{ marginBottom: "24px" }}
        >
          {TIPS[tipIndex]}
          <button
            onClick={onOpenChat}
            data-testid="mascot-chat-shortcut"
            className="mt-2 inline-flex items-center gap-1.5 text-cyan-700 hover:text-cyan-900 text-xs font-semibold"
          >
            <MessageCircleHeart size={14} /> Chat with me →
          </button>
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-white text-xs"
            aria-label="Close tip"
            data-testid="mascot-close-tip"
          >×</button>
        </div>
      )}

      <button
        data-testid="floating-mascot-button"
        onClick={() => setOpen((o) => !o)}
        className="relative animate-float-y focus:outline-none"
        aria-label="Open Aqua"
      >
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
        <AquaMascot size={96} expression="wave" waving />
      </button>
    </div>
  );
}
