"use client";

import Image from "next/image";
import { IMG_QUALITY } from "@/app/lib/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Size } from "../lib/imageSize";

export interface FilmReelProps {
  href: string;
  title: string;
  genre: string;
  /** the film's still first, then behind-the-scenes stills */
  frames: string[];
  /** pixel size of the first frame: on phones the tile takes its aspect ratio, so it is never cropped */
  size: Size;
  /** position in the grid: shown as 01, 02… and staggers the entrance */
  index: number;
  priority?: boolean;
}

/**
 * Film card linking to the film's page. Mouse x scrubs through the film's frames;
 * on touch screens the card in the middle of the viewport flips through them by itself.
 */
export default function FilmReel({ href, title, genre, frames, size, index, priority }: FilmReelProps) {
  const [p, setP] = useState(0);
  const ref = useRef<HTMLAnchorElement>(null);
  const k = Math.min(frames.length - 1, Math.floor(p * frames.length));

  useEffect(() => {
    if (!matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(timer);
        if (!e.isIntersecting) return setP(0);
        timer = setInterval(() => setP((q) => (Math.floor(q * frames.length + 1) % frames.length) / frames.length + 0.001), 1400);
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [frames.length]);

  return (
    <Link ref={ref} className="reel" href={href} data-cursor="Open" data-label={title} style={{ "--i": index } as React.CSSProperties}>
      <span
        className="scr"
        style={{ "--ar": `${size.width} / ${size.height}` } as React.CSSProperties}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const b = e.currentTarget.getBoundingClientRect();
          setP(Math.min(0.999, Math.max(0, (e.clientX - b.left) / b.width)));
        }}
        onPointerLeave={(e) => e.pointerType === "mouse" && setP(0)}
      >
        {frames.map((src, i) => (
          <span key={src} className={`fr${i === k ? " on" : ""}`}>
            <Image quality={IMG_QUALITY}
              src={src}
              alt={i === 0 ? `Still from ${title}` : ""}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              priority={priority && i === 0}
              loading={i === 0 ? undefined : "lazy"}
            />
          </span>
        ))}
        <span className="n mono">{String(index + 1).padStart(2, "0")}</span>
        <span className="cta play" aria-hidden="true">
          <svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" /></svg>
        </span>
        <span className="tl"><i style={{ width: `${p * 100}%` }} /></span>
      </span>
      {/* the title is on the thumbnail; keep it for search engines and screen readers */}
      <h2 className="vh">{title}</h2>
      <span className="info">{genre}</span>
    </Link>
  );
}
