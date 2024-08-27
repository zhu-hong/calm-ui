import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'
import { lightningcssPlugin } from '@zhuh/rollup-plugin-lightningcss'
import babel from '@rollup/plugin-babel'
import { resolve } from 'node:path'

export default [
  defineConfig({
    input: './src/index.tsx',
    external: ['react', 'react/jsx-runtime', 'clsx', /^@calm-ui\//],
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript({
        tsconfig: resolve(process.cwd(), '../../tsconfig.json'),
      }),
      lightningcssPlugin({
        injectOptions: {
          tag: 'cm-input',
        },
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
    external: [/\.css$/u],
    plugins: [
      dts(),
    ],
    output: {
      dir: 'dist',
    },
  }),
]
