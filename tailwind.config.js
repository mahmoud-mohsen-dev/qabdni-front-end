/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shades of blue
        'blue/ultralight': '#EEF4FE',
        'blue/light': '#ADCFFF',
        'blue/medium': '#5882C1',
        'blue/normal': '#1F74EC',
        'blue/accent': '#135CCA',

        // Shades of orange
        'orange/ultralight': '#FEF0DB',
        'orange/light': '#F8D8AB',
        'orange/normal': '#FAAB3C',
        'orange/accent': '#FAAB3C',

        // Shades of green
        'green-yellow/light': '#23EB31',
        'green/ultralight': '#DDFCE0',
        'green/light': '#AFFFB6',
        'green/accent': '#0EB01D',

        // Shades of indigo
        'indigo/ultralight': '#F3EEFE',
        'indigo/light': '#DDCBFC',
        'indigo/normal': '#9566F2',
        'indigo/accent': '#4E1BD9',

        // Shades of red
        'red/ultralight': '#FFF4F4',
        'red/light': '#FFB5B5',
        'red/normal': '#F85757',
        'red/accent': '#FF2828',

        // Shades of gray
        'gray/ultralight': '#F4F5F7',
        'gray/lighter': '#d9d9d9',
        'gray/light': '#E0E4EA',
        'gray/normal': '#969DA6',
        'gray/accent': '#727272',
        'gray/dark': '#5D6675',
        'gray/darkest': '#343942',
        'gray/medium': '#979797',

        // Shades of purple
        'purple/ultralight': '#F0F2FF',
        'purple/normal': '#465FF1',

        // Shades of pink
        'pink/ultralight': '#ffeaea',
        'pink/light': '#FFE0E0',

        // Other colors
        'other/brown': '#BE6F00',
        'other/black&blue-normal': '#17243E',
        'other/black&blue-dark': '#2c343c',
        'other/black': '#23272C',
        'other/backdrop-color': 'rgba(255, 255, 255, 0.1)',
        'other/gray&indigo-light': '#AFAFAF',
        'other/gray&blue-accent': '#3A414A',
        'other/gray&red-light': '#D8D8D8'
      },
      backgroundImage: {
        loginImage: "url('/images/bg-login-page.png')",
        glassLogin: 'linear-gradient(145deg, rgba(88,130,193,49), rgba(88,130,193,11))'
      },
      fontFamily: {
        mullish: ['Mulish', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        Libre: ['Libre Franklin', 'sans-serif']
      },
      gridTemplateColumns: {
        180: 'repeat(auto-fit, 180px);',
        350: 'repeat(auto-fit, minmax(350px, 1fr));',
        two: 'repeat(auto-fit, minmax(500px, 1fr));'
      },
      boxShadow: {
        'custom-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'shadow-md': '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        'shadow-lg': '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
        btnHover: '0px 0px 15px -7px rgba(0,0,0,0.7);',
        dropShadow: '0px 2px 10px 0px rgba(0,0,0,.05);'
      }
    }
  },
  plugins: []
};
