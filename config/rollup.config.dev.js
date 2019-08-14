import path from 'path'
import fs from 'fs'
import serve from 'rollup-plugin-serve'
import clear from 'rollup-plugin-clear'

import baseConfig from './rollup.config'

const entryPath = path.resolve('src')

export default args => {
  const entries = fs.readdirSync(entryPath)
  const inputEntries = entries.reduce((res, dir) => {
    const filePath = path.join(entryPath, dir)
    const stats = fs.statSync(filePath)
    console.log('file path', filePath)
    // 是文件
    if (stats.isFile()) {
      if (dir === 'index.js') {
        return { ...res, dan: filePath }
      }
      if (/(.+)\.js$/.test(dir)) {
        return { ...res, [RegExp.$1]: filePath }
      }
    }
    // 是目录
    if (stats.isDirectory()) {
      return { ...res, [dir]: path.join(filePath, 'index.js') }
    }
  }, {})

  const config = {
    ...baseConfig,
    input: inputEntries,
    output: [
      {
        dir: 'lib',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'cjs',
        name: 'dan',
        exports: 'auto',
      },
    ],
  }

  config.plugins.push(...[
    clear({
      targets: ['lib'],
    }),
  ])

  if (args.server) {
    config.plugins.push(
      ...[
        serve({
          open: true, // 是否打开浏览器
          contentBase: ['demo', 'dist'],
          historyApiFallback: true, // 404 错误是否返回 index.html
          host: 'localhost',
          port: 10001,
        }),
      ]
    )
  }

  return config
}
