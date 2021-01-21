module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript'
  ],
  rules: {
    "consistent-return": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "no-return-assign": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/naming-convention": "off",
    "no-await-in-loop": "off"
  }
};