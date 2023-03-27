/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    backgroundSize: {
      '100': '100%',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
