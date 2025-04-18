/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#e91e63", // Pink color
        secondary: "#5e0d24", // Dark Red
        textGray: "#666",
        borderGray: "#ccc",
        background: "#f9f9f9",
      },
    },
  },
  plugins: [],
};
