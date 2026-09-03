import React, { useEffect, useState } from "react";
import { Fish, Waves, Lightbulb, CheckCircle2, XCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function MarineSection() {
  const [items, setItems] = useState([]);
  const [zones, setZones] = useState([]);
  const [active, setActive] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`${API}/marine/life`).then((r) => r.json()).then((d) => {
      setItems(d.items || []); setZones(d.zones || []); setActive((d.items || [])[0]);
    });
    fetch(`${API}/marine/quiz`).then((r) => r.json()).then((d) => setQuiz(d.quiz || []));
  }, []);

  const correctCount = quiz.filter((q) => answers[q.id] === q.answer).length;

  return (
    <section id="marine" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs tracking-[0.24em] uppercase text-cyan-300 mb-3">Ocean · Marine Learning</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Dive into the <span className="text-shimmer">bioluminescent</span> deep.
            </h2>
          </div>
          <div className="glass rounded-full px-4 py-2 text-sm text-cyan-200 inline-flex items-center gap-2">
            <Waves size={14} /> Explore {items.length} creatures & {zones.length} zones
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {items.map((m, i) => (
              <button
                key={m.id}
                data-testid={`marine-life-card-${i}`}
                onClick={() => setActive(m)}
                className={
                  "relative overflow-hidden rounded-3xl border card-hover text-left group " +
                  (active?.id === m.id
                    ? "border-teal-300 shadow-[0_0_40px_rgba(0,245,212,0.35)]"
                    : "border-cyan-400/20")
                }
              >
                <div className="relative h-56">
                  <img src={m.img} alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-cyan-300">{m.zone}</div>
                  <div className="font-display text-lg font-bold text-white mt-1">{m.name}</div>
                  <p className="text-sm text-slate-300 mt-1 line-clamp-2">{m.fact}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: zones + selected */}
          <div className="lg:col-span-4 space-y-5">
            {active && (
              <div className="glass-strong rounded-3xl overflow-hidden" data-testid="marine-selected-panel">
                <img src={active.img} alt={active.name} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs uppercase tracking-widest">
                    <Fish size={14} /> {active.zone}
                  </div>
                  <div className="font-display text-xl font-bold mt-1">{active.name}</div>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{active.fact}</p>
                </div>
              </div>
            )}

            <div className="glass rounded-3xl p-5">
              <div className="text-xs tracking-[0.22em] uppercase text-cyan-300 mb-3">Ocean depth zones</div>
              <ul className="space-y-2 text-sm">
                {zones.map((z, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3 w-3 rounded-full"
                      style={{ background: `hsl(${200 - i * 15} 90% ${60 - i * 8}%)` }}
                    />
                    <div>
                      <div className="text-white font-semibold">{z.name} <span className="text-slate-400 font-normal">· {z.depth}</span></div>
                      <div className="text-slate-400 text-xs">{z.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mt-14 glass-strong rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-300" />
            <h3 className="font-display text-xl font-bold">Ocean Trivia Quiz</h3>
            <span className="ml-auto text-sm text-slate-300" data-testid="quiz-score">
              Score: <b className="text-teal-200">{correctCount}/{quiz.length}</b>
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {quiz.map((q, qi) => (
              <div key={q.id} className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4">
                <div className="text-sm text-slate-200 font-semibold mb-3">{qi + 1}. {q.q}</div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((op, oi) => {
                    const chosen = answers[q.id] === oi;
                    const correct = q.answer === oi;
                    const isAnswered = answers[q.id] !== undefined;
                    return (
                      <button
                        key={oi}
                        data-testid={`quiz-${q.id}-option-${oi}`}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className={
                          "text-left rounded-xl px-3 py-2 text-sm border transition flex items-center justify-between gap-2 " +
                          (isAnswered
                            ? (correct ? "border-emerald-300 bg-emerald-400/10 text-emerald-100"
                                       : chosen ? "border-rose-400 bg-rose-400/10 text-rose-100"
                                                : "border-cyan-400/15 bg-slate-900/30 text-slate-300")
                            : "border-cyan-400/20 hover:border-teal-300 text-slate-200")
                        }
                      >
                        <span>{op}</span>
                        {isAnswered && correct && <CheckCircle2 size={16} className="text-emerald-300" />}
                        {isAnswered && chosen && !correct && <XCircle size={16} className="text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
                {answers[q.id] !== undefined && (
                  <div className="mt-3 text-xs text-slate-300"><b className="text-cyan-300">Hint:</b> {q.hint}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
