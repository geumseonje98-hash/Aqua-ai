import React from "react";
import { Waves } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pb-10 pt-10 border-t border-cyan-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Waves size={16} className="text-teal-300" /> AquaSafe AI · made with droplets & dreams
        </div>
        <div className="text-xs text-slate-500">Mascot: Aqua · Powered by Gemini 3.1 Pro</div>
      </div>
    </footer>
  );
}
