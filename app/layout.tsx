import type { Metadata } from "next";
import "./globals.css";
import { Navbar, ScrollDisabler } from "./components";
import { mainFont } from "./lib/font";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Lorenz Naegele | Filmmaker & Photographer",
  description: `Filmmaker offering innovative digital solutions and compelling visual content. Explore projects, services, and creative work..`,
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
      <body className={`${mainFont.className} h-svh w-svw`}>
        <Navbar />
        <main className="">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
