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
        brand: {
          50: "#f0f6fb",
          100: "#dce8f5",
          200: "#c0d4ed",
          300: "#93b4d8",
          400: "#6b89a5",
          500: "#2563a8",
          600: "#1e54a0",
          700: "#0f2240",
          800: "#0d1f3c",
          900: "#091628",
          950: "#040c18",
        },
        accent: {
          blue: "#5ba3f5",
          green: "#22c55e",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "0.92", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-lg": ["3.75rem", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "800" }],
        "display-md": ["3rem", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(37,99,168,0.15)",
        "glow-md": "0 0 40px rgba(37,99,168,0.2)",
        "glow-lg": "0 4px 60px rgba(37,99,168,0.3)",
        "glow-xl": "0 8px 80px rgba(37,99,168,0.4)",
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)",
        "elevated": "0 24px 48px -12px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pin-bob": "pin-bob 4s ease-in-out infinite alternate",
        "blink": "blink 2s ease infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%": { opacity: "0.5", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pin-bob": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-18px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
