import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: "#0A0A0A",
          dark: "#141414",
          charcoal: "#1C1C1C",
          ash: "#2A2A2A",
          smoke: "#8A8A8A",
          silver: "#B8B8B8",
          cream: "#F5F0E8",
          gold: "#D4A853",
        },
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 7vw, 6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        display: [
          "clamp(2rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        subtitle: ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.5" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
