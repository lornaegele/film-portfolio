import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import CursorEffects from "./components/CursorEffects";
import { bodyFont } from "./lib/font";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lorenzvisuals.com"),
  title: "Lorenz Naegele | Documentary Filmmaker",
  description:
    "Documentary filmmaker crafting authentic stories about people, nature, and adventure. Evoking emotions through cinematic storytelling.",
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
    <html lang="en">
      <body className={`${bodyFont.className} bg-cinema-black text-cinema-cream`}>
        <ScrollProgress />
        <CursorEffects />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
