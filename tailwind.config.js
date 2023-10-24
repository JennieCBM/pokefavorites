/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#F22539",
        "focus": "#C00E20",
        "unselected": "#BFBFBF",
        "background": "#F5F5F5"
      }
    },
    fontFamily: {
      Lato: ["Lato", "sans-serif"]
    }
  },
  plugins: [],
}

