import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/style/index.ts',
      formats: ['es'],
      name: 'ProFieldStyle',
      fileName: e => `style.${e}.js`,
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
