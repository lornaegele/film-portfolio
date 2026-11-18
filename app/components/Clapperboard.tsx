"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { transitionFor } from "../lib/transition";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pad = (n: number) => String(n).padStart(2, "0");
const BLADES = 7;

/**
 * Page transitions for in-site links: Films / About (clapperboard), Photos (aperture snap), anything else
 * (home, film and photo pages) a curtain that rises over the page with the destination's name, then lifts.
 * Clap: aperture blades close while the board drops in, the stick claps in the dark (CUT, navigate),
 * blades open on the new page while the board shrinks into the opening.
 * Intercepts link clicks in the capture phase, so next/link sees defaultPrevented and leaves navigation to us.
 */
export default function Clapperboard() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLElement>(null);
  const take = useRef<HTMLElement>(null);
  const roll = useRef<HTMLElement>(null);
  const date = useRef<HTMLElement>(null);
  const cut = useRef<HTMLDivElement>(null);
  const cutLabel = useRef<HTMLSpanElement>(null);
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

    // the blades are plain elements animated by a CSS transform transition (GPU, no per-frame JS)
    const iris = (closed: boolean, ms: number) => {
      const el = root.current!;
      el.style.setProperty("--iris-ms", `${ms}ms`);
      el.offsetWidth; // commit the open state first so the transition runs
      el.classList.toggle("closed", closed);
      return wait(ms);
    };
    // resolves when the pathname changes; falls back after 1.5s so the overlay never sticks
    const pageArrives = () =>
      new Promise<void>((done) => {
        arrived.current = done;
        setTimeout(done, 1500);
      });

    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      // data-no-transition: the link is handled on the page itself (e.g. the photo lightbox)
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return;
      const url = new URL(a.href);
      const t = transitionFor(url.pathname);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      if (busy) return;
      busy = true;

      const el = root.current!, html = document.documentElement, href = url.pathname + url.search + url.hash;
      html.classList.add("clap-nav"); // Curtain.tsx (back/forward only) stays out of this navigation
      try {
        if (t.kind === "curtain") {
          const c = cut.current!;
          cutLabel.current!.textContent = a.dataset.label ?? "";
          c.className = "cut in"; // rises over the page, name fades in
          await wait(750);
          router.push(href);
          await pageArrives();
          c.className = "cut out"; // lifts off the new page
          await wait(800);
          c.className = "cut";
        } else if (t.kind === "snap") {
          el.className = "clap snap";
          await iris(true, 320);
          router.push(href);
          await Promise.all([pageArrives(), wait(60)]);
          await iris(false, 420);
        } else {
          scene.current!.textContent = t.scene;
          roll.current!.textContent = t.roll;
          take.current!.textContent = pad((takes[t.roll] = (takes[t.roll] ?? 0) + 1));
          el.className = "clap on";
          await iris(true, 560);
          el.classList.add("shut"); // clap in the dark
          router.push(href);
          await Promise.all([pageArrives(), wait(440)]);
          el.className = "clap closed shut out"; // keep `shut` so the stick never springs back open
          await iris(false, 700);
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
    <>
    <div ref={cut} className="cut" aria-hidden="true"><span ref={cutLabel} /></div>
    <div ref={root} className="clap" aria-hidden="true">
      <div className="iris">
        {Array.from({ length: BLADES }, (_, i) => (
          <i key={i} style={{ "--a": `${(i * 360) / BLADES}deg` } as React.CSSProperties} />
        ))}
        {Array.from({ length: BLADES }, (_, i) => (
          <b key={i} style={{ "--a": `${(i * 360) / BLADES}deg` } as React.CSSProperties} />
        ))}
      </div>
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
    </>
  );
}
