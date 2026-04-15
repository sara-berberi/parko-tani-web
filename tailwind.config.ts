import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Restrained palette — no more rainbow of blues.
        ink: {
          DEFAULT: "#0b1220", // near-black navy, primary text & dark sections
          900: "#0b1220",
          800: "#111a2e",
          700: "#1a2540",
          600: "#2a3756",
          500: "#4a5878",
          400: "#7a869e",
          300: "#a8b1c3",
          200: "#d4d9e2",
          100: "#eceef3",
        },
        paper: {
          DEFAULT: "#f6f5f0", // warm off-white, page background
          50: "#fdfcf8",
          100: "#f6f5f0",
          200: "#eceae1",
          300: "#dfdcd0",
        },
        ocean: {
          DEFAULT: "#1e4d92", // single blue accent — used sparingly
          50: "#eff4fb",
          100: "#dbe6f5",
          200: "#b6cce9",
          300: "#7fa3d2",
          400: "#4e7bb8",
          500: "#1e4d92",
          600: "#19407a",
          700: "#153463",
          800: "#11284c",
          900: "#0b1c36",
        },
        // Kept old brand keys pointing at ocean so any lingering refs still compile.
        brand: {
          50: "#eff4fb",
          100: "#dbe6f5",
          200: "#b6cce9",
          300: "#7fa3d2",
          400: "#4e7bb8",
          500: "#1e4d92",
          600: "#19407a",
          700: "#0b1220",
          800: "#11284c",
          900: "#0b1c36",
          950: "#070c18",
        },
        accent: {
          blue: "#4e7bb8",
          green: "#3a9d7a",
          amber: "#c88a2e",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Tight, intentional type scale. No more "display-xl" gigantism.
        "display-xl": [
          "4.5rem",
          { lineHeight: "0.98", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -8px rgba(11,18,32,0.06)",
        lifted:
          "0 1px 2px rgba(11,18,32,0.06), 0 18px 48px -16px rgba(11,18,32,0.14)",
        device:
          "0 40px 80px -20px rgba(11,18,32,0.35), 0 12px 24px -12px rgba(11,18,32,0.2)",
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
