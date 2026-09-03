import React from "react";

export default function WaveDivider({ flip = false, color = "#061426" }) {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""}`} aria-hidden>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path
          d="M0,50 C240,110 480,-10 720,50 C960,110 1200,-10 1440,50 L1440,100 L0,100 Z"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,100 L0,100 Z"
          fill="#0b1c33"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
