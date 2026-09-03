import React, { createContext, useContext, useEffect, useState } from "react";

const OutfitContext = createContext({ outfit: "sailor", setOutfit: () => {} });

const KEY = "aqua_outfit";
const VALID = ["sailor", "scuba", "kimono", "mermaid"];

export const OutfitProvider = ({ children }) => {
  const [outfit, setOutfit] = useState(() => {
    const v = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    return VALID.includes(v) ? v : "sailor";
  });
  useEffect(() => {
    try { localStorage.setItem(KEY, outfit); } catch {}
  }, [outfit]);
  return (
    <OutfitContext.Provider value={{ outfit, setOutfit }}>
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfit = () => useContext(OutfitContext);

export const OUTFITS = [
  { id: "sailor",  label: "Sailor",  emoji: "⚓", tint: "from-sky-400 to-blue-600"   },
  { id: "scuba",   label: "Scuba",   emoji: "🤿", tint: "from-slate-700 to-slate-900" },
  { id: "kimono",  label: "Kimono",  emoji: "🌸", tint: "from-pink-300 to-rose-500"   },
  { id: "mermaid", label: "Mermaid", emoji: "🧜‍♀️", tint: "from-teal-300 to-emerald-500" },
];
