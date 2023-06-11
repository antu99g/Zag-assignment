/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "inter",
      },
      colors: {
        blue: "rgb(27,89,248)",
        "blue-btn": "rgba(27, 89, 248, 1)",
        // "dark-gray": "rgba(77, 77, 77, 1)",
        // "mid-gray": "rgb(176,176,176)",
        // "light-gray": "rgb(224,224,224)",
        // "medium-gray": "rgba(136, 136, 136, 1)",
      },
      backgroundColor: {
        "main-bg": "rgb(249,249,249)",
        "light-blue": "rgb(232,238,254)",
        grey: "rgba(239, 240, 246, 1)",
        peach: "rgb(253,231,230)",
        sky: "rgb(230,241,251)",
        "mid-gray": "rgb(154,154,154)",
        // "light-gray": "rgb(229,229,229)",
        // "gray-pink": "rgb(253,243,249)",
        // pink: "rgb(191,71,127)",
      },
      fontSize: {
        xs: ".63rem",
        sm: "0.7rem",
        md: "0.8rem",
        base: "0.9rem",
        lg: "1.15rem",
      },
      fontWeight: {
        thin: "400",
        medium: "500",
        "semi-bold": "600",
        bold: "700",
      },
      boxShadow: {
        sm: "0 0 7px rgba(0, 0, 0, 0.1)",
        lg: "0 0 15px rgba(0, 0, 0, 0.1)",
      },
      gridTemplateColumns: {
        "custom-grid": "38% repeat(3, 16%) 8%",
      },
      width: {
        1.2: "4.5px",
      },
      gap: {
        1.5: "1.5%",
      },
      inset: {
        "20p": "20%",
      },
    },
  },
  plugins: [],
};
