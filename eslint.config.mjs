import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: ['dist', 'proto'],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs['recommended-flat'],
]
