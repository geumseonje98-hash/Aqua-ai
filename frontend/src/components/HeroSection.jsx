import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Droplet, BookOpen, Brain, FlaskConical, ShieldCheck } from "lucide-react";
import AquaMascot from "./AquaMascot";

const AmbientDots = () => {
  const items = Array.from({ length: 22 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((_, i) => {
        const size = 3 + Math.random() * 7;
        const left = Math.random() * 100;
        const top = Math.random() * 90;
        const dur = 6 + Math.random() * 8;
        const delay = Math.random() * 6;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: "radial-gradient(circle at 30% 30%, rgba(191,236,255,0.9), rgba(56,189,248,0.2) 60%, transparent 100%)",
              boxShadow: "0 0 20px rgba(56,189,248,0.35)",
              animation: `bob ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      {/* concentric glow rings on right */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
        {[420, 540, 660, 800].map((s, i) => (
          <div key={i}
               className="absolute rounded-full border border-cyan-300/15"
               style={{
                 width: s, height: s,
                 top: -s/2, left: -s/2,
                 animation: `spin ${40 + i * 12}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
               }} />
        ))}
      </div>
    </div>
  );
};

const HeroBubbles = () => {
  const bubbles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((_, i) => {
        const size = 8 + Math.random() * 26;
        const left = Math.random() * 100;
        const dur = 12 + Math.random() * 16;
        const delay = Math.random() * 12;
        return (
          <span key={i} className="bubble"
                style={{
                  left: `${left}%`, width: `${size}px`, height: `${size}px`,
                  animationDuration: `${dur}s`, animationDelay: `${delay}s`,
                }} />
        );
      })}
    </div>
  );
};

const FEATURES = [
  { icon: Brain,         color: "from-fuchsia-400 to-pink-400",   label: "AI-Powered",   sub: "Smart Analysis"  },
  { icon: FlaskConical,  color: "from-lime-300 to-emerald-400",   label: "Science Based",sub: "Data Driven"     },
  { icon: ShieldCheck,   color: "from-cyan-300 to-sky-400",       label: "Actionable",   sub: "Clear Guidance"  },
];

export default function HeroSection({ onOpenChat }) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      <AmbientDots />
      <HeroBubbles />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center w-full">
        {/* Left column */}
        <div className={`lg:col-span-7 ${mounted ? "hero-reveal" : "opacity-0"}`}>
          <div className="text-center lg:text-left">
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.32em] uppercase text-sky-400 mb-6"
                 style={{ animation: "fadeUp 700ms ease-out both" }}>
              Water Quality · Simplified
            </div>
            <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-4xl sm:text-6xl lg:text-7xl">
              <span className="block text-hero-blue" style={{ animation: "fadeUp 800ms 120ms ease-out both" }}>
                Because every
              </span>
              <span className="block text-hero-blue" style={{ animation: "fadeUp 800ms 260ms ease-out both" }}>
                drop <span className="text-shimmer">matters.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-slate-300 text-base md:text-lg leading-relaxed mx-auto lg:mx-0"
               style={{ animation: "fadeUp 800ms 420ms ease-out both" }}>
              AquaSafe AI turns complex water-quality data into simple, actionable insights so you can make
              confident decisions about your water — with a friendly droplet companion by your side.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
                 style={{ animation: "fadeUp 800ms 560ms ease-out both" }}>
              <button
                data-testid="hero-check-water-cta"
                onClick={() => navigate("/test")}
                className="aqua-btn-primary group"
              >
                <Droplet size={18} className="drop-shadow" />
                <span>Check My Water</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                data-testid="hero-learn-more-cta"
                onClick={onOpenChat}
                className="aqua-btn-outline group"
              >
                <BookOpen size={18} />
                <span>Learn More</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6 max-w-xl mx-auto lg:mx-0 grid grid-cols-3 gap-3"
                 style={{ animation: "fadeUp 800ms 700ms ease-out both" }}>
              {FEATURES.map((f, i) => (
                <div key={i} data-testid={`hero-feature-${i}`} className="flex items-center gap-3 group">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform`}>
                    <f.icon size={18} className="text-slate-900" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-display font-bold text-white text-sm sm:text-base">{f.label}</div>
                    <div className="text-[11px] text-slate-400">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - mascot with speech bubble */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end"
             style={{ animation: "fadeUp 900ms 380ms ease-out both" }}>
          <div className="relative">
            {/* Speech bubble */}
            <div
              data-testid="anime-mascot-speech-bubble"
              className="speech-down glass-white text-slate-800 rounded-3xl px-5 py-4 shadow-2xl max-w-[280px] animate-bob"
              style={{ position: "relative", zIndex: 3 }}
            >
              <div className="flex items-center gap-2 font-mascot text-lg font-semibold">
                Hi, I'm Aqua! <span className="text-xl" style={{ animation: "wave 1.6s ease-in-out infinite" }}>👋</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                I'm your AI water-quality guide. Let's make your water safer, together. <span className="text-sky-500">💙</span>
              </p>
            </div>

            {/* Mascot below-right */}
            <div className="mt-6 flex justify-center animate-float-y" style={{ animationDuration: "6.5s" }}>
              <AquaMascot size={280} expression="happy" waving />
            </div>

            {/* Ambient glow */}
            <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl -z-10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%,100%{ transform: rotate(0deg); }
          20%,60%{ transform: rotate(18deg); }
          40%,80%{ transform: rotate(-8deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .aq-wave-hand { animation: wave 1.4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
