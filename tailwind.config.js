/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        main: "var(--main)",
        sub: "var(--sub)",
        line: "var(--line)",
        light: "var(--light)",
        lighter: "var(--lighter)",
        mid: "var(--mid)",
        invert: "var(--invert)",
       
      },
      fontFamily: {
        sans: ["Montserrat, sans-serif"],
        sora: ["Sora, sans-serif"],
      }
    },
  },
  plugins: [],
}