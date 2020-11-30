const extentions = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json', '.node'];

module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    node: {
      tryExtensions: extentions,
    },
  },
  rules: {
    'require-jsdoc': 'off',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'error',
    //
    // '@typescript-eslint/adjacent-overload-signatures': 'error',
    // 'node/no-missing-import': [
    //   'error',
    //   {
    //     allowModules: [],
    //     resolvePaths: ['./src'],
    //     tryExtensions: extentions,
    //   },
    // ],
    // 'node/no-unsupported-features/es-syntax': 'off',
  },
};
