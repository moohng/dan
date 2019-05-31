import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'

import baseConfig from './rollup.config'

export default args => {
  const config = {
    ...baseConfig,
    input: 'src/index',
    output: [
      {
        file: 'dist/dan.mini.js',
        format: 'umd',
        name: 'dan',
      }
    ],
  }
  config.plugins.push(...[
    terser(),
    clear({
      targets: ['dist'],
    }),
  ])

  return config
}
