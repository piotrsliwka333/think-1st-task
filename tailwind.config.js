/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        inactive: "var(--inactive)",
        backgroundPrimary: "var(--background-primary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        btnHover: "var(--btn-hover)",
        error: "var(--error)",
        backgroundError: "var(--background-error)",
      },
    },
  },
  plugins: [],
};
