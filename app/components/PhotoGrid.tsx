"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IMG_QUALITY } from "@/app/lib/image";

export interface GridPhoto {
  path: string;
  title: string;
  alt: string;
  /** the photo's own page: still the link target without JS, in a new tab and for search engines */
  href: string;
}

type Box = { left: number; top: number; width: number; height: number };

const EASE = "cubic-bezier(0.2, 0.8, 0.1, 1)";

/** where the photo sits when enlarged: as big as fits on screen, centred, in its own aspect ratio */
function fit(aspect: number): Box {
  const pad = Math.min(40, innerWidth * 0.04);
  const width = Math.min(innerWidth - 2 * pad, (innerHeight - 2 * pad) * aspect);
  const height = width / aspect;
  return { left: (innerWidth - width) / 2, top: (innerHeight - height) / 2, width, height };
}

/** transform that puts the enlarged box onto a thumbnail's rectangle */
function onto(r: DOMRect, b: Box) {
  const dx = r.left + r.width / 2 - (b.left + b.width / 2);
  const dy = r.top + r.height / 2 - (b.top + b.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${r.width / b.width})`;
}

/**
 * Photos grid. Clicking a photo enlarges it in place: it grows out of its thumbnail over a light backdrop
 * and shrinks back on close (click anywhere, Esc). ←/→ (keys or buttons) flip through the photos.
 */
export default function PhotoGrid({ photos }: { photos: GridPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const pics = useRef<(HTMLSpanElement | null)[]>([]);
  const growFrom = useRef<DOMRect | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const aspectOf = (i: number) => {
    const img = pics.current[i]?.querySelector("img");
    return img?.naturalWidth ? img.naturalWidth / img.naturalHeight : 4 / 5;
  };
  const show = (i: number, from?: DOMRect) => {
    const k = (i + photos.length) % photos.length;
    growFrom.current = from ?? null;
    setOpen(k);
    setBox(fit(aspectOf(k)));
  };

  // grow out of the clicked thumbnail (before paint, so it never flashes at full size first)
  useLayoutEffect(() => {
    const from = growFrom.current;
    growFrom.current = null;
    if (from && box && frame.current && !reduce()) {
      frame.current.animate([{ transform: onto(from, box) }, { transform: "none" }], { duration: 550, easing: EASE });
    }
  }, [box]);

  // keep the enlarged photo fitted when the window changes size
  useEffect(() => {
    if (open === null) return;
    const onResize = () => setBox(fit(aspectOf(open)));
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = async () => {
    const d = dialog.current;
    if (!d?.open) return;
    const pic = open === null ? null : pics.current[open];
    if (pic && frame.current && box && !reduce()) {
      d.classList.add("closing");
      await frame.current.animate([{ transform: "none" }, { transform: onto(pic.getBoundingClientRect(), box) }], {
        duration: 420,
        easing: EASE,
        fill: "forwards",
      }).finished;
    }
    d.classList.remove("closing");
    d.close();
  };

  return (
    <>
      <div className="grid">
        {photos.map((p, i) => (
          <a
            key={p.href}
            className="frame rv"
            href={p.href}
            data-cursor="View"
            data-no-transition
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // new tab etc. keeps the page link
              e.preventDefault();
              show(i, pics.current[i]?.getBoundingClientRect());
              dialog.current?.showModal();
            }}
          >
            <span className="pic" ref={(el) => { pics.current[i] = el; }}>
              <Image quality={IMG_QUALITY} src={p.path} alt={p.alt} fill sizes="(max-width: 640px) 50vw, 33vw" priority={i < 3} />
            </span>
            <span className="t mono">{p.title}</span>
          </a>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="lb"
        aria-label="Photo viewer"
        onClose={() => { setOpen(null); setBox(null); }}
        onCancel={(e) => { e.preventDefault(); close(); }}
        onClick={(e) => !(e.target as Element).closest("button") && close()}
        onKeyDown={(e) => {
          if (open === null) return;
          if (e.key === "ArrowRight") show(open + 1);
          if (e.key === "ArrowLeft") show(open - 1);
        }}
      >
        {open !== null && box && (
          <div ref={frame} className="lb-frame" style={box}>
            <Image
              key={photos[open].path}
              quality={IMG_QUALITY}
              src={photos[open].path}
              alt={photos[open].alt}
              fill
              sizes={`${Math.ceil(box.width)}px`}
            />
          </div>
        )}
        <button className="lb-btn lb-prev" type="button" aria-label="Previous photo" onClick={() => show((open ?? 0) - 1)}>←</button>
        <button className="lb-btn lb-next" type="button" aria-label="Next photo" onClick={() => show((open ?? 0) + 1)}>→</button>
        <button className="lb-btn lb-close" type="button" aria-label="Close" onClick={close}>✕</button>
      </dialog>
    </>
  );
}
