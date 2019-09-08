module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    semi: ['error', 'never'],
    indent: ['error', 2],
    'max-len': ['error', {
      code: 150,
      tabWidth: 2
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': ['warn', 2],
    'vue/no-unused-vars': 'error',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    'key-spacing': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'space-before-function-paren': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'no-var': 'error',
    'no-useless-constructor': 'error',
    quotes: ['error', 'single']
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  }
}
