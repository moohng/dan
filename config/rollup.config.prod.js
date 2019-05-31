import { terser } from 'rollup-plugin-terser'

import baseConfig from './rollup.config'

export default args => {
  const config = {
    ...baseConfig,
    input: 'src/index',
    output: [
      {
        file: 'dist/validator.min.js',
        format: 'umd',
        name: 'validator',
      }
    ],
  }
  config.plugins.push(...[
    terser(),
  ])

  return config
}
