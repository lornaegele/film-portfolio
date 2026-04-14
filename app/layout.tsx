import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components";
import Footer from "./components/Footer";
import { bodyFont } from "./lib/font";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
