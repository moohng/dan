const serve = require('rollup-plugin-serve')
const clear = require('rollup-plugin-clear')
const { terser } = require('rollup-plugin-terser')

const baseConfig = require('./rollup.config')
const loadEntries = require('../build/loadEntries')


module.exports = args => {
  const inputEntries = loadEntries().reduce((res, { name, input }) => ({ ...res, [name]: input }), {})

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
      },
    ],
  }

  config.plugins.push(...[
    terser(),
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
