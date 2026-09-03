import React, { useEffect } from "react";

// Water ripple on click - injects transient DOM circles
export default function RippleCursor() {
  useEffect(() => {
    const onClick = (e) => {
      const el = document.createElement("div");
      el.className = "ripple";
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      el.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 950);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return null;
}
