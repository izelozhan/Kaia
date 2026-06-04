/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFF0EE",
        surface: "#FFFFFF",
        header: "#FFF0EE",
        foreground: "#1C1C18",
        muted: "#6B5050",
        border: "#F0D8D8",
        accent: {
          gold: "#8B1A1A",
          goldDark: "#8B1A1A",
          teal: "#B83030",
          rose: "#8B4B58",
        },
        note: {
          pink: "rgba(255, 209, 216, 0.4)",
          yellow: "rgba(255, 217, 102, 0.4)",
        },
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(139, 26, 26, 0.06)",
        pomodoro: "0 12px 32px rgba(139, 26, 26, 0.12)",
        rituals: "0 8px 24px rgba(139, 26, 26, 0.08)",
        weather: "0 8px 24px rgba(139, 26, 26, 0.15)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        logo: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};