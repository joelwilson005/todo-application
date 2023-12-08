/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Hind", "sans-serif"],
      secondary: ["Montserrat", "sans-serif"],
    },

    colors: {
      main: "#744fc6",
      secondary: "#4F86C6",
      accent: "#4FB0C6",
      neutralText: "#5A5A5A",
      neutralBackground: "#EEEEEE",
      error: "#ff1a1a",
      warning: "#ff8c1a",
      success: "#77ff33",
      information: "#3399ff",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
