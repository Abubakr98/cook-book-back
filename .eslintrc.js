module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  extends: 'airbnb-base',
  rules: {
    'consistent-return': 'off',
  },
};
