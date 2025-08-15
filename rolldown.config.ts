import { defineConfig } from 'rolldown'
// @ts-expect-error: ts(7016)
import { copy } from '@web/rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default defineConfig({
  input: 'src/behavior_pack/scripts/index.ts',
  platform: 'node',
  output: {
    dir: 'dist',
    entryFileNames: 'behavior_pack/scripts/[name].js',
    minify: true,
  },
  plugins: [
    copy({ patterns: '**/*', rootDir: 'src', exclude: '**/*.{js,ts}' }),
    del({ targets: 'dist' }),
  ],
})
