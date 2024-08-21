import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  input: 'src/index.jsx',
  external: ['clsx','goober','react','react/jsx-runtime','react-transition-state'],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          { runtime: 'automatic' },
        ],
      ],
    }),
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: false,
  },
})