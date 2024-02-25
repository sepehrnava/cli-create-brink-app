import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        camphor: ['var(--font-camphor-pro)'],
      },
      maxWidth: {
        'big-screen': '1800px',
      },
      colors: {
        green: '#0F0',
        'neon-green': '#00FF00',
        'light-grey': '#BEBEBE',
        'dark-grey': '#586570',
      },
    },
    screens: {
      xs: '475px',
      // => @media (min-width: 475px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'big-screen': '1800px',
      '3xl': '2000px',
      // => @media (min-width: 1536px) { ... }
      sxl: { max: '1280px' },
      // => @media (max-width: 1280px) { ... }

      slg: { max: '1024px' },
      // => @media (max-width: 1280px) { ... }

      smd: { max: '768px' },
      // => @media (max-width: 767px) { ... }

      ssm: { max: '640px' },
      // => @media (max-width: 640px) { ... }

      sxs: { max: '475px' },
      // => @media (max-width: 475px) { ... }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: 'white',
          secondary: '#00FF00',
          neonGreen: '#00FF00',
          bgColor: '#252525',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: 'white',
          secondary: '#00FF00',
          neonGreen: '#00FF00',
          bgColor: '#252525',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
