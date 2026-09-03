// Client-side helpers for downloading/sharing Aqua expression stickers

export function detectMoodFromText(text = "") {
  const t = String(text).toLowerCase();
  if (/(danger|unsafe|toxic|contaminat|poison|hazard|deadly|kill|worst|terrible|awful|severe)/.test(t))
    return "surprised";
  if (/(caution|careful|risk|warning|elevated|advised|concern|worry|problem|issue|unfortunate)/.test(t))
    return "worried";
  if (/(great|excellent|amazing|wonderful|love|awesome|perfect|happy|yay|good job|nice|beautiful|fantastic|hooray|hurray|cheer)/.test(t))
    return "cheer";
  if (/(\?|how |why |what |when |which |explain|tell me|guide|learn|curious)/.test(t))
    return "thinking";
  return "happy";
}

/** Convert a live <svg> node + label into a PNG sticker Blob */
export async function generateStickerPng(svgEl, label = "Aqua", width = 720, height = 900) {
  if (!svgEl) return null;
  const clone = svgEl.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.removeAttribute("width");
  clone.removeAttribute("height");
  clone.setAttribute("width", "560");
  clone.setAttribute("height", "700");
  const xml = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob(
    ['<?xml version="1.0" encoding="UTF-8"?>', xml],
    { type: "image/svg+xml;charset=utf-8" }
  );
  const svgUrl = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise((res, rej) => {
    img.onload = res; img.onerror = rej; img.src = svgUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Rounded bg with radial + linear
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#0b1c33");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, width, height, 60);
  ctx.fill();

  // Glow blobs
  radialBlob(ctx, width * 0.2, height * 0.2, 220, "rgba(6,182,212,0.35)");
  radialBlob(ctx, width * 0.85, height * 0.75, 260, "rgba(0,245,212,0.25)");

  // Border
  ctx.strokeStyle = "#22D3EE";
  ctx.lineWidth = 4;
  roundRect(ctx, 6, 6, width - 12, height - 12, 56);
  ctx.stroke();

  // Sparkle dots
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = `rgba(127,231,255,${Math.random() * 0.4 + 0.05})`;
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2.5 + 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw mascot centered
  ctx.drawImage(img, 80, 60, 560, 700);

  // Label
  ctx.font = 'bold 62px "Outfit", "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.fillStyle = "#F0FDFA";
  ctx.fillText(label, width / 2, height - 100);

  ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = "#67E8F9";
  ctx.fillText("AquaSafe AI · Aqua Sticker", width / 2, height - 60);

  URL.revokeObjectURL(svgUrl);
  return new Promise((res) => canvas.toBlob(res, "image/png", 0.95));
}

export async function downloadSticker(svgEl, name, label) {
  const blob = await generateStickerPng(svgEl, label);
  if (!blob) return false;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `aqua-${name}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  return true;
}

export async function shareSticker(svgEl, name, label) {
  const blob = await generateStickerPng(svgEl, label);
  if (!blob) return false;
  const file = new File([blob], `aqua-${name}.png`, { type: "image/png" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `Aqua – ${label}`,
        text: "Check out my Aqua sticker from AquaSafe AI! 💧",
      });
      return true;
    } catch { /* user cancelled */ return false; }
  }
  return false;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
}

function radialBlob(ctx, cx, cy, r, color) {
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}
