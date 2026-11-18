"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../lib/constants/navlinks";

export default function Navbar() {
  const pathname = usePathname();
  // `dk`: light text on the full-screen home photo; `bar`: light backdrop once page content scrolls under it
  const [mode, setMode] = useState<"" | "dk" | "bar">(pathname === "/" ? "dk" : "");

  useEffect(() => {
    const update = () => setMode(pathname === "/" ? "dk" : scrollY > 10 ? "bar" : "");
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <header className={`nav${mode ? ` ${mode}` : ""}`}>
      <Link className="mark" href="/" aria-label="Lorenz Naegele, home" data-label="Lorenz Naegele">
        LN
      </Link>
      <nav aria-label="Main">
        <ul>
          {navItems.map((item) =>
            item.external ? (
              <li key={item.link} className="ig">
                <a className="l" href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ) : (
              <li key={item.link}>
                <Link
                  className={`l${pathname.startsWith(item.link) ? " cur" : ""}`}
                  href={item.link}
                  aria-current={pathname.startsWith(item.link) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
