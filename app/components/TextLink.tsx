"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { uiFont } from "../lib/font";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: "gold" | "smoke" | "cream";
  uppercase?: boolean;
}

const tones = {
  gold: "text-cinema-gold hover:text-cinema-cream",
  smoke: "text-cinema-smoke hover:text-cinema-gold",
  cream: "text-cinema-cream hover:text-cinema-gold",
};

/**
 * Inline text link with animated gold underline on hover.
 */
export default function TextLink({
  href,
  children,
  external,
  tone = "gold",
  uppercase = true,
  className = "",
  ...rest
}: TextLinkProps) {
  const classes = `${uiFont.className} ${tones[tone]} ${
    uppercase ? "uppercase text-xs tracking-[0.2em]" : ""
  } relative inline-block transition-colors duration-300 group ${className}`;

  const content = (
    <>
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full"
      />
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
