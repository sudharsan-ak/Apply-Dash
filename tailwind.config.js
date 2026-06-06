/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: {
          bg: '#111827',
          surface: '#1f2937',
          border: '#374151',
          text: '#f3f4f6',
          muted: '#9ca3af',
        },
      },
      boxShadow: {
        panel: '-4px 0 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
