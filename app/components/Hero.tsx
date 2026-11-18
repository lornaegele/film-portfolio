"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SplitTitle from "./SplitTitle";

export interface HeroSlide {
  src: string;
  alt: string;
  place: string;
}

const MARKS = ["∞", "30", "15", "10", "7", "5", "3", "2", "1.5", "1.2", "1", "0.8", "0.6"];
/** wheel distance (px) for one full turn of the focus ring */
const FULL_TURN = 900;
const SLIDE_MS = 5200;

/**
 * Home screen: a viewfinder over a photo slideshow.
 * Easter egg: scrolling turns the focus ring (image blurs, scale slides);
 * a full turn locks focus and pulls onto the next photo.
 */
export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [placeVisible, setPlaceVisible] = useState(true);
  const [locked, setLocked] = useState(false);
  const [hinted, setHinted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<HTMLAnchorElement>(null);
  const distRef = useRef<HTMLElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval>>();

  // advance the slideshow (also used by the focus pull)
  const next = useRef(() => {});
  next.current = () => {
    setPlaceVisible(false);
    setIndex((i) => (i + 1) % slides.length);
    setTimeout(() => setPlaceVisible(true), 400);
  };
  const restartTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => next.current(), SLIDE_MS);
  };

  useEffect(() => {
    restartTimer();
    const hero = heroRef.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let charge = 0, lastFeed = 0, firing = false, raf = 0, ty: number | null = null;
    const t0 = performance.now();
    const pad = (v: number) => String(v).padStart(2, "0");

    const fire = () => {
      firing = true;
      charge = 0;
      setHinted(true);
      setLocked(true);
      next.current();
      restartTimer();
      setTimeout(() => { setLocked(false); firing = false; }, 1100);
    };
    const feed = (d: number) => {
      if (firing) return;
      charge = Math.min(FULL_TURN, charge + Math.abs(d));
      lastFeed = performance.now();
      if (charge >= FULL_TURN) fire();
    };

    const frame = (now: number) => {
      // 25 fps timecode
      const f = Math.floor((now - t0) / 40);
      if (tcRef.current) tcRef.current.textContent = `${pad(Math.floor(f / 90000))}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
      if (now - lastFeed > 220) charge *= 0.9; // let go and focus drifts back
      const k = charge / FULL_TURN;
      if (lensRef.current) lensRef.current.style.filter = k > 0.01 ? `blur(${(Math.sin(k * Math.PI) * 9).toFixed(2)}px)` : "";
      if (tapeRef.current) tapeRef.current.style.transform = `translateX(-${(k * 92).toFixed(2)}%)`;
      if (aimRef.current) {
        aimRef.current.style.transform = k >= 0.02 ? `scale(${(1.25 - k * 0.25).toFixed(3)})` : "";
        aimRef.current.style.setProperty("--c", k > 0.85 || firing ? "var(--sun)" : "");
      }
      if (distRef.current) {
        const mark = MARKS[Math.round(k * (MARKS.length - 1))];
        distRef.current.textContent = k > 0.02 && mark !== "∞" ? `${mark} m` : "∞";
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
      if ([" ", "ArrowDown", "PageDown"].includes(e.key) && !(e.target as Element).closest("a,button")) {
        e.preventDefault();
        feed(160);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (reduce || !slidesRef.current) return;
      slidesRef.current.style.transform = `translate(${(e.clientX / innerWidth - 0.5) * -24}px,${(e.clientY / innerHeight - 0.5) * -16}px)`;
    };

    hero.addEventListener("wheel", onWheel, { passive: false });
    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchmove", onTouchMove, { passive: true });
    addEventListener("keydown", onKey);
    addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer.current);
      hero.removeEventListener("wheel", onWheel);
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchmove", onTouchMove);
      removeEventListener("keydown", onKey);
      removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-label="Lorenz Naegele, climbing and surf filmmaker">
      <div ref={lensRef} className="lens">
        <div ref={slidesRef} className="slides">
          {slides.map((s, i) => (
            <div key={s.src} className={`slide${i === index ? " on" : ""}`}>
              <Image src={s.src} alt={s.alt} fill sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className={`vf${locked ? " locked" : ""}`}>
        <i /><i /><i /><i />
        <span className="rec mono" aria-hidden="true"><b /><span ref={tcRef}>00:00:00:00</span></span>
        <span className="place mono" aria-hidden="true" style={{ opacity: placeVisible ? 1 : 0 }}>
          {slides[index].place}
        </span>
        <span className="exp mono" aria-hidden="true">
          ƒ/8 · 1/250<br />Focus <b ref={distRef}>∞</b>
        </span>
        <span className="lock mono" aria-hidden="true">● In focus</span>
        <Link ref={aimRef} className="cta aim" href="/video">
          <span className="rec" aria-hidden="true" />
          Watch films
          <span className="arr" aria-hidden="true">→</span>
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
