import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@yanyu-fe/pro-utils', 'vue', 'ant-design-vue'],
      output: {
        globals: {
          '@yanyu-fe/pro-utils': 'ProUtils',
          'vue': 'Vue',
          'ant-design-vue': 'antd',
        },
        exports: 'named',
      },
    },
    lib: {
      entry: 'src/index.tsx',
      formats: ['es', 'cjs'],
      fileName: e => `ProProvider.${e}.js`,
    },
  },
  plugins: [
    vuePlugin(),
    vueJsx(),
    dts({ insertTypesEntry: true, copyDtsFiles: false }),
  ],
})
