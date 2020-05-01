const path = require('path')
const fs = require('fs')
const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const baseConfig = require('../config/rollup.config')
const del = require('del')


async function build(name, input) {
  const inputOptions = {
    input,
    plugins: baseConfig.plugins.concat([
      terser(),
    ]),
  }
  const outputOptions = {
    file: `dist/${name}.min.js`,
    format: 'iife',
    name,
    exports: 'auto',
  }
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

del.sync(['dist'])

const entryPath = path.resolve('src')
const entries = fs.readdirSync(entryPath)

for (const dir of entries) {
  const filePath = path.join(entryPath, dir)
  const stats = fs.statSync(filePath)

  console.log('file path', filePath)

  // 是目录
  if (stats.isDirectory()) {
    build(dir, path.join(filePath, 'index.js'))
    continue
  }

  // 是文件
  if (stats.isFile()) {
    if (dir === 'index.js') {
      build('dan', filePath)
      continue
    }
    if (/(.+)\.js$/.test(dir)) {
      build(RegExp.$1, filePath)
      continue
    }
  }
}
