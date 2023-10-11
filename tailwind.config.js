/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#D7DDE7",
        "light-blue": "#85B8FF",
        "light-gray": "#F0F3F9",
      },
    },
  },
  plugins: [],
};
