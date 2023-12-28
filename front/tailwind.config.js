/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      heading: ['"Exo 2"', "sans-serif"],
      body: ['"Exo 2"', "sans-serif"],
    },
    fontSize: {
      xs: "0.790rem",
      sm: "0.889rem",
      base: "1rem",
      xl: "1.125rem",
      "2xl": "1.266rem",
      "3xl": ["1.424rem", "1.424rem"],
      "4xl": "1.602rem",
      "5xl": "1.802rem",
      "md-xs": "0.640rem",
      "md-sm": "0.800rem",
      "md-xl": "1.250rem",
      "md-2xl": "1.563rem",
      "md-3xl": ["1.954rem", "1.954rem"],
      "md-4xl": "2.442rem",
      "md-5xl": "3.053rem",
    },
    colors: {
      white: "#ffffff",
      red: "#CE2C31",
      cso: "#732F7B",
      dressage: "#043D79",
      hunter: "#A95A1B",
      voltige: "#0D8DC7",
      blue: {
        50: "#eef9ff",
        100: "#dcf3ff",
        200: "#b2e8ff",
        300: "#6dd7ff",
        400: "#20c3ff",
        500: "#00acff",
        600: "#0089df",
        700: "#006db4",
        800: "#005c94",
        900: "#004b79",
        950: "#003051",
      },
      sun: {
        50: "#fff9eb",
        100: "#fdeec8",
        200: "#fadb8d",
        300: "#f8c451",
        400: "#f6ae2d",
        500: "#ef8b11",
        600: "#d4670b",
        700: "#b0470d",
        800: "#8f3711",
        900: "#752e12",
        950: "#431505",
      },
      gray: {
        50: "#f4f6f7",
        100: "#e2e8eb",
        200: "#c8d4d9",
        300: "#a3b5bd",
        400: "#758e9b",
        500: "#5a7280",
        600: "#4d606d",
        700: "#43515b",
        800: "#3d474f",
        900: "#353d44",
        950: "#20262c",
      },
    },
    dropShadow: {
      base: "4px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    extend: {
      spacing: {
        88: "352px",
        112: "448px",
      },
      maxWidth: {
        80: "320px",
        88: "352px",
        112: "448px",
        128: "512px",
        144: "576px",
      },
      borderRadius: {
        10: "10px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
