const path = require('path')
const fs = require('fs')


module.exports = function () {
  const entryPath = path.resolve('src')
  const entries = fs.readdirSync(entryPath)

  const results = []
  for (const dir of entries) {
    const filePath = path.join(entryPath, dir)
    const stats = fs.statSync(filePath)

    // console.log('file path', filePath)

    // 是目录
    if (stats.isDirectory()) {
      results.push({ name: dir, input: path.join(filePath, 'index.js') })
      continue
    }

    // 是文件
    if (stats.isFile()) {
      if (dir === 'index.js') {
        results.push({ name: 'dan', input: filePath })
        continue
      }
      if (/(.+)\.js$/.test(dir)) {
        results.push({ name: RegExp.$1, input: filePath })
        continue
      }
    }
  }

  return results
}
