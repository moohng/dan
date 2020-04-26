import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs' // 与 Babel 插件冲突
import json from 'rollup-plugin-json'

export default {
  plugins: [
    resolve(),
    // commonjs(), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
