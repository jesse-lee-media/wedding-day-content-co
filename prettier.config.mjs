/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  singleQuote: true,
  tailwindFunctions: ['cn', 'cva'],
  tailwindStylesheet: './src/app/(site)/globals.css',
};
