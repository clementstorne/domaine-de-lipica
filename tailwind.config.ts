const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      red: {
        "50": "#fef3f2",
        "100": "#fde6e3",
        "200": "#fdd0cb",
        "300": "#faafa7",
        "400": "#f68f84",
        "500": "#eb5848",
        "600": "#d83b2a",
        "700": "#b52e20",
        "800": "#962a1e",
        "900": "#7d281f",
        "950": "#44100b",
      },
      green: {
        "50": "#f1fee7",
        "100": "#dffbcc",
        "200": "#aff684",
        "300": "#98f066",
        "400": "#72e437",
        "500": "#53ca18",
        "600": "#3da10f",
        "700": "#307b10",
        "800": "#2a6113",
        "900": "#255215",
        "950": "#0f2e05",
      },
      warning: "#f6e884",
      info: "#84dff6",
      white: "#ffffff",
      // red: "#CE2C31",
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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "5xl": ["3rem", "1.5"],
      },
      spacing: {
        88: "352px",
        112: "448px",
        128: "512px",
        140: "560px",
        214: "856px",
      },
      maxWidth: {
        80: "320px",
        88: "352px",
        112: "448px",
        128: "512px",
        144: "576px",
        288: "1152px",
      },
      backgroundImage: {
        h1: "linear-gradient(rgba(250, 253, 254, 0.7),rgba(250, 253, 254, 0.8)),url(/title-background.webp)",
        "blue-gradient":
          "linear-gradient(180deg,rgba(0, 75, 121, 1) 0%,rgba(0, 48, 81, 1) 100%)",
      },
      flexGrow: {
        2: "2",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      gridAutoRows: {
        16: "64px",
        32: "128px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
