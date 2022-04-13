module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1100px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        libre: ['Libre Baskerville', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        squarepeg: ['Square Peg', 'cursive'],
      },
      boxShadow: {
        s1: '2px 5px 15px rgba(0,0,0,0.36)',
      },
      backgroundImage: {
        image1: 'url(/images/cake_image1.jpg)',
        image2: 'url(/images/photos-by-lanty-3962cSRPwOo-unsplash.jpg)',
        cupcake: 'url(/images/sara-cervera-zEwgRzJJIvk-unsplash.jpg)',
      },
      colors: {
        primary: {
          DEFAULT: '#880a4d',
          t1: '#f5e7ee',
          t2: '#e0b6cc',
          t3: '#ac3c77',
          d1: '#3c0422',
          d2: '#2d0319',
          d3: '#1e0211',
        },
        secondary: {
          DEFAULT: '#323377',
          t1: '#ebebf1',
          t2: '#d6d6e4',
          t3: '#adadc9',
          t4: '#5b5c92',
          d1: '#0f0f24',
          d2: '#0a0a18',
          d3: '#0e0f22',
        },
        white: {
          DEFAULT: "#fff",
          light: '#fbfffe',
          x100: '#f5f7fb',
          x200: '#f5f7f9',
        },
        green: {
          success: '#20af97',
        },
        blue: {
          light: '#dafff9',
        },
        red: {
          light: '#ee3a36',
        },
        yellow: {
          light: '#f7af20',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
}
