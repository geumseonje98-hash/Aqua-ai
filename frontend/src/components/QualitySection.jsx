import React, { useEffect, useState } from "react";
import { ShieldCheck, Beaker, Leaf, Calculator } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const toneColor = {
  success: "from-emerald-400 to-teal-300 text-slate-900",
  good: "from-cyan-400 to-sky-400 text-slate-900",
  warn: "from-amber-300 to-orange-400 text-slate-900",
  bad: "from-rose-500 to-red-500 text-white",
};

export default function QualitySection() {
  const [ph, setPh] = useState(7.2);
  const [tds, setTds] = useState(180);
  const [result, setResult] = useState(null);
  const [tips, setTips] = useState([]);
  const [selectedTips, setSelectedTips] = useState({});
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetch(`${API}/quality/tips`).then((r) => r.json()).then((d) => setTips(d.tips || []));
  }, []);

  const analyze = async () => {
    setAnalyzing(true);
    try {
      const r = await fetch(`${API}/quality/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ph: Number(ph), tds: Number(tds) }),
      });
      const d = await r.json();
      setResult(d);
    } catch { toast.error("Could not analyze"); }
    finally { setAnalyzing(false); }
  };

  const totalSaved = tips.reduce(
    (s, t) => s + (selectedTips[t.id] ? t.impact_l_per_day : 0), 0
  );

  return (
    <section id="quality" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-xs tracking-[0.24em] uppercase text-cyan-300 mb-3">Water Quality · Conservation</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Test your <span className="text-shimmer">water</span>. Save the planet.
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl">
            A quick pH & TDS check, plus a savings calculator to see real impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Analyzer */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 card-hover">
            <div className="flex items-center gap-3 mb-4">
              <Beaker className="text-teal-300" />
              <h3 className="font-display text-xl font-bold">Water Quality Analyzer</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">pH (0–14)</label>
                <div className="flex items-center gap-4">
                  <input
                    data-testid="water-quality-ph-input"
                    type="range" min="0" max="14" step="0.1"
                    value={ph} onChange={(e) => setPh(e.target.value)}
                    className="flex-1 accent-cyan-400"
                  />
                  <span className="font-mono font-bold text-teal-200 w-14 text-right">{Number(ph).toFixed(1)}</span>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">TDS (ppm)</label>
                <div className="flex items-center gap-4">
                  <input
                    data-testid="water-quality-tds-input"
                    type="range" min="0" max="1500" step="10"
                    value={tds} onChange={(e) => setTds(e.target.value)}
                    className="flex-1 accent-cyan-400"
                  />
                  <span className="font-mono font-bold text-teal-200 w-16 text-right">{tds}</span>
                </div>
              </div>
              <button
                data-testid="water-quality-analyze-button"
                onClick={analyze}
                disabled={analyzing}
                className="aqua-btn"
              >
                <ShieldCheck size={16} /> {analyzing ? "Analyzing..." : "Analyze"}
              </button>

              {result && (
                <div
                  data-testid="water-quality-result"
                  className={`mt-4 rounded-2xl p-5 bg-gradient-to-br ${toneColor[result.tone]} shadow-lg`}
                >
                  <div className="text-xs uppercase tracking-widest opacity-80">Overall Score</div>
                  <div className="font-display text-4xl font-extrabold">{result.overall}<span className="text-lg">/100</span></div>
                  <div className="mt-1 font-mascot text-lg">{result.verdict}</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-black/15 rounded-xl p-2">pH score: <b>{result.ph_score}</b></div>
                    <div className="bg-black/15 rounded-xl p-2">TDS score: <b>{result.tds_score}</b></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Savings calculator */}
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="text-emerald-300" />
              <h3 className="font-display text-xl font-bold">Conservation Savings Calculator</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">Tick tips you'll try — watch your daily savings splash up!</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {tips.map((t) => (
                <label
                  key={t.id}
                  data-testid={`conservation-tip-${t.id}`}
                  className={
                    "rounded-2xl p-4 border transition cursor-pointer " +
                    (selectedTips[t.id]
                      ? "border-emerald-300 bg-emerald-400/10"
                      : "border-cyan-400/20 bg-slate-900/40 hover:border-cyan-300/50")
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-display font-bold text-white">{t.title}</div>
                      <div className="text-xs text-slate-300 mt-1 leading-relaxed">{t.detail}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!selectedTips[t.id]}
                      onChange={(e) => setSelectedTips((s) => ({ ...s, [t.id]: e.target.checked }))}
                      className="accent-emerald-400 w-5 h-5 mt-1"
                    />
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-widest text-emerald-300">
                    Save ~{t.impact_l_per_day} L/day
                  </div>
                </label>
              ))}
            </div>

            <div
              data-testid="conservation-total"
              className="mt-6 flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 border border-emerald-300/30"
            >
              <div className="flex items-center gap-3">
                <Calculator className="text-emerald-300" />
                <div className="text-sm text-slate-200">Estimated daily savings</div>
              </div>
              <div className="font-display text-3xl font-extrabold text-shimmer">{totalSaved} L</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
