import React, { useEffect, useState } from "react";
import MizukiMascot from "./AquaMascot";
import { Droplets, RefreshCw, Plus, Trophy } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SESSION_KEY = "aqua_ai_session_id";
const getSid = () => {
  let s = localStorage.getItem(SESSION_KEY);
  if (!s) { s = "aq-" + Math.random().toString(36).slice(2, 11); localStorage.setItem(SESSION_KEY, s); }
  return s;
};

const GOAL_MS = [1500, 2000, 2500, 3000, 3500];

export default function HydrationSection() {
  const [goal, setGoal] = useState(Number(localStorage.getItem("aqua_goal") || 2500));
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [cheer, setCheer] = useState(false);
  const sid = getSid();

  const refresh = async () => {
    try {
      const r = await fetch(`${API}/hydration/today/${sid}`);
      const d = await r.json();
      setTotal(d.total_ml || 0);
      setCount(d.count || 0);
    } catch {/*ignore*/}
  };

  useEffect(() => { refresh(); }, []);
  useEffect(() => { localStorage.setItem("aqua_goal", String(goal)); }, [goal]);

  const addMs = async (amount_ml) => {
    try {
      await fetch(`${API}/hydration/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid, amount_ml }),
      });
      await refresh();
      const nextTotal = total + amount_ml;
      if (nextTotal >= goal) {
        setCheer(true); setTimeout(() => setCheer(false), 3200);
        toast.success("Goal reached! Mizuki is doing a happy splash 💧✨");
      } else {
        toast(`+${amount_ml} ml — keep it flowing!`);
      }
    } catch { toast.error("Could not log intake"); }
  };

  const reset = async () => {
    await fetch(`${API}/hydration/reset/${sid}`, { method: "DELETE" });
    await refresh();
    toast("Reset today's intake");
  };

  const pct = Math.min(100, Math.round((total / goal) * 100));

  return (
    <section id="hydration" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-xs tracking-[0.24em] uppercase text-cyan-300 mb-3">Hydration Tracker</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Fill your <span className="text-shimmer">glass</span>. Fill your day.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Glass */}
          <div className="lg:col-span-5 glass-strong rounded-3xl p-6 md:p-8 flex flex-col items-center">
            <div className="relative w-56 h-72" data-testid="hydration-glass">
              {/* Glass outline */}
              <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="waterFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#67E8F9" />
                    <stop offset="1" stopColor="#0EA5E9" />
                  </linearGradient>
                  <clipPath id="glassClip">
                    <path d="M30 20 L170 20 L155 240 Q100 260 45 240 Z" />
                  </clipPath>
                </defs>
                {/* Water */}
                <g clipPath="url(#glassClip)">
                  <rect x="0" y={260 - (pct * 2.4)} width="200" height="260" fill="url(#waterFill)" />
                  {/* Waves */}
                  <g style={{ transform: `translateY(${260 - (pct * 2.4)}px)` }} className="wave-anim">
                    <path d="M-200 0 Q -150 -12 -100 0 T 0 0 T 100 0 T 200 0 T 300 0 T 400 0 V 20 H -200 Z" fill="#A5F3FC" opacity="0.7" />
                  </g>
                  <g style={{ transform: `translateY(${260 - (pct * 2.4) + 4}px)` }} className="wave-anim" >
                    <path d="M-200 0 Q -150 12 -100 0 T 0 0 T 100 0 T 200 0 T 300 0 T 400 0 V 24 H -200 Z" fill="#E0F7FA" opacity="0.55" />
                  </g>
                </g>
                {/* Outline */}
                <path d="M30 20 L170 20 L155 240 Q100 260 45 240 Z"
                      fill="none" stroke="rgba(56,189,248,0.65)" strokeWidth="3" />
              </svg>
              {cheer && (
                <div className="absolute -top-6 -right-8 animate-bob">
                  <MizukiMascot size={80} expression="cheer" />
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <div className="font-display text-4xl font-extrabold text-shimmer" data-testid="hydration-total">
                {total} <span className="text-xl text-slate-300">ml</span>
              </div>
              <div className="text-sm text-slate-400">of {goal} ml goal · {pct}%</div>
              <div
                data-testid="hydration-progress-bar"
                className="mt-3 h-2 w-56 rounded-full bg-slate-800 overflow-hidden mx-auto"
              >
                <div className="h-full bg-gradient-to-r from-sky-400 to-teal-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 flex flex-col gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2">Daily goal</div>
              <div className="flex flex-wrap gap-2">
                {GOAL_MS.map((g) => (
                  <button
                    key={g}
                    data-testid={`hydration-goal-${g}`}
                    onClick={() => setGoal(g)}
                    className={
                      "px-3 py-1.5 rounded-full text-sm border transition " +
                      (goal === g
                        ? "border-teal-300 bg-teal-300/10 text-teal-200"
                        : "border-cyan-400/25 text-slate-300 hover:border-cyan-300")
                    }
                  >{g} ml</button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2">Quick add</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { amt: 250, label: "Glass" },
                  { amt: 500, label: "Bottle" },
                  { amt: 750, label: "Big bottle" },
                  { amt: 1000, label: "Litre" },
                ].map((q) => (
                  <button
                    key={q.amt}
                    data-testid={`hydration-add-${q.amt}ml-button`}
                    onClick={() => addMs(q.amt)}
                    className="glass rounded-2xl p-4 flex flex-col items-center gap-1 card-hover"
                  >
                    <Droplets className="text-teal-300" />
                    <div className="font-display font-bold text-white">+{q.amt} ml</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-widest">{q.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Trophy className="text-yellow-300" size={18} />
                Logged today: <b className="text-white">{count}</b> {count === 1 ? "sip" : "sips"}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={refresh} data-testid="hydration-refresh" className="aqua-btn-ghost text-sm">
                  <RefreshCw size={14} /> Refresh
                </button>
                <button onClick={reset} data-testid="hydration-reset" className="aqua-btn-ghost text-sm">
                  Reset today
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-cyan-400/10 border border-cyan-400/25 text-sm text-cyan-100 flex items-start gap-3">
              <MizukiMascot size={44} expression={pct >= 100 ? "cheer" : "guiding"} />
              <div>
                {pct >= 100
                  ? "You did it! 🎉 Amazing hydration. Aqua is over the moon."
                  : pct >= 50
                    ? "Halfway there! Keep sipping — small waves make deep oceans."
                    : "Let's get flowing 💧 A glass right now would be perfect."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
