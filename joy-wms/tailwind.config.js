/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-jhitam": "#232222",
        "custom-jorange": "#F48832",
        "custom-jputih": "#F6F7F7",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
