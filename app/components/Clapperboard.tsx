"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { irisPolygon, transitionFor } from "../lib/transition";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Page transitions for links to Films / About (clapperboard) and Photos (aperture snap).
 * Clap: aperture blades close while the board drops in, the stick claps in the dark (CUT, navigate),
 * blades open on the new page while the board shrinks into the opening.
 * Intercepts link clicks in the capture phase, so next/link sees defaultPrevented and leaves navigation to us.
 */
export default function Clapperboard() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const hole = useRef<SVGPolygonElement>(null);
  const blades = useRef<SVGGElement>(null);
  const scene = useRef<HTMLElement>(null);
  const take = useRef<HTMLElement>(null);
  const roll = useRef<HTMLElement>(null);
  const date = useRef<HTMLElement>(null);
  const arrived = useRef<(() => void) | null>(null);

  // the new page has rendered: let the transition open
  useEffect(() => {
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  useEffect(() => {
    const now = new Date();
    date.current!.textContent = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}`;
    const takes: Record<string, number> = {};
    let busy = false;

    const draw = (k: number) => {
      const w = innerWidth, h = innerHeight, far = Math.hypot(w, h);
      const pts = irisPolygon(k, w, h);
      svg.current!.setAttribute("viewBox", `${-w / 2} ${-h / 2} ${w} ${h}`);
      hole.current!.setAttribute("points", pts.map((p) => p.join(",")).join(" "));
      // each polygon edge continues outward as a blade edge
      blades.current!.innerHTML = pts
        .map((p, i) => {
          const q = pts[(i + pts.length - 1) % pts.length];
          const dx = p[0] - q[0], dy = p[1] - q[1], d = Math.hypot(dx, dy) || 1;
          return `<line x1="${p[0]}" y1="${p[1]}" x2="${p[0] + (dx / d) * far}" y2="${p[1] + (dy / d) * far}"/>`;
        })
        .join("");
    };
    const tween = (from: number, to: number, ms: number) =>
      new Promise<void>((done) => {
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / ms);
          draw(from + (to - from) * ease(p));
          if (p < 1) requestAnimationFrame(step);
          else done();
        };
        requestAnimationFrame(step);
      });
    // resolves when the pathname changes; falls back after 1.5s so the overlay never sticks
    const pageArrives = () =>
      new Promise<void>((done) => {
        arrived.current = done;
        setTimeout(done, 1500);
      });

    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href);
      const t = transitionFor(url.pathname);
      if (url.origin !== location.origin || url.pathname === location.pathname || t.kind === "none") return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      if (busy) return;
      busy = true;

      const el = root.current!, html = document.documentElement, href = url.pathname + url.search + url.hash;
      html.classList.add("clap-nav"); // app/template.tsx skips its curtain for this navigation
      try {
        if (t.kind === "snap") {
          el.className = "clap snap";
          await tween(0, 1, 320);
          router.push(href);
          await Promise.all([pageArrives(), wait(60)]);
          await tween(1, 0, 420);
        } else {
          scene.current!.textContent = t.scene;
          roll.current!.textContent = t.roll;
          take.current!.textContent = pad((takes[t.roll] = (takes[t.roll] ?? 0) + 1));
          el.className = "clap on";
          await tween(0, 1, 560);
          el.classList.add("shut"); // clap in the dark
          router.push(href);
          await Promise.all([pageArrives(), wait(440)]);
          el.className = "clap shut out"; // keep `shut` so the stick never springs back open
          await tween(1, 0, 700);
        }
      } finally {
        el.className = "clap";
        html.classList.remove("clap-nav");
        busy = false;
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div ref={root} className="clap" aria-hidden="true">
      <svg ref={svg} className="iris" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="iris-hole">
            <rect x="-9999" y="-9999" width="19998" height="19998" fill="#fff" />
            <polygon ref={hole} fill="#000" />
          </mask>
        </defs>
        <rect x="-9999" y="-9999" width="19998" height="19998" fill="#0e0c0a" mask="url(#iris-hole)" />
        <g ref={blades} stroke="#efe8db" strokeOpacity="0.22" strokeWidth="0.5" />
      </svg>
      <div className="clap-in">
        <div className="clap-board">
          <div className="clap-stripes clap-top" />
          <div className="clap-stripes" />
          <div className="clap-body mono">
            <span className="wide">Prod. Lorenz Naegele</span>
            <span>Scene<b ref={scene}>01</b></span>
            <span>Take<b ref={take}>01</b></span>
            <span>Roll<b ref={roll}>Films</b></span>
            <span>Date<b ref={date} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
