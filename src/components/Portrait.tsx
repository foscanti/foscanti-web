"use client";

import { useEffect, useState } from "react";

// A/B test: half of visitors see a cream ("yellow") border, half see a rose
// ("red") border. The assignment is 50/50 and kept stable per visitor via
// localStorage. Both class strings appear literally below so Tailwind emits them.
const RING = {
  cream: "ring-cream",
  rose: "ring-rose",
} as const;
type Variant = keyof typeof RING;

// Renders a circular portrait: the monogram placeholder (/portrait.svg) by
// default, upgraded to the real photo (/portrait.png) once it loads. Preloading
// avoids the hydration race (an <img> that 404s before React hydrates never
// fires onError) and a broken-image flash. Sizing comes from `className`.
export default function Portrait({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState("/portrait.svg");
  const [variant, setVariant] = useState<Variant>("rose");

  useEffect(() => {
    // Bucket the ring colour 50/50 and remember it for this visitor.
    let v = localStorage.getItem("portraitVariant") as Variant | null;
    if (v !== "cream" && v !== "rose") {
      v = Math.random() < 0.5 ? "cream" : "rose";
      localStorage.setItem("portraitVariant", v);
    }
    // One-time read of a client-only value (localStorage is unavailable during
    // static prerender, so this can't move to a lazy state initializer).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(v);

    // Swap the placeholder for the real photo once it has loaded.
    const img = new window.Image();
    img.onload = () => setSrc("/portrait.png");
    img.src = "/portrait.png";
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-full ring-4 shadow-xl ${RING[variant]} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Michael George Moss"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
