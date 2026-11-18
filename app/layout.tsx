import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Leader, { leaderScript } from "./components/Leader";
import Reveal from "./components/Reveal";
import { displayFont, monoFont, sansFont } from "./lib/font";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lorenzvisuals.com"),
  title: "Lorenz Naegele | Documentary Filmmaker",
  description:
    "Lorenz Naegele, German documentary filmmaker and photographer based in Spain. Climbing and surf films, plus outdoor photography from the Andes and Patagonia.",
  icons: {
    icon: ["/favicon.svg"],
    apple: ["/favicon.svg"],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // the inline script may add leader classes before hydration
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} ${sansFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: leaderScript }} />
      </head>
      <body>
        <Leader />
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
