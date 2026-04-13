/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple dark mode surface layers
        surface: {
          base:    '#000000',
          raised:  '#111111',
          overlay: '#1a1a1a',
          float:   '#222222',
        }
      },
      boxShadow: {
        'apple': '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.6)',
        'apple-lg': '0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}
