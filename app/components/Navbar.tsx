"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { NavItem } from "../lib/interfaces";
import { usePathname } from "next/navigation";
import { logoFont, uiFont, headingFont } from "../lib/font";
import { navItems } from "../lib/constants/navlinks";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Mouse repel effect state and refs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const letterRefs = useRef<HTMLHeadingElement[][]>([[], []]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const getTransformStyle = (row: number, col: number, rotation: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return {};
    }
    const el = letterRefs.current[row]?.[col];
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const dx = rect.x + rect.width / 2 - mousePos.x;
    const dy = rect.y + rect.height / 2 - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Wider falloff zone, softer curve, smaller max offset
    const radius = 140;
    if (dist > radius) return {};
    const eased = Math.pow(1 - dist / radius, 1.6);
    const offset = 10 * eased;
    return {
      transform: `translate(${(dx / dist) * offset}px, ${
        (dy / dist) * offset
      }px) rotate(${rotation}deg)`,
    };
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cinema-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 md:px-10 max-w-7xl">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div
                className={`capitalize flex flex-col items-center justify-center
                  md:text-2xl text-lg text-cinema-cream
                  ${logoFont.className}`}
              >
                {(() => {
                  const nameRows: [string, number][][] = [
                    [
                      ["L", -5],
                      ["o", 0],
                      ["r", 3],
                      ["e", -2],
                      ["n", 3],
                      ["z", -3],
                    ],
                    [
                      ["V", 4],
                      ["i", -1],
                      ["s", 2],
                      ["u", 4],
                      ["a", 1],
                      ["l", 1],
                      ["s", 1],
                    ],
                  ];
                  return nameRows.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                      {row.map(([char, rotation], charIndex) => (
                        <h1
                          key={charIndex}
                          ref={(el) => {
                            if (el) {
                              if (!letterRefs.current[rowIndex])
                                letterRefs.current[rowIndex] = [];
                              letterRefs.current[rowIndex][charIndex] = el;
                            }
                          }}
                          className="-mb-2 hover-rotate"
                          style={{
                            transition: "transform 0.6s cubic-bezier(0.25, 0.4, 0.25, 1)",
                            transform: `rotate(${rotation}deg)`,
                            ...getTransformStyle(rowIndex, charIndex, rotation),
                          }}
                        >
                          {char}
                        </h1>
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </Link>

            {/* Desktop Nav */}
            <div
              className={`hidden md:flex items-center gap-8 ${uiFont.className}`}
            >
              {navItems.map((navItem: NavItem) => {
                const isActive =
                  pathname.includes(navItem.link) || pathname === navItem.link;

                if (navItem.external) {
                  return (
                    <a
                      key={navItem.name}
                      href={navItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cinema-cream/60 hover:text-white transition-colors duration-300"
                    >
                      <FaInstagram size={20} />
                    </a>
                  );
                }

                return (
                  <Link
                    key={navItem.name}
                    href={navItem.link}
                    className={`relative uppercase text-sm tracking-[0.2em] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-cinema-cream/60 hover:text-white"
                    }`}
                  >
                    {navItem.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-cinema-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden z-50 relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1.5px] bg-cinema-cream transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-cinema-cream transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cinema-black/98 backdrop-blur-lg md:hidden flex items-center justify-center"
          >
            <nav
              className={`flex flex-col items-center gap-8 ${headingFont.className}`}
            >
              {navItems.map((navItem: NavItem, index: number) => {
                const isActive =
                  pathname.includes(navItem.link) || pathname === navItem.link;

                if (navItem.external) {
                  return (
                    <motion.a
                      key={navItem.name}
                      href={navItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
                      className="text-cinema-smoke hover:text-cinema-cream transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaInstagram size={28} />
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={navItem.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={navItem.link}
                      className={`text-4xl capitalize transition-colors duration-300 ${
                        isActive
                          ? "text-cinema-gold"
                          : "text-cinema-cream hover:text-cinema-gold"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {navItem.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to account for fixed nav - pages with hero images should use negative margin to go under nav */}
      <div className="h-20 md:h-24" aria-hidden="true" id="nav-spacer" />
    </>
  );
};

export default Navbar;
