/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#a3888c",
        "custom-pink-transparent": "#a3888c66",
        "custom-light": "#fbf8f8",
      },
      boxShadow: {
        "3xl": "0 0 5px 5px rgba(28,31,86,.06)",
      },
      backgroundImage: {
        "hero-video": "url('../wedding/src/assets/video.jpg')",
        "modal-bg": "url('/src/assets/invitation.png')",
        "chair": "url('/src/assets/chair.png')",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, bottom: "-5rem" },
          "100%": { opacity: 1, bottom: "3rem" },
        },
      },
      animation: {
        "fade-in": "fade-in 300ms ease forwards",
      },
    },
    fontFamily: {
      gilda: ["Gilda Display"],
      "alex-brush": ["Alex Brush"],
      freehand: ["Freehand"],
      calligraffitti: ["Calligraffitti"],
    },
    aspectRatio: {
      modal: "3 / 4.2",
    },
  },
  plugins: [],
};
