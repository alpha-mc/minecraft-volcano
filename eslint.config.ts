import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  [
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
      plugins: {
        js,
        '@stylistic': stylistic,
      },
      extends: ['js/recommended'],
      languageOptions: { globals: globals.node },
    },
    // @ts-expect-error: typescript-eslint/typescript-eslint#10899
    tseslint.configs.recommended,
    stylistic.configs.recommended,
  ],
)
