"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Film-leader countdown (3, 2, 1) on the first home visit per session.
 * The inline script in layout.tsx decides before paint by adding `leader-on leader-wait` to <html>.
 */
export default function Leader() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(3);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("leader-on")) return;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      root.classList.remove("leader-wait"); // let the name rise now
      try { sessionStorage.setItem("leader", "1"); } catch {}
      setTimeout(() => root.classList.remove("leader-on"), 1000);
    };
    let count = 3;
    const t = setInterval(() => {
      count -= 1;
      if (count > 0) setN(count);
      else { clearInterval(t); finish(); }
    }, 950);
    const el = ref.current;
    el?.addEventListener("click", finish);
    return () => { clearInterval(t); el?.removeEventListener("click", finish); };
  }, []);

  return (
    <div ref={ref} className={`leader${done ? " done" : ""}`} aria-hidden="true">
      <div className="ring">
        <div className="sweep" />
        <span className="num">{n}</span>
      </div>
      <span className="skip mono">Click to skip</span>
    </div>
  );
}

/** Runs before first paint (see layout.tsx). Kept tiny and defensive: storage can throw. */
export const leaderScript = `try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('leader'))document.documentElement.classList.add('leader-on','leader-wait')}catch(e){}`;
