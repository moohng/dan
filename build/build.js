const rollup = require('rollup')
const baseConfig = require('./rollup.config')
const del = require('del')
const loadEntries = require('./loadEntries')

async function build2iife(name, input) {
  // console.log(name, input)
  const inputOptions = {
    ...baseConfig,
    input,
  }
  const outputOptions = {
    file: `dist/${name}.min.js`,
    format: 'iife',
    name,
  }
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

async function build2cjs(entries) {
  const inputEntries = entries.reduce((res, { name, input }) => ({ ...res, [name]: input }), {})

  const inputOptions = {
    ...baseConfig,
    input: inputEntries,
  }
  const outputOptions = {
    dir: 'lib',
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    format: 'cjs',
    name: 'dan',
  }
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

const entries = loadEntries()
const args = process.argv.slice(2)

console.log('输入参数：', args)

console.log('正在打包...')

// lib 打包
if (!args.includes('dist')) {
  del.sync(['lib'])
  build2cjs(entries).then(() => {
    console.log('lib 打包完成')
  })
}

// dist 打包
if (!args.includes('lib')) {
  del.sync(['dist'])
  Promise.all(entries.map(({ name, input }) => build2iife(name, input))).then(() => {
    console.log('dist 打包完成')
  })
}
