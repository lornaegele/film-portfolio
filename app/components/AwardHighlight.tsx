"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { uiFont } from "../lib/font";

export default function AwardHighlight() {
  return (
    <section
      aria-label="Recent award"
      className="px-6 md:px-10 pt-10 md:pt-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link
            href="/video/sport_climbing_mattia"
            className="group flex items-center gap-4 md:gap-6 justify-center text-center"
          >
            <Image
              src="/fotos/dokfest_muenchen_laurel.png"
              alt="DOK.fest München 2026 — Winner DOK.education Dokumentarfilmpreis"
              width={80}
              height={80}
              className="h-14 md:h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div
              className={`${uiFont.className} text-left`}
            >
              <p className="text-cinema-gold text-[10px] md:text-xs uppercase tracking-[0.25em]">
                DOK.fest München 2026
              </p>
              <p className="text-cinema-silver text-sm md:text-base mt-1">
                Winner · DOK.education Dokumentarfilmpreis
                <span className="text-cinema-smoke/60">
                  {" "}
                  — Finding Flow in the Fight
                </span>
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
