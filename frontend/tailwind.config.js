/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
