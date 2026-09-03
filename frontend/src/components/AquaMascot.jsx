import React from "react";

/**
 * "Aqua" — chibi anime water-spirit character (AquaSafe AI mascot)
 * A proper character (not a plain droplet): big anime eyes, flowing water-hair,
 * wave crown, chibi body with hoodie, arms & waving hand.
 *
 * expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised' | 'wave'
 * waving: forces the right hand to wave
 */
export const AquaMascot = ({ expression = "happy", size = 160, waving = false, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer" || expression === "wave";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isGuiding = expression === "guiding";
  const showWave = waving || expression === "wave" || expression === "happy" || expression === "cheer";

  return (
    <svg
      viewBox="0 0 260 320"
      width={size}
      height={size * (320 / 260)}
      className={className}
      role="img"
      aria-label="Aqua chibi water spirit mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        {/* Skin (icy pearl) */}
        <radialGradient id="skin" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFDFB" />
          <stop offset="70%" stopColor="#E7F7FF" />
          <stop offset="100%" stopColor="#B9E4F7" />
        </radialGradient>
        {/* Water hair */}
        <linearGradient id="hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7FE7FF" />
          <stop offset="0.55" stopColor="#2AA6E8" />
          <stop offset="1" stopColor="#0B4E8A" />
        </linearGradient>
        <linearGradient id="hairHi" x1="0" x2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
        {/* Hoodie */}
        <linearGradient id="hoodie" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0F4C8A" />
        </linearGradient>
        <linearGradient id="hoodieLight" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#1D8CD1" />
        </linearGradient>
        {/* Cheek */}
        <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        {/* Crown */}
        <linearGradient id="crown" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E0FBFF" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        {/* Eye gleam */}
        <radialGradient id="eyeShine" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#7FE7FF" />
          <stop offset="100%" stopColor="#1D8CD1" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="130" cy="298" rx="80" ry="10" fill="#38BDF8" opacity="0.25" filter="url(#soft)" />

      {/* ---------- BODY (chibi hoodie) ---------- */}
      {/* Back hair flowing down behind body */}
      <path d="M62 150 C 40 190 46 240 70 274 L 190 274 C 214 240 220 190 198 150 C 190 138 168 150 130 150 C 92 150 70 138 62 150 Z"
            fill="url(#hair)" opacity="0.85"/>
      <path d="M74 156 C 66 190 78 236 108 262" stroke="url(#hairHi)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.55"/>

      {/* Hoodie body */}
      <path d="M84 188 C 74 220 78 260 96 286 L 164 286 C 182 260 186 220 176 188 C 168 168 150 160 130 160 C 110 160 92 168 84 188 Z"
            fill="url(#hoodie)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      {/* Hoodie inner shadow / pocket */}
      <path d="M100 232 C 116 252 144 252 160 232 L 160 262 L 100 262 Z" fill="url(#hoodieLight)" opacity="0.65"/>
      {/* Drawstrings */}
      <line x1="118" y1="196" x2="116" y2="222" stroke="#E0FBFF" strokeWidth="3" strokeLinecap="round"/>
      <line x1="142" y1="196" x2="144" y2="222" stroke="#E0FBFF" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="116" cy="226" r="4" fill="#E0FBFF"/>
      <circle cx="144" cy="226" r="4" fill="#E0FBFF"/>

      {/* Left arm (idle) */}
      <path d="M86 200 C 70 214 62 236 66 258 C 68 270 78 274 86 268 C 92 262 94 240 100 224 Z"
            fill="url(#hoodie)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
      {/* Hand (left) */}
      <circle cx="76" cy="266" r="12" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Right arm (waving) */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "180px 210px" }}>
        <path d="M174 200 C 200 190 224 174 234 152 C 240 138 232 128 220 132 C 206 138 188 158 168 178 Z"
              fill="url(#hoodie)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
        {/* Hand (right waving) */}
        <g transform="translate(228 138)">
          <circle r="14" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
          {/* fingers */}
          <path d="M-10 -6 q 3 -8 8 -8 q 4 0 6 4 z" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M-4 -12 q 2 -8 8 -8 q 5 0 6 4 z" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M4 -13 q 2 -8 8 -6 q 4 1 4 5 z" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
          <path d="M10 -10 q 4 -6 8 -3 q 3 2 2 5 z" fill="url(#skin)" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
        </g>
      </g>

      {/* ---------- HEAD ---------- */}
      {/* Head shape (chibi round) */}
      <ellipse cx="130" cy="110" rx="66" ry="72" fill="url(#skin)" stroke="rgba(11,32,64,0.10)" strokeWidth="1"/>

      {/* Front hair (bangs + side locks) */}
      <path d="M68 96 C 76 60 108 42 132 42 C 158 42 188 58 196 96 C 186 88 174 86 164 92 C 158 78 150 74 140 76 C 134 66 124 66 118 76 C 108 74 100 78 94 92 C 84 86 74 88 68 96 Z"
            fill="url(#hair)"/>
      {/* Side lock left */}
      <path d="M64 100 C 58 130 60 160 74 180 C 66 172 60 154 60 132 C 60 118 62 108 64 100 Z" fill="url(#hair)"/>
      {/* Side lock right */}
      <path d="M196 100 C 202 130 200 160 186 180 C 194 172 200 154 200 132 C 200 118 198 108 196 100 Z" fill="url(#hair)"/>
      {/* Water drips at hair tips */}
      <circle cx="62" cy="184" r="4" fill="#7FE7FF"/>
      <circle cx="198" cy="184" r="4" fill="#7FE7FF"/>

      {/* Fin ears */}
      <path d="M58 118 C 40 118 30 130 34 148 C 40 144 52 138 62 132 Z" fill="url(#hoodieLight)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <path d="M202 118 C 220 118 230 130 226 148 C 220 144 208 138 198 132 Z" fill="url(#hoodieLight)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Wave crown */}
      <g>
        <path d="M92 52 C 100 40 110 40 118 50 C 124 40 136 40 142 50 C 150 40 160 40 168 52 L 166 62 C 158 56 150 62 146 66 C 138 60 130 66 130 66 C 122 60 118 62 114 66 C 108 60 100 60 94 62 Z"
              fill="url(#crown)" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
        <circle cx="130" cy="58" r="4" fill="#00F5D4"/>
      </g>

      {/* Cheeks */}
      <ellipse cx="90"  cy="132" rx="12" ry="7" fill="url(#cheek)" />
      <ellipse cx="170" cy="132" rx="12" ry="7" fill="url(#cheek)" />

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="106" cy="115" r="12" fill="#0B1220" />
          <circle cx="154" cy="115" r="12" fill="#0B1220" />
          <circle cx="109" cy="112" r="4" fill="#fff" />
          <circle cx="157" cy="112" r="4" fill="#fff" />
        </>
      ) : isThinking ? (
        <>
          <path d="M96 120 Q106 108 118 120" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M142 120 Q154 108 164 120" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Eye whites */}
          <ellipse cx="106" cy="118" rx="12" ry="15" fill="#FFFFFF"/>
          <ellipse cx="154" cy="118" rx="12" ry="15" fill="#FFFFFF"/>
          {/* Iris (gradient) */}
          <ellipse cx="106" cy="120" rx="9" ry="12" fill="url(#eyeShine)"/>
          <ellipse cx="154" cy="120" rx="9" ry="12" fill="url(#eyeShine)"/>
          {/* Pupil */}
          <ellipse cx="106" cy="122" rx="4" ry="6" fill="#0A1B33"/>
          <ellipse cx="154" cy="122" rx="4" ry="6" fill="#0A1B33"/>
          {/* Sparkle */}
          <circle cx="110" cy="115" r="2.6" fill="#fff"/>
          <circle cx="158" cy="115" r="2.6" fill="#fff"/>
          <circle cx="102" cy="126" r="1.4" fill="#fff" opacity="0.75"/>
          <circle cx="150" cy="126" r="1.4" fill="#fff" opacity="0.75"/>
          {/* Eyelash tips */}
          <path d="M96 108 q 4 -4 8 -4"  stroke="#0A1B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M156 104 q 4 0 8 4"    stroke="#0A1B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* Mouth */}
      {isHappy ? (
        <path d="M118 152 Q130 168 142 152" stroke="#0B1220" strokeWidth="4" fill="#0B1220" fillOpacity="0.15" strokeLinecap="round" />
      ) : isSurprised ? (
        <ellipse cx="130" cy="156" rx="6" ry="8" fill="#0B1220" />
      ) : isGuiding ? (
        <path d="M120 154 Q130 160 140 154" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M122 154 Q130 158 138 154" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}

      {/* Floating helper droplets */}
      <circle cx="232" cy="98" r="6" fill="#7FE7FF" opacity="0.85"/>
      <circle cx="26"  cy="90" r="4" fill="#7FE7FF" opacity="0.75"/>
      <circle cx="240" cy="200" r="3" fill="#A7F3D0" opacity="0.85"/>
    </svg>
  );
};

export default AquaMascot;
