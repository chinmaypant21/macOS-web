import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), viteTsconfigPaths()],
  resolve: {
    alias: {
      'src': '/src',
      '@store': '/src/store',
      '@assets': '/src/assets',
      '@images': '/src/assets/images',
      // '@styles': '/src/assets/styles',
      // '@components': '/src/components',
      // '@layout': '/src/layout',
      // '@utils': '/src/utils',
    }
  }
})
