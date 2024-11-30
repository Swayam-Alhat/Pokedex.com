/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "340px", // Add a custom breakpoint for small screens
      },
      boxShadow: {
        subtle: "0 1px 6px rgba(0,0,0,0.1)",
        balanced: "0 4px 6px rgba(0,0,0,0.15)",
        prominent: "6px 6px 20px rgba(0,0,0,0.25)",
      },
      fontFamily: {
        orbitron: ["orbitron", "sans-serif"],
        bungee: ['"Bungee Spice"', "cursive"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      zIndex: {
        1000: "1000",
      },
    },
  },
  plugins: [],
};
