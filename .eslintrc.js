module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 120, ignoreTrailingComments: true, ignoreUrls: true, ignoreStrings: true }],
    'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
  },
};
