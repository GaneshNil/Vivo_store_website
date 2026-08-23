import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vivo: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
        },
        origin: {
          violet: "#7C3AED",
          cyan: "#06B6D4",
          neon: "#38BDF8",
          purple: "#9333EA",
          dark: "#080C14",
          surface: "#0F172A",
          card: "#111827",
          border: "#1E293B",
          accent: "#F59E0B",
          emerald: "#10B981",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 40px -10px rgba(0, 102, 255, 0.4)",
        "glow-violet": "0 0 40px -10px rgba(124, 58, 237, 0.4)",
        "glow-cyan": "0 0 35px -8px rgba(6, 182, 212, 0.35)",
        "studio": "0 20px 50px -12px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
