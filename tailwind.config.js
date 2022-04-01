module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41BBD9",
        dark: "#171717",
      },
      fontFamily: {
        sans: ["SUIT", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "5px 5px 10px #1a1a1a,-5px -5px 10px #2e2e2e",
      },
    },
  },
  plugins: [],
};
