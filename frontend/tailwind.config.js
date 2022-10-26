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
      minHeight: {
        minpage: "calc(100vh - 324px)", // 324px is the height of the footer
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
          "base-200": "#303030",
          info: "#8CCAC1",
          success: "#9CB686",
          warning: "#fb923c",
          error: "#FC9783",
        },
      },
    ],
  },
};
