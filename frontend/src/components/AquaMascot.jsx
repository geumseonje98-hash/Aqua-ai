import React from "react";

/**
 * "Aqua" — AquaSafe AI's Water Guardian mascot
 * Full-body droplet-headed character: glossy teardrop head with a flame-tip curl,
 * white hoodie (open zip, drawstrings, pocket, droplet crest), dark pants and
 * white sneakers, standing on a water splash ring.
 *
 * expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised' | 'wave'
 */
export const AquaMascot = ({ expression = "happy", size = 200, waving = false, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer" || expression === "wave";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isGuiding = expression === "guiding";
  const showWave = waving || expression === "wave" || expression === "cheer";

  return (
    <svg
      viewBox="0 0 300 440"
      width={size}
      height={size * (440 / 300)}
      className={className}
      role="img"
      aria-label="Aqua water guardian mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        {/* Droplet head */}
        <radialGradient id="droplet" cx="38%" cy="32%" r="72%">
          <stop offset="0%"  stopColor="#F0FEFF" />
          <stop offset="35%" stopColor="#67D8FF" />
          <stop offset="75%" stopColor="#1E90E8" />
          <stop offset="100%" stopColor="#0B4E8A" />
        </radialGradient>
        <linearGradient id="dropShine" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.15" />
        </linearGradient>
        {/* Hoodie */}
        <linearGradient id="hoodieWhite" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DDEEFA" />
        </linearGradient>
        <linearGradient id="hoodieShade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C8DEF0" />
          <stop offset="1" stopColor="#9CB9D5" />
        </linearGradient>
        {/* Shirt */}
        <linearGradient id="shirt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        {/* Pants */}
        <linearGradient id="pants" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#111827" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        {/* Sneaker */}
        <linearGradient id="sneaker" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        {/* Splash */}
        <linearGradient id="splash" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7FE7FF" />
          <stop offset="1" stopColor="#0B4E8A" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0B4E8A" stopOpacity="0" />
        </radialGradient>

        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* ---------- Water splash platform ---------- */}
      <ellipse cx="150" cy="420" rx="130" ry="16" fill="url(#glow)" />
      <g>
        {/* Outer splash ring */}
        <path d="M40 420
                 C 60 400 90 400 110 418
                 C 118 402 138 396 150 402
                 C 162 396 182 402 190 418
                 C 210 400 240 400 260 420
                 C 260 434 220 442 150 442
                 C 80 442 40 434 40 420 Z"
              fill="url(#splash)" opacity="0.85" />
        {/* Splash droplets */}
        <circle cx="30"  cy="410" r="4" fill="#7FE7FF" />
        <circle cx="18"  cy="398" r="3" fill="#7FE7FF" />
        <circle cx="278" cy="404" r="4" fill="#7FE7FF" />
        <circle cx="290" cy="392" r="3" fill="#7FE7FF" />
        <circle cx="90"  cy="392" r="3" fill="#A7F3D0" />
        <circle cx="220" cy="392" r="3" fill="#A7F3D0" />
        {/* Ripple lines */}
        <ellipse cx="150" cy="428" rx="120" ry="6" fill="none" stroke="rgba(127,231,255,0.7)" strokeWidth="1.2" />
        <ellipse cx="150" cy="434" rx="90"  ry="4" fill="none" stroke="rgba(127,231,255,0.45)" strokeWidth="1" />
      </g>

      {/* ---------- Sneakers ---------- */}
      <g>
        {/* Left sneaker */}
        <path d="M92 388 L 92 410 C 92 420 100 424 112 424 L 138 424 C 144 424 148 420 148 414 L 148 388 Z"
              fill="url(#sneaker)" stroke="#94A3B8" strokeWidth="1.4"/>
        <path d="M92 408 L 148 408" stroke="#0EA5E9" strokeWidth="3"/>
        <path d="M118 392 L 118 406 M 128 392 L 128 406 M 138 392 L 138 406"
              stroke="#94A3B8" strokeWidth="1" fill="none"/>
        <ellipse cx="120" cy="418" rx="20" ry="4" fill="#0F172A" opacity="0.35"/>
        {/* Right sneaker */}
        <path d="M152 388 L 152 414 C 152 420 156 424 162 424 L 188 424 C 200 424 208 420 208 410 L 208 388 Z"
              fill="url(#sneaker)" stroke="#94A3B8" strokeWidth="1.4"/>
        <path d="M152 408 L 208 408" stroke="#0EA5E9" strokeWidth="3"/>
        <path d="M162 392 L 162 406 M 172 392 L 172 406 M 182 392 L 182 406"
              stroke="#94A3B8" strokeWidth="1" fill="none"/>
        <ellipse cx="180" cy="418" rx="20" ry="4" fill="#0F172A" opacity="0.35"/>
      </g>

      {/* ---------- Pants ---------- */}
      <path d="M104 310 L 96 392 L 148 392 L 150 322 Z" fill="url(#pants)" stroke="#0B1220" strokeWidth="1"/>
      <path d="M196 310 L 204 392 L 152 392 L 150 322 Z" fill="url(#pants)" stroke="#0B1220" strokeWidth="1"/>
      {/* Pant crease */}
      <path d="M120 330 L 108 388" stroke="rgba(148,163,184,0.25)" strokeWidth="1" fill="none"/>
      <path d="M180 330 L 192 388" stroke="rgba(148,163,184,0.25)" strokeWidth="1" fill="none"/>
      {/* Belt line hint */}
      <rect x="102" y="308" width="96" height="6" fill="#0B1220" />

      {/* ---------- Torso: shirt + hoodie ---------- */}
      {/* Black shirt behind hoodie */}
      <path d="M116 212 L 116 308 L 184 308 L 184 212 Z" fill="url(#shirt)" />
      {/* V-neck highlight */}
      <path d="M140 216 L 150 236 L 160 216 Z" fill="#020617" />

      {/* Hoodie left panel */}
      <path d="M88 208
               C 76 232 76 280 88 312
               L 144 312
               L 150 236
               L 128 214
               Z"
            fill="url(#hoodieWhite)" stroke="#94B0CC" strokeWidth="1.4"/>
      {/* Hoodie right panel */}
      <path d="M212 208
               C 224 232 224 280 212 312
               L 156 312
               L 150 236
               L 172 214
               Z"
            fill="url(#hoodieWhite)" stroke="#94B0CC" strokeWidth="1.4"/>
      {/* Hood collar */}
      <path d="M100 208 C 116 196 184 196 200 208 L 194 218 C 178 210 122 210 106 218 Z"
            fill="url(#hoodieShade)" stroke="#94B0CC" strokeWidth="1.2"/>
      {/* Drawstrings */}
      <line x1="132" y1="214" x2="130" y2="244" stroke="#94B0CC" strokeWidth="2" />
      <line x1="168" y1="214" x2="170" y2="244" stroke="#94B0CC" strokeWidth="2" />
      <circle cx="130" cy="248" r="3.5" fill="#0EA5E9" />
      <circle cx="170" cy="248" r="3.5" fill="#0EA5E9" />
      {/* Pocket line */}
      <path d="M110 268 C 130 284 170 284 190 268" stroke="#94B0CC" strokeWidth="1.4" fill="none"/>
      {/* Droplet crest on left chest */}
      <g transform="translate(122 246)">
        <path d="M0 0 C -6 8 -10 14 -10 20 a 10 10 0 0 0 20 0 c 0 -6 -4 -12 -10 -20 z" fill="#38BDF8" stroke="#0B4E8A" strokeWidth="1"/>
        <circle cx="-3" cy="10" r="1.6" fill="#FFFFFF" opacity="0.8"/>
      </g>
      {/* Zip line */}
      <line x1="150" y1="220" x2="150" y2="308" stroke="#0B1220" strokeWidth="1.6" strokeDasharray="3 2"/>

      {/* ---------- Arms ---------- */}
      {/* Left arm (down, hand in pocket-ish) */}
      <path d="M88 214
               C 74 240 68 274 74 306
               C 76 316 90 320 96 314
               C 100 306 100 274 104 244 Z"
            fill="url(#hoodieWhite)" stroke="#94B0CC" strokeWidth="1.4"/>
      <circle cx="86" cy="316" r="12" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Right arm (waving or resting) */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "212px 220px" }}>
        {showWave ? (
          <>
            <path d="M208 210
                     C 236 190 260 158 268 122
                     C 272 106 258 96 244 104
                     C 226 116 208 148 194 190 Z"
                  fill="url(#hoodieWhite)" stroke="#94B0CC" strokeWidth="1.4"/>
            {/* Sleeve cuff */}
            <ellipse cx="258" cy="112" rx="12" ry="7" fill="#DDEEFA" transform="rotate(-32 258 112)"/>
            {/* Hand */}
            <g transform="translate(264 108)">
              <circle r="14" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
              <path d="M-9 -8 q 3 -8 8 -8 q 4 0 5 4 z"  fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M-3 -14 q 2 -8 8 -8 q 5 0 5 4 z" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M4 -15 q 2 -8 8 -6 q 4 1 4 5 z"  fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M10 -12 q 4 -6 8 -3 q 3 2 2 5 z" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
            </g>
          </>
        ) : (
          <>
            {/* Arm down alongside body */}
            <path d="M212 214
                     C 226 240 232 274 226 306
                     C 224 316 210 320 204 314
                     C 200 306 200 274 196 244 Z"
                  fill="url(#hoodieWhite)" stroke="#94B0CC" strokeWidth="1.4"/>
            <circle cx="214" cy="316" r="12" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
          </>
        )}
      </g>

      {/* ---------- HEAD (droplet with flame curl) ---------- */}
      {/* Curled "flame" top of the droplet */}
      <path d="M150 20
               C 138 60 150 88 172 92
               C 190 96 208 84 210 60
               C 210 74 202 96 178 108
               C 158 118 138 108 132 90
               C 128 74 130 46 150 20 Z"
            fill="url(#droplet)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>

      {/* Main head body */}
      <path d="M150 74
               C 100 118 74 160 74 200
               a 76 74 0 0 0 152 0
               C 226 160 200 118 150 74 Z"
            fill="url(#droplet)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4"/>

      {/* Head highlight glossy strokes */}
      <path d="M108 130 C 96 168 100 200 116 216"
            stroke="url(#dropShine)" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.85"/>
      <circle cx="196" cy="140" r="8" fill="#FFFFFF" opacity="0.85"/>
      <circle cx="210" cy="160" r="3" fill="#FFFFFF" opacity="0.65"/>

      {/* Face - Eyes */}
      {isSurprised ? (
        <>
          <circle cx="124" cy="192" r="16" fill="#0B1220" />
          <circle cx="176" cy="192" r="16" fill="#0B1220" />
          <circle cx="128" cy="188" r="5" fill="#FFFFFF" />
          <circle cx="180" cy="188" r="5" fill="#FFFFFF" />
        </>
      ) : isThinking ? (
        <>
          <path d="M110 194 Q 124 178 138 194" stroke="#0B1220" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M162 194 Q 176 178 190 194" stroke="#0B1220" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          {/* Eye base */}
          <ellipse cx="124" cy="196" rx="14" ry="17" fill="#0B1220"/>
          <ellipse cx="176" cy="196" rx="14" ry="17" fill="#0B1220"/>
          {/* Sparkles */}
          <circle cx="129" cy="188" r="5" fill="#FFFFFF"/>
          <circle cx="181" cy="188" r="5" fill="#FFFFFF"/>
          <circle cx="119" cy="204" r="2.4" fill="#FFFFFF" opacity="0.85"/>
          <circle cx="171" cy="204" r="2.4" fill="#FFFFFF" opacity="0.85"/>
          <circle cx="125" cy="182" r="1.6" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="177" cy="182" r="1.6" fill="#FFFFFF" opacity="0.9"/>
        </>
      )}

      {/* Cheek blush */}
      <ellipse cx="102" cy="216" rx="10" ry="6" fill="rgba(253,164,175,0.55)"/>
      <ellipse cx="198" cy="216" rx="10" ry="6" fill="rgba(253,164,175,0.55)"/>

      {/* Mouth */}
      {isHappy ? (
        <path d="M132 232 Q 150 254 168 232"
              stroke="#0B1220" strokeWidth="4" fill="#0B1220" fillOpacity="0.35" strokeLinecap="round"/>
      ) : isSurprised ? (
        <ellipse cx="150" cy="238" rx="7" ry="9" fill="#0B1220"/>
      ) : isGuiding ? (
        <path d="M136 234 Q 150 244 164 234" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M138 234 Q 150 240 162 234" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      )}

      {/* Tiny helper droplets floating around */}
      <circle cx="252" cy="70"  r="6" fill="#7FE7FF" opacity="0.85"/>
      <circle cx="40"  cy="80"  r="4" fill="#7FE7FF" opacity="0.75"/>
      <circle cx="30"  cy="230" r="3" fill="#A7F3D0" opacity="0.85"/>
      <circle cx="270" cy="260" r="3" fill="#7FE7FF" opacity="0.85"/>
    </svg>
  );
};

export default AquaMascot;
