const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const baseConfig = require('../config/rollup.config')
const del = require('del')
const loadEntries = require('./loadEntries')


async function build(name, input) {
  console.log(name, input)
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

loadEntries().forEach(({ name, input }) => build(name, input))
