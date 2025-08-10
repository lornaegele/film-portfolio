"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { NavItem } from "../lib/interfaces";
import { usePathname } from "next/navigation";
import { headingFont, subHeadingFont } from "../lib/font";
import { FaHamburger } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  devNavItems,
  defaultNavItems,
  visNavItems,
} from "../lib/constants/navlinks";

export const revalidate = 60;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mouse repel effect state and refs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const letterRefs = useRef<HTMLHeadingElement[][]>([[], []]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    if (dist > 100) return {};
    const offset = 15 * (1 - dist / 100);
    return {
      transform: `translate(${(dx / dist) * offset}px, ${
        (dy / dist) * offset
      }px) rotate(${rotation}deg)`,
    };
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="mx-auto px-4  md:max-w-5xl">
        <div className="relative flex h-20 md:h-24 justify-between">
          <div className="flex w-full items-center justify-between">
            <div
              className={`flex w-full  ${
                pathname == "/" ? "justify-center" : "justify-start"
              } `}
            >
              <Link href="/">
                <div
                  className={`capitalize flex flex-col items-center justify-center ${
                    pathname == "/"
                      ? " md:text-3xl text-xl"
                      : " md:text-lg text-md"
                  } ${headingFont.className}`}
                >
                  {(() => {
                    const nameRows: [string, number][][] = [
                      [
                        ["l", -10],
                        ["o", 0],
                        ["r", -5],
                        ["e", 5],
                        ["n", -10],
                        ["z", 5],
                      ],
                      [
                        ["n", -10],
                        ["a", 0],
                        ["e", -5],
                        ["g", 5],
                        ["e", -10],
                        ["l", 5],
                        ["e", 5],
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
                              transition: "transform 0.5s ease",
                              transform: `rotate(${rotation}deg)`,
                              ...getTransformStyle(
                                rowIndex,
                                charIndex,
                                rotation
                              ),
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
            </div>
            {pathname !== "/" && (
              <div>
                <div className="hidden md:block">
                  <NavItems menuOpen={menuOpen} />
                </div>
                {/*  MOBILE */}
                {/* Burger Menu Button */}
                <div
                  className="text-black  delay-300 absolute right-2 top-6 z-40 block cursor-pointer md:hidden"
                  onClick={toggleMenu}
                >
                  {menuOpen ? (
                    <IoClose size="36px" className="-mr-1" />
                  ) : (
                    <FaHamburger size="26px" className="mt-1" />
                  )}
                </div>
                {/* Animated Menu */}
                <div
                  className={` fixed right-0 top-0 z-30 !h-screen w-screen bg-white text-black shadow-md transition-transform duration-500 md:hidden ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                  style={{
                    transformOrigin: "right",
                    transform: menuOpen ? "translateX(0)" : "translateX(100%)",
                  }}
                >
                  <NavItems
                    closeMenu={() => setMenuOpen(false)}
                    menuOpen={menuOpen}
                  />
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const NavItems = ({
  closeMenu,
  menuOpen,
}: {
  closeMenu?: () => void;
  menuOpen: boolean;
}) => {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState(defaultNavItems);
  const spanRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const initSetNavItems = (path?: string) => {
    const currentPath = path || pathname;

    if (currentPath.includes("dev")) {
      setNavItems(devNavItems);
    } else if (currentPath.includes("visual")) {
      setNavItems(visNavItems);
    } else {
      setNavItems(defaultNavItems);
    }
  };

  useEffect(() => {
    initSetNavItems();
  }, []);

  const getCharTransform = (navIndex: number, charIndex: number) => {
    const el = spanRefs.current[navIndex]?.[charIndex];
    if (!el || typeof window === "undefined" || window.innerWidth < 768)
      return {};
    const rect = el.getBoundingClientRect();
    const dx = rect.x + rect.width / 2 - mousePos.x;
    const dy = rect.y + rect.height / 2 - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 100) return {};
    const offset = 5 * (1 - dist / 100);
    return {
      transform: `translate(${(dx / dist) * offset}px, ${
        (dy / dist) * offset
      }px)`,
    };
  };

  return (
    <div
      className={`flex flex-col justify-end gap-5 p-6 pl-14 pt-16 text-4xl md:flex-row md:p-0 font-bold md:text-xl ${
        isMobile ? subHeadingFont.className : ""
      }`}
    >
      {Array.isArray(navItems) &&
        navItems.map((navItem: NavItem, index: number) => {
          const isActive =
            pathname.includes(navItem.link) ||
            pathname === `/${navItem.link}` ||
            `/${navItem.link}` === pathname;
          return (
            <div
              key={navItem.name}
              className={`overflow-hidden ${isActive ? "md:-mt-[2px] " : ""}`}
            >
              <Link
                href={navItem.link}
                onClick={() => {
                  closeMenu?.();
                  if (
                    !navItem.link.includes("contact") &&
                    !navItem.link.includes("about")
                  ) {
                    initSetNavItems(navItem.link);
                  }
                }}
                className={`
          ${
            pathname === "/" && !menuOpen ? "after:bg-black" : "after:bg-black"
          } capitalize relative whitespace-nowrap p-2 ${
                  isActive
                    ? ` 
                  ${
                    !isMobile && headingFont.className
                  }  text-[#6e4f73] md:text-black`
                    : ""
                }
        `}
                prefetch
              >
                {[...navItem.name].map((char, charIndex) => {
                  if (!spanRefs.current[index]) spanRefs.current[index] = [];
                  return (
                    <span
                      key={charIndex}
                      ref={(el: HTMLSpanElement | null) => {
                        spanRefs.current[index][charIndex] = el;
                      }}
                      style={{
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                        ...getCharTransform(index, charIndex),
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;
