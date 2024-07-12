/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ['"Noto Sans"', "sans-serif"],
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      textColor: {
        white: "#ffffff",
        whiteDimmed: "#cccccc",
        green: "#22c55e",
        greenLight: "#a8f0c2",
      },
      backgroundColor: {
        globalBackground: "#141414",
        darkGreen: "#072c15",
      },
      borderColor: {
        imgBorderHover: "#415471",
        imgBorder: "#2f3c51",
      },
    },
  },
  plugins: [],
};
