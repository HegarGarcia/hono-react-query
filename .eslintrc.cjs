/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],

  env: {
    browser: true,
    node: true,
  },

  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
  },

  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',

    'no-process-env': 'error',
    'no-use-before-define': 'error',
    'import/no-default-export': 'error',
    curly: 'error',
  },

  overrides: [
    {
      files: ['./prettier.config.js'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],

  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};

module.exports = config;
