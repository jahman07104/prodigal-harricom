import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#111111",
        "charcoal-card": "#1A1A1A",
        "charcoal-soft": "#1B2331",
        "hc-orange": "#FF7A00",
        "hc-orange-light": "#FFB066",
        "jm-green": "#009B3A",
        "jm-gold": "#FED100",
        "hc-muted": "#E6E6E6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        studio: "1120px",
      },
      borderRadius: {
        hero: "20px",
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
