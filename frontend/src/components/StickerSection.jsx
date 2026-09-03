import React, { useRef, useState } from "react";
import AquaMascot from "./AquaMascot";
import { Download, Share2, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { downloadSticker, shareSticker } from "@/utils/aquaSticker";

const STICKERS = [
  { key: "happy",     expr: "happy",     label: "Happy",     accent: "from-cyan-300 to-sky-500",       waving: true  },
  { key: "cheer",     expr: "cheer",     label: "Overjoyed", accent: "from-emerald-300 to-teal-500",   waving: true  },
  { key: "worried",   expr: "worried",   label: "Worried",   accent: "from-amber-300 to-orange-500",   waving: false },
  { key: "shocked",   expr: "surprised", label: "Shocked",   accent: "from-rose-400 to-red-600",       waving: false },
  { key: "curious",   expr: "guiding",   label: "Curious",   accent: "from-fuchsia-300 to-pink-500",   waving: false },
  { key: "thinking",  expr: "thinking",  label: "Thinking",  accent: "from-indigo-300 to-blue-600",    waving: false },
];

function StickerCard({ item }) {
  const svgRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const findSvg = () => svgRef.current?.querySelector("svg");

  const handleDownload = async () => {
    setBusy(true);
    try {
      const ok = await downloadSticker(findSvg(), item.key, item.label);
      if (ok) toast.success(`Downloaded ${item.label} sticker`);
      else toast.error("Could not build sticker");
    } catch { toast.error("Download failed"); }
    finally { setBusy(false); }
  };

  const handleShare = async () => {
    setBusy(true);
    try {
      const shared = await shareSticker(findSvg(), item.key, item.label);
      if (!shared) {
        // fallback → download
        const ok = await downloadSticker(findSvg(), item.key, item.label);
        if (ok) toast("Share not available — sticker downloaded instead");
      } else {
        toast.success("Shared!");
      }
    } catch { toast.error("Share failed"); }
    finally { setBusy(false); }
  };

  const handleCopy = async () => {
    setBusy(true);
    try {
      const svg = findSvg();
      // build blob and copy to clipboard
      const { generateStickerPng } = await import("@/utils/aquaSticker");
      const blob = await generateStickerPng(svg, item.label);
      if (blob && window.ClipboardItem) {
        await navigator.clipboard.write([new window.ClipboardItem({ "image/png": blob })]);
        toast.success("Sticker copied to clipboard");
      } else {
        await handleDownload();
      }
    } catch { toast("Clipboard blocked — downloading instead"); await handleDownload(); }
    finally { setBusy(false); }
  };

  return (
    <div
      data-testid={`sticker-card-${item.key}`}
      className="relative rounded-3xl p-4 glass-strong card-hover overflow-hidden group"
    >
      <div className={`absolute inset-x-6 top-4 h-32 blur-3xl opacity-40 bg-gradient-to-r ${item.accent} rounded-full pointer-events-none`} />
      <div ref={svgRef} className="relative flex justify-center items-center h-56 md:h-64">
        <AquaMascot size={220} expression={item.expr} waving={item.waving} />
      </div>
      <div className="mt-2 text-center">
        <div className="font-display text-lg font-bold text-white">{item.label}</div>
        <div className="text-[11px] text-slate-400 uppercase tracking-widest">Aqua sticker</div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          data-testid={`sticker-download-${item.key}`}
          onClick={handleDownload}
          disabled={busy}
          className="aqua-btn-ghost text-xs disabled:opacity-50"
          title="Download PNG"
        >
          <Download size={14} /> PNG
        </button>
        <button
          data-testid={`sticker-share-${item.key}`}
          onClick={handleShare}
          disabled={busy}
          className="aqua-btn-ghost text-xs disabled:opacity-50"
          title="Share"
        >
          <Share2 size={14} /> Share
        </button>
        <button
          data-testid={`sticker-copy-${item.key}`}
          onClick={handleCopy}
          disabled={busy}
          className="aqua-btn-ghost text-xs disabled:opacity-50"
          title="Copy to clipboard"
        >
          <Copy size={14} /> Copy
        </button>
      </div>
    </div>
  );
}

export default function StickerSection() {
  return (
    <section id="stickers" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs tracking-[0.24em] uppercase text-cyan-300 mb-3 inline-flex items-center gap-2">
              <Sparkles size={14} className="text-teal-300" /> Aqua Sticker Pack
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Take <span className="text-shimmer">Aqua</span> everywhere.
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl">
              Download or share Aqua's expressions — perfect for chats, group threads and story replies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STICKERS.map((s) => (
            <StickerCard key={s.key} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
