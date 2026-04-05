// eslint.config.js
const tsParser = require('@typescript-eslint/parser')
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin')
const angularEslintPlugin = require('@angular-eslint/eslint-plugin')
const angularTemplateParser = require('@angular-eslint/template-parser')
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template')
const prettierPlugin = require('eslint-plugin-prettier')

const prettierOptions = {
  singleQuote: true,
  semi: false,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'es5',
  endOfLine: 'auto',
}

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.angular/**',
    ],
  },
  {
    files: ['src/**/*.ts', 'cypress.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      '@angular-eslint': angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...angularEslintPlugin.configs.recommended.rules,
      'prettier/prettier': ['error', prettierOptions],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['cypress/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: false,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      'prettier/prettier': ['error', prettierOptions],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      ...angularTemplatePlugin.configs.accessibility.rules,
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
    },
  },
]
