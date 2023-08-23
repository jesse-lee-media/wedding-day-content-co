import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: [
        ['var(--font-archivo)', 'sans-serif', ...defaultTheme.fontFamily.sans],
        {
          fontFeatureSettings: "'liga'",
          fontVariationSettings: "'wght' 375",
        },
      ],
      serif: [
        ['var(--font-clash-display)', 'serif', ...defaultTheme.fontFamily.serif],
        {
          fontFeatureSettings: "'liga'",
          fontVariationSettings: "'wght' 450",
        },
      ],
    },
  },
};

export default config;
