"use client";

import { useEffect, useState } from "react";

// Renders the monogram placeholder (/portrait.svg) by default, then upgrades to
// the real photo (/portrait.jpg) if that file exists and loads. Drop a
// portrait.jpg into /public to replace the placeholder everywhere — no code
// change needed. Preloading avoids both the hydration race (an <img> that 404s
// before React hydrates never fires onError) and a broken-image flash.
export default function Portrait({ className }: { className?: string }) {
  const [src, setSrc] = useState("/portrait.svg");

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc("/portrait.jpg");
    img.src = "/portrait.jpg";
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Michael George Moss" className={className} />
  );
}
