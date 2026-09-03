import React, { useId } from "react";

/**
 * "Aqua" — AquaSafe AI Water Sorceress (creative human form)
 * Modern-fantasy anime woman: two-tone flowing water hair, wave crown,
 * asymmetric crop top with luminescent rune tattoos, jewelled belt, split
 * flowing skirt, thigh-high translucent water boots, and a glowing water
 * orb hovering in her hand. Surrounded by drifting water tendrils.
 *
 * expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised' | 'wave' | 'worried'
 */
export const AquaMascot = ({ expression = "happy", size = 220, waving = false, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer" || expression === "wave";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isWorried = expression === "worried";
  const showWave = waving || expression === "wave" || expression === "cheer";

  const rawId = useId();
  const uid = rawId.replace(/[:]/g, "");
  const g = (id) => `${id}-${uid}`;

  return (
    <svg
      viewBox="0 0 320 620"
      width={size}
      height={size * (620 / 320)}
      className={className}
      role="img"
      aria-label="Aqua water sorceress mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        {/* Skin — porcelain with faint cool undertone */}
        <radialGradient id={g("skin")} cx="50%" cy="30%" r="70%">
          <stop offset="0%"  stopColor="#FFF5EA" />
          <stop offset="65%" stopColor="#FFD9BC" />
          <stop offset="100%" stopColor="#DBA07E" />
        </radialGradient>
        <linearGradient id={g("shade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0"/>
          <stop offset="1" stopColor="#3B1E10" stopOpacity="0.35"/>
        </linearGradient>

        {/* Two-tone hair - LEFT side lighter */}
        <linearGradient id={g("hairL")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"    stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#A0EBFF" />
          <stop offset="1"    stopColor="#0EA5E9" />
        </linearGradient>
        {/* RIGHT side deep ocean */}
        <linearGradient id={g("hairR")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"    stopColor="#0EA5E9" />
          <stop offset="0.5"  stopColor="#0B4E8A" />
          <stop offset="1"    stopColor="#020A1E" />
        </linearGradient>
        <linearGradient id={g("hairHi")} x1="0" x2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/>
        </linearGradient>

        {/* Top / bodice */}
        <linearGradient id={g("top")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id={g("topEdge")} x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE"/>
          <stop offset="1" stopColor="#00F5D4"/>
        </linearGradient>

        {/* Skirt - split flowing */}
        <linearGradient id={g("skirt")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"    stopColor="#22D3EE" stopOpacity="0.95"/>
          <stop offset="0.4"  stopColor="#0EA5E9" stopOpacity="0.9"/>
          <stop offset="1"    stopColor="#052A55" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id={g("skirtHi")} x1="0" x2="1">
          <stop offset="0" stopColor="#A6ECFF" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.05"/>
        </linearGradient>

        {/* Water boots - translucent water */}
        <linearGradient id={g("boot")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A6ECFF" stopOpacity="0.75"/>
          <stop offset="1" stopColor="#0369A1" stopOpacity="0.9"/>
        </linearGradient>

        {/* Water orb */}
        <radialGradient id={g("orb")} cx="35%" cy="30%" r="70%">
          <stop offset="0%"  stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#67E8F9" />
          <stop offset="80%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#020A1E" />
        </radialGradient>

        {/* Eyes */}
        <radialGradient id={g("iris")} cx="35%" cy="25%" r="90%">
          <stop offset="0%"  stopColor="#DBFCFF" />
          <stop offset="35%" stopColor="#22C4EE" />
          <stop offset="70%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Lips */}
        <linearGradient id={g("lip")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F472B6" />
          <stop offset="1" stopColor="#9F1239" />
        </linearGradient>

        {/* Water tendril */}
        <linearGradient id={g("tendril")} x1="0" x2="1">
          <stop offset="0" stopColor="#A6ECFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#22D3EE" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0369A1" stopOpacity="0" />
        </linearGradient>

        {/* Splash */}
        <radialGradient id={g("floor")} cx="50%" cy="50%" r="50%">
          <stop offset="0"    stopColor="#22D3EE" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#0EA5E9" stopOpacity="0.35" />
          <stop offset="1"    stopColor="#020A1E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g("splash")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>

        <filter id={g("glow")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={g("softglow")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ============ WATER FLOOR + MAGIC CIRCLE ============ */}
      <ellipse cx="160" cy="590" rx="150" ry="18" fill={`url(#${g("floor")})`} />
      <g className="aq-spin-slow" style={{ transformOrigin: "160px 590px" }}>
        <ellipse cx="160" cy="590" rx="128" ry="14" fill="none"
                 stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.85"/>
        <ellipse cx="160" cy="590" rx="100" ry="10" fill="none"
                 stroke="#67E8F9" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6"/>
      </g>
      {/* Runes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 160 + Math.cos(rad) * 118;
        const y = 590 + Math.sin(rad) * 12;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M -4 0 L 0 -6 L 4 0 L 0 6 Z" fill="#7FE7FF"/>
            <circle r="1.4" fill="#FFFFFF"/>
          </g>
        );
      })}
      <path d="M50 588
               C 72 566 100 566 118 586
               C 128 570 148 564 160 570
               C 172 564 188 570 196 586
               C 214 566 240 566 258 588
               C 258 604 220 614 154 614
               C 88 614 50 604 50 588 Z"
            fill={`url(#${g("splash")})`} opacity="0.9" />

      {/* ============ WATER TENDRILS BEHIND ============ */}
      <g opacity="0.85" filter={`url(#${g("glow")})`}>
        <path d="M40 300 C 20 340 40 400 30 460 C 26 490 46 500 60 490"
              stroke={`url(#${g("tendril")})`} strokeWidth="6" fill="none" strokeLinecap="round" className="aq-float-a"/>
        <path d="M290 260 C 306 300 288 360 300 420 C 306 450 288 470 272 460"
              stroke={`url(#${g("tendril")})`} strokeWidth="6" fill="none" strokeLinecap="round" className="aq-float-b"/>
        <path d="M14 180 C 24 220 14 260 30 280"
              stroke={`url(#${g("tendril")})`} strokeWidth="4" fill="none" strokeLinecap="round" className="aq-float-b"/>
        <path d="M304 200 C 292 240 306 280 288 300"
              stroke={`url(#${g("tendril")})`} strokeWidth="4" fill="none" strokeLinecap="round" className="aq-float-a"/>
      </g>

      {/* ============ LONG BACK HAIR (asymmetric two-tone) ============ */}
      {/* LEFT LIGHT SIDE */}
      <path d="M78 170
               C 46 220 32 300 42 380
               C 50 442 74 494 100 508
               L 158 508
               L 158 130 Z"
            fill={`url(#${g("hairL")})`} />
      {/* RIGHT DARK SIDE */}
      <path d="M242 170
               C 274 220 288 300 278 380
               C 270 442 246 494 220 508
               L 162 508
               L 162 130 Z"
            fill={`url(#${g("hairR")})`} />
      {/* Hair strand highlights */}
      <path d="M70 220 C 58 300 72 400 90 460"
            stroke={`url(#${g("hairHi")})`} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M110 260 C 106 340 112 420 120 470"
            stroke={`url(#${g("hairHi")})`} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M250 220 C 262 300 248 400 230 460"
            stroke="#67E8F9" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"/>
      <path d="M210 260 C 214 340 208 420 200 470"
            stroke="#67E8F9" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* ============ LEGS / WATER BOOTS ============ */}
      {/* Left leg */}
      <path d="M126 400 C 122 460 118 520 122 560 C 124 574 138 578 142 570 C 146 552 148 496 150 420 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Right leg */}
      <path d="M194 400 C 198 460 202 520 198 560 C 196 574 182 578 178 570 C 174 552 172 496 170 420 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Water boot L */}
      <path d="M116 500 C 112 526 118 566 130 578 L 148 578 C 152 566 152 526 150 500 Z"
            fill={`url(#${g("boot")})`} stroke="#38BDF8" strokeWidth="1.4"/>
      <path d="M120 510 C 118 540 130 566 138 574" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.85"/>
      {/* Water boot R */}
      <path d="M170 500 C 168 526 168 566 172 578 L 190 578 C 202 566 208 526 204 500 Z"
            fill={`url(#${g("boot")})`} stroke="#38BDF8" strokeWidth="1.4"/>
      <path d="M182 510 C 190 540 202 566 200 574" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.85"/>
      {/* Boot glow rim */}
      <path d="M112 500 L 154 500 M 166 500 L 210 500" stroke="#22D3EE" strokeWidth="2.5" filter={`url(#${g("glow")})`}/>

      {/* ============ SKIRT (split flowing) ============ */}
      {/* Left flare */}
      <path d="M110 372
               C 96 400 82 452 68 496
               C 84 508 106 512 128 496
               C 128 452 130 400 130 372 Z"
            fill={`url(#${g("skirt")})`} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
      {/* Right flare */}
      <path d="M210 372
               C 224 400 238 452 252 496
               C 236 508 214 512 192 496
               C 192 452 190 400 190 372 Z"
            fill={`url(#${g("skirt")})`} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
      {/* Center panel (front, showing leg gap) */}
      <path d="M130 372 L 190 372 L 194 396 L 126 396 Z"
            fill={`url(#${g("skirt")})`} opacity="0.9"/>
      {/* Skirt highlights */}
      <path d="M100 380 C 90 420 80 460 74 490" stroke={`url(#${g("skirtHi")})`} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M220 380 C 230 420 240 460 246 490" stroke={`url(#${g("skirtHi")})`} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85"/>
      {/* Skirt lace bottom */}
      <path d="M68 496 Q 96 508 128 498 M 192 498 Q 220 508 252 496" fill="none" stroke="#67E8F9" strokeWidth="1.4" opacity="0.9"/>

      {/* ============ BELT WITH GEM ============ */}
      <path d="M104 360 L 216 360 L 220 378 L 100 378 Z" fill="#0F172A" stroke="#0B4E8A" strokeWidth="1"/>
      <path d="M100 372 L 220 372" stroke="#22D3EE" strokeWidth="2" filter={`url(#${g("glow")})`}/>
      {/* Center gem */}
      <g transform="translate(160 371)">
        <path d="M0 -10 L 8 0 L 0 10 L -8 0 Z" fill="#22D3EE" stroke="#0B4E8A" strokeWidth="1"/>
        <path d="M0 -6 L 4 0 L 0 6 L -4 0 Z" fill="#DBFCFF" opacity="0.8"/>
        <circle r="1.6" fill="#FFFFFF"/>
      </g>

      {/* ============ TORSO (crop top) ============ */}
      {/* Bare midriff */}
      <path d="M124 306 Q 160 316 196 306 L 200 358 L 120 358 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.12)" strokeWidth="1"/>
      {/* Rune line on stomach */}
      <path d="M148 336 q 6 -4 12 0 t 12 0" stroke="#22D3EE" strokeWidth="1.6" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
      <circle cx="160" cy="336" r="1.4" fill="#22D3EE" filter={`url(#${g("glow")})`}/>

      {/* Crop top */}
      <path d="M104 258
               C 96 274 96 296 108 310
               L 212 310
               C 224 296 224 274 216 258
               C 200 268 180 268 172 262
               Q 160 268 148 262
               C 140 268 120 268 104 258 Z"
            fill={`url(#${g("top")})`} stroke={`url(#${g("topEdge")})`} strokeWidth="1.6"/>
      {/* Top edge glow */}
      <path d="M104 258 C 128 246 192 246 216 258" stroke={`url(#${g("topEdge")})`} strokeWidth="2" fill="none" filter={`url(#${g("glow")})`}/>
      {/* Asymmetric cutout (right shoulder off) */}
      <path d="M186 258 L 214 258 L 212 268 L 188 264 Z" fill={`url(#${g("skin")})`} opacity="0.9"/>
      {/* Top rune */}
      <path d="M138 286 q 8 -6 16 0 t 16 0 t 12 -2" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>

      {/* ============ NECK & COLLARBONE ============ */}
      <path d="M144 232 L 144 262 Q 160 272 176 262 L 176 232 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <path d="M136 258 Q 160 268 184 258" fill="none" stroke={`url(#${g("shade")})`} strokeWidth="3"/>

      {/* Rune choker */}
      <path d="M138 250 Q 160 260 182 250" fill="none" stroke="#22D3EE" strokeWidth="2.4" filter={`url(#${g("glow")})`}/>
      <circle cx="160" cy="258" r="3" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="0.8" filter={`url(#${g("glow")})`}/>

      {/* ============ ARMS ============ */}
      {/* Left arm (holding water orb OUT front) */}
      <path d="M106 274
               C 76 292 56 328 60 380
               C 62 400 84 402 92 388
               C 100 372 100 338 116 306 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Rune on arm */}
      <path d="M78 320 q 4 -6 10 -2 t 10 -2" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
      {/* Left hand cupped */}
      <g>
        <ellipse cx="72" cy="394" rx="14" ry="12" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
        <path d="M64 394 q 6 -8 16 -6" stroke="rgba(11,32,64,0.2)" strokeWidth="0.8" fill="none"/>
        {/* Bracelet */}
        <ellipse cx="72" cy="380" rx="12" ry="3.8" fill="#F5D48A" stroke="#B45309" strokeWidth="0.8"/>
      </g>
      {/* Water orb hovering above left hand */}
      <g>
        <circle cx="72" cy="366" r="20" fill={`url(#${g("orb")})`} filter={`url(#${g("glow")})`}/>
        <ellipse cx="66" cy="358" rx="6" ry="4" fill="#FFFFFF" opacity="0.85"/>
        <circle cx="80" cy="374" r="2.4" fill="#FFFFFF" opacity="0.7"/>
        <path d="M56 372 q 6 -10 16 -8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.5"/>
        {/* Aura */}
        <circle cx="72" cy="366" r="26" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.7" filter={`url(#${g("softglow")})`}/>
        {/* Tiny fish inside */}
        <path d="M66 366 q 4 -3 8 0 q -2 2 -4 0 z" fill="#F87171"/>
        <circle cx="67" cy="365" r="0.8" fill="#0B1220"/>
      </g>

      {/* Right arm - dynamic (waving) */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "216px 274px" }}>
        {showWave ? (
          <>
            <path d="M212 268
                     C 240 240 268 200 278 152
                     C 282 134 268 124 254 130
                     C 232 142 214 176 200 218 Z"
                  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
            {/* Rune on arm */}
            <path d="M238 194 q 4 -6 10 -2 t 10 -2" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.85" filter={`url(#${g("glow")})`} transform="rotate(-30 244 190)"/>
            {/* Bracelet */}
            <ellipse cx="270" cy="140" rx="11" ry="4.4" fill="#F5D48A" stroke="#B45309" strokeWidth="0.8" transform="rotate(-32 270 140)"/>
            {/* Waving hand */}
            <g transform="translate(274 126)">
              <ellipse rx="14" ry="15" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
              <path d="M-9 -8 q 2 -8 6 -8 q 4 0 5 4 z"  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M-2 -15 q 2 -8 6 -8 q 4 0 5 4 z" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M4 -16 q 2 -8 6 -6 q 3 1 3 5 z"  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M10 -12 q 3 -6 6 -3 q 2 2 2 5 z" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              {/* Nail polish */}
              <circle cx="-3" cy="-14" r="1.2" fill="#F472B6"/>
              <circle cx="3"  cy="-16" r="1.2" fill="#F472B6"/>
              <circle cx="9"  cy="-14" r="1.2" fill="#F472B6"/>
            </g>
          </>
        ) : (
          <>
            <path d="M216 274
                     C 244 292 264 328 260 380
                     C 258 400 236 402 228 388
                     C 220 372 220 338 204 306 Z"
                  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
            <path d="M244 320 q -4 -6 -10 -2 t -10 -2" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.85" filter={`url(#${g("glow")})`}/>
            <ellipse cx="248" cy="394" rx="14" ry="12" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
            <ellipse cx="248" cy="380" rx="12" ry="3.8" fill="#F5D48A" stroke="#B45309" strokeWidth="0.8"/>
          </>
        )}
      </g>

      {/* ============ FACE ============ */}
      <path d="M110 176
               C 110 128 132 96 160 96
               C 188 96 210 128 210 176
               C 210 212 194 236 160 240
               C 126 236 110 212 110 176 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.12)" strokeWidth="1"/>
      {/* Cheek shading */}
      <path d="M114 190 Q 130 232 160 236" fill="none" stroke={`url(#${g("shade")})`} strokeWidth="3" opacity="0.85"/>
      <path d="M206 190 Q 190 232 160 236" fill="none" stroke={`url(#${g("shade")})`} strokeWidth="3" opacity="0.85"/>

      {/* Front bangs - swept */}
      {/* Left side longer sweep */}
      <path d="M108 158
               C 108 122 130 100 156 100
               C 154 128 138 148 122 168
               C 116 170 110 168 108 158 Z"
            fill={`url(#${g("hairL")})`}/>
      {/* Right side shorter */}
      <path d="M212 158
               C 212 122 190 100 164 100
               C 168 122 184 140 200 158
               C 206 162 210 162 212 158 Z"
            fill={`url(#${g("hairR")})`}/>
      {/* Side locks */}
      <path d="M100 168 C 92 220 96 260 116 278 C 100 262 88 240 88 214 C 88 194 92 178 100 168 Z" fill={`url(#${g("hairL")})`}/>
      <path d="M220 168 C 228 220 224 260 204 278 C 220 262 232 240 232 214 C 232 194 228 178 220 168 Z" fill={`url(#${g("hairR")})`}/>

      {/* CROWN (coral + gem tiara) */}
      <g transform="translate(160 100)">
        <path d="M-40 0 Q -32 -14 -22 -4 Q -12 -22 0 -8 Q 12 -22 22 -4 Q 32 -14 40 0 L 36 8 L -36 8 Z"
              fill="#F5D48A" stroke="#B45309" strokeWidth="1"/>
        {/* Center droplet gem */}
        <path d="M0 -20 C -4 -14 -6 -8 -6 -4 a 6 6 0 0 0 12 0 c 0 -4 -2 -10 -6 -16 z" fill="#22D3EE" stroke="#0B4E8A" strokeWidth="1"/>
        <circle cx="-1" cy="-8" r="1.4" fill="#FFFFFF"/>
        {/* Side gems */}
        <circle cx="-22" cy="-2" r="3" fill="#F472B6" stroke="#9F1239" strokeWidth="0.6"/>
        <circle cx="22"  cy="-2" r="3" fill="#F472B6" stroke="#9F1239" strokeWidth="0.6"/>
        <circle cx="-32" cy="2"  r="2" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="0.4"/>
        <circle cx="32"  cy="2"  r="2" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="0.4"/>
      </g>

      {/* Face rune (below left eye) */}
      <path d="M120 200 l 6 4 l -2 6" stroke="#22D3EE" strokeWidth="1.6" fill="none" strokeLinecap="round" filter={`url(#${g("glow")})`}/>

      {/* Ears + earrings (dangling) */}
      <ellipse cx="108" cy="182" rx="5" ry="9" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <ellipse cx="212" cy="182" rx="5" ry="9" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      {/* Dangling earring L */}
      <line x1="108" y1="192" x2="108" y2="206" stroke="#F5D48A" strokeWidth="1"/>
      <circle cx="108" cy="210" r="3" fill="#22D3EE" stroke="#0B4E8A" strokeWidth="0.6"/>
      <line x1="212" y1="192" x2="212" y2="206" stroke="#F5D48A" strokeWidth="1"/>
      <circle cx="212" cy="210" r="3" fill="#22D3EE" stroke="#0B4E8A" strokeWidth="0.6"/>

      {/* Cheek blush */}
      <ellipse cx="124" cy="204" rx="10" ry="5" fill="rgba(251,113,133,0.4)"/>
      <ellipse cx="196" cy="204" rx="10" ry="5" fill="rgba(251,113,133,0.4)"/>

      {/* Eyebrows */}
      {!isSurprised && (
        <>
          {isWorried ? (
            <>
              <path d="M124 162 q 10 6 20 4" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M176 166 q 10 -6 20 -4" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </>
          ) : (
            <>
              <path d="M124 160 q 10 -4 20 -1" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M176 159 q 10 -3 20 1" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </>
          )}
        </>
      )}

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="138" cy="186" r="12" fill="#0B1220" />
          <circle cx="182" cy="186" r="12" fill="#0B1220" />
          <circle cx="142" cy="182" r="4" fill="#FFFFFF" />
          <circle cx="186" cy="182" r="4" fill="#FFFFFF" />
          <path d="M120 154 l 4 -8 M 132 148 l 2 -8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M200 154 l -4 -8 M 188 148 l -2 -8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
        </>
      ) : isThinking ? (
        <>
          <path d="M124 186 Q 138 174 152 186" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M168 186 Q 182 174 196 186" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </>
      ) : isWorried ? (
        <>
          <ellipse cx="138" cy="188" rx="12" ry="10" fill="#020617"/>
          <ellipse cx="182" cy="188" rx="12" ry="10" fill="#020617"/>
          <ellipse cx="138" cy="190" rx="8" ry="7" fill={`url(#${g("iris")})`}/>
          <ellipse cx="182" cy="190" rx="8" ry="7" fill={`url(#${g("iris")})`}/>
          <ellipse cx="138" cy="193" rx="3.5" ry="4" fill="#020617"/>
          <ellipse cx="182" cy="193" rx="3.5" ry="4" fill="#020617"/>
          <circle cx="142" cy="184" r="2" fill="#FFFFFF"/>
          <circle cx="186" cy="184" r="2" fill="#FFFFFF"/>
          <path d="M216 156 c -2 4 -4 8 -4 12 a 4 4 0 0 0 8 0 c 0 -4 -2 -8 -4 -12 z" fill="#7FE7FF" stroke="#38BDF8" strokeWidth="0.8"/>
        </>
      ) : (
        <>
          {/* Base */}
          <ellipse cx="138" cy="190" rx="14" ry="17" fill="#020617"/>
          <ellipse cx="182" cy="190" rx="14" ry="17" fill="#020617"/>
          {/* Iris */}
          <ellipse cx="138" cy="192" rx="11" ry="14" fill={`url(#${g("iris")})`}/>
          <ellipse cx="182" cy="192" rx="11" ry="14" fill={`url(#${g("iris")})`}/>
          {/* Pupil */}
          <ellipse cx="138" cy="194" rx="5" ry="7" fill="#020617"/>
          <ellipse cx="182" cy="194" rx="5" ry="7" fill="#020617"/>
          {/* Top big sparkle */}
          <ellipse cx="143" cy="183" rx="5" ry="4" fill="#FFFFFF"/>
          <ellipse cx="187" cy="183" rx="5" ry="4" fill="#FFFFFF"/>
          {/* Bottom sparkle */}
          <circle cx="132" cy="200" r="2.4" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="176" cy="200" r="2.4" fill="#FFFFFF" opacity="0.9"/>
          {/* Wave rune inside iris */}
          <path d="M134 194 q 3 -3 6 0 t 6 0" stroke="#DBFCFF" strokeWidth="0.8" fill="none" opacity="0.85"/>
          <path d="M178 194 q 3 -3 6 0 t 6 0" stroke="#DBFCFF" strokeWidth="0.8" fill="none" opacity="0.85"/>
        </>
      )}

      {/* Long lashes */}
      {!isSurprised && !isThinking && (
        <>
          <path d="M124 174 q 4 -6 12 -6" stroke="#0B1220" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <path d="M148 170 q 4 -3 8 -1" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M168 174 q 4 -6 12 -6" stroke="#0B1220" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <path d="M192 170 q 4 -3 8 -1" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* Nose */}
      <path d="M158 210 q 2 6 4 0" stroke="rgba(11,32,64,0.35)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* Lips */}
      {isSurprised ? (
        <ellipse cx="160" cy="222" rx="6" ry="7" fill="#7F1D1D"/>
      ) : isHappy ? (
        <g>
          <path d="M146 218 Q 160 234 174 218 Q 168 226 160 226 Q 152 226 146 218 Z"
                fill={`url(#${g("lip")})`} stroke="#7F1D1D" strokeWidth="0.6"/>
          <path d="M148 220 Q 160 224 172 220" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8"/>
        </g>
      ) : isWorried ? (
        <path d="M150 225 Q 160 218 170 225" stroke="#B91C1C" strokeWidth="2.5" fill="#FCA5A5" strokeLinecap="round"/>
      ) : (
        <path d="M148 220 Q 160 228 172 220 Q 166 224 160 224 Q 154 224 148 220 Z"
              fill={`url(#${g("lip")})`} stroke="#7F1D1D" strokeWidth="0.6"/>
      )}

      {/* Floating pearls / bubbles */}
      <g className="aq-float-a">
        <circle cx="20"  cy="270" r="5" fill="#FFFFFF" filter={`url(#${g("glow")})`}/>
      </g>
      <g className="aq-float-b">
        <circle cx="300" cy="290" r="4" fill="#7FE7FF" opacity="0.9" filter={`url(#${g("glow")})`}/>
      </g>
      <g className="aq-float-a" style={{ animationDelay: "1s" }}>
        <circle cx="10"  cy="420" r="3" fill="#7FE7FF" opacity="0.8"/>
      </g>
      <g className="aq-float-b" style={{ animationDelay: "0.6s" }}>
        <circle cx="308" cy="440" r="3" fill="#A7F3D0" opacity="0.85"/>
      </g>
    </svg>
  );
};

export default AquaMascot;
