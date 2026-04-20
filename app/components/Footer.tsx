"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { logoFont, uiFont } from "../lib/font";

const TAGLINES = [
  "Stories, not shots.",
  "Authenticity over aesthetics.",
  "The film begins before the camera does.",
  "Capturing what is, not what looks good.",
];

const Footer = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TAGLINES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        {/* Rotating tagline */}
        <div className="h-7 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className={`${uiFont.className} text-cinema-smoke text-caption uppercase`}
            >
              {TAGLINES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Thin gold rule */}
        <div className="w-12 h-[1px] bg-cinema-gold/60" />

        {/* Rotating SVG signature ring */}
        <div
          className={`flex justify-center items-center ${logoFont.className}`}
        >
          <div className="w-[140px]">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path
                  id="circlePath"
                  d="
                    M 50,50
                    m -30,0
                    a 30,30 0 1,1 60,0
                    a 30,30 0 1,1 -60,0
                  "
                />
              </defs>
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <text fontSize="11.5" fill="#F5F0E8">
                  <textPath href="#circlePath">
                    © 2025 made by Lorenz Naegele
                  </textPath>
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
