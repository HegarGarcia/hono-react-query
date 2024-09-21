// @ts-check

/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  semi: true,
  arrowParens: 'always',

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>',
    '<TYPES>^@/(.*)$',
    '<TYPES>^[.]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
};

export default config;
