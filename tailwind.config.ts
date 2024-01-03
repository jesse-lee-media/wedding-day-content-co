import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const utilitiesPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.font-thin': {
      fontWeight: '100',
      fontVariationSettings: '"wght" 100',
    },
    '.font-extralight': {
      fontWeight: '200',
      fontVariationSettings: '"wght" 200',
    },
    '.font-light': {
      fontWeight: '300',
      fontVariationSettings: '"wght" 300',
    },
    '.font-normal': {
      fontWeight: '400',
      fontVariationSettings: '"wght" 350',
    },
    '.font-medium': {
      fontWeight: '500',
      fontVariationSettings: '"wght" 450',
    },
    '.font-semibold': {
      fontWeight: '600',
      fontVariationSettings: '"wght" 550',
    },
    '.font-bold': {
      fontWeight: '700',
      fontVariationSettings: '"wght" 650',
    },
    '.text-wrap-balance': {
      textWrap: 'balance',
    },
    '.border': {
      borderWidth: '1.5px',
    },
    '.border-t': {
      borderTopWidth: '1.5px',
    },
    '.border-r': {
      borderRightWidth: '1.5px',
    },
    '.border-b': {
      borderBottomWidth: '1.5px',
    },
    '.border-l': {
      borderLeftWidth: '1.5px',
    },
    '.border-x': {
      borderLeftWidth: '1.5px',
      borderRightWidth: '1.5px',
    },
    '.border-y': {
      borderTopWidth: '1.5px',
      borderBottomWidth: '1.5px',
    },
    '.form-sizing-content': {
      formSizing: 'content',
    },
    '.mi-auto': {
      marginInline: 'auto',
    },
    '.overflow-x-padded': {
      overflow: 'hidden',
      width: '100vw',
      marginLeft: 'calc((100dvw - 100%) / -2)',
      paddingInline: 'calc((100dvw - 100%) / 2)',
    },
  });
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#111',
        white: '#fff',
      },
      screens: {
        xxs: '375px',
        xs: '425px',
        'md-lg': '992px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-slow': 'marquee 90s linear infinite',
        'marquee-normal': 'marquee 60s linear infinite',
        'marquee-fast': 'marquee 30s linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - 1.5rem))',
          },
        },
      },
    },
    fontFamily: {
      sans: [
        ['var(--font-figtree)', 'sans-serif', ...defaultTheme.fontFamily.sans],
        {
          fontVariationSettings: "'wght' 350",
        },
      ],
      serif: [
        ['var(--font-zodiak)', 'serif', ...defaultTheme.fontFamily.serif],
        {
          fontVariationSettings: "'wght' 400",
        },
      ],
    },
  },
  plugins: [utilitiesPlugin, require('@tailwindcss/container-queries')],
};

export default config;
