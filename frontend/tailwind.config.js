/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts,js}"],
  theme: {
    extend: {
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    prefix: "",
    themes: [
      {
        alchemist: {
          primary: "#D5BA5A",
          secondary: "#263F40",
          accent: "#11596F",
          neutral: "#78716c",
          "base-100": "#1A1A1A",
          info: "#8CCAC1",
          success: "#9CB686",
          warning: "#fb923c",
          error: "#FC9783",
        },
      },
    ],
  },
};
