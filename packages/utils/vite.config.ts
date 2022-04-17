import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue-types', 'vue', '@vueuse/core', 'swr'],
      output: {
        globals: {
          'vue-types': 'VueTypes',
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
          'swr': 'swr',
        },
      },
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: e => `ProUtils.${e}.js`,
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
})
