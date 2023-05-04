/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundSize: {
        '100': '100%',
      },
      width: {
        '116': '34rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
