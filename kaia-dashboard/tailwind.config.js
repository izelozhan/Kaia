/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FCF9F2",
        surface: "#FFFFFF",
        header: "#F6F3EC",
        foreground: "#1C1C18",
        muted: "#4D4636",
        border: "#E5E2DB",
        accent: {
          gold: "#FFD966",
          goldDark: "#735C00",
          teal: "#006491",
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
        card: "0 4px 20px rgba(0, 100, 145, 0.08)",
        pomodoro: "0 12px 32px rgba(115, 92, 0, 0.12)",
        rituals: "0 8px 24px rgba(139, 75, 88, 0.08)",
        weather: "0 8px 24px rgba(0, 100, 145, 0.1)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
