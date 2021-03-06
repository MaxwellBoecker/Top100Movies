module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    camelcase: 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
  },
};
