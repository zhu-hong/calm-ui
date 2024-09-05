import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import unocss from 'unocss/vite'
import { Features } from 'lightningcss'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src'),
      '@calm-ui/theme': resolve(__dirname, './packages/theme/index.tsx'),
      '@calm-ui/ripple': resolve(__dirname, './packages/ripple/src/index.jsx'),
      '@calm-ui/button': resolve(__dirname, './packages/button/src/index.tsx'),
      '@calm-ui/modal': resolve(__dirname, './packages/modal/src/index.tsx'),
      '@calm-ui/popover': resolve(__dirname, './packages/popover/src/index.tsx'),
      '@calm-ui/tooltip': resolve(__dirname, './packages/tooltip/src/index.tsx'),
      '@calm-ui/pagination': resolve(__dirname, './packages/pagination/src/index.tsx'),
      '@calm-ui/input': resolve(__dirname, './packages/input/src/index.tsx'),
      '@calm-ui/switch': resolve(__dirname, './packages/switch/src/index.tsx'),
    },
  },
  plugins: [
    react(),
    unocss(),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      include: Features.Nesting,
    },
  },
})
