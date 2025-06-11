"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollDisabler: React.FC = () => {
  const pathname = usePathname();

  const pages = ["/"]; // List of pages where scrolling should be disabled

  useEffect(() => {
    if (pages.includes(pathname)) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [pathname, pages]);

  return null;
};

export default ScrollDisabler;
