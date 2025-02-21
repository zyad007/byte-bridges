/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/theme");

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
  plugins: [heroui()],
};
