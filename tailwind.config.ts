/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import containerQueriesPlugin from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';

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
    '.overflow-section': {
      width: 'calc(100dvw)',
      marginLeft: 'calc((100dvw - 100%) / -2)',
      paddingInline: 'calc((100dvw - 100%) / 2)',
    },
    '.items-last-baseline': {
      alignItems: 'last baseline',
    },
  });
});

const textShadowPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-shadow': (value) => ({
        textShadow: value,
      }),
    },
    { values: theme('textShadow') },
  );
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#111',
        white: '#fff',
        'dusty-rose': {
          '50': '#faf5f7',
          '100': '#f7ecf0',
          '200': '#f0dae3',
          '300': '#e5bccc',
          '400': '#d393aa',
          '500': '#c3718e',
          '600': '#ae546f',
          '700': '#a24860',
          '800': '#7b394a',
          '900': '#683340',
          '950': '#3e1922',
        },
      },
      screens: {
        xxs: '375px',
        xs: '425px',
        'md-lg': '992px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-slow': 'marquee 120s linear infinite',
        'marquee-normal': 'marquee 90s linear infinite',
        'marquee-fast': 'marquee 60s linear infinite',
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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
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
  plugins: [utilitiesPlugin, containerQueriesPlugin, textShadowPlugin, animatePlugin],
};

export default config;
