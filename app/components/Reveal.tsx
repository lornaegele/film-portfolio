"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades `.rv` elements in as they enter the viewport. Only elements that start
 * below the fold are hidden, so the first screen is complete without JS.
 */
export default function Reveal() {
  const pathname = usePathname();

  // after the first page has rendered, later navigations get the curtain transition
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add("nav-ready"), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("pend");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("pend");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
