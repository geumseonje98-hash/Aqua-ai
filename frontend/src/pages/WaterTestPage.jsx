import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Lightbulb, TestTube, FlaskConical, Sparkles, RefreshCw, ShieldCheck } from "lucide-react";
import AquaMascot from "@/components/AquaMascot";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Client-side SAFE bands (mirrors backend for live mood)
const SAFE = {
  ph:              [6.5, 8.5],
  hardness:        [60, 200],
  solids:          [0, 500],
  chloramines:     [0, 4.0],
  sulfate:         [0, 250],
  conductivity:    [0, 800],
  organic_carbon:  [0, 2.0],
  trihalomethanes: [0, 80],
  turbidity:       [0, 5.0],
};
const WEIGHTS = {
  ph: 1.0, hardness: 0.7, solids: 1.0, chloramines: 1.4,
  sulfate: 0.8, conductivity: 0.9, organic_carbon: 1.0,
  trihalomethanes: 1.4, turbidity: 1.2,
};

function paramScore(key, v) {
  const [lo, hi] = SAFE[key];
  const val = Number(v);
  if (Number.isNaN(val)) return null;
  if (val >= lo && val <= hi) return { score: 100, status: "safe" };
  const drift = val < lo ? (lo - val) / Math.max(lo, 1) : (val - hi) / Math.max(hi, 1);
  const score = Math.max(0, 100 - drift * 100);
  return { score, status: score >= 55 ? "warn" : "unsafe" };
}

function computeLiveMood(values) {
  const filled = Object.entries(values).filter(([, v]) => v !== "" && v !== null);
  if (filled.length === 0) {
    return { expr: "guiding", label: "Waiting", tone: "idle",
             text: "Enter values from your report — I'll react as we go!" };
  }
  let totalW = 0, sum = 0, anyUnsafe = false, anyWarn = false;
  for (const [k, v] of filled) {
    const s = paramScore(k, v);
    if (!s) continue;
    const w = WEIGHTS[k] || 1;
    sum += s.score * w; totalW += w;
    if (s.status === "unsafe") anyUnsafe = true;
    if (s.status === "warn") anyWarn = true;
  }
  const partial = totalW > 0 ? sum / totalW : 100;
  // Extrapolate — assume unfilled params average out at 90
  const unfilledCount = 9 - filled.length;
  const overall = totalW > 0
    ? (sum + 90 * unfilledCount * 1.0) / (totalW + unfilledCount * 1.0)
    : 100;

  if (anyUnsafe || overall < 45) {
    return { expr: "surprised", label: "Shocked", tone: "bad",
             text: "Whoa! Some values look dangerous — let's double-check them." };
  }
  if (anyWarn || overall < 65) {
    return { expr: "worried", label: "Worried", tone: "warn",
             text: "Hmm, a few numbers are outside the safe range. Let's see the full picture." };
  }
  if (overall < 82) {
    return { expr: "guiding", label: "Curious", tone: "good",
             text: "Looking okay so far — keep the values coming!" };
  }
  return { expr: "happy", label: "Happy", tone: "success",
           text: "These readings are looking beautiful! 💧" };
}

const MOOD_PILL = {
  idle:    "bg-slate-500/20 text-slate-200 border-slate-400/30",
  success: "bg-emerald-400/15 text-emerald-200 border-emerald-300/40",
  good:    "bg-cyan-400/15 text-cyan-100 border-cyan-300/40",
  warn:    "bg-amber-400/15 text-amber-200 border-amber-300/40",
  bad:     "bg-rose-500/15 text-rose-100 border-rose-400/40",
};

const PARAMS = [
  { key: "ph",              label: "pH",              unit: "",       hint: "Ideal: 6.5–8.5 · Neutral pure water is 7.0.",     placeholder: "Enter pH value", step: 0.1, min: 0,   max: 14 },
  { key: "hardness",        label: "Hardness",        unit: "mg/L",   hint: "Caused by calcium & magnesium · Ideal < 200 mg/L.", placeholder: "Enter value", step: 1,   min: 0,   max: 800 },
  { key: "solids",          label: "Solids",          unit: "mg/L",   hint: "Total Dissolved Solids · Excellent < 500 mg/L.",  placeholder: "Enter value", step: 1,   min: 0,   max: 5000 },
  { key: "chloramines",     label: "Chloramines",     unit: "mg/L",   hint: "Disinfectant · Safe when ≤ 4 mg/L (EPA).",        placeholder: "Enter value", step: 0.1, min: 0,   max: 15 },
  { key: "sulfate",         label: "Sulfate",         unit: "mg/L",   hint: "High sulfate can taste bitter · Safe ≤ 250 mg/L.", placeholder: "Enter value", step: 1,   min: 0,   max: 800 },
  { key: "conductivity",    label: "Conductivity",    unit: "µS/cm",  hint: "Measures dissolved ions · WHO ≤ 800 µS/cm.",       placeholder: "Enter value", step: 1,   min: 0,   max: 3000 },
  { key: "organic_carbon",  label: "Organic Carbon",  unit: "mg/L",   hint: "Total Organic Carbon · Safe ≤ 2 mg/L.",           placeholder: "Enter value", step: 0.1, min: 0,   max: 30 },
  { key: "trihalomethanes", label: "Trihalomethanes", unit: "µg/L",   hint: "Byproduct of chlorination · Safe ≤ 80 µg/L.",     placeholder: "Enter value", step: 1,   min: 0,   max: 200 },
  { key: "turbidity",       label: "Turbidity",       unit: "NTU",    hint: "Cloudiness measure · Safe ≤ 5 NTU.",              placeholder: "Enter value", step: 0.1, min: 0,   max: 20 },
];

const emptyValues = () => Object.fromEntries(PARAMS.map((p) => [p.key, ""]));

const toneCard = {
  success: "from-emerald-400 to-teal-300 text-slate-900",
  good:    "from-cyan-400 to-sky-400 text-slate-900",
  warn:    "from-amber-300 to-orange-400 text-slate-900",
  bad:     "from-rose-500 to-red-500 text-white",
};
const toneRing = {
  safe:   "border-emerald-300/50 bg-emerald-400/10 text-emerald-100",
  warn:   "border-amber-300/50   bg-amber-400/10   text-amber-100",
  unsafe: "border-rose-400/50    bg-rose-400/10    text-rose-100",
};

const Stepper = ({ step }) => (
  <div className="flex items-center gap-3 text-sm" data-testid="test-stepper">
    <div className="flex items-center gap-2">
      <span className={
        "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold transition-all " +
        (step === 1 ? "bg-sky-500 text-white shadow-lg shadow-sky-500/40" : "bg-emerald-400 text-slate-900")
      }>1</span>
      <span className={step === 1 ? "text-white" : "text-slate-400"}>Test</span>
    </div>
    <div className={"w-14 h-[2px] " + (step === 2 ? "bg-emerald-400" : "bg-slate-700")} />
    <div className="flex items-center gap-2">
      <span className={
        "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold transition-all " +
        (step === 2 ? "bg-sky-500 text-white shadow-lg shadow-sky-500/40" : "border border-slate-600 text-slate-500")
      }>2</span>
      <span className={step === 2 ? "text-white" : "text-slate-500"}>Results</span>
    </div>
  </div>
);

export default function WaterTestPage() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(emptyValues());
  const [hintKey, setHintKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [samples, setSamples] = useState([]);
  const navigate = useNavigate();

  const liveMood = React.useMemo(() => computeLiveMood(values), [values]);
  const finalMood = React.useMemo(() => {
    if (!result) return null;
    if (result.tone === "success") return { expr: "cheer",     label: "Overjoyed", tone: "success" };
    if (result.tone === "good")    return { expr: "happy",     label: "Happy",     tone: "good"    };
    if (result.tone === "warn")    return { expr: "worried",   label: "Worried",   tone: "warn"    };
    return                                { expr: "surprised", label: "Shocked",   tone: "bad"    };
  }, [result]);
  const aquaExpr = step === 2 && finalMood ? finalMood.expr : (loading ? "thinking" : liveMood.expr);
  const aquaMood = step === 2 && finalMood ? finalMood : liveMood;

  useEffect(() => {
    fetch(`${API}/quality/samples`).then((r) => r.json()).then((d) => setSamples(d.samples || []));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const filledCount = PARAMS.filter((p) => values[p.key] !== "").length;
  const allFilled = filledCount === PARAMS.length;

  const setVal = (key, v) => setValues((s) => ({ ...s, [key]: v }));

  const applySample = (s) => {
    const next = { ...emptyValues() };
    PARAMS.forEach((p) => { next[p.key] = s[p.key]; });
    setValues(next);
    toast.success(`Loaded sample: ${s.name}`);
  };

  const analyze = async () => {
    if (!allFilled) {
      toast.error("Please fill all 9 parameters");
      return;
    }
    setLoading(true);
    try {
      const payload = Object.fromEntries(PARAMS.map((p) => [p.key, Number(values[p.key])]));
      const r = await fetch(`${API}/quality/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("Bad response");
      const d = await r.json();
      setResult(d);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Could not analyze — try again");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(1); setResult(null); setValues(emptyValues());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* soft glow gradient bg */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <button onClick={() => navigate("/")} className="aqua-btn-ghost text-sm" data-testid="test-back-home">
            <ArrowLeft size={14} /> Back
          </button>
          <Stepper step={step} />
        </div>

        {step === 1 && (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left column: intro + mascot */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="text-[11px] font-bold tracking-[0.32em] uppercase text-sky-400 mb-5"
                   style={{ animation: "fadeUp 700ms ease-out both" }}>
                Step 1 · Water Analysis
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95]"
                  style={{ animation: "fadeUp 800ms 120ms ease-out both" }}>
                <span className="text-hero-blue">Let's check</span>
                <br /> <span className="text-hero-blue">your <span className="text-shimmer">water.</span></span>
              </h1>
              <p className="mt-6 text-slate-300 max-w-md" style={{ animation: "fadeUp 800ms 260ms ease-out both" }}>
                Enter the values from your water-quality test report. Aqua will help you understand what they mean.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4 max-w-sm"
                   style={{ animation: "fadeUp 900ms 400ms ease-out both" }}>
                <div key={aquaExpr} className="mood-swap">
                  <AquaMascot size={140} expression={aquaExpr} waving={aquaExpr === "happy"} />
                </div>
                <div className={"inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border " + MOOD_PILL[aquaMood.tone]}
                     data-testid="mood-pill">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  Aqua is <b className="ml-0.5">{aquaMood.label}</b>
                </div>
                <div className="speech-down glass-white text-slate-800 rounded-3xl px-5 py-4 shadow-2xl animate-bob">
                  <div className="font-mascot text-base font-semibold flex items-center gap-2">
                    Hi! I'm Aqua <span className="text-lg" style={{ animation: "wave 1.6s ease-in-out infinite" }}>👋</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1" data-testid="mood-speech">
                    {aquaMood.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column: form card */}
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="glass-white-strong rounded-[28px] p-6 md:p-8 shadow-[0_30px_80px_rgba(4,20,50,0.5)] text-slate-800"
                   data-testid="water-test-form"
                   style={{ animation: "fadeUp 900ms 200ms ease-out both" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center shadow-lg">
                    <TestTube size={22} className="text-slate-900" />
                  </div>
                  <div>
                    <div className="font-display text-xl md:text-2xl font-extrabold text-slate-900">Water Quality Test</div>
                    <div className="text-xs text-slate-500">
                      Enter all 9 parameters · <b className="text-sky-600">{filledCount}/9</b> filled
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-h-[62vh] overflow-y-auto pr-2">
                  {PARAMS.map((p, idx) => (
                    <div key={p.key}
                         className="grid grid-cols-12 items-center gap-3"
                         style={{ animation: `fadeUp 500ms ${idx * 40}ms ease-out both` }}>
                      <div className="col-span-4 flex items-center gap-2">
                        <label className="font-semibold text-slate-800">{p.label}</label>
                        <button
                          type="button"
                          onClick={() => setHintKey(hintKey === p.key ? null : p.key)}
                          data-testid={`hint-${p.key}`}
                          className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center justify-center transition"
                          aria-label={`Hint for ${p.label}`}
                        >
                          <Lightbulb size={12} className="text-amber-600" />
                        </button>
                      </div>
                      <div className="col-span-8 relative">
                        <input
                          data-testid={`input-${p.key}`}
                          type="number" step={p.step} min={p.min} max={p.max}
                          value={values[p.key]}
                          onChange={(e) => setVal(p.key, e.target.value)}
                          placeholder={p.placeholder}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 pr-16 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                          {p.unit}
                        </span>
                      </div>
                      {hintKey === p.key && (
                        <div className="col-span-12 rounded-xl px-4 py-2 bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2"
                             data-testid={`hint-panel-${p.key}`}>
                          <Lightbulb size={14} className="mt-0.5" /> <span>{p.hint}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={analyze}
                  disabled={loading}
                  data-testid="analyze-my-water-button"
                  className="mt-6 w-full aqua-btn-primary justify-center text-base py-3.5 disabled:opacity-60"
                >
                  <FlaskConical size={18} />
                  {loading ? "Analyzing…" : "Analyze My Water"}
                  <ArrowRight size={18} />
                </button>

                <div className="mt-4 flex items-center justify-center flex-col gap-2">
                  <div className="text-xs text-slate-500">Don't have your own values?</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {samples.map((s, i) => (
                      <button key={i}
                              data-testid={`sample-${i}`}
                              onClick={() => applySample(s)}
                              className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition">
                        <Sparkles size={12} className="inline mr-1 -mt-0.5" /> Try Sample: {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && result && (
          <div className="grid lg:grid-cols-12 gap-10 items-start"
               style={{ animation: "fadeUp 800ms ease-out both" }}>
            <div className="lg:col-span-5">
              <div className={`rounded-[28px] p-6 md:p-8 bg-gradient-to-br ${toneCard[result.tone]} shadow-2xl`}
                   data-testid="test-result-panel">
                <div className="text-xs uppercase tracking-widest opacity-80">Overall Water Score</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="font-display text-6xl font-extrabold">{result.overall}</div>
                  <div className="text-xl">/100</div>
                </div>
                <div className="mt-2 font-mascot text-xl">{result.verdict}</div>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/15 text-sm font-semibold">
                  <ShieldCheck size={14} /> {result.potable ? "Likely Potable" : "Not Recommended"}
                </div>
              </div>

              <div className="glass-white-strong rounded-[24px] p-6 mt-6 text-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div key={aquaExpr} className="mood-swap">
                    <AquaMascot size={70} expression={aquaExpr} waving={aquaExpr === "cheer" || aquaExpr === "happy"} />
                  </div>
                  <div>
                    <div className="font-display font-bold flex items-center gap-2">
                      Aqua is
                      <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border " + MOOD_PILL[aquaMood.tone]}
                            data-testid="result-mood-pill">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {aquaMood.label}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">Recommendations based on WHO/EPA</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex gap-2"><span className="text-sky-500">•</span> {r}</li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <button onClick={restart} data-testid="test-restart" className="aqua-btn-outline-light text-sm">
                    <RefreshCw size={14} /> Test Again
                  </button>
                  <button onClick={() => navigate("/")} className="aqua-btn-primary text-sm" data-testid="test-go-home">
                    Ask Aqua <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {result.details.map((d, i) => (
                <div key={d.key}
                     data-testid={`result-detail-${d.key}`}
                     className={"rounded-2xl p-4 border " + toneRing[d.status]}
                     style={{ animation: `fadeUp 500ms ${i * 60}ms ease-out both` }}>
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-white">{d.label}</div>
                    <div className="text-xs uppercase tracking-widest opacity-80">{d.status}</div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="font-display text-3xl font-extrabold">{d.value}</div>
                    <div className="text-sm text-slate-300">{d.unit}</div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300/80">
                    Safe range: {d.safe_low}{d.unit && ` ${d.unit}`} — {d.safe_high}{d.unit && ` ${d.unit}`}
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-black/25 overflow-hidden">
                    <div className={
                      "h-full rounded-full " +
                      (d.status === "safe" ? "bg-emerald-300" : d.status === "warn" ? "bg-amber-300" : "bg-rose-400")
                    } style={{ width: `${d.score}%` }} />
                  </div>
                  <div className="mt-1 text-xs opacity-80">Score {d.score}/100</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
