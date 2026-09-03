import React from "react";

// Anime-style water droplet mascot "Mizuki" (Droppy)
// expression: 'idle' | 'happy' | 'thinking' | 'guiding' | 'cheer' | 'surprised'
export const MizukiMascot = ({ expression = "idle", size = 140, className = "" }) => {
  const isHappy = expression === "happy" || expression === "cheer";
  const isThinking = expression === "thinking";
  const isSurprised = expression === "surprised";
  const isGuiding = expression === "guiding";

  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={className}
      role="img"
      aria-label="Mizuki water droplet mascot"
      data-testid="anime-mascot-avatar"
    >
      <defs>
        <radialGradient id="body" cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#E0FCFF" />
          <stop offset="40%" stopColor="#67E8F9" />
          <stop offset="85%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hairShine" x1="0" x2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Glow halo */}
      <ellipse cx="100" cy="120" rx="85" ry="80" fill="#00F5D4" opacity="0.12" filter="url(#soft)" />

      {/* Droplet body */}
      <path
        d="M100 12 C 65 60 40 92 40 130 a60 60 0 0 0 120 0 c 0 -38 -25 -70 -60 -118z"
        fill="url(#body)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.4"
      />

      {/* Shine */}
      <path
        d="M78 55 Q 70 90 82 130"
        stroke="url(#hairShine)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="130" cy="70" r="5" fill="#FFFFFF" opacity="0.85" />

      {/* Cheeks */}
      <ellipse cx="68" cy="150" rx="12" ry="7" fill="url(#cheek)" />
      <ellipse cx="132" cy="150" rx="12" ry="7" fill="url(#cheek)" />

      {/* Eyes */}
      {isSurprised ? (
        <>
          <circle cx="78" cy="132" r="10" fill="#0B1220" />
          <circle cx="122" cy="132" r="10" fill="#0B1220" />
          <circle cx="81" cy="129" r="3" fill="#fff" />
          <circle cx="125" cy="129" r="3" fill="#fff" />
        </>
      ) : isThinking ? (
        <>
          <path d="M70 132 Q78 126 86 132" stroke="#0B1220" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M114 132 Q122 126 130 132" stroke="#0B1220" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="78" cy="134" rx="7.5" ry="9.5" fill="#0B1220" />
          <ellipse cx="122" cy="134" rx="7.5" ry="9.5" fill="#0B1220" />
          <circle cx="80" cy="131" r="2.6" fill="#fff" />
          <circle cx="124" cy="131" r="2.6" fill="#fff" />
          <circle cx="76" cy="137" r="1.4" fill="#fff" opacity="0.7" />
          <circle cx="120" cy="137" r="1.4" fill="#fff" opacity="0.7" />
        </>
      )}

      {/* Mouth */}
      {isHappy ? (
        <path d="M85 158 Q100 175 115 158" stroke="#0B1220" strokeWidth="4" fill="#0B1220" fillOpacity="0.15" strokeLinecap="round" />
      ) : isSurprised ? (
        <ellipse cx="100" cy="162" rx="7" ry="9" fill="#0B1220" />
      ) : isGuiding ? (
        <path d="M88 160 Q100 168 112 160" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M90 160 Q100 166 110 160" stroke="#0B1220" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}

      {/* Mini helper bubble */}
      <circle cx="170" cy="90" r="10" fill="rgba(255,255,255,0.85)" stroke="#38BDF8" strokeWidth="1.5" />
      <circle cx="167" cy="87" r="3" fill="#fff" />
    </svg>
  );
};

export default MizukiMascot;
