"use client";

import Image from "next/image";
import { IMG_QUALITY } from "@/app/lib/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SplitTitle from "./SplitTitle";
import { pickSlide, scrollFocus } from "../lib/focus";

export interface HeroSlide {
  src: string;
  alt: string;
  place: string;
}

const MARKS = ["∞", "30", "15", "10", "7", "5", "3", "2", "1.5", "1.2", "1", "0.8", "0.6"];
/** scroll distance (px) from sharp to fully out of focus */
const FULL_TURN = 900;

/**
 * Home screen: a viewfinder over one photo, picked at random on every visit (no zoom, no slideshow).
 * Scrolling turns the focus ring with the scroll (down defocuses, up refocuses) and drifts back to sharp when you stop.
 * A click anywhere on the photo starts the way to the films (the play link, so the clapperboard runs).
 */
export default function Hero({ slides }: { slides: HeroSlide[] }) {
  // chosen after mount: a server-rendered pick would be the same for everyone until the next build
  const [index, setIndex] = useState<number | null>(null);
  const [hinted, setHinted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<HTMLAnchorElement>(null);
  const distRef = useRef<HTMLElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setIndex(pickSlide(slides.length)), [slides.length]);

  useEffect(() => {
    const hero = heroRef.current!;
    let k = 0, lastFeed = 0, raf = 0, ty: number | null = null;
    const t0 = performance.now();
    const pad = (v: number) => String(v).padStart(2, "0");

    const feed = (d: number) => {
      k = scrollFocus(k, d, FULL_TURN);
      lastFeed = performance.now();
      setHinted(true);
    };

    const frame = (now: number) => {
      // 25 fps timecode
      const f = Math.floor((now - t0) / 40);
      if (tcRef.current) tcRef.current.textContent = `${pad(Math.floor(f / 90000))}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
      if (now - lastFeed > 220) k = k < 0.002 ? 0 : k * 0.9; // let go and focus drifts back to sharp
      if (lensRef.current) lensRef.current.style.filter = k > 0.002 ? `blur(${(k * 10).toFixed(2)}px)` : "";
      if (tapeRef.current) tapeRef.current.style.transform = `translateX(-${(k * 92).toFixed(2)}%)`;
      if (distRef.current) {
        const mark = MARKS[Math.round(k * (MARKS.length - 1))];
        distRef.current.textContent = mark === "∞" ? "∞" : `${mark} m`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onWheel = (e: WheelEvent) => { e.preventDefault(); feed(e.deltaY * (e.deltaMode ? 30 : 1)); };
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (ty == null) return;
      const y = e.touches[0].clientY;
      feed((ty - y) * 3);
      ty = y;
    };
    const onKey = (e: KeyboardEvent) => {
      const step = { ArrowDown: 160, PageDown: 160, " ": 160, ArrowUp: -160, PageUp: -160 }[e.key];
      if (step && !(e.target as Element).closest("a,button")) {
        e.preventDefault();
        feed(step);
      }
    };
    // click anywhere on the photo: same as the play button (Clapperboard.tsx picks the link click up)
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button")) return;
      aimRef.current?.click();
    };

    hero.addEventListener("wheel", onWheel, { passive: false });
    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchmove", onTouchMove, { passive: true });
    hero.addEventListener("click", onClick);
    addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("wheel", onWheel);
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchmove", onTouchMove);
      hero.removeEventListener("click", onClick);
      removeEventListener("keydown", onKey);
    };
  }, []);

  const slide = index === null ? null : slides[index];

  return (
    <section ref={heroRef} className="hero" aria-label="Lorenz Naegele, climbing and surf filmmaker">
      <div ref={lensRef} className="lens">
        {slide && (
          <div className="slide">
            <Image quality={IMG_QUALITY} src={slide.src} alt={slide.alt} fill sizes="100vw" priority />
          </div>
        )}
      </div>

      <div className="vf">
        <i /><i /><i /><i />
        <span className="rec mono" aria-hidden="true"><b /><span ref={tcRef}>00:00:00:00</span></span>
        <span className="place mono" aria-hidden="true">{slide?.place}</span>
        <span className="exp mono" aria-hidden="true">
          ƒ/8 · 1/250<br />Focus <b ref={distRef}>∞</b>
        </span>
        <Link ref={aimRef} className="cta play aim" href="/video" aria-label="Watch films">
          <svg viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" /></svg>
        </Link>
        <div className="scale" aria-hidden="true">
          <div ref={tapeRef} className="tape mono">
            {MARKS.map((m, i) => <span key={m}>{i === MARKS.length - 1 ? `${m} m` : m}</span>)}
          </div>
        </div>
        <span className="hint mono" aria-hidden="true" style={{ opacity: hinted ? 0 : 1 }}>
          Scroll to focus
        </span>
      </div>

      <div className="hero-copy">
        <SplitTitle lines={["Lorenz", "Naegele"]} label="Lorenz Naegele, climbing and surf filmmaker" />
      </div>
    </section>
  );
}
