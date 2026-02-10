/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "success": "#39DB4A",
        "secondary": "#86efac",
        "primary": "#ecfdf5",
        "tertiary": "#dc2626",
        "primaryBG": "#FCFCFC"
      }
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

