// /** @type {import('tailwindcss').Config} */

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f3a683",
          DEFAULT: "#eb4d4b",
          dark: "#b33939",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#eb4d4b",
          "secondary": "#feca57",
          "accent": "#48dbfb",
          "neutral": "#222f3e",
          "base-100": "#ffffff", 
        },
      },
      "light", 
      "dark",
    ],
  },
};

