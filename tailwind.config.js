/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Dark Theme
        primary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#34D399',
        },
        bg: {
          darkest: '#0A0F1A',
          dark: '#111827',
          surface: '#1F2937',
          elevated: '#374151',
        },
        text: {
          primary: '#F9FAFB',
          secondary: '#D1D5DB',
          muted: '#9CA3AF',
        },
        border: {
          DEFAULT: '#374151',
          light: '#4B5563',
        }
      },
    },
  },
  plugins: [],
}
