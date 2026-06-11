/* global require, module */
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "dark-blue": "#0f172a",
        purple: "#9333ea",
        "light-purple": "#c084fc",
        gray: "#94a3b8",
        "light-gray": "#c4c4c4",
      },
    },
  },
};
