// Web Speech API narrator for Aqua

let cachedVoice = null;

function pickVoice() {
  if (!("speechSynthesis" in window)) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;
  const prefs = [
    /google.*(english|us|uk).*female/i,
    /samantha/i,
    /karen/i,
    /zira/i,
    /google uk english female/i,
    /female/i,
    /en(-|_)?(us|gb)/i,
  ];
  for (const rx of prefs) {
    const v = voices.find((vv) => rx.test(vv.name) || rx.test(vv.lang));
    if (v) { cachedVoice = v; return v; }
  }
  cachedVoice = voices.find((v) => /en/i.test(v.lang)) || voices[0];
  return cachedVoice;
}

// Ensure voices are loaded (they load async in some browsers)
export function warmupVoices() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
    pickVoice();
  });
}

export function stripEmoji(t = "") {
  return String(t).replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF])/g, "");
}

export function speak(text, { onStart, onEnd, onError, rate = 1.02, pitch = 1.15, volume = 1 } = {}) {
  if (!("speechSynthesis" in window)) { onError && onError("unsupported"); return null; }
  try { window.speechSynthesis.cancel(); } catch {}
  const clean = stripEmoji(text).replace(/\s+/g, " ").trim();
  if (!clean) return null;
  const u = new SpeechSynthesisUtterance(clean.slice(0, 1000)); // safety cap
  u.rate = rate; u.pitch = pitch; u.volume = volume;
  const v = pickVoice();
  if (v) { u.voice = v; u.lang = v.lang; }
  u.onstart = () => onStart && onStart();
  u.onend   = () => onEnd   && onEnd();
  u.onerror = (e) => onError && onError(e);
  window.speechSynthesis.speak(u);
  return u;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch {}
  }
}

export function isSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
