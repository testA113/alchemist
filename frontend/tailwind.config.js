/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts,js}"],
  theme: {
    fontFamily: {
      suez: ["Suez One", "sans-serif"],
      sans: ["Ubuntu", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "400px",
        // => @media (min-width: 992px) { ... }
      },
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
      },
      minHeight: {
        minpage: "calc(100vh - 324px)", // 324px is the height of the footer
      },
      keyframes: {
        rotateword: {
          "0%": { opacity: "0" },
          "1%": { opacity: "0", transform: "translateY(-30px)" },
          "3%": { opacity: "1", transform: "translateY(0px)" },
          "24%": { opacity: "1", transform: "translateY(0px)" },
          "26%": { opacity: "0", transform: "translateY(30px)" },
          "80%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        rotateword: "rotateword 12s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontFamily: "Suez One",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
  ],
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
          "base-300": "#404040",
          info: "#8CCAC1",
          success: "#9CB686",
          warning: "#fb923c",
          error: "#FC9783",
        },
      },
    ],
  },
};
