// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "semi": true,
        "trailingComma": "none"
      }
    ]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
}
