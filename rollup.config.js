import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import json from 'rollup-plugin-json'
// import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
// import serve from 'rollup-plugin-serve'

// import postcss from 'rollup-plugin-postcss'
// import simple from 'postcss-simple-vars'  // 支持使用 sass 风格的变量
// import nested from 'postcss-nested' // 支持嵌套写法
// import cssnext from 'postcss-cssnext' // 兼容最新 css 语法
// import cssnano from 'cssnano' // 压缩 css

const isProduction = process.env.NODE_ENV === 'production'

console.log('---------', process.env.NODE_ENV)

export default {
  input: 'index.js',
  output: {
    file: isProduction ? 'dist/validator.min.js' : 'dist/validator.js',
    format: 'umd',
    name: 'validator'
  },
  plugins: [
    // postcss({
    //   extension: ['.css'],
    //   plugins: [
    //     simple(),
    //     nested(),
    //     cssnext({
    //       warnForDuplicates: false
    //     }),
    //     cssnano()
    //   ]
    // }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      jsnext: true,
      main: true,
      browser: true,
    }),
    // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
    // commonjs(),
    // json(),
    babel({
      exclude: 'node_modules/**'
    }),
    // replace({
    //   ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    // }),
    (isProduction && uglify()),
    // uglify(),
    // serve({
    //   open: true, // 是否打开浏览器
    //   contentBase: './',
    //   historyApiFallback: true, // 404 错误是否返回 index.html
    //   host: 'localhost',
    //   port: 10001,
    // })
  ]
}
