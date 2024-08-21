import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import unocss from 'unocss/vite'
import { Features } from 'lightningcss'
import { alias } from './alias'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src'),
      ...alias,
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
