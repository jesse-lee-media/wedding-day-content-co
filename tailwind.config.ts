import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const utilitiesPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    // @ts-expect-error valid configuration
    '.font-normal': {
      fontWeight: 400,
      fontVariationSettings: '"wght" 400',
    },
    // @ts-expect-error valid configuration
    '.font-medium': {
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
    },
    // @ts-expect-error valid configuration
    '.font-semibold': {
      fontWeight: 600,
      fontVariationSettings: '"wght" 600',
    },
    // @ts-expect-error valid configuration
    '.font-bold': {
      fontWeight: 700,
      fontVariationSettings: '"wght" 700',
    },
  });
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xxs: '375px',
        xs: '425px',
        'md-lg': '992px',
      },
    },
    fontFamily: {
      sans: [
        ['var(--font-figtree)', 'sans-serif', ...defaultTheme.fontFamily.sans],
        {
          fontVariationSettings: "'wght' 400",
        },
      ],
      serif: ['var(--font-paytone-one)', 'serif', ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [utilitiesPlugin],
};

export default config;
