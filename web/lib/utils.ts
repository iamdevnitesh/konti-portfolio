import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

import type { Photo, PhotoText } from "@/data/photos.generated";

export type OverlayStyle = {
  left: string;
  top: string;
  transform: string;
  textAlign: "left" | "center" | "right";
  color: string;
};

// Convert manifest text position into absolute-positioned CSS.
// Accepts %, px, or keywords.
export function overlayStyleFromText(text: PhotoText): OverlayStyle {
  const x = resolveAxis(text.position.x, "x");
  const y = resolveAxis(text.position.y, "y");
  // Translate so the anchor point sits where the user specified.
  const tx = anchorTranslate(x.anchor);
  const ty = anchorTranslate(y.anchor);
  return {
    left: x.value,
    top: y.value,
    transform: `translate(${tx}, ${ty})`,
    textAlign: text.align,
    color: text.color,
  };
}

function resolveAxis(input: string, axis: "x" | "y"): { value: string; anchor: number } {
  if (!input) return { value: axis === "x" ? "8%" : "82%", anchor: 0 };
  const v = input.trim().toLowerCase();
  if (axis === "x") {
    if (v === "left") return { value: "6%", anchor: 0 };
    if (v === "center") return { value: "50%", anchor: 0.5 };
    if (v === "right") return { value: "94%", anchor: 1 };
  } else {
    if (v === "top") return { value: "8%", anchor: 0 };
    if (v === "middle") return { value: "50%", anchor: 0.5 };
    if (v === "bottom") return { value: "92%", anchor: 1 };
  }
  // For numeric/% values, anchor based on percentage.
  const pct = v.endsWith("%") ? parseFloat(v) : null;
  if (pct !== null && !Number.isNaN(pct)) {
    if (pct >= 90) return { value: v, anchor: 1 };
    if (pct <= 10) return { value: v, anchor: 0 };
    if (pct >= 45 && pct <= 55) return { value: v, anchor: 0.5 };
    return { value: v, anchor: 0 };
  }
  return { value: input, anchor: 0 };
}

function anchorTranslate(anchor: number): string {
  if (anchor === 0) return "0%";
  if (anchor === 1) return "-100%";
  return "-50%";
}

export function nextPhoto(photos: Photo[], slug: string): Photo {
  const idx = photos.findIndex((p) => p.slug === slug);
  return photos[(idx + 1) % photos.length];
}

export function prevPhoto(photos: Photo[], slug: string): Photo {
  const idx = photos.findIndex((p) => p.slug === slug);
  return photos[(idx - 1 + photos.length) % photos.length];
}
