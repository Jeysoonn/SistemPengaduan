/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        2: '2',
        3: '3',
        4: '4',
      },
    },
  },
  plugins: [],
}