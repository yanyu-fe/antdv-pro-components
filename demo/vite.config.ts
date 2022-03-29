import { URL, fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/, /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: [
      'vue',
      'vue-router',
    ],
  })],
  resolve: {
    alias: {
      '@yanyu-fe/pro-field': fileURLToPath(new URL('../packages/field/src', import.meta.url)),
      '@yanyu-fe/pro-form': fileURLToPath(new URL('../packages/form/src', import.meta.url)),
      '@yanyu-fe/pro-layout': fileURLToPath(new URL('../packages/layout/src', import.meta.url)),
      '@yanyu-fe/pro-provider': fileURLToPath(new URL('../packages/provider/src', import.meta.url)),
      '@yanyu-fe/pro-utils': fileURLToPath(new URL('../packages/utils/src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
