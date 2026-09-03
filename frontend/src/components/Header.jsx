import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, MessageCircleHeart, Fish, Droplets, ShieldCheck,
  FlaskConical, Waves,
} from "lucide-react";
import AquaMascot from "./AquaMascot";

const navItems = [
  { id: "top",       label: "Home",        icon: Waves,            testid: "nav-home-link",       to: "/" },
  { id: "chat",      label: "Ask Aqua",    icon: MessageCircleHeart, testid: "nav-ai-chat-link",  to: "/#chat" },
  { id: "quality",   label: "Save Water",  icon: ShieldCheck,      testid: "nav-quality-link",    to: "/#quality" },
  { id: "marine",    label: "Marine Hub",  icon: Fish,             testid: "nav-marine-link",     to: "/#marine" },
  { id: "hydration", label: "Hydration",   icon: Droplets,         testid: "nav-hydration-link",  to: "/#hydration" },
  { id: "test",      label: "Check My Water", icon: FlaskConical,  testid: "nav-test-link",       to: "/test" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (item) => {
    setOpen(false);
    if (item.to.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
        }, 250);
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        data-testid="app-header"
        className={
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 " +
          (scrolled ? "glass-strong shadow-[0_8px_40px_rgba(2,10,25,0.55)]" : "bg-transparent")
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            data-testid="brand-home-button"
            className="flex items-center gap-3 group"
          >
            <div className="relative animate-float-y" style={{ animationDuration: "5s" }}>
              <AquaMascot size={36} expression="happy" />
            </div>
            <div className="leading-tight text-left">
              <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
                AquaSafe <span className="text-shimmer">AI</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/test")}
              data-testid="header-cta-button"
              className="hidden md:inline-flex aqua-btn text-sm"
            >
              <FlaskConical size={16} /> Check My Water
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-teal-300 transition-colors"
              aria-label="Open menu"
              data-testid="hamburger-menu-button"
            >
              {open ? <X size={22} className="text-cyan-200" /> : <Menu size={22} className="text-cyan-200" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in drawer */}
      <div
        className={
          "fixed inset-0 z-50 transition-opacity duration-500 " +
          (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        data-testid="drawer-overlay"
      >
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={
            "absolute top-0 right-0 h-full w-[85%] max-w-sm glass-strong border-l border-cyan-400/30 " +
            "transition-transform duration-500 ease-out " +
            (open ? "translate-x-0" : "translate-x-full")
          }
          data-testid="drawer-panel"
        >
          <div className="p-6 flex items-center justify-between border-b border-cyan-400/15">
            <div className="flex items-center gap-3">
              <AquaMascot size={44} expression="wave" waving />
              <div>
                <div className="font-display text-lg font-bold">AquaSafe AI</div>
                <div className="text-xs text-cyan-300">with Aqua · your droplet guide</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-cyan-400/10"
              aria-label="Close menu"
              data-testid="drawer-close"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((n, i) => (
              <button
                key={n.id}
                onClick={() => go(n)}
                data-testid={n.testid}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-200 hover:bg-cyan-400/10 border border-transparent hover:border-cyan-300/25 transition-all group"
                style={{
                  animation: open ? `slideIn 400ms cubic-bezier(.2,.8,.2,1) ${i * 60}ms both` : "none",
                }}
              >
                <span className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center group-hover:bg-cyan-400/20">
                  <n.icon size={16} className="text-teal-300" />
                </span>
                <span className="font-medium">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto p-6 text-xs text-slate-400">
            <div className="glass rounded-2xl p-4">
              <div className="text-cyan-300 uppercase tracking-widest text-[10px] mb-1">Model</div>
              <div className="text-white font-semibold">Gemini 3.1 Pro</div>
              <div className="mt-1">Streaming AI · Session memory</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
