import React, { useId } from "react";

/**
 * "Aqua" — AquaSafe AI Water Guardian (Deluxe)
 * Cinematic droplet-headed hero: glossy multi-shine head with flame curl,
 * hi-tech white hoodie with glowing cyan accents & droplet crest,
 * dark pants with under-glow, sneakers with light strip,
 * holographic magic circle + runes at the base, floating data droplets.
 *
 * expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised' | 'wave'
 */
export const AquaMascot = ({ expression = "happy", size = 220, waving = false, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer" || expression === "wave";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isGuiding = expression === "guiding";
  const showWave = waving || expression === "wave" || expression === "cheer";

  const rawId = useId();
  const uid = rawId.replace(/[:]/g, "");
  const g = (id) => `${id}-${uid}`;

  return (
    <svg
      viewBox="0 0 320 500"
      width={size}
      height={size * (500 / 320)}
      className={className}
      role="img"
      aria-label="Aqua water guardian mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        {/* DROPLET HEAD */}
        <radialGradient id={g("head")} cx="34%" cy="26%" r="80%">
          <stop offset="0%"  stopColor="#EAFDFF" />
          <stop offset="18%" stopColor="#A8ECFF" />
          <stop offset="52%" stopColor="#38BDF8" />
          <stop offset="82%" stopColor="#0B75C9" />
          <stop offset="100%" stopColor="#062A55" />
        </radialGradient>
        <linearGradient id={g("headEdge")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={g("shine")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>

        {/* HOODIE */}
        <linearGradient id={g("hoodie")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#EEF6FF" />
          <stop offset="1" stopColor="#B7CFE5" />
        </linearGradient>
        <linearGradient id={g("hoodShade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#D3E4F5" />
          <stop offset="1" stopColor="#8FAECB" />
        </linearGradient>
        <linearGradient id={g("crest")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7FE7FF" />
          <stop offset="1" stopColor="#0B4E8A" />
        </linearGradient>

        {/* SHIRT + PANTS */}
        <linearGradient id={g("shirt")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1F2937" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id={g("pants")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>

        {/* SNEAKER */}
        <linearGradient id={g("sneaker")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#BAC7D8" />
        </linearGradient>

        {/* EYES */}
        <radialGradient id={g("iris")} cx="35%" cy="30%" r="80%">
          <stop offset="0%"  stopColor="#E0FBFF" />
          <stop offset="40%" stopColor="#38BDF8" />
          <stop offset="80%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* MAGIC CIRCLE / SPLASH */}
        <radialGradient id={g("floor")} cx="50%" cy="50%" r="50%">
          <stop offset="0"   stopColor="#22D3EE" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#0EA5E9" stopOpacity="0.35" />
          <stop offset="1"   stopColor="#0B4E8A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g("splash")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={g("glow")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={g("soft")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.6" />
        </filter>
      </defs>

      {/* ==================== HOLO CIRCLE / MAGIC FLOOR ==================== */}
      <g>
        <ellipse cx="160" cy="470" rx="150" ry="20" fill={`url(#${g("floor")})`} />
        {/* magic runic ring */}
        <g className="aq-spin-slow" style={{ transformOrigin: "160px 470px" }}>
          <ellipse cx="160" cy="470" rx="126" ry="16" fill="none"
                   stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.9"/>
          <ellipse cx="160" cy="470" rx="100" ry="12" fill="none"
                   stroke="#67E8F9" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.7"/>
        </g>
        {/* runes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 160 + Math.cos(rad) * 118;
          const y = 470 + Math.sin(rad) * 14;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="3" fill="#7FE7FF" opacity="0.9" />
              <circle r="1.2" fill="#FFFFFF" />
            </g>
          );
        })}
        {/* Splash ring */}
        <path d="M60 468
                 C 80 448 106 448 122 466
                 C 130 452 148 446 160 452
                 C 172 446 190 452 198 466
                 C 214 448 240 448 260 468
                 C 260 484 224 494 160 494
                 C 96 494 60 484 60 468 Z"
              fill={`url(#${g("splash")})`} opacity="0.9" />
        {/* Small splash droplets */}
        <circle cx="42" cy="454" r="4" fill="#7FE7FF" />
        <circle cx="30" cy="440" r="3" fill="#7FE7FF" opacity="0.9" />
        <circle cx="286" cy="450" r="4" fill="#7FE7FF" />
        <circle cx="298" cy="436" r="3" fill="#7FE7FF" opacity="0.9" />
        <circle cx="96" cy="438" r="3" fill="#A7F3D0" />
        <circle cx="232" cy="438" r="3" fill="#A7F3D0" />
      </g>

      {/* Under-body glow */}
      <ellipse cx="160" cy="430" rx="70" ry="16" fill="#22D3EE" opacity="0.55" filter={`url(#${g("soft")})`} />

      {/* ==================== SNEAKERS ==================== */}
      <g>
        {/* Left */}
        <path d="M96 424 L 96 452 C 96 464 106 470 122 470 L 148 470 C 156 470 160 464 160 456 L 160 424 Z"
              fill={`url(#${g("sneaker")})`} stroke="#8FAECB" strokeWidth="1.4"/>
        {/* Blue light strip */}
        <path d="M96 450 L 160 450" stroke="#22D3EE" strokeWidth="3" filter={`url(#${g("glow")})`}/>
        <path d="M96 450 L 160 450" stroke="#0EA5E9" strokeWidth="1.5"/>
        {/* Laces */}
        <path d="M118 430 L 118 448 M 128 430 L 128 448 M 138 430 L 138 448 M 148 430 L 148 448"
              stroke="#8FAECB" strokeWidth="1" fill="none"/>
        {/* Right */}
        <path d="M160 424 L 160 456 C 160 464 164 470 172 470 L 198 470 C 214 470 224 464 224 452 L 224 424 Z"
              fill={`url(#${g("sneaker")})`} stroke="#8FAECB" strokeWidth="1.4"/>
        <path d="M160 450 L 224 450" stroke="#22D3EE" strokeWidth="3" filter={`url(#${g("glow")})`}/>
        <path d="M160 450 L 224 450" stroke="#0EA5E9" strokeWidth="1.5"/>
        <path d="M172 430 L 172 448 M 182 430 L 182 448 M 192 430 L 192 448 M 202 430 L 202 448"
              stroke="#8FAECB" strokeWidth="1" fill="none"/>
      </g>

      {/* ==================== PANTS ==================== */}
      <g>
        <path d="M108 336 L 100 428 L 158 428 L 160 348 Z"
              fill={`url(#${g("pants")})`} stroke="#0B1220" strokeWidth="1"/>
        <path d="M212 336 L 220 428 L 162 428 L 160 348 Z"
              fill={`url(#${g("pants")})`} stroke="#0B1220" strokeWidth="1"/>
        {/* Cyan side stripes */}
        <path d="M104 356 L 100 420" stroke="#22D3EE" strokeWidth="2" opacity="0.85" filter={`url(#${g("glow")})`}/>
        <path d="M216 356 L 220 420" stroke="#22D3EE" strokeWidth="2" opacity="0.85" filter={`url(#${g("glow")})`}/>
        {/* Belt line */}
        <rect x="106" y="332" width="108" height="8" fill="#0B1220" />
        <rect x="106" y="332" width="108" height="1.5" fill="#22D3EE" opacity="0.8"/>
      </g>

      {/* ==================== TORSO ==================== */}
      {/* Shirt behind */}
      <path d="M116 220 L 116 336 L 204 336 L 204 220 Z" fill={`url(#${g("shirt")})`} />
      {/* V neck darker */}
      <path d="M148 226 L 160 250 L 172 226 Z" fill="#020617" />

      {/* Hoodie left panel */}
      <path d="M84 214
               C 68 240 66 296 84 340
               L 152 340
               L 160 246
               L 132 220 Z"
            fill={`url(#${g("hoodie")})`} stroke="#8FAECB" strokeWidth="1.6"/>
      {/* Hoodie right panel */}
      <path d="M236 214
               C 252 240 254 296 236 340
               L 168 340
               L 160 246
               L 188 220 Z"
            fill={`url(#${g("hoodie")})`} stroke="#8FAECB" strokeWidth="1.6"/>

      {/* Hood collar */}
      <path d="M96 214 C 116 200 204 200 224 214 L 216 226 C 196 216 124 216 104 226 Z"
            fill={`url(#${g("hoodShade")})`} stroke="#8FAECB" strokeWidth="1.2"/>

      {/* Cyan tech accent lines on hoodie */}
      <path d="M96 250 C 100 270 108 306 100 332" stroke="#22D3EE" strokeWidth="1.6" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
      <path d="M224 250 C 220 270 212 306 220 332" stroke="#22D3EE" strokeWidth="1.6" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>

      {/* Drawstrings */}
      <line x1="136" y1="222" x2="132" y2="256" stroke="#8FAECB" strokeWidth="2"/>
      <line x1="184" y1="222" x2="188" y2="256" stroke="#8FAECB" strokeWidth="2"/>
      <circle cx="132" cy="260" r="4.5" fill="#22D3EE" filter={`url(#${g("glow")})`}/>
      <circle cx="188" cy="260" r="4.5" fill="#22D3EE" filter={`url(#${g("glow")})`}/>
      <circle cx="132" cy="260" r="2" fill="#FFFFFF" />
      <circle cx="188" cy="260" r="2" fill="#FFFFFF" />

      {/* Pocket line */}
      <path d="M112 296 C 132 314 188 314 208 296" stroke="#8FAECB" strokeWidth="1.6" fill="none"/>

      {/* Zip */}
      <line x1="160" y1="230" x2="160" y2="336" stroke="#0B1220" strokeWidth="1.8" strokeDasharray="3 2"/>
      <circle cx="160" cy="228" r="4" fill="#22D3EE" filter={`url(#${g("glow")})`}/>

      {/* Droplet crest */}
      <g transform="translate(126 268)">
        <path d="M0 0 C -8 12 -14 20 -14 28 a 14 14 0 0 0 28 0 c 0 -8 -6 -16 -14 -28 z"
              fill={`url(#${g("crest")})`} stroke="#0B4E8A" strokeWidth="1.2"/>
        <path d="M-4 14 q 0 -6 4 -12" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round"/>
        <circle cx="-2" cy="20" r="2" fill="#FFFFFF" opacity="0.85"/>
      </g>

      {/* ==================== ARMS ==================== */}
      {/* Left arm resting */}
      <path d="M84 222
               C 66 252 60 300 68 336
               C 70 348 86 352 94 344
               C 100 336 100 302 106 268 Z"
            fill={`url(#${g("hoodie")})`} stroke="#8FAECB" strokeWidth="1.6"/>
      {/* Left glow line */}
      <path d="M78 244 C 74 274 74 308 82 336" stroke="#22D3EE" strokeWidth="1.4" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
      {/* Left hand */}
      <g>
        <circle cx="80" cy="348" r="13" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
        <path d="M72 344 q 3 -6 8 -6 q 4 0 5 4" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8" fill="none"/>
      </g>

      {/* Right arm - waving up */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "228px 224px" }}>
        {showWave ? (
          <>
            <path d="M220 214
                     C 252 194 280 158 288 116
                     C 292 100 278 88 262 96
                     C 240 108 218 148 202 194 Z"
                  fill={`url(#${g("hoodie")})`} stroke="#8FAECB" strokeWidth="1.6"/>
            {/* Cyan glow line on sleeve */}
            <path d="M228 200 C 250 176 268 148 274 118" stroke="#22D3EE" strokeWidth="1.4" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
            {/* Sleeve cuff */}
            <ellipse cx="278" cy="104" rx="13" ry="7" fill="#DDEEFA" transform="rotate(-32 278 104)" stroke="#8FAECB" strokeWidth="1"/>
            {/* Hand */}
            <g transform="translate(284 96)">
              <circle r="15" fill="#F8C8A8" stroke="rgba(11,32,64,0.18)" strokeWidth="1"/>
              <path d="M-10 -8 q 3 -8 8 -8 q 4 0 5 4 z"  fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M-3 -14 q 2 -8 8 -8 q 5 0 5 4 z" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M4 -15 q 2 -8 8 -6 q 4 1 4 5 z"  fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M10 -12 q 4 -6 8 -3 q 3 2 2 5 z" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <circle r="17" fill="none" stroke="#22D3EE" strokeWidth="0.8" opacity="0.65" filter={`url(#${g("glow")})`}/>
            </g>
          </>
        ) : (
          <>
            <path d="M236 222
                     C 254 252 260 300 252 336
                     C 250 348 234 352 226 344
                     C 220 336 220 302 214 268 Z"
                  fill={`url(#${g("hoodie")})`} stroke="#8FAECB" strokeWidth="1.6"/>
            <path d="M242 244 C 246 274 246 308 238 336" stroke="#22D3EE" strokeWidth="1.4" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
            <circle cx="240" cy="348" r="13" fill="#F8C8A8" stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
          </>
        )}
      </g>

      {/* ==================== HEAD (droplet with flame curl) ==================== */}
      {/* Outer soft aura */}
      <ellipse cx="160" cy="150" rx="102" ry="112" fill="#22D3EE" opacity="0.14" filter={`url(#${g("soft")})`} />

      {/* Flame curl top */}
      <path d="M160 18
               C 144 62 156 96 184 100
               C 208 104 226 88 226 62
               C 226 84 218 108 190 122
               C 168 132 142 122 136 100
               C 130 82 132 46 160 18 Z"
            fill={`url(#${g("head")})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.4"/>
      <path d="M160 32 C 152 60 160 84 176 90" stroke="url(#${g('shine')})" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75"/>

      {/* Main head body */}
      <path d="M160 82
               C 100 130 70 178 70 224
               a 90 84 0 0 0 180 0
               C 250 178 220 130 160 82 Z"
            fill={`url(#${g("head")})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.6"/>

      {/* Rim light */}
      <path d="M78 208 a 82 82 0 0 1 164 0" fill="none" stroke={`url(#${g("headEdge")})`} strokeWidth="2" opacity="0.85"/>

      {/* Glossy shines */}
      <path d="M112 128 C 96 168 98 210 116 232"
            stroke={`url(#${g("shine")})`} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M108 240 C 108 244 112 252 118 258"
            stroke={`url(#${g("shine")})`} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.75"/>
      <ellipse cx="208" cy="150" rx="10" ry="7" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="220" cy="176" r="3.4" fill="#FFFFFF" opacity="0.75"/>
      <circle cx="82"  cy="220" r="4"   fill="#FFFFFF" opacity="0.5"/>

      {/* Cheek blush */}
      <ellipse cx="102" cy="238" rx="12" ry="7" fill="rgba(253,164,175,0.55)"/>
      <ellipse cx="218" cy="238" rx="12" ry="7" fill="rgba(253,164,175,0.55)"/>

      {/* Eyebrows */}
      {!isSurprised && (
        <>
          <path d="M108 178 q 12 -6 22 -1" stroke="#0B1220" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75"/>
          <path d="M190 178 q 12 -5 22 1" stroke="#0B1220" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75"/>
        </>
      )}

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="126" cy="212" r="17" fill="#0B1220" />
          <circle cx="194" cy="212" r="17" fill="#0B1220" />
          <circle cx="130" cy="207" r="5" fill="#FFFFFF" />
          <circle cx="198" cy="207" r="5" fill="#FFFFFF" />
        </>
      ) : isThinking ? (
        <>
          <path d="M112 216 Q 126 200 140 216" stroke="#0B1220" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M180 216 Q 194 200 208 216" stroke="#0B1220" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          {/* Big anime eyes */}
          <ellipse cx="126" cy="216" rx="18" ry="22" fill="#020617"/>
          <ellipse cx="194" cy="216" rx="18" ry="22" fill="#020617"/>
          {/* Iris gradient */}
          <ellipse cx="126" cy="218" rx="14" ry="18" fill={`url(#${g("iris")})`}/>
          <ellipse cx="194" cy="218" rx="14" ry="18" fill={`url(#${g("iris")})`}/>
          {/* Pupil */}
          <ellipse cx="126" cy="222" rx="6"  ry="9"  fill="#020617"/>
          <ellipse cx="194" cy="222" rx="6"  ry="9"  fill="#020617"/>
          {/* Top big sparkle */}
          <ellipse cx="132" cy="207" rx="6" ry="5" fill="#FFFFFF"/>
          <ellipse cx="200" cy="207" rx="6" ry="5" fill="#FFFFFF"/>
          {/* Small sparkle bottom */}
          <circle cx="120" cy="228" r="3" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="188" cy="228" r="3" fill="#FFFFFF" opacity="0.9"/>
          {/* Micro glint */}
          <circle cx="134" cy="214" r="1.4" fill="#FFFFFF" />
          <circle cx="202" cy="214" r="1.4" fill="#FFFFFF" />
        </>
      )}

      {/* Mouth */}
      {isHappy ? (
        <>
          <path d="M138 256 Q 160 284 182 256"
                stroke="#0B1220" strokeWidth="4.5" fill="#0B1220" fillOpacity="0.4" strokeLinecap="round"/>
          {/* teeth line */}
          <path d="M144 266 Q 160 274 176 266" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85"/>
        </>
      ) : isSurprised ? (
        <ellipse cx="160" cy="262" rx="8" ry="10" fill="#0B1220"/>
      ) : isGuiding ? (
        <path d="M144 260 Q 160 272 176 260" stroke="#0B1220" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M146 258 Q 160 266 174 258" stroke="#0B1220" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
      )}

      {/* ==================== FLOATING DATA DROPLETS ==================== */}
      <g className="aq-float-a">
        <circle cx="30"  cy="130" r="6" fill="#7FE7FF" opacity="0.9" filter={`url(#${g("glow")})`}/>
        <path d="M30 118 c -3 6 -6 10 -6 14 a 6 6 0 0 0 12 0 c 0 -4 -3 -8 -6 -14 z" fill="#7FE7FF" opacity="0.5"/>
      </g>
      <g className="aq-float-b">
        <circle cx="290" cy="120" r="5" fill="#A7F3D0" opacity="0.9" filter={`url(#${g("glow")})`}/>
      </g>
      <g className="aq-float-a" style={{ animationDelay: "1.2s" }}>
        <circle cx="16"  cy="290" r="4" fill="#7FE7FF" opacity="0.85"/>
      </g>
      <g className="aq-float-b" style={{ animationDelay: "0.8s" }}>
        <circle cx="302" cy="300" r="4" fill="#A7F3D0" opacity="0.85"/>
      </g>
      <g className="aq-float-a" style={{ animationDelay: "2s" }}>
        <circle cx="12"  cy="380" r="3" fill="#7FE7FF" opacity="0.7"/>
      </g>
    </svg>
  );
};

export default AquaMascot;
