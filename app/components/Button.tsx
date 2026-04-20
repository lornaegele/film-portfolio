"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { uiFont } from "../lib/font";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonElProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const base =
  "inline-flex items-center gap-3 uppercase tracking-[0.18em] rounded-sm transition-all duration-300 focus-visible:outline-offset-4";

const sizes: Record<Size, string> = {
  md: "text-xs px-5 py-3",
  lg: "text-sm px-7 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-cinema-gold text-cinema-black hover:bg-cinema-cream hover:text-cinema-black",
  ghost:
    "border border-cinema-gold/60 text-cinema-gold hover:border-cinema-gold hover:bg-cinema-gold/10",
};

export function Button(props: AnchorProps | ButtonElProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  } = props;

  const classes = `${uiFont.className} ${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        external?: boolean;
      };
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
