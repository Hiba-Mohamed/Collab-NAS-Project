/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { 200: "200px", 250: "250px", 300: "300px", 350: "350px", 400: "500px", 500: "500px", 600: "600px", 700: "700px", 800: "800px" },
      height:{1:"1px", 2:"2px", 1.5:"1.5px"},
      colors: {
        peach: "#EF798A",
        blue: "#0654A0",
        white: "#FFFFFF",
        lblue: "#D7EAF9",
        greyblue: "#F3FAF8",
        orange: "#FBB612",
        red: "#EF4444",
        faint: "#BDBDBD",
        linecolor: "#666666",
        primarylight: "#3891DA",
        buttongrey: "#C8C8C8",
        lightblue: "#3996E22E",
        bluehover: "#3996E2",
        lightred: "#FEE2E2",
      },

      boxShadow: {
        lg: "1px 1px 6px rgba(0, 0, 0, 0.05), 1px 1px 6px rgba(0, 0, 0, 0.05);",
      },
    },

    fontFamily: {
      OpenSans: ["Open Sans", "sans-serif"],
    },
  },

  plugins: [],
};
