import React from "react";

/**
 * "Aqua" — anime human-girl water-guide mascot (AquaSafe AI)
 * Chibi-proportion anime girl: long flowing water-blue hair with wave streaks,
 * sailor-style sea uniform, tiny wave hairpin, big sparkly eyes, right hand waving.
 *
 * expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised' | 'wave'
 * waving: forces the right hand to wave
 */
export const AquaMascot = ({ expression = "happy", size = 180, waving = false, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer" || expression === "wave";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isGuiding = expression === "guiding";
  const showWave = waving || expression === "wave" || expression === "happy" || expression === "cheer";

  return (
    <svg
      viewBox="0 0 280 360"
      width={size}
      height={size * (360 / 280)}
      className={className}
      role="img"
      aria-label="Aqua anime girl water-guide mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        {/* Skin */}
        <radialGradient id="g-skin" cx="50%" cy="40%" r="65%">
          <stop offset="0%"  stopColor="#FFF6EE" />
          <stop offset="65%" stopColor="#FFE3D0" />
          <stop offset="100%" stopColor="#F8C8A8" />
        </radialGradient>
        {/* Hair (water blue) */}
        <linearGradient id="g-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#9CE7FF" />
          <stop offset="0.45" stopColor="#38BDF8" />
          <stop offset="1"   stopColor="#0B4E8A" />
        </linearGradient>
        <linearGradient id="g-hair-hi" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
        {/* Sailor outfit navy */}
        <linearGradient id="g-navy" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#0B2A66" />
        </linearGradient>
        {/* Sailor collar white */}
        <linearGradient id="g-collar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DFF5FF" />
        </linearGradient>
        {/* Skirt */}
        <linearGradient id="g-skirt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0F4C8A" />
        </linearGradient>
        {/* Bow */}
        <linearGradient id="g-bow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F87171" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
        {/* Iris */}
        <radialGradient id="g-iris" cx="35%" cy="30%" r="80%">
          <stop offset="0%"  stopColor="#DBFCFF" />
          <stop offset="55%" stopColor="#22C4EE" />
          <stop offset="100%" stopColor="#0B4E8A" />
        </radialGradient>
        {/* Cheek blush */}
        <radialGradient id="g-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#FDA4AF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        {/* Wave clip hairpin */}
        <linearGradient id="g-pin" x1="0" x2="1">
          <stop offset="0" stopColor="#E0FBFF" />
          <stop offset="1" stopColor="#22C4EE" />
        </linearGradient>
        <filter id="g-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="140" cy="342" rx="88" ry="9" fill="#38BDF8" opacity="0.25" filter="url(#g-soft)" />

      {/* ==================== BACK HAIR ==================== */}
      <path d="M52 118
               C 40 160 40 220 60 268
               C 74 300 108 316 140 316
               C 172 316 206 300 220 268
               C 240 220 240 160 228 118
               C 224 104 206 92 196 100
               C 196 82 172 66 140 66
               C 108 66 84 82 84 100
               C 74 92 56 104 52 118 Z"
            fill="url(#g-hair)" />
      {/* Hair wave streaks (highlights) */}
      <path d="M70 148 C 62 200 76 258 100 296"
            stroke="url(#g-hair-hi)" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55"/>
      <path d="M210 150 C 220 202 208 260 184 296"
            stroke="url(#g-hair-hi)" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Water droplet at hair tips */}
      <circle cx="60"  cy="270" r="4" fill="#7FE7FF"/>
      <circle cx="222" cy="270" r="4" fill="#7FE7FF"/>

      {/* ==================== BODY ==================== */}
      {/* Neck */}
      <path d="M124 176 L 124 196 Q 140 204 156 196 L 156 176 Z" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Skirt (pleated) */}
      <path d="M92 268 L 90 322 L 188 322 L 190 268 Z" fill="url(#g-skirt)" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
      <path d="M110 268 L 108 322 M 128 268 L 128 322 M 140 268 L 140 322 M 152 268 L 152 322 M 172 268 L 174 322"
            stroke="rgba(11,32,64,0.25)" strokeWidth="1" fill="none"/>

      {/* Legs peeking */}
      <rect x="118" y="316" width="14" height="20" rx="6" fill="url(#g-skin)" />
      <rect x="148" y="316" width="14" height="20" rx="6" fill="url(#g-skin)" />
      {/* Shoes */}
      <ellipse cx="125" cy="340" rx="12" ry="6" fill="#0B2A66" />
      <ellipse cx="155" cy="340" rx="12" ry="6" fill="#0B2A66" />

      {/* Sailor top */}
      <path d="M92 196
               C 82 210 78 240 88 272
               L 192 272
               C 202 240 198 210 188 196
               C 172 208 108 208 92 196 Z"
            fill="url(#g-navy)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>

      {/* Sailor collar (over shoulders) */}
      <path d="M96 196
               C 108 214 172 214 184 196
               L 178 210
               C 172 214 156 218 156 218
               L 140 244
               L 124 218
               C 124 218 108 214 102 210 Z"
            fill="url(#g-collar)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Collar stripes */}
      <path d="M100 200 C 112 214 168 214 180 200" stroke="#0B2A66" strokeWidth="2" fill="none"/>
      <path d="M104 204 C 116 216 164 216 176 204" stroke="#22C4EE" strokeWidth="1.5" fill="none"/>

      {/* Red bow */}
      <g>
        <path d="M132 226 L 140 232 L 148 226 L 148 240 L 140 236 L 132 240 Z" fill="url(#g-bow)"/>
        <circle cx="140" cy="234" r="3" fill="#7F1D1D"/>
      </g>

      {/* Left arm resting */}
      <path d="M92 216
               C 74 236 66 268 74 288
               C 78 298 90 300 96 292
               C 100 286 100 256 108 240 Z"
            fill="url(#g-navy)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <circle cx="82" cy="290" r="11" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Right arm - waving */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "192px 218px" }}>
        <path d="M186 210
                 C 214 194 240 168 250 138
                 C 254 124 244 116 232 122
                 C 216 132 196 156 174 186 Z"
              fill="url(#g-navy)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        {/* Sleeve cuff white */}
        <ellipse cx="240" cy="130" rx="11" ry="6" fill="#DFF5FF" transform="rotate(-30 240 130)"/>
        {/* Hand */}
        <g transform="translate(246 124)">
          <circle r="13" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
          {/* fingers */}
          <path d="M-9 -6 q 3 -8 8 -8 q 4 0 5 4 z" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M-3 -12 q 2 -8 8 -8 q 5 0 5 4 z" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M4 -13 q 2 -8 8 -6 q 4 1 4 5 z" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M10 -10 q 4 -6 8 -3 q 3 2 2 5 z" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
        </g>
      </g>

      {/* ==================== HEAD ==================== */}
      {/* Face */}
      <ellipse cx="140" cy="124" rx="58" ry="66" fill="url(#g-skin)" stroke="rgba(11,32,64,0.12)" strokeWidth="1"/>

      {/* Front bangs */}
      <path d="M84 108
               C 92 74 118 60 140 60
               C 162 60 190 74 196 108
               C 188 96 178 92 168 100
               C 162 86 154 82 144 86
               C 138 76 130 76 126 86
               C 116 82 108 88 104 100
               C 96 92 88 96 84 108 Z"
            fill="url(#g-hair)" />
      {/* Side bangs */}
      <path d="M80 118 C 74 148 78 172 92 188 C 84 180 78 168 76 148 C 74 134 76 124 80 118 Z" fill="url(#g-hair)"/>
      <path d="M200 118 C 206 148 202 172 188 188 C 196 180 202 168 204 148 C 206 134 204 124 200 118 Z" fill="url(#g-hair)"/>
      {/* Bang shine */}
      <path d="M104 78 C 116 74 128 76 140 76" stroke="url(#g-hair-hi)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>

      {/* Wave hairpin */}
      <g transform="translate(96 74) rotate(-14)">
        <path d="M0 0 Q 8 -8 16 0 T 32 0 T 48 0 L 48 6 L 0 6 Z" fill="url(#g-pin)" stroke="rgba(11,32,64,0.2)" strokeWidth="1"/>
        <circle cx="8"  cy="-2" r="2.4" fill="#00F5D4"/>
        <circle cx="40" cy="-2" r="2.4" fill="#00F5D4"/>
      </g>

      {/* Ears */}
      <ellipse cx="82"  cy="128" rx="6" ry="10" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <ellipse cx="198" cy="128" rx="6" ry="10" fill="url(#g-skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Pearl earrings */}
      <circle cx="82"  cy="140" r="3" fill="#E0FBFF" stroke="#22C4EE" strokeWidth="0.8"/>
      <circle cx="198" cy="140" r="3" fill="#E0FBFF" stroke="#22C4EE" strokeWidth="0.8"/>

      {/* Cheeks */}
      <ellipse cx="100" cy="146" rx="12" ry="7" fill="url(#g-cheek)" />
      <ellipse cx="180" cy="146" rx="12" ry="7" fill="url(#g-cheek)" />

      {/* Eyebrows */}
      {!isSurprised && (
        <>
          <path d="M104 108 q 8 -4 18 -1" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M158 107 q 10 -3 18 1" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="116" cy="130" r="10" fill="#0B1220" />
          <circle cx="164" cy="130" r="10" fill="#0B1220" />
          <circle cx="119" cy="127" r="3.2" fill="#fff" />
          <circle cx="167" cy="127" r="3.2" fill="#fff" />
        </>
      ) : isThinking ? (
        <>
          <path d="M104 132 Q 116 122 128 132" stroke="#0B1220" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M152 132 Q 164 122 176 132" stroke="#0B1220" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* White base */}
          <ellipse cx="116" cy="132" rx="11" ry="14" fill="#FFFFFF"/>
          <ellipse cx="164" cy="132" rx="11" ry="14" fill="#FFFFFF"/>
          {/* Iris */}
          <ellipse cx="116" cy="134" rx="8"  ry="11" fill="url(#g-iris)"/>
          <ellipse cx="164" cy="134" rx="8"  ry="11" fill="url(#g-iris)"/>
          {/* Pupil */}
          <ellipse cx="116" cy="136" rx="3.5" ry="5.5" fill="#0A1B33"/>
          <ellipse cx="164" cy="136" rx="3.5" ry="5.5" fill="#0A1B33"/>
          {/* Sparkles */}
          <circle cx="120" cy="129" r="2.6" fill="#fff"/>
          <circle cx="168" cy="129" r="2.6" fill="#fff"/>
          <circle cx="112" cy="140" r="1.5" fill="#fff" opacity="0.8"/>
          <circle cx="160" cy="140" r="1.5" fill="#fff" opacity="0.8"/>
          {/* Eyelashes */}
          <path d="M105 125 q 5 -4 10 -3"  stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M124 122 q 3 -2 6 -1"   stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M153 125 q 5 -4 10 -3"  stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M172 122 q 3 -2 6 -1"   stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* Nose (subtle) */}
      <path d="M138 150 q 2 4 4 0" stroke="rgba(11,32,64,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Mouth */}
      {isHappy ? (
        <path d="M128 168 Q 140 182 152 168" stroke="#0B1220" strokeWidth="3.5" fill="#B91C1C" fillOpacity="0.35" strokeLinecap="round" />
      ) : isSurprised ? (
        <ellipse cx="140" cy="170" rx="6" ry="8" fill="#7F1D1D" />
      ) : isGuiding ? (
        <path d="M130 170 Q 140 176 150 170" stroke="#0B1220" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M132 170 Q 140 174 148 170" stroke="#0B1220" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* Floating helper droplets */}
      <circle cx="252" cy="108" r="6" fill="#7FE7FF" opacity="0.85"/>
      <circle cx="20"  cy="98"  r="4" fill="#7FE7FF" opacity="0.75"/>
      <circle cx="256" cy="200" r="3" fill="#A7F3D0" opacity="0.85"/>
      <circle cx="18"  cy="220" r="3" fill="#A7F3D0" opacity="0.85"/>
    </svg>
  );
};

export default AquaMascot;
