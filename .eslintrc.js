module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   sourceType: 'module',
  // },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['error', 2],
    // 'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // 'max-len': ['error', 120],
    // 'arrow-parens': 0,
    // 'no-param-reassign': 0,
  },
}
