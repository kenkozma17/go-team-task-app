/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#282E33",
        "light-blue": "#85B8FF",
      },
    },
  },
  plugins: [],
};
