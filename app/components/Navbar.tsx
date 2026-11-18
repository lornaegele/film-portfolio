"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../lib/constants/navlinks";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <Link className="mark" href="/" aria-label="Lorenz Naegele, home">
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
