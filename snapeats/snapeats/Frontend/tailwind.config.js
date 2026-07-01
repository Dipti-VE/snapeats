/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all components and pages
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",   // Red
        secondary: "#F77F00", // Orange
        cream: "#FFF5E1",     // Cream
        dark: "#2B2D42",      // Dark gray for text
        light: "#FFFFFF",     // White
        accent: "#FFB703",    // Optional bright accent
      },
    },
  },
  plugins: [],
};
