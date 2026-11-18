import { Big_Shoulders_Display, IBM_Plex_Mono, Inter } from "next/font/google";

// Exposed as CSS variables and used through the tokens in globals.css.
export const displayFont = Big_Shoulders_Display({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const monoFont = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const sansFont = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
