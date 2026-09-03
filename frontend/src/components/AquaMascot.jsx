import React, { useId } from "react";

/**
 * "Aqua" — anime water goddess mascot (AquaSafe AI)
 * Design faithfully modeled on the user's reference: long light-blue hair with
 * a top ponytail bound by a yellow tie, dark navy sleeveless vest with white
 * trim, blue chest bow with gem, gold choker, detached white long sleeves
 * with gold arm rings and blue cuffs, pleated blue skirt with gold belt,
 * and blue thigh-high boots with white tops trimmed in gold.
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
      aria-label="Aqua anime water goddess mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        <radialGradient id={g("skin")} cx="50%" cy="30%" r="70%">
          <stop offset="0%"  stopColor="#FFF3E4" />
          <stop offset="65%" stopColor="#FFD9BA" />
          <stop offset="100%" stopColor="#E7B58A" />
        </radialGradient>
        <linearGradient id={g("shade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0"/>
          <stop offset="1" stopColor="#5B2A0F" stopOpacity="0.35"/>
        </linearGradient>

        {/* Hair - light aqua blue */}
        <linearGradient id={g("hair")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#B5E6FC" />
          <stop offset="0.4" stopColor="#7EC6EE" />
          <stop offset="1"   stopColor="#3F87C4" />
        </linearGradient>
        <linearGradient id={g("hairHi")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05"/>
        </linearGradient>
        <linearGradient id={g("hairShade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2F6BA4" stopOpacity="0" />
          <stop offset="1" stopColor="#1F4A78" stopOpacity="0.5" />
        </linearGradient>

        {/* Vest - dark navy */}
        <linearGradient id={g("vest")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#2E4A78" />
          <stop offset="1"   stopColor="#152A55" />
        </linearGradient>

        {/* Skirt */}
        <linearGradient id={g("skirt")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#3A63A2" />
          <stop offset="1"   stopColor="#1E3A72" />
        </linearGradient>

        {/* Bow */}
        <linearGradient id={g("bow")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#5FA8E6" />
          <stop offset="1"   stopColor="#2E68B8" />
        </linearGradient>

        {/* Sleeve white */}
        <linearGradient id={g("sleeve")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#FFFFFF" />
          <stop offset="1"   stopColor="#DFE9F5" />
        </linearGradient>

        {/* Boot blue */}
        <linearGradient id={g("boot")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#3A63A2" />
          <stop offset="1"   stopColor="#132C57" />
        </linearGradient>

        {/* Gold */}
        <linearGradient id={g("gold")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0"   stopColor="#F7DE86" />
          <stop offset="1"   stopColor="#B98421" />
        </linearGradient>

        {/* Iris */}
        <radialGradient id={g("iris")} cx="35%" cy="25%" r="90%">
          <stop offset="0%"  stopColor="#EAFDFF" />
          <stop offset="45%" stopColor="#38BDF8" />
          <stop offset="90%" stopColor="#0B4E8A" />
          <stop offset="100%" stopColor="#02132C" />
        </radialGradient>

        <linearGradient id={g("lip")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F79EA6" />
          <stop offset="1" stopColor="#B24957" />
        </linearGradient>

        {/* Aurora background swirl */}
        <radialGradient id={g("aurora")} cx="50%" cy="0%" r="70%">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.6" />
          <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
        </radialGradient>

        <filter id={g("glow")} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ==== Aurora backdrop ==== */}
      <circle cx="160" cy="80" r="140" fill={`url(#${g("aurora")})`} />

      {/* ==== Water splash under feet ==== */}
      <ellipse cx="160" cy="600" rx="130" ry="12" fill="#22D3EE" opacity="0.35" />
      <ellipse cx="160" cy="608" rx="90"  ry="6"  fill="#67E8F9" opacity="0.55" />

      {/* ==== BACK HAIR (very long) ==== */}
      <path d="M64 200
               C 30 260 22 340 42 430
               C 56 490 90 520 120 528
               L 200 528
               C 230 520 264 490 278 430
               C 298 340 290 260 256 200
               C 244 176 224 168 216 178
               C 216 132 190 96 160 96
               C 130 96 104 132 104 178
               C 96 168 76 176 64 200 Z"
            fill={`url(#${g("hair")})`} />
      {/* Hair highlight strands */}
      <path d="M74 260 C 60 340 74 440 96 490"
            stroke={`url(#${g("hairHi")})`} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M246 260 C 260 340 246 440 224 490"
            stroke={`url(#${g("hairHi")})`} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M110 320 C 106 400 116 470 132 508"
            stroke={`url(#${g("hairHi")})`} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45"/>
      <path d="M210 320 C 214 400 204 470 188 508"
            stroke={`url(#${g("hairHi")})`} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45"/>
      {/* Bottom hair shade */}
      <path d="M60 400 C 60 470 88 510 120 520 L 200 520 C 232 510 260 470 260 400 Z"
            fill={`url(#${g("hairShade")})`} />

      {/* ==== LEGS ==== */}
      {/* Thighs */}
      <path d="M132 400 C 128 440 126 480 130 494 L 156 494 C 158 476 158 436 158 400 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <path d="M188 400 C 192 440 194 480 190 494 L 164 494 C 162 476 162 436 162 400 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* ==== BOOTS (thigh high) ==== */}
      {/* Left boot */}
      <path d="M124 486 C 118 520 122 570 132 590 L 156 590 C 160 570 160 520 158 486 Z"
            fill={`url(#${g("boot")})`} stroke="#0B1E44" strokeWidth="1.2"/>
      {/* White top ring */}
      <rect x="122" y="486" width="38" height="14" fill="#FFFFFF" stroke="#B98421" strokeWidth="0.8"/>
      <rect x="122" y="496" width="38" height="4"  fill={`url(#${g("gold")})`} />
      {/* Center gold trim */}
      <path d="M140 500 L 140 588" stroke={`url(#${g("gold")})`} strokeWidth="2"/>
      <path d="M126 566 L 156 566" stroke={`url(#${g("gold")})`} strokeWidth="2"/>
      {/* Sole */}
      <ellipse cx="144" cy="596" rx="16" ry="4" fill="#0B1E44"/>

      {/* Right boot */}
      <path d="M162 486 C 160 520 160 570 164 590 L 188 590 C 198 570 202 520 196 486 Z"
            fill={`url(#${g("boot")})`} stroke="#0B1E44" strokeWidth="1.2"/>
      <rect x="160" y="486" width="38" height="14" fill="#FFFFFF" stroke="#B98421" strokeWidth="0.8"/>
      <rect x="160" y="496" width="38" height="4"  fill={`url(#${g("gold")})`} />
      <path d="M180 500 L 180 588" stroke={`url(#${g("gold")})`} strokeWidth="2"/>
      <path d="M164 566 L 196 566" stroke={`url(#${g("gold")})`} strokeWidth="2"/>
      <ellipse cx="180" cy="596" rx="16" ry="4" fill="#0B1E44"/>

      {/* ==== SKIRT (pleated) ==== */}
      <path d="M110 372
               L 96 420
               L 224 420
               L 210 372
               Z"
            fill={`url(#${g("skirt")})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Pleats */}
      {[122, 136, 150, 164, 178, 192, 206].map((x, i) => (
        <path key={i} d={`M${x} 372 L ${x - 2} 420`} stroke="rgba(11,32,64,0.35)" strokeWidth="1"/>
      ))}
      {/* Skirt white hem lining */}
      <path d="M96 418 L 224 418 L 224 424 L 96 424 Z" fill="#FFFFFF" stroke="#B98421" strokeWidth="0.6"/>
      {/* Gold belt */}
      <rect x="106" y="360" width="108" height="14" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8"/>
      <rect x="106" y="372" width="108" height="2" fill="#78350F"/>
      {/* Belt buckle */}
      <rect x="150" y="358" width="20" height="18" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="1"/>
      <rect x="154" y="362" width="12" height="10" fill="none" stroke="#78350F" strokeWidth="1"/>

      {/* ==== VEST TORSO ==== */}
      <path d="M114 244
               C 100 260 96 320 108 360
               L 212 360
               C 224 320 220 260 206 244
               C 190 254 180 254 170 250
               Q 160 254 150 250
               C 140 254 130 254 114 244 Z"
            fill={`url(#${g("vest")})`} stroke="#FFFFFF" strokeWidth="1.6"/>
      {/* White edging inner */}
      <path d="M118 250 C 108 264 106 320 116 356 L 204 356 C 214 320 212 264 202 250"
            fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.7"/>
      {/* Gold buttons down front */}
      {[280, 300, 320, 340].map((y, i) => (
        <circle key={i} cx="160" cy={y} r="3" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.6"/>
      ))}
      {/* Vest opening line */}
      <line x1="160" y1="260" x2="160" y2="356" stroke="#0B1E44" strokeWidth="1" strokeDasharray="1 2"/>

      {/* ==== BLUE BOW at chest ==== */}
      <g transform="translate(160 246)">
        {/* Sailor collar behind bow (V shape white) */}
        <path d="M-18 -8 L 18 -8 L 12 6 L -12 6 Z" fill="#FFFFFF" stroke="#B98421" strokeWidth="0.6"/>
        {/* Ribbons */}
        <path d="M-18 4 L -30 12 L -30 22 L -14 14 Z" fill={`url(#${g("bow")})`} stroke="#0B4E8A" strokeWidth="0.8"/>
        <path d="M18 4 L 30 12 L 30 22 L 14 14 Z" fill={`url(#${g("bow")})`} stroke="#0B4E8A" strokeWidth="0.8"/>
        {/* Bow loops */}
        <path d="M-14 -4 L -2 6 L -14 14 Z" fill={`url(#${g("bow")})`} stroke="#0B4E8A" strokeWidth="0.8"/>
        <path d="M14 -4 L 2 6 L 14 14 Z" fill={`url(#${g("bow")})`} stroke="#0B4E8A" strokeWidth="0.8"/>
        {/* Center gem */}
        <circle r="4" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8"/>
        <circle r="2" fill="#38BDF8"/>
      </g>

      {/* ==== NECK ==== */}
      <path d="M148 224 L 148 244 Q 160 252 172 244 L 172 224 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* ==== GOLD CHOKER ==== */}
      <path d="M144 234 Q 160 244 176 234" fill="none" stroke={`url(#${g("gold")})`} strokeWidth="4"/>
      <circle cx="160" cy="241" r="3" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.6"/>

      {/* ==== ARMS ==== */}
      {/* Shoulders (bare skin) */}
      <ellipse cx="112" cy="252" rx="12" ry="10" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <ellipse cx="208" cy="252" rx="12" ry="10" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Gold arm ring left */}
      <ellipse cx="102" cy="266" rx="14" ry="5" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8"/>

      {/* Left detached sleeve */}
      <path d="M92 268
               C 76 300 66 340 72 384
               C 74 400 92 402 100 390
               C 106 378 106 342 112 306 Z"
            fill={`url(#${g("sleeve")})`} stroke="#B98421" strokeWidth="1"/>
      {/* Blue cuff */}
      <path d="M72 386 C 74 402 92 402 100 388 L 96 396 L 76 396 Z" fill={`url(#${g("boot")})`} stroke="#B98421" strokeWidth="0.8"/>
      <rect x="72" y="396" width="30" height="4" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.4" transform="rotate(6 87 398)"/>
      {/* Left hand */}
      <ellipse cx="82" cy="404" rx="12" ry="10" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Right arm - waving state or resting */}
      <g className={showWave ? "aq-wave-arm" : ""} style={{ transformOrigin: "218px 260px" }}>
        {showWave ? (
          <>
            {/* Gold ring at shoulder */}
            <ellipse cx="228" cy="266" rx="14" ry="5" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8" transform="rotate(-30 228 266)"/>
            {/* Sleeve up */}
            <path d="M218 260
                     C 246 232 274 194 284 148
                     C 288 130 274 118 260 124
                     C 240 134 220 168 208 210 Z"
                  fill={`url(#${g("sleeve")})`} stroke="#B98421" strokeWidth="1"/>
            {/* Blue cuff at wrist */}
            <ellipse cx="270" cy="132" rx="10" ry="6" fill={`url(#${g("boot")})`} stroke="#B98421" strokeWidth="0.8" transform="rotate(-32 270 132)"/>
            <ellipse cx="272" cy="128" rx="10" ry="3" fill={`url(#${g("gold")})`} transform="rotate(-32 272 128)"/>
            {/* Hand */}
            <g transform="translate(276 118)">
              <ellipse rx="12" ry="14" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
              <path d="M-8 -8 q 2 -8 6 -8 q 4 0 5 4 z"  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M-2 -14 q 2 -8 6 -8 q 4 0 5 4 z" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M4 -15 q 2 -8 6 -6 q 3 1 3 5 z"  fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
              <path d="M9 -12 q 3 -6 6 -3 q 2 2 2 5 z" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="0.8"/>
            </g>
          </>
        ) : (
          <>
            {/* Gold arm ring */}
            <ellipse cx="218" cy="266" rx="14" ry="5" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8"/>
            {/* Sleeve */}
            <path d="M228 268
                     C 244 300 254 340 248 384
                     C 246 400 228 402 220 390
                     C 214 378 214 342 208 306 Z"
                  fill={`url(#${g("sleeve")})`} stroke="#B98421" strokeWidth="1"/>
            {/* Cuff */}
            <path d="M248 386 C 246 402 228 402 220 388 L 224 396 L 244 396 Z" fill={`url(#${g("boot")})`} stroke="#B98421" strokeWidth="0.8"/>
            <rect x="218" y="396" width="30" height="4" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.4" transform="rotate(-6 233 398)"/>
            <ellipse cx="238" cy="404" rx="12" ry="10" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
          </>
        )}
      </g>

      {/* ==== FACE ==== */}
      <path d="M114 168
               C 114 128 132 100 160 100
               C 188 100 206 128 206 168
               C 206 204 190 224 160 228
               C 130 224 114 204 114 168 Z"
            fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.12)" strokeWidth="1"/>

      {/* Front bangs */}
      <path d="M108 148
               C 112 116 130 100 160 100
               C 190 100 208 116 212 148
               C 202 132 190 132 178 146
               C 172 126 158 122 152 138
               C 144 126 132 128 126 142
               C 118 134 112 138 108 148 Z"
            fill={`url(#${g("hair")})`} />

      {/* Side bangs / face-framing */}
      <path d="M106 158 C 100 200 104 222 118 238 C 106 224 96 208 96 190 C 96 176 100 164 106 158 Z" fill={`url(#${g("hair")})`}/>
      <path d="M214 158 C 220 200 216 222 202 238 C 214 224 224 208 224 190 C 224 176 220 164 214 158 Z" fill={`url(#${g("hair")})`}/>

      {/* Top ponytail with yellow tie */}
      <g>
        <path d="M150 96 C 150 60 158 42 170 34 C 174 30 176 30 176 34 C 176 46 170 66 168 90 Z"
              fill={`url(#${g("hair")})`}/>
        <path d="M156 92 C 154 76 158 60 168 46" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6"/>
        {/* Yellow tie */}
        <ellipse cx="162" cy="98" rx="10" ry="5" fill={`url(#${g("gold")})`} stroke="#78350F" strokeWidth="0.8"/>
        <ellipse cx="162" cy="97" rx="7" ry="1.5" fill="#FFFFFF" opacity="0.7"/>
      </g>

      {/* Small tuft in front (short bang tuft) */}
      <path d="M148 100 Q 150 88 156 84 Q 154 96 152 104 Z" fill={`url(#${g("hair")})`}/>

      {/* Ears */}
      <ellipse cx="108" cy="176" rx="5" ry="9" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>
      <ellipse cx="212" cy="176" rx="5" ry="9" fill={`url(#${g("skin")})`} stroke="rgba(11,32,64,0.15)" strokeWidth="1"/>

      {/* Cheek blush */}
      <ellipse cx="124" cy="196" rx="9" ry="4" fill="rgba(251,113,133,0.4)"/>
      <ellipse cx="196" cy="196" rx="9" ry="4" fill="rgba(251,113,133,0.4)"/>

      {/* Eyebrows (small) */}
      {!isSurprised && (
        <>
          {isWorried ? (
            <>
              <path d="M128 156 q 8 4 16 4" stroke="#3F87C4" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
              <path d="M176 160 q 8 -4 16 -4" stroke="#3F87C4" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
            </>
          ) : (
            <>
              <path d="M128 154 q 8 -3 16 -1" stroke="#3F87C4" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
              <path d="M176 153 q 8 -2 16 1" stroke="#3F87C4" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
            </>
          )}
        </>
      )}

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="138" cy="180" r="11" fill="#0B1220" />
          <circle cx="182" cy="180" r="11" fill="#0B1220" />
          <circle cx="141" cy="176" r="3.6" fill="#FFFFFF" />
          <circle cx="185" cy="176" r="3.6" fill="#FFFFFF" />
        </>
      ) : isThinking ? (
        <>
          <path d="M124 180 Q 138 168 152 180" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M168 180 Q 182 168 196 180" stroke="#0B1220" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </>
      ) : isWorried ? (
        <>
          <ellipse cx="138" cy="182" rx="12" ry="10" fill="#020617"/>
          <ellipse cx="182" cy="182" rx="12" ry="10" fill="#020617"/>
          <ellipse cx="138" cy="184" rx="8" ry="7" fill={`url(#${g("iris")})`}/>
          <ellipse cx="182" cy="184" rx="8" ry="7" fill={`url(#${g("iris")})`}/>
          <ellipse cx="138" cy="187" rx="3.5" ry="4" fill="#020617"/>
          <ellipse cx="182" cy="187" rx="3.5" ry="4" fill="#020617"/>
          <circle cx="142" cy="178" r="2" fill="#FFFFFF"/>
          <circle cx="186" cy="178" r="2" fill="#FFFFFF"/>
        </>
      ) : (
        <>
          <ellipse cx="138" cy="184" rx="13" ry="16" fill="#020617"/>
          <ellipse cx="182" cy="184" rx="13" ry="16" fill="#020617"/>
          <ellipse cx="138" cy="186" rx="10" ry="13" fill={`url(#${g("iris")})`}/>
          <ellipse cx="182" cy="186" rx="10" ry="13" fill={`url(#${g("iris")})`}/>
          <ellipse cx="138" cy="188" rx="4.5" ry="6.5" fill="#020617"/>
          <ellipse cx="182" cy="188" rx="4.5" ry="6.5" fill="#020617"/>
          {/* Top sparkle */}
          <ellipse cx="142" cy="177" rx="4.5" ry="3.5" fill="#FFFFFF"/>
          <ellipse cx="186" cy="177" rx="4.5" ry="3.5" fill="#FFFFFF"/>
          <circle cx="132" cy="194" r="2" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="176" cy="194" r="2" fill="#FFFFFF" opacity="0.9"/>
        </>
      )}

      {/* Long lashes */}
      {!isSurprised && !isThinking && (
        <>
          <path d="M125 172 q 4 -6 12 -6" stroke="#0B1220" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M147 168 q 4 -3 8 -1" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M169 172 q 4 -6 12 -6" stroke="#0B1220" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M191 168 q 4 -3 8 -1" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      )}

      {/* Nose */}
      <path d="M158 200 q 2 5 4 0" stroke="rgba(11,32,64,0.35)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* Mouth */}
      {isSurprised ? (
        <ellipse cx="160" cy="212" rx="5" ry="6" fill="#7F1D1D"/>
      ) : isHappy ? (
        <path d="M150 210 Q 160 220 170 210 Q 165 216 160 216 Q 155 216 150 210 Z"
              fill={`url(#${g("lip")})`} stroke="#7F1D1D" strokeWidth="0.5"/>
      ) : isWorried ? (
        <path d="M152 214 Q 160 208 168 214" stroke="#B91C1C" strokeWidth="2.4" fill="#FCA5A5" strokeLinecap="round"/>
      ) : (
        <path d="M152 212 Q 160 218 168 212 Q 164 216 160 216 Q 156 216 152 212 Z"
              fill={`url(#${g("lip")})`} stroke="#7F1D1D" strokeWidth="0.5"/>
      )}

      {/* Ambient floating orbs / water droplets */}
      <g className="aq-float-a">
        <circle cx="24"  cy="240" r="4" fill="#7FE7FF" filter={`url(#${g("glow")})`}/>
      </g>
      <g className="aq-float-b">
        <circle cx="296" cy="260" r="3" fill="#7FE7FF" opacity="0.85"/>
      </g>
      <g className="aq-float-a" style={{ animationDelay: "1.2s" }}>
        <circle cx="14"  cy="400" r="3" fill="#7FE7FF" opacity="0.75"/>
      </g>
      <g className="aq-float-b" style={{ animationDelay: "0.6s" }}>
        <circle cx="304" cy="420" r="3" fill="#A7F3D0" opacity="0.8"/>
      </g>
    </svg>
  );
};

export default AquaMascot;
