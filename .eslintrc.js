/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@mistjs/eslint-config-vue',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/prop-name-casing': 'off',
  },
}
