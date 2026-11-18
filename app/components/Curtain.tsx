"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

/**
 * Curtain that lifts off the new page for navigations Clapperboard.tsx does not run itself (browser back / forward).
 * Skipped on the first load and whenever Clapperboard.tsx handles the navigation (`clap-nav`).
 */
export default function Curtain() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // layout effect: runs before the new page is painted, so it never flashes uncovered
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (document.documentElement.classList.contains("clap-nav")) return;
    const el = ref.current!;
    el.classList.remove("play");
    void el.offsetWidth; // restart the animation
    el.classList.add("play");
  }, [pathname]);

  return <div ref={ref} className="curtain" aria-hidden="true" />;
}
