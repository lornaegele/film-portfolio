"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface FilmReelProps {
  href: string;
  title: string;
  genre: string;
  date: string;
  /** thumbnail first, then behind-the-scenes stills */
  frames: string[];
  priority?: boolean;
}

/** Film card: moving the mouse across the picture scrubs through the film's frames. */
export default function FilmReel({ href, title, genre, date, frames, priority }: FilmReelProps) {
  const [p, setP] = useState(0);
  const k = Math.min(frames.length - 1, Math.floor(p * frames.length));

  return (
    <Link className="reel rv" href={href} data-cursor="Open">
      <span
        className="scr"
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          setP(Math.min(0.999, Math.max(0, (e.clientX - b.left) / b.width)));
        }}
        onPointerLeave={() => setP(0)}
      >
        {frames.map((src, i) => (
          <span key={src} className={`fr${i === k ? " on" : ""}`}>
            <Image
              src={src}
              alt={i === 0 ? `${title}, film thumbnail` : ""}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              priority={priority && i === 0}
              loading={i === 0 ? undefined : "lazy"}
            />
          </span>
        ))}
        <span className="tl"><i style={{ width: `${p * 100}%` }} /></span>
      </span>
      {/* the title is on the thumbnail; keep it for search engines and screen readers */}
      <h2 className="vh">{title}</h2>
      <span className="info">
        <span>{genre}</span>
        <span>{date}</span>
      </span>
    </Link>
  );
}
