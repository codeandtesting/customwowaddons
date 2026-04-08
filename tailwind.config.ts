import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0e0e10",
        surface: "#0e0e10",
        "surface-container": "#19191c",
        "surface-container-low": "#131315",
        "surface-container-lowest": "#000000",
        primary: "#f3ffca",
        secondary: "#cc7aff",
        tertiary: "#ff9649",
        "gold-accent": "#D4AF37",
        "bone-white": "#E8E1D3",
        obsidian: "#0B0A0D",
        "grid-border": "#3A332A",
        fel: "#CCFF00",
        void: "#B026FF",
        ice: "#00D1FF",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-label)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      animation: {
        "flicker": "flicker 4s infinite ease-in-out",
        "spin-slow": "spin-slow 60s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 5px #D4AF37)" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 15px #D4AF37)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
