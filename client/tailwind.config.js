/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7A28CB",
        accent: "#23CE6B",
        third: "#FF4242",
      },
    },
  },
  plugins: [],
};
