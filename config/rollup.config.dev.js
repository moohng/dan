import serve from 'rollup-plugin-serve'

import baseConfig from './rollup.config'

export default args => {
  const config = {
    ...baseConfig,
    input: {
      index: 'src/index',
      validator: 'src/validator/index',
    },
    output: [
      {
        dir: 'lib',
        entryFileNames: '[name].js',
        format: 'cjs',
        name: 'validator',
      },
    ]
  }

  if (args.server) {
    config.plugins.push(...[
      serve({
        open: true, // 是否打开浏览器
        contentBase: '/demo',
        historyApiFallback: true, // 404 错误是否返回 index.html
        host: 'localhost',
        port: 10001,
      })
    ])
  }

  return config
}
