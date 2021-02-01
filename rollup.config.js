import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
const { terser } = require('rollup-plugin-terser');

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

module.exports = {
  input: path.resolve('src/index.ts'),
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      // babelrc: false, // 忽略项目中的babel配置文件，使用此配置
      include: ['src/**/*'],
      // babelHelpers: 'runtime',
    }),
  ],
  output: [
    {
      file: 'dist/dan.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/dan.common.min.js',
      format: 'cjs',
      plugins: [
        terser(),
      ],
    },
    {
      file: 'dist/dan.es.js',
      format: 'es',
    },
    {
      file: 'dist/dan.es.min.js',
      format: 'es',
      plugins: [
        terser(),
      ],
    },
    {
      file: 'dist/dan.js',
      format: 'iife',
      name: 'dan',
      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {},
    },
    {
      file: 'dist/dan.min.js',
      format: 'iife',
      name: 'dan',
      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {},
      plugins: [
        terser(),
      ],
    },
    {
      file: 'dist/dan.umd.js',
      format: 'umd',
      name: 'dan',
      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {},
    },
    {
      file: 'dist/dan.umd.min.js',
      format: 'umd',
      name: 'dan',
      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {},
      plugins: [
        terser(),
      ],
    },
  ],
}
