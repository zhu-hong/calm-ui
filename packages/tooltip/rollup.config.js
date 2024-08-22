import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { dts } from 'rollup-plugin-dts'
import { resolve } from 'node:path'

export default [
  defineConfig({
    input: './src/index.tsx',
    external: ['react', 'react/jsx-runtime', '@floating-ui/react', /^@calm-ui\//],
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript({
        tsconfig: resolve(process.cwd(), '../../tsconfig.json'),
      }),
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
  }),
  defineConfig({
    input: './src/index.tsx',
    plugins: [
      dts(),
    ],
    output: {
      dir: 'dist',
    },
  }),
]