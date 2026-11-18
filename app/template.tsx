"use client";

import { useState } from "react";

// Re-mounts on every navigation. The curtain only renders for in-site navigations:
// on a fresh load `nav-ready` (set by Reveal after the first render) is not there yet,
// and during a clapperboard / aperture transition (`clap-nav`, see Clapperboard.tsx) it would cover the reveal.
export default function Template({ children }: { children: React.ReactNode }) {
  const [curtain] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("nav-ready") &&
      !document.documentElement.classList.contains("clap-nav"),
  );
  return (
    <>
      {curtain && <div className="curtain" aria-hidden="true" />}
      {children}
    </>
  );
}
