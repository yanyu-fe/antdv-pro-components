import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vuePlugin(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        '@ant-design/icons-vue',
        '@vueuse/core',
        '@yanyu-fe/pro-provider',
        '@yanyu-fe/pro-utils',
        'ant-design-vue',
        'dayjs',
        'lodash',
        'vue',
        'vue-types',
      ],
      output: {
        exports: 'named',
        globals: {
          'vue-types': 'VueTypes',
          'vue': 'Vue',
          'lodash': '_',
          'dayjs': 'dayjs',
          'ant-design-vue': 'antd',
          '@yanyu-fe/pro-utils': 'ProUtils',
          '@yanyu-fe/pro-provider': 'ProProvider',
          '@vueuse/core': 'VueuseCore',
          '@ant-design/icons-vue': 'AntdIcons',
        },
      },
    },
    lib: {
      entry: 'src/index.tsx',
      formats: ['umd', 'es', 'cjs'],
      name: 'ProField',
      fileName: e => `index.${e}.js`,
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
