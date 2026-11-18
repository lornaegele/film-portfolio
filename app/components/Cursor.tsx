"use client";

import { useEffect, useRef, useState } from "react";

/** Dot that trails the mouse; grows into a labelled disc over elements with `data-cursor`. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return;
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf = 0;
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; el.style.opacity = "1"; };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    const follow = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(follow);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    follow();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor${label ? " big" : ""}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
