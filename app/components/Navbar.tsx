"use client";

import Link from "next/link";
import { navItems } from "../lib/constants";
import { NavItem } from "../lib/interfaces";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { headingFont } from "../lib/font";

export const revalidate = 60;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="">
      <div className="mx-auto px-4  md:max-w-5xl">
        <div className="relative flex h-16 justify-between">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full justify-start">
              <Link href="/">
                <div
                  className={`capitalize flex flex-col items-center justify-center md:text-lg text-md ${headingFont.className}`}
                >
                  <div className="flex">
                    <h1 className="-mb-2 rotate-[-10deg]">l</h1>
                    <h1 className="-mb-2 rotate-[0deg]">o</h1>
                    <h1 className="-mb-2 rotate-[-5deg]">r</h1>
                    <h1 className="-mb-2 rotate-[5deg]">e</h1>
                    <h1 className="-mb-2 rotate-[-10deg]">n</h1>
                    <h1 className="-mb-2 rotate-[5deg]">z</h1>
                  </div>
                  <div className="flex">
                    <h1 className="-mb-2 rotate-[-10deg]">n</h1>
                    <h1 className="-mb-2 rotate-[0deg]">a</h1>
                    <h1 className="-mb-2 rotate-[-5deg]">e</h1>
                    <h1 className="-mb-2 rotate-[5deg]">g</h1>
                    <h1 className="-mb-2 rotate-[-10deg]">e</h1>
                    <h1 className="-mb-2 rotate-[5deg]">l</h1>
                    <h1 className="-mb-2 rotate-[5deg]">e</h1>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden md:block">
              <NavItems menuOpen={menuOpen} />
            </div>

            {/*  MOBILE */}
            {/* Burger Menu Button */}
            <div
              className="text-black  delay-300 absolute right-4 top-4 z-40 block cursor-pointer md:hidden"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <AiOutlineClose size="28px" />
              ) : (
                <AiOutlineMenu size="28px" />
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
            </div>
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

  return (
    <div className="flex flex-col justify-end gap-10 p-6 pl-14 pt-16 text-xl md:flex-row md:p-0 md:text-lg">
      {navItems.map((navItem: NavItem) => {
        const isActive = pathname === navItem.link;
        return (
          <div key={navItem.name}>
            <Link
              href={navItem.link}
              onClick={closeMenu} // Close the menu when a link is clicked
              className={`
          ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"} ${
                pathname === "/" && !menuOpen
                  ? "after:bg-black"
                  : "after:bg-black"
              }  capitalize relative whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[1.5px]   after:transition-all after:duration-300
        `}
              prefetch
            >
              {navItem.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
