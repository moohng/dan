import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'index.js',
  output: {
    file: 'dist/validator.js',
    format: 'umd',
    name: 'validator'
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    // commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    minify({
      comments: false,
      sourceMap: false
    })
  ]
}
