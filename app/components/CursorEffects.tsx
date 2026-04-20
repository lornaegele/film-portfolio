"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor.
 * No-op on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      if (cursorRef.current) {
        cursorRef.current.classList.toggle("is-hover", !!interactive);
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return <div ref={cursorRef} className="custom-cursor" aria-hidden />;
}
