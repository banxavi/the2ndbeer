/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'premium-gold': '#D4AF37',
          'premium-black': '#111111',
          // Slightly brighter surfaces for 25–55 audience readability
          'premium-dark': '#212121',
        },
        fontFamily: {
          sans: ['Be Vietnam Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        },
      },
    },
    plugins: [],
  }