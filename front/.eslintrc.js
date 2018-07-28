// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['eslint-config-alloy/typescript'],
  // required to lint *.vue files
  plugins: [
    'html',
    'typescript'
  ],
  // add your custom rules here
  rules: {
    'indent': 0,
    'no-unused-vars': 0,
    'prefer-promise-reject-errors': 0,
    'one-var': 0,
    'no-param-reassign': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
