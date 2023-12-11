/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-banner': 'url(https://w0.peakpx.com/wallpaper/888/321/HD-wallpaper-nike-air-force-nike-shoes.jpg)',
        'signup-banner': 'url(https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww)',
      },
      maxHeight: {
        '75': '75vh',
        '90': '90vh',
      },
      height: {
        '75': '75vh',
        '90': '90vh',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'l-3xl': '0 20px 50px 12px rgba(0, 0, 0, 5)',
        'r-3xl': '20px 10px 50px 0px rgba(0, 0, 0, 5)',
      }
    },
  },
  plugins: [],
}

